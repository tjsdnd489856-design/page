// --- 1. AI 명령어 설정 (19가지 모든 기능 완벽 보존) ---
const SYSTEM_PROMPTS = {
  ko: {
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자:${i1}], [내용:${i2}], [온도:${i3}].\n[예시] 입력: 마케팅팀/기획서 늦음/사무적으로 -> 출력: "제목: [요청] 기획서 송부 일정 확인의 건\n본문: 마케팅팀 담당자님, 기획서가 지연되어 일정 확인 차 연락드립니다."\n이제 조건에 맞춰 작성해.`,
    '메모 심폐소생기': (i1, i2, i3) => `너는 전략 컨설턴트야. [문서형태:${i1}], [메모:${i2}], [강조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '프로 사과문': (i1, i2, i3) => `너는 위기관리 전문가야. [사고:${i1}], [대안:${i2}], [대상:${i3}].\n이제 조건에 맞춰 작성해.`,
    '리포트 심폐소생': (i1, i2, i3) => `너는 논문 전문가야. [대상:${i1}], [초안:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '발표 대본 변환': (i1, i2, i3) => `너는 프레젠테이션 코치야. [타겟/시간:${i1}], [자료:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 취업 컨설턴트야. [직무:${i1}], [경험:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상:${i1}], [사유:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 카피라이터야. [상황:${i1}], [내용:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 심리상담사야. [대상:${i1}], [잘못:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황:${i1}], [팩트:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '매력적인 판매글': (i1, i2, i3) => `너는 판매글 장인이야. [물건:${i1}], [특징:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 CS 매니저야. [고객리뷰:${i2}], [어조:${i3}].\n이제 조건에 맞춰 작성해.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 데이터 분석가야. [상황:${i1}], [결과:${i2}], [프로그램:${i3}].\n이제 조건에 맞춰 작성해.`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. [수식:${i1}], [질문:${i2}], [수준:${i3}].\n이제 조건에 맞춰 작성해.`,
    '반복작업 매크로': (i1, i2, i3) => `너는 자동화 전문가야. [환경:${i1}], [작업:${i2}], [스타일:${i3}].\n이제 조건에 맞춰 작성해.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `너는 시니어 DB 관리자야. [테이블:${i1}], [원하는데이터:${i2}], [DBMS종류:${i3}].\n이제 조건에 맞춰 작성해.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `너는 시니어 개발자야. [상황/패턴:${i1}], [요청사항:${i2}], [이해수준:${i3}].\n이제 조건에 맞춰 작성해.`,
    '인스타그램 해시태그': (i1, i2, i3) => `너는 SNS 마케터야. [주제/사진설명:${i1}], [타겟고객:${i2}], [분위기:${i3}].\n이제 조건에 맞춰 작성해.`,
    '광고 카피라이팅': (i1, i2, i3) => `너는 광고 카피라이터야. [제품/서비스:${i1}], [소구포인트:${i2}], [광고매체:${i3}].\n이제 조건에 맞춰 작성해.`,
  },
  en: {
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}]. Now write.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}]. Now write.`,
    '프로 사과문': (i1, i2, i3) => `Act as PR manager. [Issue:${i1}], [Solution:${i2}], [Audience:${i3}]. Now write.`,
    '리포트 심폐소생': (i1, i2, i3) => `Act as an academic tutor. [Audience:${i1}], [Draft:${i2}], [Tone:${i3}]. Now write.`,
    '발표 대본 변환': (i1, i2, i3) => `Act as a speech coach. [Target:${i1}], [Slides:${i2}], [Tone:${i3}]. Now write.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `Act as a tech recruiter. [Role:${i1}], [Exp:${i2}], [Tone:${i3}]. Now write.`,
    '철벽 방어 거절문': (i1, i2, i3) => `Act as an assertiveness coach. [Recipient:${i1}], [Reason:${i2}], [Tone:${i3}]. Now write.`,
    '센스있는 인사/축하': (i1, i2, i3) => `Act as a greeting expert. [Situation:${i1}], [Details:${i2}], [Tone:${i3}]. Now write.`,
    '진심 어린 사과문': (i1, i2, i3) => `Act as a counselor. [Recipient:${i1}], [Mistake:${i2}], [Tone:${i3}]. Now write.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `Act as an expert seller. [Situation:${i1}], [Facts:${i2}], [Tone:${i3}]. Now write.`,
    '매력적인 판매글': (i1, i2, i3) => `Act as a copywriter. [Item:${i1}], [Features:${i2}], [Tone:${i3}]. Now write.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `Act as a CS Manager. [Review:${i2}], [Tone:${i3}]. Now write.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `Act as a Data Analyst. [Context:${i1}], [Goal:${i2}], [Program:${i3}]. Now write.`,
    '외계어 수식 해독기': (i1, i2, i3) => `Act as an Excel Instructor. [Formula:${i1}], [Question:${i2}], [Level:${i3}]. Now write.`,
    '반복작업 매크로': (i1, i2, i3) => `Act as an Automation Engineer. [Env:${i1}], [Task:${i2}], [Style:${i3}]. Now write.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `Act as a Senior DBA. [Table:${i1}], [Data Needed:${i2}], [DBMS:${i3}]. Now write.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `Act as a Developer. [Pattern:${i1}], [Request:${i2}], [Level:${i3}]. Now write.`,
    '인스타그램 해시태그': (i1, i2, i3) => `Act as a Social Media Manager. [Topic:${i1}], [Target:${i2}], [Vibe:${i3}]. Now write.`,
    '광고 카피라이팅': (i1, i2, i3) => `Act as an Ad Copywriter. [Product:${i1}], [Hook:${i2}], [Platform:${i3}]. Now write.`
  },
};

// --- 2. 다국어 및 UI 데이터 ---
const translations = {
  ko: {
    ui: {
      docTitle: '🦊 채티폭스 - AI Workspace',
      logoText: '<span class="text-slate-800 dark:text-white tracking-tight">채티</span><span class="text-orange-500 tracking-tight">폭스</span>',
      subtitle: '이메일 작성부터 엑셀 수식까지, 스마트한 여우 비서가 찾아주는 세련된 정답',
      historyTitle: '<i class="fa-solid fa-history mr-2 text-primary"></i>최근 생성 기록',
      historyEmpty: '최근 생성된 텍스트가 없습니다.',
      submitBtn: '<i class="fa-solid fa-bolt mr-2 text-yellow-300"></i> ✨ 3초 만에 텍스트 뽑기',
      resultTitle: '<i class="fa-solid fa-pen-to-square mr-1"></i>결과물 (클릭하여 직접 수정 가능)',
      copyBtn: '<i class="fa-regular fa-copy mr-2"></i> 바로 복사해서 쓰기',
      toastMsg: '복사 완료! Ctrl+V로 붙여넣으세요.',
      alertEmpty: '모든 빈칸을 채워주세요.',
      generating: '🦊 여우 비서가 생성 중입니다...',
      fetchError: '데이터를 가져오는 중 오류가 발생했습니다.',
    },
    appData: [
      {
        categoryId: 'business',
        categoryName: '🏢 비즈니스/이메일',
        subFeatures: [
          { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: '메모 심폐소생기', desc: '두서없는 메모를 완벽한 문서로', input1: { label: '문서 형태', placeholder: '예: 주간업무보고, 회의록', type: 'text' }, input2: { label: '날것의 메모 텍스트', placeholder: '예: (음성 녹음 변환 텍스트, 회의 결과 등 자유롭게 복붙)', type: 'textarea' }, input3: { label: '강조해야 할 포인트', type: 'text', placeholder: '예: 일정 연기 사유 부드럽게 강조' } },
          { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: '분노조절 이메일', desc: '감정은 빼고 할 말은 다 하는', input1: { label: '수신자', placeholder: '예: 영업팀 김팀장님', type: 'text' }, input2: { label: '진짜 하고 싶은 말', placeholder: '예: 기획서 왜 안주나', type: 'textarea' }, input3: { label: '포장지 온도', type: 'select', options: [{ value: '🙇‍♂️최대한 정중하게', text: '🙇‍♂️최대한 정중하게' }, { value: '👔사무적으로', text: '👔사무적으로' }, { value: '🗡️뼈 때리기', text: '🗡️뼈 때리기' }] } },
          { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: '프로 사과문', desc: '수습의 정석', input1: { label: '사고 내용', placeholder: '예: 파일 누락', type: 'text' }, input2: { label: '수습 대안', placeholder: '예: 즉시 재송부', type: 'textarea' }, input3: { type: 'hidden', value: '외부용' } },
        ],
      },
      {
        categoryId: 'school',
        categoryName: '🏫 과제/요약',
        subFeatures: [
          { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: '리포트 심폐소생', desc: '초안을 완벽한 리포트로', input1: { label: '제출 대상', placeholder: '예: 교수님', type: 'text' }, input2: { label: '초안 복붙', placeholder: '예: 서론은...', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [{ value: '🎓학술적', text: '🎓학술적' }, { value: '📝핵심만 개조식으로', text: '📝핵심만 개조식으로' }] } },
          { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: '발표 대본 변환', desc: '자료를 자연스러운 대본으로', input1: { label: '발표 시간/타겟', placeholder: '예: 5분, 대학생', type: 'text' }, input2: { label: '발표 자료', placeholder: 'PPT 내용 복붙', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [{ value: '🎙️전문적', text: '🎙️전문적' }, { value: '💬청중 소통톤', text: '💬청중 소통톤' }] } },
          { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: '자소서 영혼 주입기', desc: '경험을 성과로', input1: { label: '지원 직무', placeholder: '예: 마케팅', type: 'text' }, input2: { label: '나의 경험', placeholder: '카페 알바 6개월...', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [{ value: '🔥열정 가득', text: '🔥열정 가득' }, { value: '📊데이터 중심', text: '📊데이터 중심' }] } },
        ],
      },
      {
        categoryId: 'marketing',
        categoryName: '📱 마케팅/SNS',
        subFeatures: [
          { id: 'hashGen', apiId: '인스타그램 해시태그', icon: '🏷️', title: '해시태그 생성기', desc: '조회수 터지는 태그', input1: { label: '주제/설명', placeholder: '카페 사진 등', type: 'text' }, input2: { label: '타겟', placeholder: '20대 커플 등', type: 'textarea' }, input3: { label: '분위기', type: 'text', placeholder: '감성적이고 힙하게' } },
          { id: 'adCopy', apiId: '광고 카피라이팅', icon: '🎯', title: '광고 카피라이팅', desc: '클릭을 부르는 문구', input1: { label: '제품/서비스', placeholder: '무선 청소기 등', type: 'text' }, input2: { label: '핵심 포인트', placeholder: '가벼운 흡입력 등', type: 'textarea' }, input3: { label: '매체', type: 'select', options: [{ value: '📘 인스타/페이스북', text: '📘 인스타/페이스북' }, { value: '🟢 네이버 배너', text: '🟢 네이버 배너' }] } },
          { id: 'reviewReply', apiId: '사장님 리뷰 답글', icon: '💬', title: '리뷰 답글 자동생성', desc: '고객 리뷰에 찰떡같은 답글을', input1: { type: 'hidden', value: '별점없음' }, input2: { label: '고객 리뷰 내용', placeholder: '예: 음식이 너무 맛있어요!', type: 'textarea' }, input3: { label: '답글 어조', type: 'select', options: [{ value: '😊친절하고 따뜻하게', text: '😊친절하고 따뜻하게' }, { value: '👔정중하고 전문적으로', text: '👔정중하고 전문적으로' }, { value: '🙏진심 어린 사과', text: '🙏진심 어린 사과' }] } }
        ],
      },
      {
        categoryId: 'excel',
        categoryName: '📊 엑셀/시트',
        subFeatures: [
          { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: '함수 수식 뚝딱이', desc: '말로 하면 수식으로', input1: { label: '데이터 상황', placeholder: '예: A열은 이름, B열은 실적', type: 'text' }, input2: { label: '원하는 결과', placeholder: '예: 실적 80 이상 인원수', type: 'textarea' }, input3: { label: '프로그램', type: 'select', options: [{ value: 'MS 엑셀', text: 'MS 엑셀' }, { value: '구글 시트', text: '구글 시트' }] } },
          { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: '외계어 수식 해독기', desc: '수식 분석', input1: { label: '수식/에러', placeholder: '=VLOOKUP...', type: 'text' }, input2: { label: '질문', placeholder: '무슨 뜻이야?', type: 'textarea' }, input3: { label: '수준', type: 'select', options: [{ value: '👶초보자용', text: '👶초보자용' }, { value: '🧑‍💻실무자용', text: '🧑‍💻실무자용' }] } },
          { id: 'excelMacro', apiId: '반복작업 매크로', icon: '🤖', title: '반복작업 매크로', desc: 'VBA 생성', input1: { label: '환경', placeholder: '예: 엑셀 VBA', type: 'text' }, input2: { label: '작업 설명', placeholder: '시트 쪼개기 등', type: 'textarea' }, input3: { label: '스타일', type: 'select', options: [{ value: '📝주석 포함', text: '📝주석 포함' }, { value: '⚡코드만 깔끔하게', text: '⚡코드만 깔끔하게' }] } },
        ],
      },
      {
        categoryId: 'dev',
        categoryName: '💻 개발/코딩',
        subFeatures: [
          { id: 'sqlGen', apiId: 'SQL 쿼리 짜기', icon: '🗄️', title: 'SQL 쿼리 짜기', desc: '원하는 데이터를 쿼리로', input1: { label: '테이블 구조', placeholder: '예: users(id, age)', type: 'text' }, input2: { label: '원하는 데이터', placeholder: '나이가 30 이상', type: 'textarea' }, input3: { label: 'DBMS', type: 'select', options: [{ value: 'MySQL', text: 'MySQL' }, { value: 'PostgreSQL', text: 'PostgreSQL' }] } },
          { id: 'regexGen', apiId: '정규식(Regex) 설명', icon: '🧩', title: '정규식 해독/생성', desc: '어려운 정규식을 쉽게', input1: { label: '패턴', placeholder: '이메일 추출 등', type: 'text' }, input2: { label: '요청사항', placeholder: '설명해줘 등', type: 'textarea' }, input3: { label: '수준', type: 'select', options: [{ value: '👶초보', text: '👶초보' }, { value: '🧑‍💻시니어', text: '🧑‍💻시니어' }] } },
        ],
      },
    ],
  },
  en: {
    ui: {
      docTitle: '🦊 ChattyFox - AI Workspace',
      logoText: 'ChattyFox',
      subtitle: 'Professional AI assistant.',
      historyTitle: 'History',
      historyEmpty: 'Empty.',
      submitBtn: 'Generate',
      resultTitle: 'Result',
      copyBtn: 'Copy',
      toastMsg: 'Copied!',
      alertEmpty: 'Fill all.',
      generating: 'Thinking...',
      fetchError: 'Error fetching data.',
    },
    appData: [
      {
        categoryId: 'business',
        categoryName: 'Business',
        subFeatures: [
          { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: 'Memo Polisher', desc: 'Pro docs', input1: { label: 'Doc Type', placeholder: 'Report', type: 'text' }, input2: { label: 'Notes', placeholder: 'e.g. (Paste voice transcriptions, meeting notes here)', type: 'textarea' }, input3: { label: 'Focus', type: 'text', placeholder: 'Highlight' } },
          { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: 'Angry Email Filter', desc: 'Professional filtering', input1: { label: 'Recipient', placeholder: 'e.g. Sales Team', type: 'text' }, input2: { label: 'Core Message', placeholder: 'Where is the report?', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [{ value: 'Polite', text: 'Polite' }, { value: 'Firm', text: 'Firm' }, { value: 'Direct', text: 'Direct' }] } },
          { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: 'Pro Apology', desc: 'Crisis management', input1: { label: 'Issue', placeholder: 'e.g. Missing file', type: 'text' }, input2: { label: 'Solution', placeholder: 'e.g. Resending now', type: 'textarea' }, input3: { type: 'hidden', value: 'Client' } },
        ],
      },
      {
        categoryId: 'marketing',
        categoryName: 'Marketing',
        subFeatures: [
          { id: 'reviewReply', apiId: '사장님 리뷰 답글', icon: '💬', title: 'Review Reply', desc: 'Smart replies to reviews', input1: { type: 'hidden', value: 'NoRating' }, input2: { label: 'Customer Review', placeholder: 'e.g. The food was great!', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [{ value: 'Friendly', text: 'Friendly' }, { value: 'Professional', text: 'Professional' }, { value: 'Apologetic', text: 'Apologetic' }] } }
        ]
      }
    ],
  },
};

// --- 3. 전역 상태 변수 (State) ---
let currentLang = 'ko';
let currentCategoryIndex = 0;
let currentFeatureIndex = 0;
let currentFeedbackId = null; // 현재 생성된 결과의 로그 ID (피드백 용도)

// 탭 드래그 관련 상태
let isDragging = false;
let hasDragged = false;
let startX;
let scrollLeft;

// --- 4. DOM 요소 캐싱 ---
const DOM = {
  mainTabsContainer: document.getElementById('mainTabs'),
  subFeaturesContainer: document.getElementById('subFeatures'),
  aiForm: document.getElementById('aiForm'),
  resultArea: document.getElementById('resultArea'),
  resultContent: document.getElementById('resultContent'),
  copyBtn: document.getElementById('copyBtn'),
  btnLike: document.getElementById('btnLike'),
  btnDislike: document.getElementById('btnDislike'),
  toast: document.getElementById('toast'),
  historyList: document.getElementById('historyList'),
  historySidebar: document.getElementById('historySidebar'),
  darkModeToggle: document.getElementById('darkModeToggle'),
  appLogoText: document.getElementById('appLogoText'),
  appSubtitle: document.getElementById('appSubtitle'),
  submitBtn: document.getElementById('submitBtn'),
  resultTitle: document.getElementById('resultTitle'),
  toastMsg: document.getElementById('toastMsg'),
  openHistoryBtn: document.getElementById('openHistoryBtn'),
  closeHistoryBtn: document.getElementById('closeHistoryBtn'),
  htmlElement: document.documentElement // HTML 요소 추가 캐싱
};

// --- 5. UI 및 로직 함수 ---

// 5.1. 다크모드 초기화
const initDarkMode = () => {
  // 사용자가 수동으로 다크모드를 켰던 기록이 있을 때만 다크모드를 활성화 (기본값은 라이트 모드)
  if (localStorage.getItem('darkMode') === 'true') {
    DOM.htmlElement.classList.add('dark');
  } else {
    // 그 외의 모든 경우(처음 방문, 라이트모드 설정 등)에는 강제로 라이트 모드 유지
    DOM.htmlElement.classList.remove('dark');
  }

  // 다크모드 토글 버튼 이벤트
  if (DOM.darkModeToggle) {
    DOM.darkModeToggle.addEventListener('click', () => {
      DOM.htmlElement.classList.toggle('dark');
      localStorage.setItem('darkMode', DOM.htmlElement.classList.contains('dark'));
    });
  }
};

// 5.2. 메인 탭 렌더링
const renderMainTabs = () => {
  if (!DOM.mainTabsContainer) return;
  DOM.mainTabsContainer.innerHTML = '';
  
  translations[currentLang].appData.forEach((category, index) => {
    const btn = document.createElement('button');
    const isActive = currentCategoryIndex === index;
    
    btn.className = `whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-semibold transition-colors ${
      isActive 
        ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500' 
        : 'text-gray-500 dark:text-slate-400 border-b-2 border-transparent'
    }`;
    btn.textContent = category.categoryName;
    
    btn.addEventListener('click', () => {
      if (!hasDragged) {
        currentCategoryIndex = index;
        currentFeatureIndex = 0;
        updateTabContent();
      }
    });
    
    DOM.mainTabsContainer.appendChild(btn);
  });
};

// 5.3. 서브 기능 렌더링
const renderSubFeatures = () => {
  if (!DOM.subFeaturesContainer) return;
  DOM.subFeaturesContainer.innerHTML = '';
  
  const features = translations[currentLang].appData[currentCategoryIndex].subFeatures;
  
  features.forEach((feature, index) => {
    const btn = document.createElement('button');
    const isActive = currentFeatureIndex === index;
    
    btn.className = `p-4 text-center rounded-xl border-2 transition-all ${
      isActive 
        ? 'border-orange-500 bg-orange-50 dark:bg-slate-800 shadow-md' 
        : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'
    }`;
    btn.innerHTML = `<span class="text-3xl mb-2">${feature.icon}</span><strong class="block text-gray-800 dark:text-slate-200 font-bold mb-1">${feature.title}</strong>`;
    
    btn.addEventListener('click', () => {
      currentFeatureIndex = index;
      updateTabContent();
    });
    
    DOM.subFeaturesContainer.appendChild(btn);
  });
};

// 5.4. 폼 필드 업데이트 (hidden 지원 강화)
const updateFormFields = () => {
  const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
  
  const l1 = document.getElementById('input1Label');
  const i1 = document.getElementById('input1');
  const i1Container = i1?.parentElement;
  
  const l2 = document.getElementById('input2Label');
  const i2 = document.getElementById('input2');
  const i2Container = i2?.parentElement;
  
  const i3c = document.getElementById('input3Container');
  
  // 첫 번째 입력란 (hidden 지원)
  if (feature.input1?.type === 'hidden') {
    if (i1Container) i1Container.style.display = 'none';
    if (i1) i1.required = false;
  } else {
    if (i1Container) i1Container.style.display = 'block';
    if (l1) l1.textContent = feature.input1?.label || '';
    if (i1) { 
      i1.placeholder = feature.input1?.placeholder || ''; 
      i1.required = true; 
    }
  }
  
  // 두 번째 입력란 (hidden 지원)
  if (feature.input2?.type === 'hidden') {
    if (i2Container) i2Container.style.display = 'none';
    if (i2) i2.required = false;
  } else {
    if (i2Container) i2Container.style.display = 'block';
    if (l2) l2.textContent = feature.input2?.label || '';
    if (i2) { 
      i2.placeholder = feature.input2?.placeholder || ''; 
      i2.required = true; 
    }
  }
  
  // 세 번째 입력란 렌더링 로직
  if (i3c) {
    i3c.innerHTML = ''; // 기존 내용 초기화
    
    if (feature.input3?.type === 'hidden') {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.id = 'input3';
      hiddenInput.value = feature.input3.value;
      i3c.appendChild(hiddenInput);
    } else if (feature.input3) {
      i3c.innerHTML = `<label id="input3Label" for="input3" class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">${feature.input3.label}</label>`;
      const commonClasses = 'w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#FF7A00] outline-none transition bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';
      
      if (feature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3';
        select.className = commonClasses;
        
        feature.input3.options.forEach((opt) => {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.text;
          select.appendChild(option);
        });
        i3c.appendChild(select);
      } else {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'input3';
        input.className = commonClasses;
        input.placeholder = feature.input3.placeholder;
        i3c.appendChild(input);
      }
    }
  }
};

// 5.5. 전체 탭 콘텐츠 업데이트
const updateTabContent = () => {
  renderMainTabs();
  renderSubFeatures();
  updateFormFields();
};

// 5.6. 히스토리 렌더링
const renderHistory = () => {
  const history = JSON.parse(localStorage.getItem('quickfix_history') || '[]');
  if (!DOM.historyList) return;
  
  DOM.historyList.innerHTML = '';
  const msg = document.getElementById('historyEmptyMsg');
  
  if (msg) {
    msg.style.display = history.length ? 'none' : 'block';
  }
  
  history.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-orange-50 mb-2';
    
    // 특수문자 제거 후 말줄임표 처리
    const cleanText = item.text.replace(/[#*`]/g, '');
    div.innerHTML = `
      <span class="text-xs font-bold text-primary">${item.title}</span>
      <p class="text-xs text-gray-600 dark:text-slate-300 truncate">${cleanText}</p>
    `;
    
    div.addEventListener('click', () => {
      if (DOM.resultContent && DOM.resultArea && DOM.historySidebar) {
        DOM.resultContent.innerHTML = marked.parse(item.text);
        DOM.resultArea.classList.remove('hidden');
        DOM.historySidebar.classList.add('translate-x-full');
      }
    });
    
    DOM.historyList.appendChild(div);
  });
};

// 5.7. 다국어 설정
const setLanguage = (lang) => {
  currentLang = lang;
  const t = translations[lang] || translations.ko;
  
  document.title = t.ui.docTitle;
  if (DOM.appLogoText) DOM.appLogoText.innerHTML = t.ui.logoText;
  if (DOM.appSubtitle) DOM.appSubtitle.textContent = t.ui.subtitle;
  if (DOM.submitBtn) DOM.submitBtn.innerHTML = t.ui.submitBtn;
  if (DOM.resultTitle) DOM.resultTitle.innerHTML = t.ui.resultTitle;
  if (DOM.copyBtn) DOM.copyBtn.innerHTML = t.ui.copyBtn;
  if (DOM.toastMsg) DOM.toastMsg.textContent = t.ui.toastMsg;
  
  // 변경된 카테고리에 맞게 탭을 리셋합니다.
  currentCategoryIndex = 0;
  currentFeatureIndex = 0;
  
  updateTabContent();
  renderHistory();
};

// 피드백 전송 함수
const sendFeedback = async (rating) => {
  if (!currentFeedbackId) return;
  
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedbackId: currentFeedbackId, rating })
    });
    
    if (response.ok) {
      alert(currentLang === 'ko' ? '소중한 피드백 감사합니다!' : 'Thank you for your feedback!');
      // 피드백 버튼 비활성화 (중복 제출 방지)
      if(DOM.btnLike) DOM.btnLike.disabled = true;
      if(DOM.btnDislike) DOM.btnDislike.disabled = true;
    }
  } catch (error) {
    console.error('Feedback Error:', error);
  }
};

