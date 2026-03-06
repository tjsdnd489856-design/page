require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// 1. 미들웨어 설정
app.use(cors());
app.use(express.json());

// 2. API 호출 제한 (Rate Limiting) - 어뷰징 방지
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분 기준
  max: 100, // IP당 최대 100회 요청 허용
  message: { 
    success: false, 
    message: '현재 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요. (Too many requests, please try again later.)' 
  },
  standardHeaders: true, // `RateLimit-*` 헤더 반환
  legacyHeaders: false, // `X-RateLimit-*` 헤더 비활성화
});
// /api/로 시작하는 모든 경로에 제한 적용
app.use('/api/', apiLimiter);

// 3. 구글 AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 4. 데이터 로깅 (Data Logging) 유틸리티 함수
async function logData(data) {
  try {
    const logDir = path.join(__dirname, 'logs');
    // logs 폴더가 없으면 자동 생성
    await fs.mkdir(logDir, { recursive: true });
    const logFile = path.join(logDir, 'usage.json');
    // 한국 시간 기준 타임스탬프와 함께 로깅
    const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), ...data }) + '\n';
    await fs.appendFile(logFile, logEntry);
  } catch (err) {
    console.error('[Logging Error] 데이터 로깅 중 오류 발생:', err);
  }
}

// ----------------------------------------------------------------------
// 5. SYSTEM_PROMPTS (Few-Shot 프롬프팅 및 신규 카테고리 유지)
// ----------------------------------------------------------------------
const SYSTEM_PROMPTS = {
  ko: {
    // [비즈니스 / 이메일]
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자:${i1}], [내용:${i2}], [온도:${i3}].
[예시] 입력: 마케팅팀/기획서 늦음/사무적으로 -> 출력: "제목: [요청] 기획서 송부 일정 확인의 건\n본문: 마케팅팀 담당자님, 기획서가 지연되어 일정 확인 차 연락드립니다."\n이제 조건에 맞춰 작성해.`,
    '메모 심폐소생기': (i1, i2, i3) => `너는 전략 컨설턴트야. [문서형태:${i1}], [메모:${i2}], [강조:${i3}].
[예시] 입력: 주간보고/버그수정함/빠른해결 -> 출력: "## 주간 업무 보고\n- **버그 수정 완료 (빠른 이슈 해결)**"\n이제 조건에 맞춰 작성해.`,
    '프로 사과문': (i1, i2, i3) => `너는 위기관리 전문가야. [사고:${i1}], [대안:${i2}], [대상:${i3}].
[예시] 입력: 파일누락/재발송/외부고객 -> 출력: "메일 확인 중 첨부파일 누락을 발견하여 즉시 재발송해 드립니다. 번거롭게 해드려 대단히 죄송합니다."\n이제 조건에 맞춰 작성해.`,
    
    // [과제 / 요약]
    '리포트 심폐소생': (i1, i2, i3) => `너는 논문 전문가야. [대상:${i1}], [초안:${i2}], [어조:${i3}].
[예시] 입력: 교수님/서론 대충/학술적 -> 출력: "본 연구의 서론에서는 해당 주제가 지니는 학술적 의의를 탐구하고자 합니다."\n이제 조건에 맞춰 작성해.`,
    '발표 대본 변환': (i1, i2, i3) => `너는 프레젠테이션 코치야. [타겟/시간:${i1}], [자료:${i2}], [어조:${i3}].
[예시] 입력: 5분 대학생/AI소개/친근하게 -> 출력: "여러분, 요즘 AI가 대세죠? 오늘은 AI에 대해 쉽고 재밌게 알아볼게요."\n이제 조건에 맞춰 작성해.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 취업 컨설턴트야. [직무:${i1}], [경험:${i2}], [어조:${i3}].
[예시] 입력: 마케팅/카페알바/성과중심 -> 출력: "카페 아르바이트 당시, 고객 응대 프로세스를 개선하여 피크타임 회전율을 15% 높인 경험이 있습니다."\n이제 조건에 맞춰 작성해.`,
    
    // [인간관계 (거절/사과)]
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상:${i1}], [사유:${i2}], [어조:${i3}].
[예시] 입력: 친구/돈없음/단호하게 -> 출력: "정말 미안하지만 나도 여유가 없어서 빌려주기 어려워. 이해해 주길 바라."\n이제 조건에 맞춰 작성해.`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 카피라이터야. [상황:${i1}], [내용:${i2}], [어조:${i3}].
[예시] 입력: 동료결혼/참석못함/따뜻하게 -> 출력: "결혼 진심으로 축하해! 직접 참석하지 못해 아쉽지만, 누구보다 행복하길 응원할게."\n이제 조건에 맞춰 작성해.`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 심리상담사야. [대상:${i1}], [잘못:${i2}], [어조:${i3}].
[예시] 입력: 애인/연락두절/진중하게 -> 출력: "미리 연락하지 못해 정말 미안해. 내 잘못을 깊이 반성하고 있어."\n이제 조건에 맞춰 작성해.`,
    
    // [중고거래 / 쇼핑몰]
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황:${i1}], [팩트:${i2}], [어조:${i3}].
[예시] 입력: 무리한네고/에눌불가/단호하게 -> 출력: "본문에 기재된 대로 네고는 불가합니다. 구매 의사가 없으시다면 거래를 취소하겠습니다."\n이제 조건에 맞춰 작성해.`,
    '매력적인 판매글': (i1, i2, i3) => `너는 판매글 장인이야. [물건:${i1}], [특징:${i2}], [어조:${i3}].
