require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 구글 AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------------------------------------------------------------------
// 1. SYSTEM_PROMPTS (명령어 서랍장 - 모듈화)
// 한국어(ko)와 영어(en) 상황별 AI 명령어를 깔끔하게 분리하여 관리합니다.
// ----------------------------------------------------------------------
const SYSTEM_PROMPTS = {
  ko: {
    // [1. 비즈니스 / 이메일]
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자: ${i1}], [핵심 내용: ${i2}], [원하는 온도: ${i3}]에 맞춰 비즈니스 이메일을 작성해 줘. 불필요한 서론 없이 바로 복사할 수 있게 제목과 본문만 마크다운으로 출력해.`,
    '메모 심폐소생기': (i1, i2, i3) => `너는 최고 수준의 전략 컨설턴트야. 사용자가 준 [날것의 텍스트: ${i2}]를 분석해서 [문서 형태: ${i1}]에 맞는 완벽한 구조의 보고서로 변환해 줘. 특히 [강조 포인트: ${i3}]를 가장 돋보이게 작성하고, 불릿 포인트와 표를 적극 활용해 마크다운으로 출력해.`,
    '프로 사과문': (i1, i2, i3) => `너는 기업 위기관리 전문가야. [발생한 사고: ${i1}]에 대해 사과하되, [수습 대안: ${i2}]을 강조하여 유능해 보이도록 방어해 줘. [대상: ${i3}]에 맞는 톤앤매너를 완벽히 지켜서, 변명처럼 보이지 않는 깔끔한 사과문을 작성해 줘.`,
    
    // [2. 과제 / 요약]
    '리포트 심폐소생': (i1, i2, i3) => `너는 일타 학원 강사이자 논문 전문가야. [초안: ${i2}]을 분석해서 [제출 대상: ${i1}]이 감탄할 만한 구조적인 글로 변환해. [어조: ${i3}]에 완벽히 맞추고 마크다운으로 깔끔하게 정리해.`,
    '발표 대본 변환': (i1, i2, i3) => `너는 스티브 잡스급의 프레젠테이션 코치야. [자료: ${i2}]를 바탕으로 [타겟/시간: ${i1}]에 맞는 자연스러운 말하기 대본(구어체)을 써줘. [어조: ${i3}]를 유지해.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 대기업 인사담당자 출신 취업 컨설턴트야. 사용자의 [경험: ${i2}]을 [지원 직무: ${i1}]의 핵심 역량과 연결해 매력적인 스토리텔링으로 포장해 줘. [어조: ${i3}]를 지켜.`,
    
    // [3. 인간관계 (거절/사과)]
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상: ${i1}]에게 [거절 사유: ${i2}]를 전달해야 해. 감정 소모를 최소화하면서 [어조: ${i3}]에 맞게 최적의 거절 문구를 작성해 줘.`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 센스 있는 작가야. [상황: ${i1}]에 맞춰 [포함할 내용: ${i2}]을 자연스럽게 녹여낸 인사말을 작성해. [어조: ${i3}]를 반영해 진정성 있게 써줘.`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 관계 회복 심리상담사야. [대상: ${i1}]에게 [잘못: ${i2}]에 대해 사과하는 글을 써줘. 핑계처럼 보이지 않도록 주의하며 [어조: ${i3}]에 맞춰 진정성 있게 작성해.`,
    
    // [4. 중고거래 / 쇼핑몰]
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황: ${i1}]에서 [팩트: ${i2}]를 전달하며 상대방을 제압하거나 깔끔하게 응대하는 메시지를 써줘. [어조: ${i3}]를 지켜.`,
    '매력적인 판매글': (i1, i2, i3) => `너는 전설의 카피라이터야. [물건: ${i1}]의 [특징: ${i2}]를 매력적으로 포장해서 당장 사고 싶게 만드는 판매글을 작성해. [어조: ${i3}]를 적용하고 가독성 좋게 이모지도 써줘.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 5성급 호텔 CS 매니저야. [별점: ${i1}]인 [고객 리뷰: ${i2}]에 대한 사장님의 답글을 작성해. 컴플레인에는 전문적으로, 칭찬에는 감동적으로 [어조: ${i3}]에 맞춰 대처해 줘.`,
    
    // [5. 엑셀 / 시트]
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 최고 수준의 데이터 분석가야. 사용자의 [데이터 상황: ${i1}]을 바탕으로 [원하는 결과: ${i2}]를 도출할 수 있는 [프로그램: ${i3}] 함수 수식을 작성해 줘. 반드시 즉시 복사해서 쓸 수 있는 수식을 마크다운 코드 블록(\`\`\`excel 또는 \`\`\`) 안에 가장 먼저 보여주고, 그 아래에 수식의 작동 원리를 2~3줄로 짧게 설명해.`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. 사용자가 제시한 [수식 또는 에러: ${i1}]을 분석하고, [궁금한 점: ${i2}]에 답변해 줘. [이해 수준: ${i3}]에 맞춰서 설명의 깊이와 비유를 조절하고, 만약 에러가 나는 상황이라면 해결책(수정된 수식)을 마크다운 코드 블록으로 제공해 줘.`,
    '반복작업 매크로': (i1, i2, i3) => `너는 개발자 출신 사무자동화 전문가야. 사용자의 [요청 작업: ${i2}]을 수행하는 코드를 [사용 환경: ${i1}]에 맞춰 완벽하게 작성해 줘. 코드는 반드시 마크다운 코드 블록(\`\`\`vba 또는 \`\`\`javascript)을 사용하여 출력하고, [코드 스타일: ${i3}]에 맞춰서 작성해 줘.`
  },
  en: {
    // [1. Business: Professional tone, Call to Action]
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior Western corporate manager. Write a professional email to [Recipient: ${i1}]. [Core Message: ${i2}]. Ensure the tone reflects [Desired Tone: ${i3}]. Keep it concise, direct, and end with a clear Call to Action (CTA). Output only the subject and body in Markdown.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a top-tier management consultant. Convert the following [Raw Notes: ${i2}] into a well-structured [Document Type: ${i1}]. Highlight this [Key Point: ${i3}]. Use bullet points, bold text for emphasis, and a professional Western business tone. Output in Markdown.`,
    '프로 사과문': (i1, i2, i3) => `Act as a corporate crisis manager. Write a brief, professional response to [Issue: ${i1}]. Focus heavily on the [Solution/Action Plan: ${i2}] rather than over-apologizing. Adapt the tone for [Audience: ${i3}]. Output in Markdown.`,
    
    // [2. Assignment: Western academic/practical style]
    '리포트 심폐소생': (i1, i2, i3) => `Act as an academic writing tutor. Improve this [Draft: ${i2}] to impress a [Target Audience: ${i1}]. Structure it logically with a strong thesis statement and clear arguments. Maintain a [Tone: ${i3}] tone. Output in Markdown.`,
    '발표 대본 변환': (i1, i2, i3) => `Act as a TED Talk speechwriter. Convert these [Presentation Materials: ${i2}] into a natural spoken script for a [Target Audience & Time: ${i1}]. Maintain a [Tone: ${i3}] tone. Use conversational English.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `Act as an executive recruiter. Transform these [Experiences: ${i2}] into a compelling narrative for a [Target Role: ${i1}]. Emphasize impact, action verbs, and measurable results. Use a [Tone: ${i3}] tone.`,
    
    // [3. Relations: Direct yet polite, avoiding over-apologizing]
    '철벽 방어 거절문': (i1, i2, i3) => `Act as an assertiveness coach. Write a message declining a request from [Recipient: ${i1}] regarding [Reason: ${i2}]. Be polite but extremely firm, direct, and do not over-apologize or offer false hope. Match this [Tone: ${i3}].`,
    '센스있는 인사/축하': (i1, i2, i3) => `Act as an expert copywriter. Write a warm, socially calibrated message for [Situation: ${i1}] including these [Details: ${i2}]. Keep it natural for Western culture, not overly formal unless specified by [Tone: ${i3}].`,
    '진심 어린 사과문': (i1, i2, i3) => `Act as an emotional intelligence expert. Write an apology to [Recipient: ${i1}] for [Mistake: ${i2}]. Take full accountability without making excuses, state how you will fix it, and keep it brief and genuine. Tone: [${i3}].`,
    
    // [4. Marketplace: Use terms like FIRM, NWT, OBO]
    '당근 진상 퇴치기': (i1, i2, i3) => `Act as an experienced eBay/Craigslist seller. Write a firm response for this [Situation: ${i1}] conveying these [Facts: ${i2}]. Be direct. If dealing with lowballers, use terms like 'Price is FIRM'. Match this [Tone: ${i3}].`,
    '매력적인 판매글': (i1, i2, i3) => `Act as a seasoned online seller. Write a compelling marketplace listing for [Item: ${i1}] with these [Features/Flaws: ${i2}]. Use standard abbreviations where appropriate (e.g., NWT, OBO). Make it highly readable. Tone: [${i3}].`,
    '사장님 리뷰 답글': (i1, i2, i3) => `Act as a 5-star Yelp restaurant manager. Write a reply to a [Rating: ${i1}] review stating [Customer Review: ${i2}]. If it's a complaint, be professional, offer a resolution offline, but do not accept fault if unwarranted. Tone: [${i3}].`,
    
    // [5. Excel: Clear, practical]
    '함수 수식 뚝딱이': (i1, i2, i3) => `Act as a senior Data Analyst. Provide a formula for [Program: ${i3}] based on [Data Context: ${i1}] to achieve [Desired Result: ${i2}]. Output the formula in a markdown code block first, followed by a very brief 2-sentence explanation in English.`,
    '외계어 수식 해독기': (i1, i2, i3) => `Act as a friendly Data Analytics instructor. Analyze this [Formula/Error: ${i1}] and answer this [Question: ${i2}]. Tailor the explanation depth to a [Comprehension Level: ${i3}]. Provide a corrected formula in a markdown code block if applicable.`,
    '반복작업 매크로': (i1, i2, i3) => `Act as an Automation Engineer. Write a macro/script for [Environment: ${i1}] to perform [Task: ${i2}]. Output the code cleanly in a markdown code block. Follow this [Coding Style: ${i3}].`
  }
};

