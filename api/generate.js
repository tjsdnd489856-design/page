// --- 1. AI 명령어 설정 (SYSTEM_PROMPTS) ---
// 사용자 요청에 맞는 프롬프트를 생성하는 함수들의 모음입니다.
const SYSTEM_PROMPTS = {
  ko: {
    '메모 심폐소생기': (i1, i2, i3) => `너는 전략 컨설턴트야. [문서형태:${i1}], [메모:${i2}], [강조:${i3}].\n[엄격한 규칙] 절대 네가 스스로 새로운 정보나 내용을 추가하거나 지어내지 마. 오직 사용자가 입력한 [메모] 내용 안에서만 문장을 다듬고 요약/정리해서 [문서형태]로 만들어야 해.`,
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자:${i1}], [내용:${i2}], [온도:${i3}].`,
    // 프로 사과문의 i3(대상) 입력란이 화면에서 제거되었으므로, 강제로 '외부 고객(외부용)'으로 기본값을 설정합니다.
    '프로 사과문': (i1, i2, i3) => `너는 위기관리 전문가야. [사고:${i1}], [대안:${i2}], [대상:외부고객(외부용)].\n[조건] 반드시 외부 고객에게 보내는 정중하고 진심 어린 사과문 형태로 작성해.`,
    '리포트 심폐소생': (i1, i2, i3) => `너는 논문 전문가야. [대상:${i1}], [초안:${i2}], [어조:${i3}].`,
    '발표 대본 변환': (i1, i2, i3) => `너는 프레젠테이션 코치야. [타겟/시간:${i1}], [자료:${i2}], [어조:${i3}].`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 취업 컨설턴트야. [직무:${i1}], [경험:${i2}], [어조:${i3}].`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 데이터 분석가야. [상황:${i1}], [결과:${i2}], [프로그램:${i3}].`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. [수식:${i1}], [질문:${i2}], [수준:${i3}].`,
    '반복작업 매크로': (i1, i2, i3) => `너는 자동화 전문가야. [환경:${i1}], [작업:${i2}], [스타일:${i3}].`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `너는 시니어 DB 관리자야. [테이블:${i1}], [원하는데이터:${i2}], [DBMS종류:${i3}].`,
    '정규식(Regex) 설명': (i1, i2, i3) => `너는 시니어 개발자야. [상황/패턴:${i1}], [요청사항:${i2}], [이해수준:${i3}].`,
    '인스타그램 해시태그': (i1, i2, i3) => `너는 SNS 마케터야. [주제/사진설명:${i1}], [타겟고객:${i2}], [분위기:${i3}].`,
    '광고 카피라이팅': (i1, i2, i3) => `너는 광고 카피라이터야. [제품/서비스:${i1}], [소구포인트:${i2}], [광고매체:${i3}].`,
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상:${i1}], [사유:${i2}], [어조:${i3}].`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 카피라이터야. [상황:${i1}], [내용:${i2}], [어조:${i3}].`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 심리상담사야. [대상:${i1}], [잘못:${i2}], [어조:${i3}].`,
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황:${i1}], [팩트:${i2}], [어조:${i3}].`,
    '매력적인 판매글': (i1, i2, i3) => `너는 판매글 장인이야. [물건:${i1}], [특징:${i2}], [어조:${i3}].`,
    // 별점 항목이 제거되었으므로 i1은 무시하고 i2(리뷰), i3(어조)만 사용합니다.
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 CS 매니저야. [고객리뷰:${i2}], [어조:${i3}].`,
  },
  en: {
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}].`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}].\n[STRICT RULE] NEVER add or invent new information. You must ONLY summarize and format the provided [Notes].`,
    '프로 사과문': (i1, i2, i3) => `Act as PR manager. [Issue:${i1}], [Solution:${i2}], [Audience:Client].\n[CONDITION] Always write a sincere apology tailored for an external client.`,
    '리포트 심폐소생': (i1, i2, i3) => `Act as an academic tutor. [Audience:${i1}], [Draft:${i2}], [Tone:${i3}].`,
    '발표 대본 변환': (i1, i2, i3) => `Act as a speech coach. [Target:${i1}], [Slides:${i2}], [Tone:${i3}].`,
    '자소서 영혼 주입기': (i1, i2, i3) => `Act as a tech recruiter. [Role:${i1}], [Exp:${i2}], [Tone:${i3}].`,
    '철벽 방어 거절문': (i1, i2, i3) => `Act as an assertiveness coach. [Recipient:${i1}], [Reason:${i2}], [Tone:${i3}].`,
    '센스있는 인사/축하': (i1, i2, i3) => `Act as a greeting expert. [Situation:${i1}], [Details:${i2}], [Tone:${i3}].`,
    '진심 어린 사과문': (i1, i2, i3) => `Act as a counselor. [Recipient:${i1}], [Mistake:${i2}], [Tone:${i3}].`,
    '당근 진상 퇴치기': (i1, i2, i3) => `Act as an expert seller. [Situation:${i1}], [Facts:${i2}], [Tone:${i3}].`,
    '매력적인 판매글': (i1, i2, i3) => `Act as a copywriter. [Item:${i1}], [Features:${i2}], [Tone:${i3}].`,
    '사장님 리뷰 답글': (i1, i2, i3) => `Act as a CS Manager. [Review:${i2}], [Tone:${i3}].`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `Act as a Data Analyst. [Context:${i1}], [Goal:${i2}], [Program:${i3}].`,
    '외계어 수식 해독기': (i1, i2, i3) => `Act as an Excel Instructor. [Formula:${i1}], [Question:${i2}], [Level:${i3}].`,
    '반복작업 매크로': (i1, i2, i3) => `Act as an Automation Engineer. [Env:${i1}], [Task:${i2}], [Style:${i3}].`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `Act as a Senior DBA. [Table:${i1}], [Data Needed:${i2}], [DBMS:${i3}].`,
    '정규식(Regex) 설명': (i1, i2, i3) => `Act as a Developer. [Pattern:${i1}], [Request:${i2}], [Level:${i3}].`,
    '인스타그램 해시태그': (i1, i2, i3) => `Act as a Social Media Manager. [Topic:${i1}], [Target:${i2}], [Vibe:${i3}].`,
    '광고 카피라이팅': (i1, i2, i3) => `Act as an Ad Copywriter. [Product:${i1}], [Hook:${i2}], [Platform:${i3}].`
  },
};

// --- 2. Vercel Serverless Function 메인 로직 ---
module.exports = async (req, res) => {
  // CORS(Cross-Origin Resource Sharing) 설정: 외부에서 API 호출을 허용합니다.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 브라우저의 사전 요청(Preflight)에 대한 빠른 응답
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 1. 클라이언트(app.js)로부터 데이터 받기
    // input3를 프론트엔드에서 강제로 'hidden_default' 같은 값으로 보낼 수 있으므로, 프롬프트 쪽에서 제어합니다.
    const { subCategory, input1, input2, input3, lang = 'ko' } = req.body;
    
    // 2. 환경 변수에서 구글 API 키 가져오기 (보안 유지)
    const apiKey = process.env.GEMINI_API_KEY;

    // 3. 에러 처리: API 키가 없는 경우
    if (!apiKey) {
      return res.status(500).json({ success: false, message: 'API_KEY가 설정되지 않았습니다.' });
    }

    // 4. 요청된 기능(카테고리)에 맞는 프롬프트 함수 찾기
    const promptFunc = SYSTEM_PROMPTS[lang]?.[subCategory];
    
    // 에러 처리: 없는 기능을 요청한 경우
    if (!promptFunc) {
      return res.status(400).json({ success: false, message: `지원하지 않는 명령어입니다: ${subCategory}` });
    }

    // 5. 프롬프트 조립 및 필수 조건 추가
    const finalPrompt = promptFunc(input1, input2, input3) + '\n\n[필수] 불필요한 인사말 없이 결과물만 출력해.';

    // 6. Gemini API 통신 규격 설정 (최신 gemini-2.5-flash 모델 적용)
    // 2026년 기준 가장 빠르고 안정적인 모델인 gemini-2.5-flash 모델로 완벽 고정
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    // 7. 구글 서버로 요청 보내기
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        contents: [{ parts: [{ text: finalPrompt }] }] 
      }),
    });

    const data = await response.json();

    // 8. 에러 처리: 구글 서버에서 에러가 발생한 경우
    if (!response.ok) {
      console.error("Google API Error:", data); // 서버 로그에서 정확한 원인 파악을 위해 에러 내용 기록
      return res.status(response.status).json({ success: false, message: data.error?.message || '구글 API 통신 중 오류가 발생했습니다.' });
    }

    // 9. 결과값 추출 (안전하게 접근하기 위해 옵셔널 체이닝(?.) 사용)
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '답변 생성에 실패했습니다.';
    
    // 10. 성공적으로 클라이언트에 결과 반환
    return res.status(200).json({ success: true, result: resultText });

  } catch (error) {
    // 11. 에러 처리: 서버 내부에서 예상치 못한 에러가 발생한 경우
    console.error("Server Internal Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};