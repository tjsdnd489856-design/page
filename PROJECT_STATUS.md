# ✨ QuickFix AI (구 AI 뚝딱) 프로젝트 상태 및 인수인계 문서

## 1. 프로젝트 개요
* **프로젝트명:** QuickFix AI (글로벌 타겟) / AI 뚝딱 (국내 타겟)
* **목적:** 직장인 및 일반 사용자를 위한 상황별 맞춤형 AI 텍스트/코드 생성 SaaS 웹 서비스
* **주요 타겟:** 비즈니스 이메일 작성, 엑셀 수식 작성, 코딩/마케팅 보조가 필요한 글로벌 및 국내 사용자

## 2. 기술 스택
* **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (CDN), FontAwesome, marked.js
* **Backend:** Node.js, Express, CORS, dotenv, express-rate-limit (과부하 방지)
* **AI API:** Google Gemini API (`@google/generative-ai`, `gemini-2.5-flash` 모델) - **Streaming(SSE) 방식 적용**
* **Version Control:** Git & GitHub (`tjsdnd489856-design/page`)

## 3. 현재까지의 개발 완료 사항 (SaaS급 고도화 100% 완료)

### [기본 기능 및 프론트엔드]
* **다국어 (KO/EN) 완벽 지원:** `landing.html` 및 `landing_en.html` 분리. 앱 내 우측 상단 토글 버튼을 통한 실시간 언어팩(`LANG_PACKAGE`) 교체 및 서버 연동.
* **다크 모드 (Dark Mode):** Tailwind의 `dark:` 클래스와 로컬 스토리지(`localStorage`)를 활용한 테마 유지 기능.
* **사이드바 히스토리 UI:** 사용자가 생성한 결과물(최대 10개)을 로컬 스토리지에 자동 저장하고, 우측 오프캔버스 메뉴에서 언제든 다시 열어볼 수 있는 기능.
* **인터랙티브 결과창 (Editor):** `contenteditable` 속성을 활용해 AI가 생성한 마크다운 결과를 사용자가 브라우저에서 즉시 수정 가능하도록 고도화.
* **실시간 스트리밍 렌더링 (Chunk Reader):** 한 번에 응답을 기다리지 않고, `response.body.getReader()`를 활용해 타자 치듯 실시간으로 결과를 화면에 뿌려주는 UX 구현.
* **피드백 (Like/Dislike) 시스템:** 결과창 하단에 👍/👎 버튼 추가 및 서버 전송 기능 연동.
* **신규 탭 2종 추가:** '개발/코딩 (SQL, 정규식)' 및 '마케팅/SNS (해시태그, 광고 카피)' 탭 신설.

### [백엔드 최적화 (`server.js`)]
* **스트리밍 (SSE) API 구축:** `generateContentStream`을 사용하여 프론트엔드에 데이터를 Chunk 단위로 쪼개어 실시간 전송.
* **Rate Limiting:** `express-rate-limit` 적용 (동일 IP 기준 15분에 100회 제한)으로 무분별한 토큰 소모 및 서버 공격 방지.
* **파일 로깅 시스템:** 사용자의 요청(Request), 결과(Response), 피드백(Feedback) 데이터를 `logs/usage.json` 파일에 시간과 함께 체계적으로 기록 (추후 DB 마이그레이션 대비).
* **Few-Shot 프롬프팅 고도화:** 모든 프롬프트에 [입력 예시]와 [출력 예시(Best Practice)]를 제공하여 할루시네이션(거짓 정보)을 방지하고 일관된 고품질 결과 도출.

## 4. 로컬 실행 및 테스트 방법
1. 터미널을 열고 패키지 설치: `npm install` (신규 추가된 `express-rate-limit` 설치 필요)
2. 백엔드 실행: `node server.js` (http://localhost:3000 온에어 확인)
3. 프론트엔드 실행: `landing.html` 또는 `index.html` 파일을 브라우저에서 열람

## 5. 향후 작업 방향 (Next Steps)
모든 MVP 및 SaaS급 고도화 기능이 완료되었습니다. 다음은 정식 런칭을 위한 인프라 작업입니다.
* **[최우선] 무료 클라우드 배포 (Hosting)**
  * 백엔드(`server.js`) -> Render.com 또는 Heroku 배포 (log 파일 유실 방지를 위한 DB 연동 고민 필요)
  * 프론트엔드 HTML/JS -> Vercel.com 또는 Netlify 배포
* **[DB 연동]**
  * 현재 `logs/usage.json`에 저장되는 데이터를 MongoDB 또는 Supabase 등으로 안전하게 이전하기.
* **[수익화]**
  * 광고(Google AdSense) 배너 부착 또는 프리미엄 기능(유료 결제) 도입 고민.