// 언어별 공통 필수 규칙 (군더더기 제거)
const GLOBAL_RULES = {
  ko: `\n\n[필수 요구사항]\n- 불필요한 서론/결론("네, 작성해 드리겠습니다" 등)은 절대 쓰지 말고, 바로 복사해서 사용할 수 있는 본문만 출력할 것.`,
  en: `\n\n[GLOBAL RULE]\n- No conversational fillers like 'Sure, here is...' or 'I hope this helps'. Output the result directly in English.`
};

// ----------------------------------------------------------------------
// 2. AI 생성 엔드포인트 (API 라우터)
// ----------------------------------------------------------------------
app.post('/api/generate', async (req, res) => {
  try {
    // 프론트엔드에서 보낸 데이터 중 lang(언어) 변수를 추가로 추출합니다. (기본값: 'ko')
    const { subCategory, input1, input2, input3, lang = 'ko' } = req.body;

    // 1) 해당 언어 서랍장 찾기
    const promptsForLang = SYSTEM_PROMPTS[lang];
    if (!promptsForLang) {
      return res.status(400).json({ success: false, message: '지원하지 않는 언어입니다. (Unsupported language)' });
    }

    // 2) 해당 기능의 프롬프트 명령어 찾기
    const promptGenerator = promptsForLang[subCategory];
    if (!promptGenerator) {
      return res.status(400).json({ success: false, message: '알 수 없는 카테고리 요청입니다. (' + subCategory + ')' });
    }

    // 3) 최종 프롬프트 조합 (개별 명령어 + 공통 군더더기 제거 규칙)
    const prompt = promptGenerator(input1, input2, input3) + GLOBAL_RULES[lang];

    // 4) Gemini AI 모델 호출
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 5) 결과 반환
    res.status(200).json({ success: true, text: responseText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버에서 AI 응답을 생성하는 중 오류가 발생했습니다. (Server error during AI generation)' 
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`[🚀 백엔드 서버 온에어] AI 뚝딱 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});