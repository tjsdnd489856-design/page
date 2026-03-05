require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // 다른 도메인(클라이언트)에서의 요청 허용
app.use(express.json()); // JSON 형태의 요청 데이터를 파싱
app.use(express.static('public')); // (선택) 정적 파일 제공용 - 현재는 분리된 파일 구조 사용

// 구글 AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI 생성 엔드포인트
app.post('/api/generate', async (req, res) => {
  try {
    const { category, target, message, tone } = req.body;

    // 1. 프롬프트 조합 (요구사항 반영)
    const prompt = `
    너는 센스 있고 상황 파악이 빠른 커뮤니케이션 전문가야. 사용자가 요청한 [카테고리: ${category}] 상황에 맞춰 최적의 메시지 초안을 작성해 줘.
    
    [상황 및 조건]
    - 수신자: ${target}
    - 핵심 내용: ${message}
    - 원하는 어조/온도: ${tone}
    
    [요구사항]
    - 불필요한 AI식 서론/결론("네, 작성해 드리겠습니다" 등)은 절대 쓰지 말고, 바로 복사해서 사용할 수 있는 본문만 출력할 것.
    - 핵심 내용은 반드시 포함하되, 요구한 '어조/온도'에 완벽하게 맞춰서 문장을 다듬을 것.
    - 가독성을 위해 적절한 줄바꿈과 마크다운 문법을 사용할 것.
    `;

    // 2. 모델 설정 및 결과 요청 (gemini-2.5-flash 모델 권장)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 3. 클라이언트로 결과 전송
    res.json({ success: true, text: responseText });

  } catch (error) {
    console.error('Gemini API Error:', error);
    // 에러 발생 시 프론트엔드로 안전하게 에러 메시지 반환
    res.status(500).json({ 
      success: false, 
      message: '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' 
    });
  }
});

// 서버 실행
app.listen(port, () => {
  console.log(`AI 뚝딱 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
