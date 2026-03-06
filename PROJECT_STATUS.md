# ✨ QuickFix AI (구 AI 뚝딱) 프로젝트 상태

## 🚀 배포 및 보안 고도화 완료 (2026-03-06)
* **보안 강화:** 프론트엔드(`app.js`)에서 API 키를 완전히 제거하고 Vercel Serverless Functions(`api/generate.js`)를 통해 안전하게 통신하도록 구조를 변경했습니다.
* **배포 방식:** Vercel 호스팅에 최적화된 구조로 변경되었습니다. 이제 서버를 따로 켜지 않아도 Vercel 대시보드에서 `GEMINI_API_KEY` 환경 변수만 설정하면 즉시 작동합니다.
* **구조:** `index.html`(랜딩) -> `app.html`(앱) -> `app.js`(화면 로직) -> `api/generate.js`(안전한 AI 통신)

## 🛠️ 향후 작업
* 도메인 연결 및 SEO 최적화
* 사용자 피드백을 위한 데이터베이스(MongoDB 등) 연동 예정
