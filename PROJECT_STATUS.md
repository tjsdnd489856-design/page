# ✨ AI 뚝딱 (AI Wrapper MVP) 프로젝트 상태 및 인수인계 문서

## 1. 프로젝트 개요
* **프로젝트명:** AI 뚝딱
* **목적:** 직장인 및 일반 사용자를 위한 상황별 맞춤형 AI 텍스트/코드 생성 유틸리티 웹 서비스
* **주요 타겟:** 비즈니스 이메일 작성, 엑셀 수식 작성, 관계 거절/사과문 작성에 어려움을 겪는 직장인/대학생

## 2. 기술 스택
* **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (CDN), FontAwesome, marked.js
* **Backend:** Node.js, Express, CORS, dotenv
* **AI API:** Google Gemini API (`@google/generative-ai`, `gemini-2.5-flash` 모델)
* **Version Control:** Git & GitHub (`tjsdnd489856-design/page`)

## 3. 현재까지의 개발 완료 사항 (100% 완료)
* **[프론트엔드 - 랜딩페이지 (`landing.html`)]**
  * 매력적인 UI/UX 및 애니메이션 구현
  * 핵심 기능 소개 및 사용자 문제 제기(Pain Points) 섹션
  * 각 기능 카드 클릭 시 메인 앱(`index.html`)으로 URL 파라미터(`?tab=...&sub=...`)를 넘기며 이동하는 로직 완료
* **[프론트엔드 - 메인 앱 (`index.html`, `app.js`)]**
  * 5개의 메인 탭(비즈니스, 과제, 인간관계, 중고거래, 엑셀) 및 총 15개의 서브 기능 완벽 구현
  * URL 파라미터를 읽어들여 탭과 서브 기능을 자동으로 초기 세팅하는 동적 렌더링 로직(`handleUrlParams`) 구현
  * 입력 폼(Input, Textarea, Select) 동적 교체 로직 및 클립보드 복사(토스트 알림) 기능 구현
  * 서버 로딩 상태 및 마크다운 렌더링 결과창 처리 완료
* **[백엔드 (`server.js`)]**
  * Express 기반 API 서버 구축 (`POST /api/generate`)
  * 15개의 서브 카테고리별 맞춤형 페르소나 및 시스템 프롬프트(switch-case) 완벽 분기 처리 완료
  * 불필요한 AI식 서론/결론을 차단하는 공통 프롬프트 적용
  * 에러 핸들링(try-catch) 및 CORS 설정 완료

## 4. 파일 구조 및 역할
* `landing.html`: 서비스 소개 및 앱 진입점 (마케팅 페이지)
* `index.html`: 실제 AI 텍스트 생성이 이루어지는 메인 앱 화면 (UI 껍데기)
* `app.js`: 메인 앱의 탭 전환, 폼 동적 생성, 백엔드 API 통신을 담당하는 프론트엔드 두뇌
* `server.js`: 프론트엔드 요청을 받아 Gemini AI에 최적화된 프롬프트를 전송하고 결과를 반환하는 백엔드 서버
* `.env`: (보안) 구글 Gemini API 키 및 포트 번호 저장 파일 (깃허브 업로드 제외됨)
* `.gitignore`: `node_modules/`, `.env` 등 불필요/보안 파일 업로드 방지

## 5. 로컬 실행 방법 (VS Code 기준)
1. **백엔드 실행:** 새 터미널을 열고 `node server.js` 입력 (http://localhost:3000 온에어 확인)
2. **프론트엔드 실행:** `landing.html` 또는 `index.html` 파일을 Live Server 확장을 통해 브라우저에서 열기

## 6. 향후 작업 방향 (Next Steps)
다음 작업 시 아래 항목들 중 원하는 것을 선택하여 진행할 수 있습니다.

* **[최우선] 무료 배포 진행 (Hosting)**
  * 백엔드(`server.js`) -> Render.com 배포
  * 프론트엔드(`app.js` 내 API 주소 수정) -> Vercel.com 배포
* **[기능 고도화]**
  * 사용자 피드백을 반영한 프롬프트(어투, 뉘앙스) 미세 조정
  * 새로운 카테고리(예: 연애 상담, 코딩/개발 등) 탭 추가
  * 다크 모드(Dark Mode) 토글 기능 추가