// --- 6. 이벤트 리스너 설정 ---

// 6.1. 탭 드래그 스크롤
if (DOM.mainTabsContainer) {
  DOM.mainTabsContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasDragged = false;
    DOM.mainTabsContainer.classList.add('cursor-grabbing');
    startX = e.pageX - DOM.mainTabsContainer.offsetLeft;
    scrollLeft = DOM.mainTabsContainer.scrollLeft;
  });
  
  DOM.mainTabsContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    DOM.mainTabsContainer.classList.remove('cursor-grabbing');
  });
  
  DOM.mainTabsContainer.addEventListener('mouseup', () => {
    isDragging = false;
    DOM.mainTabsContainer.classList.remove('cursor-grabbing');
  });
  
  DOM.mainTabsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (e.pageX - DOM.mainTabsContainer.offsetLeft) - startX;
    if (Math.abs(walk) > 5) hasDragged = true;
    DOM.mainTabsContainer.scrollLeft = scrollLeft - walk;
  });
}

// 6.2. 폼 제출 (AI 생성 요청)
if (DOM.aiForm) {
  DOM.aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const uiText = translations[currentLang].ui;
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    
    // GA4 이벤트 전송 (추적)
    if (typeof gtag === 'function') {
      gtag('event', 'generate_text', {
        'feature_name': feature.apiId,
        'language': currentLang
      });
    }
    
    // hidden 요소일 경우 value 값을 강제로 채워넣어 유효성 검사를 통과하게 합니다.
    let val1 = document.getElementById('input1')?.value.trim();
    if (feature.input1?.type === 'hidden') val1 = feature.input1.value || ' ';
    
    let val2 = document.getElementById('input2')?.value.trim();
    if (feature.input2?.type === 'hidden') val2 = feature.input2.value || ' ';
    
    let val3 = document.getElementById('input3')?.value.trim();
    if (feature.input3?.type === 'hidden') val3 = feature.input3.value || ' ';

    if (!val1 || !val2 || !val3) {
      alert(uiText.alertEmpty);
      return;
    }

    if (DOM.resultArea && DOM.resultContent) {
      DOM.resultArea.classList.remove('hidden');
      DOM.resultContent.innerHTML = `<div class="flex flex-col items-center py-4 text-orange-500 font-bold animate-pulse"><span>${uiText.generating}</span></div>`;
    }
    
    // 새 요청 시 피드백 버튼 초기화
    if(DOM.btnLike) DOM.btnLike.disabled = false;
    if(DOM.btnDislike) DOM.btnDislike.disabled = false;
    currentFeedbackId = null;

    DOM.aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subCategory: feature.apiId, 
          input1: val1, 
          input2: val2, 
          input3: val3, 
          lang: currentLang 
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'AI 통신 실패');

      if (data.success && data.result && DOM.resultContent) {
        DOM.resultContent.innerHTML = marked.parse(data.result);
        
        // 피드백 ID 저장
        if (data.feedbackId) {
          currentFeedbackId = data.feedbackId;
        }
        
        // 로컬 스토리지에 히스토리 저장
        const history = JSON.parse(localStorage.getItem('quickfix_history') || '[]');
        history.unshift({ title: feature.title, text: data.result });
        localStorage.setItem('quickfix_history', JSON.stringify(history.slice(0, 10)));
        renderHistory();
      }
    } catch (error) {
      if (DOM.resultContent) {
        DOM.resultContent.innerHTML = `<div class="text-red-500 font-bold p-4 border rounded-lg">Error: ${error.message}</div>`;
      }
    } finally {
      DOM.aiForm.classList.remove('opacity-50', 'pointer-events-none');
    }
  });
}

