require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // 프론트엔드-백엔드 간 통신 허용
app.use(express.json()); // JSON 데이터 해석 허용

// 구글 AI 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 메인 AI 텍스트 생성 엔드포인트
app.post('/api/generate', async (req, res) => {
  try {
    // 프론트엔드에서 보낸 4가지 핵심 데이터 받기
    const { subCategory, input1, input2, input3 } = req.body;
    let prompt = '';

    // 서브 카테고리별 맞춤형 '프롬프트 엔지니어링' 분기 처리
    if (subCategory === '분노조절 이메일') {
      prompt = `너는 10년 차 기획팀 에이스 과장이야. [수신자: ${input1}], [핵심 내용: ${input2}], [원하는 온도: ${input3}]에 맞춰 비즈니스 이메일을 작성해 줘. 불필요한 서론 없이 바로 복사할 수 있게 제목과 본문만 마크다운으로 출력해.`;
    } 
    else if (subCategory === '개떡 메모 심폐소생기') {
      prompt = `너는 최고 수준의 전략 컨설턴트야. 사용자가 준 [날것의 텍스트: ${input2}]를 분석해서 [문서 형태: ${input1}]에 맞는 완벽한 구조의 보고서로 변환해 줘. 특히 [강조 포인트: ${input3}]를 가장 돋보이게 작성하고, 불릿 포인트와 표를 적극 활용해 마크다운으로 출력해.`;
    } 
    else if (subCategory === '프로페셔널 사과문') {
      prompt = `너는 기업 위기관리 전문가야. [발생한 사고: ${input1}]에 대해 사과하되, [수습 대안: ${input2}]을 강조하여 유능해 보이도록 방어해 줘. [대상: ${input3}]에 맞는 톤앤매너를 완벽히 지켜서, 변명처럼 보이지 않는 깔끔한 사과문을 작성해 줘.`;
    } 
    else {
      // 예상치 못한 카테고리가 들어왔을 때의 방어 로직
      return res.status(400).json({ success: false, message: '알 수 없는 카테고리입니다.' });
    }

    // Gemini 모델 호출 및 프롬프트 전송
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 생성 성공 시 프론트엔드로 전달 (200 상태 코드)
    res.status(200).json({ success: true, text: responseText });

  } catch (error) {
    // 서버 오류 또는 API 통신 오류 발생 시 안전하게 에러 반환
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      success: false, 
      message: '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' 
    });
  }
});

// 서버 구동
app.listen(port, () => {
  console.log(`[🚀 백엔드 서버 온에어] AI 뚝딱 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