[예시] 입력: 아이패드/기스있음/신뢰감 -> 출력: "아이패드 판매합니다. 미세한 생활 기스가 있으나 기능과 배터리 성능에는 전혀 문제없는 A급 기기입니다."\n이제 조건에 맞춰 작성해.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 CS 매니저야. [별점:${i1}], [리뷰:${i2}], [어조:${i3}].
[예시] 입력: 1점/배달늦음/정중하게 -> 출력: "고객님, 배달 지연으로 큰 불편을 드려 대단히 죄송합니다. 매장으로 연락주시면 신속히 조치해 드리겠습니다."\n이제 조건에 맞춰 작성해.`,
    
    // [엑셀 / 시트]
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 데이터 분석가야. [상황:${i1}], [결과:${i2}], [프로그램:${i3}].
[예시] 입력: A열이름/합계구하기/엑셀 -> 출력: "\`\`\`excel\n=SUM(A:A)\n\`\`\`\nA열의 모든 숫자를 합산하는 수식입니다."\n이제 조건에 맞춰 작성해.`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. [수식:${i1}], [질문:${i2}], [수준:${i3}].
[예시] 입력: =VLOOKUP/무슨뜻?/초보자 -> 출력: "VLOOKUP은 책에서 원하는 단어를 찾는 것과 같아요! 원하는 값을 왼쪽에서 오른쪽으로 찾아줍니다."\n이제 조건에 맞춰 작성해.`,
    '반복작업 매크로': (i1, i2, i3) => `너는 자동화 전문가야. [환경:${i1}], [작업:${i2}], [스타일:${i3}].
[예시] 입력: VBA/시트복사/주석포함 -> 출력: "\`\`\`vba\n' 현재 활성화된 시트를 복사합니다\nActiveSheet.Copy\n\`\`\`"\n이제 조건에 맞춰 작성해.`,

    // ⭐ [개발/코딩]
    'SQL 쿼리 짜기': (i1, i2, i3) => `너는 시니어 DB 관리자야. [테이블:${i1}], [원하는데이터:${i2}], [DBMS종류:${i3}].
