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

// AI 생성 엔드포인트
app.post('/api/generate', async (req, res) => {
  try {
    const { subCategory, input1, input2, input3 } = req.body;
    let prompt = '';

    // 프론트엔드에서 보낸 subCategory(기능 제목)에 따라 AI의 페르소나와 프롬프트를 완벽히 분기 처리합니다.
    switch (subCategory) {
      // --- [1. 비즈니스 / 이메일] ---
      case '분노조절 이메일':
        prompt = `너는 10년 차 기획팀 에이스 과장이야. [수신자: ${input1}], [핵심 내용: ${input2}], [원하는 온도: ${input3}]에 맞춰 비즈니스 이메일을 작성해 줘. 불필요한 서론 없이 바로 복사할 수 있게 제목과 본문만 마크다운으로 출력해.`;
        break;
      case '개떡 메모 심폐소생기':
        prompt = `너는 최고 수준의 전략 컨설턴트야. 사용자가 준 [날것의 텍스트: ${input2}]를 분석해서 [문서 형태: ${input1}]에 맞는 완벽한 구조의 보고서로 변환해 줘. 특히 [강조 포인트: ${input3}]를 가장 돋보이게 작성하고, 불릿 포인트와 표를 적극 활용해 마크다운으로 출력해.`;
        break;
      case '프로페셔널 사과문':
        prompt = `너는 기업 위기관리 전문가야. [발생한 사고: ${input1}]에 대해 사과하되, [수습 대안: ${input2}]을 강조하여 유능해 보이도록 방어해 줘. [대상: ${input3}]에 맞는 톤앤매너를 완벽히 지켜서, 변명처럼 보이지 않는 깔끔한 사과문을 작성해 줘.`;
        break;

      // --- [2. 과제 / 요약] ---
      case 'A+ 리포트 심폐소생':
        prompt = `너는 일타 학원 강사이자 논문 전문가야. [초안: ${input2}]을 분석해서 [제출 대상: ${input1}]이 감탄할 만한 구조적인 글로 변환해. [어조: ${input3}]에 완벽히 맞추고 마크다운으로 깔끔하게 정리해.`;
        break;
      case '찰떡 발표 대본 변환':
        prompt = `너는 스티브 잡스급의 프레젠테이션 코치야. [자료: ${input2}]를 바탕으로 [타겟/시간: ${input1}]에 맞는 자연스러운 말하기 대본(구어체)을 써줘. [어조: ${input3}]를 유지해.`;
        break;
      case '자소서 영혼 주입기':
        prompt = `너는 대기업 인사담당자 출신 취업 컨설턴트야. 사용자의 [경험: ${input2}]을 [지원 직무: ${input1}]의 핵심 역량과 연결해 매력적인 스토리텔링으로 포장해 줘. [어조: ${input3}]를 지켜.`;
        break;

      // --- [3. 인간관계 (거절/사과)] ---
      case '철벽 방어 거절문':
        prompt = `너는 커뮤니케이션 전문가야. [대상: ${input1}]에게 [거절 사유: ${input2}]를 전달해야 해. 감정 소모를 최소화하면서 [어조: ${input3}]에 맞게 최적의 거절 문구를 작성해 줘.`;
        break;
      case '센스있는 인사/축하':
        prompt = `너는 센스 있는 작가야. [상황: ${input1}]에 맞춰 [포함할 내용: ${input2}]을 자연스럽게 녹여낸 인사말을 작성해. [어조: ${input3}]를 반영해 진정성 있게 써줘.`;
        break;
      case '진심 어린 사과문':
        prompt = `너는 관계 회복 심리상담사야. [대상: ${input1}]에게 [잘못: ${input2}]에 대해 사과하는 글을 써줘. 핑계처럼 보이지 않도록 주의하며 [어조: ${input3}]에 맞춰 진정성 있게 작성해.`;
        break;

      // --- [4. 중고거래 / 쇼핑몰] ---
      case '당근 진상 퇴치기':
        prompt = `너는 중고거래 고수야. [상황: ${input1}]에서 [팩트: ${input2}]를 전달하며 상대방을 제압하거나 깔끔하게 응대하는 메시지를 써줘. [어조: ${input3}]를 지켜.`;
        break;
      case '매력적인 판매글':
        prompt = `너는 전설의 카피라이터야. [물건: ${input1}]의 [특징: ${input2}]를 매력적으로 포장해서 당장 사고 싶게 만드는 판매글을 작성해. [어조: ${input3}]를 적용하고 가독성 좋게 이모지도 써줘.`;
        break;
      case '사장님 리뷰 답글':
        prompt = `너는 5성급 호텔 CS 매니저야. [별점: ${input1}]인 [고객 리뷰: ${input2}]에 대한 사장님의 답글을 작성해. 컴플레인에는 전문적으로, 칭찬에는 감동적으로 [어조: ${input3}]에 맞춰 대처해 줘.`;
        break;

      // --- [5. 엑셀 / 시트 (신규 추가)] ---
      case '함수 수식 뚝딱이':
        prompt = `너는 최고 수준의 데이터 분석가야. 사용자의 [데이터 상황: ${input1}]을 바탕으로 [원하는 결과: ${input2}]를 도출할 수 있는 [프로그램: ${input3}] 함수 수식을 작성해 줘. 반드시 즉시 복사해서 쓸 수 있는 수식을 마크다운 코드 블록(\`\`\`excel 또는 \`\`\`) 안에 가장 먼저 보여주고, 그 아래에 수식의 작동 원리를 2~3줄로 짧게 설명해.`;
        break;
      case '외계어 수식 해독기':
        prompt = `너는 친절한 엑셀 강사야. 사용자가 제시한 [수식 또는 에러: ${input1}]을 분석하고, [궁금한 점: ${input2}]에 답변해 줘. [이해 수준: ${input3}]에 맞춰서 설명의 깊이와 비유를 조절하고, 만약 에러가 나는 상황이라면 해결책(수정된 수식)을 마크다운 코드 블록으로 제공해 줘.`;
        break;
      case '반복작업 매크로':
        prompt = `너는 개발자 출신 사무자동화 전문가야. 사용자의 [요청 작업: ${input2}]을 수행하는 코드를 [사용 환경: ${input1}]에 맞춰 완벽하게 작성해 줘. 코드는 반드시 마크다운 코드 블록(\`\`\`vba 또는 \`\`\`javascript)을 사용하여 출력하고, [코드 스타일: ${input3}]에 맞춰서 작성해 줘.`;
        break;

      // 예외 처리 (알 수 없는 카테고리)
      default:
        return res.status(400).json({ success: false, message: '알 수 없는 카테고리 요청입니다. (' + subCategory + ')' });
    }

    // 공통 요구사항 추가 (모든 프롬프트 끝에 덧붙여 AI의 군더더기를 없앰)
    prompt += `\n\n[필수 요구사항]\n- 불필요한 서론/결론("네, 작성해 드리겠습니다" 등)은 절대 쓰지 말고, 바로 복사해서 사용할 수 있는 본문만 출력할 것.`;

    // Gemini 모델 호출 (최신 모델 적용)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 프론트엔드로 성공 결과 전송
    res.status(200).json({ success: true, text: responseText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버에서 AI 응답을 생성하는 중 오류가 발생했습니다.' 
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`[🚀 백엔드 서버 온에어] AI 뚝딱 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