// 6.3. 복사 버튼 및 피드백 버튼
if (DOM.copyBtn) {
  DOM.copyBtn.addEventListener('click', () => {
    if (!DOM.resultContent) return;
    
    navigator.clipboard.writeText(DOM.resultContent.innerText).then(() => {
      if (DOM.toast) {
        DOM.toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => {
          DOM.toast.classList.add('opacity-0', 'translate-y-4');
        }, 2500);
      }
    });
  });
}

if (DOM.btnLike) {
  DOM.btnLike.addEventListener('click', () => sendFeedback(1));
}

if (DOM.btnDislike) {
  DOM.btnDislike.addEventListener('click', () => sendFeedback(-1));
}

// 6.4. 사이드바 히스토리 열기/닫기
if (DOM.openHistoryBtn && DOM.historySidebar) {
  DOM.openHistoryBtn.addEventListener('click', () => {
    DOM.historySidebar.classList.remove('translate-x-full');
  });
}

if (DOM.closeHistoryBtn && DOM.historySidebar) {
  DOM.closeHistoryBtn.addEventListener('click', () => {
    DOM.historySidebar.classList.add('translate-x-full');
  });
}

// --- 7. 초기화 실행 ---
const initApp = () => {
  initDarkMode();
  
  // URL에서 언어 파라미터 확인 후 설정 (기본값: ko)
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') === 'en' ? 'en' : 'ko';
  setLanguage(lang);
};

// 앱 시작
initApp();