[예시] 입력: users/나이30이상/MySQL -> 출력: "\`\`\`sql\nSELECT * FROM users WHERE age >= 30;\n\`\`\`\n나이가 30 이상인 유저를 조회하는 쿼리입니다."\n이제 조건에 맞춰 작성해.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `너는 시니어 개발자야. [상황/패턴:${i1}], [요청사항:${i2}], [이해수준:${i3}].
[예시] 입력: 이메일추출/정규식짜줘/초보자 -> 출력: "\`\`\`regex\n^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n\`\`\`\n@ 기호를 기준으로 이메일 형식이 맞는지 검사하는 패턴입니다."\n이제 조건에 맞춰 작성해.`,

    // ⭐ [마케팅/SNS]
    '인스타그램 해시태그': (i1, i2, i3) => `너는 SNS 마케터야. [주제/사진설명:${i1}], [타겟고객:${i2}], [분위기:${i3}].
[예시] 입력: 강남역카페/20대여성/감성 -> 출력: "#강남역카페 #강남디저트 #감성카페 #카페투어 #20대일상"\n이제 조건에 맞춰 작성해.`,
    '광고 카피라이팅': (i1, i2, i3) => `너는 광고 카피라이터야. [제품/서비스:${i1}], [소구포인트:${i2}], [광고매체:${i3}].
[예시] 입력: 무선청소기/흡입력/페이스북 -> 출력: "먼지 한 톨도 용납하지 않는 압도적 흡입력! 지금 바로 경험하세요 🧹✨"\n이제 조건에 맞춰 작성해.`
  },
  en: {
    // English versions
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}].\n[Example] Input: Marketing/Late report/Firm -> Output: "Subject: Urgent: Report Status\nHi, please provide an update on the delayed report immediately."\nNow write.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}].\n[Example] Input: Weekly Report/Bug fixed/Speed -> Output: "## Weekly Update\n- **Resolved bugs swiftly** ensuring no downtime."\nNow write.`,
    '프로 사과문': (i1, i2, i3) => `Act as PR manager. [Issue:${i1}], [Solution:${i2}], [Audience:${i3}].\n[Example] Input: Missing attachment/Resend/Client -> Output: "I sincerely apologize for the missing file. Please find it attached here."\nNow write.`,
    '리포트 심폐소생': (i1, i2, i3) => `Act as an academic tutor. [Audience:${i1}], [Draft:${i2}], [Tone:${i3}].\n[Example] Input: Professor/Messy intro/Academic -> Output: "This paper aims to explore the theoretical implications..."\nNow write.`,
    '발표 대본 변환': (i1, i2, i3) => `Act as a speech coach. [Target:${i1}], [Slides:${i2}], [Tone:${i3}].\n[Example] Input: 5 mins/AI rules/Engaging -> Output: "Hey everyone! AI is everywhere today, let's dive right in!"\nNow write.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `Act as a tech recruiter. [Role:${i1}], [Exp:${i2}], [Tone:${i3}].\n[Example] Input: Marketing/Cafe job/Data-driven -> Output: "Boosted customer retention by 15% through optimized service at a busy cafe."\nNow write.`,
    '철벽 방어 거절문': (i1, i2, i3) => `Act as an assertiveness coach. [Recipient:${i1}], [Reason:${i2}], [Tone:${i3}].\n[Example] Input: Friend/No money/Firm -> Output: "I can't lend you money right now as I'm on a strict budget. Thanks for understanding."\nNow write.`,
    '센스있는 인사/축하': (i1, i2, i3) => `Act as a greeting expert. [Situation:${i1}], [Details:${i2}], [Tone:${i3}].\n[Example] Input: Wedding/Can't attend/Warm -> Output: "So happy for your wedding! Sorry I can't be there, wishing you the absolute best."\nNow write.`,
    '진심 어린 사과문': (i1, i2, i3) => `Act as a counselor. [Recipient:${i1}], [Mistake:${i2}], [Tone:${i3}].\n[Example] Input: Partner/Missed call/Sincere -> Output: "I am truly sorry for missing your call and making you worry. I'll do better."\nNow write.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `Act as an expert seller. [Situation:${i1}], [Facts:${i2}], [Tone:${i3}].\n[Example] Input: Lowballer/Price is FIRM/Direct -> Output: "As stated, the price is FIRM. I cannot accept lower offers."\nNow write.`,
    '매력적인 판매글': (i1, i2, i3) => `Act as a copywriter. [Item:${i1}], [Features:${i2}], [Tone:${i3}].\n[Example] Input: iPad/Minor scratch/Trustworthy -> Output: "Selling my iPad. Works perfectly, just one minor scratch. NWT condition otherwise."\nNow write.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `Act as a CS Manager. [Rating:${i1}], [Review:${i2}], [Tone:${i3}].\n[Example] Input: 1 Star/Cold food/Professional -> Output: "We sincerely apologize for the cold food. Please contact us directly to resolve this."\nNow write.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `Act as a Data Analyst. [Context:${i1}], [Goal:${i2}], [Program:${i3}].\n[Example] Input: Col A/Sum/Excel -> Output: "\`\`\`excel\n=SUM(A:A)\n\`\`\`\nThis formula sums up all values in column A."\nNow write.`,
    '외계어 수식 해독기': (i1, i2, i3) => `Act as an Excel Instructor. [Formula:${i1}], [Question:${i2}], [Level:${i3}].\n[Example] Input: =SUM/What is this?/Beginner -> Output: "It simply adds numbers together, just like a calculator!"\nNow write.`,
    '반복작업 매크로': (i1, i2, i3) => `Act as an Automation Engineer. [Env:${i1}], [Task:${i2}], [Style:${i3}].\n[Example] Input: VBA/Copy sheet/With comments -> Output: "\`\`\`vba\n' Copies the active sheet\nActiveSheet.Copy\n\`\`\`"\nNow write.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `Act as a Senior DBA. [Table:${i1}], [Data Needed:${i2}], [DBMS:${i3}].\n[Example] Input: users/age > 30/MySQL -> Output: "\`\`\`sql\nSELECT * FROM users WHERE age > 30;\n\`\`\`\nRetrieves users older than 30."\nNow write.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `Act as a Developer. [Pattern:${i1}], [Request:${i2}], [Level:${i3}].\n[Example] Input: email/give regex/beginner -> Output: "\`\`\`regex\n^\\S+@\\S+\\.\\S+$\n\`\`\`\nMatches basic email formats."\nNow write.`,
    '인스타그램 해시태그': (i1, i2, i3) => `Act as a Social Media Manager. [Topic:${i1}], [Target:${i2}], [Vibe:${i3}].\n[Example] Input: Coffee shop/Gen Z/Aesthetic -> Output: "#CafeVibes #AestheticCafe #CoffeeLover #GenZ #Daily"\nNow write.`,
    '광고 카피라이팅': (i1, i2, i3) => `Act as an Ad Copywriter. [Product:${i1}], [Hook:${i2}], [Platform:${i3}].\n[Example] Input: Vacuum/Strong suction/Facebook -> Output: "Say goodbye to dust! Experience unmatched suction power today. 🧹✨"\nNow write.`
  }
};

const GLOBAL_RULES = {
  ko: `\n\n[필수 요구사항]\n- 불필요한 인사말이나 서론("네, 작성해 드릴게요", "다음은~" 등)을 절대 쓰지 마세요.\n- 바로 복사해서 사용할 수 있는 최종 결과물만 출력하세요.`,
  en: `\n\n[GLOBAL RULE]\n- Absolutely NO conversational fillers like "Sure, here is..." or "I hope this helps".\n- Output ONLY the final result.`
};


// ----------------------------------------------------------------------
// 6. AI 생성 엔드포인트 (단일 응답 방식으로 롤백)
// ----------------------------------------------------------------------
app.post('/api/generate:generateContent', async (req, res) => {
  try {
    const { subCategory, input1, input2, input3, lang = 'ko' } = req.body;

    const promptsForLang = SYSTEM_PROMPTS[lang];
    if (!promptsForLang) {
      return res.status(400).json({ success: false, message: '지원하지 않는 언어입니다.' });
    }

    const promptGenerator = promptsForLang[subCategory];
    if (!promptGenerator) {
      return res.status(400).json({ success: false, message: '알 수 없는 카테고리입니다: ' + subCategory });
    }

    const prompt = promptGenerator(input1, input2, input3) + GLOBAL_RULES[lang];

    // [로깅] 사용자 요청 기록
    await logData({ type: 'request', subCategory, input1, input2, input3, lang });

    // 단일 응답(generateContent) 방식으로 생성
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // [로깅] 완성된 전체 답변 기록
    await logData({ type: 'response', subCategory, lang, output: responseText });

    // 프론트엔드로 성공 결과 전송 (요구사항에 맞춘 JSON 형식)
    res.status(200).json({ success: true, result: responseText });

  } catch (error) {
    console.error('[Gemini API Error]', error);
    res.status(500).json({ 
      success: false, 
      message: '서버에서 AI 응답을 생성하는 중 오류가 발생했습니다. (Timeout or API Error)' 
    });
  }
});


// ----------------------------------------------------------------------
// 7. 피드백 수집 엔드포인트 (유지)
// ----------------------------------------------------------------------
app.post('/api/feedback', async (req, res) => {
  try {
    const { subCategory, rating, outputText, lang } = req.body;
    
    // 피드백 데이터 로깅
    await logData({ type: 'feedback', subCategory, rating, outputText, lang });
    
    res.status(200).json({ success: true, message: '피드백이 성공적으로 저장되었습니다.' });
  } catch (error) {
    console.error('[Feedback Error]', error);
    res.status(500).json({ success: false, message: '피드백 저장 중 오류가 발생했습니다.' });
  }
});


// 서버 실행
app.listen(port, () => {
  console.log(`[🚀 백엔드 서버 온에어] AI 뚝딱 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});