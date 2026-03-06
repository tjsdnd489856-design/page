// --- 1. AI 명령어 설정 (모든 19가지 기능 복구) ---
const SYSTEM_PROMPTS = {
  ko: {
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자:${i1}], [내용:${i2}], [온도:${i3}].\n[예시] 입력: 마케팅팀/기획서 늦음/사무적으로 -> 출력: "제목: [요청] 기획서 송부 일정 확인의 건\n본문: 마케팅팀 담당자님, 기획서가 지연되어 일정 확인 차 연락드립니다."\n이제 조건에 맞춰 작성해.`,
    '메모 심폐소생기': (i1, i2, i3) => `너는 전략 컨설턴트야. [문서형태:${i1}], [메모:${i2}], [강조:${i3}].\n[예시] 입력: 주간보고/버그수정함/빠른해결 -> 출력: "## 주간 업무 보고\n- **버그 수정 완료 (빠른 이슈 해결)**"\n이제 조건에 맞춰 작성해.`,
    '프로 사과문': (i1, i2, i3) => `너는 위기관리 전문가야. [사고:${i1}], [대안:${i2}], [대상:${i3}].\n[예시] 입력: 파일누락/재발송/외부고객 -> 출력: "메일 확인 중 첨부파일 누락을 발견하여 즉시 재발송해 드립니다. 번거롭게 해드려 대단히 죄송합니다."\n이제 조건에 맞춰 작성해.`,
    '리포트 심폐소생': (i1, i2, i3) => `너는 논문 전문가야. [대상:${i1}], [초안:${i2}], [어조:${i3}].\n[예시] 입력: 교수님/서론 대충/학술적 -> 출력: "본 연구의 서론에서는 해당 주제가 지니는 학술적 의의를 탐구하고자 합니다."\n이제 조건에 맞춰 작성해.`,
    '발표 대본 변환': (i1, i2, i3) => `너는 프레젠테이션 코치야. [타겟/시간:${i1}], [자료:${i2}], [어조:${i3}].\n[예시] 입력: 5분 대학생/AI소개/친근하게 -> 출력: "여러분, 요즘 AI가 대세죠? 오늘은 AI에 대해 쉽고 재밌게 알아볼게요."\n이제 조건에 맞춰 작성해.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 취업 컨설턴트야. [직무:${i1}], [경험:${i2}], [어조:${i3}].\n[예시] 입력: 마케팅/카페알바/성과중심 -> 출력: "카페 아르바이트 당시, 고객 응대 프로세스를 개선하여 피크타임 회전율을 15% 높인 경험이 있습니다."\n이제 조건에 맞춰 작성해.`,
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상:${i1}], [사유:${i2}], [어조:${i3}].\n[예시] 입력: 친구/돈없음/단호하게 -> 출력: "정말 미안하지만 나도 여유가 없어서 빌려주기 어려워. 이해해 주길 바라."\n이제 조건에 맞춰 작성해.`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 카피라이터야. [상황:${i1}], [내용:${i2}], [어조:${i3}].\n[예시] 입력: 동료결혼/참석못함/따뜻하게 -> 출력: "결혼 진심으로 축하해! 직접 참석하지 못해 아쉽지만, 누구보다 행복하길 응원할게."\n이제 조건에 맞춰 작성해.`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 심리상담사야. [대상:${i1}], [잘못:${i2}], [어조:${i3}].\n[예시] 입력: 애인/연락두절/진중하게 -> 출력: "미리 연락하지 못해 정말 미안해. 내 잘못을 깊이 반성하고 있어."\n이제 조건에 맞춰 작성해.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황:${i1}], [팩트:${i2}], [어조:${i3}].\n[예시] 입력: 무리한네고/에눌불가/단호하게 -> 출력: "본문에 기재된 대로 네고는 불가합니다. 구매 의사가 없으시다면 거래를 취소하겠습니다."\n이제 조건에 맞춰 작성해.`,
    '매력적인 판매글': (i1, i2, i3) => `너는 판매글 장인이야. [물건:${i1}], [특징:${i2}], [어조:${i3}].\n[예시] 입력: 아이패드/기스있음/신뢰감 -> 출력: "아이패드 판매합니다. 미세한 생활 기스가 있으나 기능과 배터리 성능에는 전혀 문제없는 A급 기기입니다."\n이제 조건에 맞춰 작성해.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 CS 매니저야. [별점:${i1}], [리뷰:${i2}], [어조:${i3}].\n[예시] 입력: 1점/배달늦음/정중하게 -> 출력: "고객님, 배달 지연으로 큰 불편을 드려 대단히 죄송합니다. 매장으로 연락주시면 신속히 조치해 드리겠습니다."\n이제 조건에 맞춰 작성해.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 데이터 분석가야. [상황:${i1}], [결과:${i2}], [프로그램:${i3}].\n[예시] 입력: A열이름/합계구하기/엑셀 -> 출력: "\`\`\`excel\n=SUM(A:A)\n\`\`\`\nA열의 모든 숫자를 합산하는 수식입니다."\n이제 조건에 맞춰 작성해.`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. [수식:${i1}], [질문:${i2}], [수준:${i3}].\n[예시] 입력: =VLOOKUP/무슨뜻?/초보자 -> 출력: "VLOOKUP은 책에서 원하는 단어를 찾는 것과 같아요! 원하는 값을 왼쪽에서 오른쪽으로 찾아줍니다."\n이제 조건에 맞춰 작성해.`,
    '반복작업 매크로': (i1, i2, i3) => `너는 자동화 전문가야. [환경:${i1}], [작업:${i2}], [스타일:${i3}].\n[예시] 입력: VBA/시트복사/주석포함 -> 출력: "\`\`\`vba\n' 현재 활성화된 시트를 복사합니다\nActiveSheet.Copy\n\`\`\`"\n이제 조건에 맞춰 작성해.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `너는 시니어 DB 관리자야. [테이블:${i1}], [원하는데이터:${i2}], [DBMS종류:${i3}].\n[예시] 입력: users/나이30이상/MySQL -> 출력: "\`\`\`sql\nSELECT * FROM users WHERE age >= 30;\n\`\`\`\n나이가 30 이상인 유저를 조회하는 쿼리입니다."\n이제 조건에 맞춰 작성해.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `너는 시니어 개발자야. [상황/패턴:${i1}], [요청사항:${i2}], [이해수준:${i3}].\n[예시] 입력: 이메일추출/정규식짜줘/초보자 -> 출력: "\`\`\`regex\n^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n\`\`\`\n@ 기호를 기준으로 이메일 형식이 맞는지 검사하는 패턴입니다."\n이제 조건에 맞춰 작성해.`,
    '인스타그램 해시태그': (i1, i2, i3) => `너는 SNS 마케터야. [주제/사진설명:${i1}], [타겟고객:${i2}], [분위기:${i3}].\n[예시] 입력: 강남역카페/20대여성/감성 -> 출력: "#강남역카페 #강남디저트 #감성카페 #카페투어 #20대일상"\n이제 조건에 맞춰 작성해.`,
    '광고 카피라이팅': (i1, i2, i3) => `너는 광고 카피라이터야. [제품/서비스:${i1}], [소구포인트:${i2}], [광고매체:${i3}].\n[예시] 입력: 무선청소기/흡입력/페이스북 -> 출력: "먼지 한 톨도 용납하지 않는 압도적 흡입력! 지금 바로 경험하세요 🧹✨"\n이제 조건에 맞춰 작성해.`
  },
  en: {
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}]. Now write.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}]. Now write.`
  }
};

const GLOBAL_RULES = {
  ko: `\n\n[필수 요구사항]\n- 불필요한 인사말이나 서론 없이 결과물만 출력하세요.`,
  en: `\n\n[GLOBAL RULE]\n- Output ONLY the final result.`
};

// --- 2. 다국어 번역 데이터 (모든 카테고리 복구) ---
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
            feedbackThanks: '소중한 피드백이 전달되었습니다. 감사합니다! 🦊'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 비즈니스/이메일',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: '메모 심폐소생기', desc: '두서없는 메모를 완벽한 문서로', input1: { label: '문서 형태', placeholder: '예: 주간업무보고, 회의록', type: 'text' }, input2: { label: '날것의 메모 텍스트', placeholder: '예: "회의결과 1. 예산 삭감됨..."', type: 'textarea' }, input3: { label: '강조해야 할 포인트', type: 'text', placeholder: '예: 일정 연기 사유 부드럽게 강조' } },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: '분노조절 이메일', desc: '감정은 빼고 할 말은 다 하는', input1: { label: '수신자', placeholder: '예: 영업팀 김팀장님', type: 'text' }, input2: { label: '하고 싶은 말', placeholder: '예: 기획서 3번이나 말했는데 왜 안주나', type: 'textarea' }, input3: { label: '포장지 온도', type: 'select', options: [ { value: '🙇‍♂️최대한 정중하게', text: '🙇‍♂️최대한 정중하게' }, { value: '👔사무적으로', text: '👔사무적으로' }, { value: '🗡️웃으면서 뼈 때리기', text: '🗡️웃으면서 뼈 때리기' } ] } },
                    { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: '프로 사과문', desc: '핑계 없는 수습의 정석', input1: { label: '발생한 사고', placeholder: '예: 첨부파일 누락됨', type: 'text' }, input2: { label: '수습 대안', placeholder: '예: 재발송하고 사과 메일 따로 보냄', type: 'textarea' }, input3: { label: '대상', type: 'select', options: [ { value: '🏢내부 상사용', text: '🏢내부 상사용' }, { value: '🤝외부 거래처용', text: '🤝외부 거래처용' } ] } }
                ]
            },
            {
                categoryId: 'school', categoryName: '🏫 과제/요약',
                subFeatures: [
                    { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: '리포트 심폐소생', desc: '초안을 완벽한 리포트로', input1: { label: '제출 대상', placeholder: '예: 교수님', type: 'text' }, input2: { label: '초안 복붙', placeholder: '예: 서론은 대충...', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [ { value: '🎓학술적으로', text: '🎓학술적으로' }, { value: '📝핵심만 개조식으로', text: '📝핵심만 개조식으로' } ] } },
                    { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: '발표 대본 변환', desc: '자료를 자연스러운 대본으로', input1: { label: '발표 시간/타겟', placeholder: '예: 5분, 대학생', type: 'text' }, input2: { label: '발표 자료', placeholder: 'PPT 내용 복붙', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🎙️전문적', text: '🎙️전문적' }, { value: '💬청중 소통톤', text: '💬청중 소통톤' } ] } },
                    { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: '자소서 영혼 주입기', desc: '경험을 성과로', input1: { label: '지원 직무', placeholder: '예: 마케팅', type: 'text' }, input2: { label: '나의 경험', placeholder: '카페 알바 6개월...', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🔥열정 가득', text: '🔥열정 가득' }, { value: '📊데이터 중심', text: '📊데이터 중심' } ] } }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 엑셀/시트',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: '함수 수식 뚝딱이', desc: '말로 하면 수식으로', input1: { label: '데이터 상황', placeholder: '예: A열은 이름, B열은 실적', type: 'text' }, input2: { label: '원하는 결과', placeholder: '예: 실적 80 이상 인원수', type: 'textarea' }, input3: { label: '프로그램', type: 'select', options: [ { value: 'MS 엑셀', text: 'MS 엑셀' }, { value: '구글 시트', text: '구글 시트' } ] } },
                    { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: '외계어 수식 해독기', desc: '수식 분석', input1: { label: '수식/에러', placeholder: '=VLOOKUP...', type: 'text' }, input2: { label: '질문', placeholder: '무슨 뜻이야?', type: 'textarea' }, input3: { label: '수준', type: 'select', options: [ { value: '👶초보자용', text: '👶초보자용' }, { value: '🧑‍💻실무자용', text: '🧑‍💻실무자용' } ] } }
                ]
            },
            {
                categoryId: 'marketing', categoryName: '📱 마케팅/SNS',
                subFeatures: [
                    { id: 'hashGen', apiId: '인스타그램 해시태그', icon: '🏷️', title: '해시태그 생성기', desc: '조회수 터지는 태그', input1: { label: '주제/설명', placeholder: '카페 사진 등', type: 'text' }, input2: { label: '타겟', placeholder: '20대 커플 등', type: 'textarea' }, input3: { label: '분위기', type: 'text', placeholder: '감성적이고 힙하게' } },
                    { id: 'adCopy', apiId: '광고 카피라이팅', icon: '🎯', title: '광고 카피라이팅', desc: '클릭을 부르는 문구', input1: { label: '제품/서비스', placeholder: '무선 청소기 등', type: 'text' }, input2: { label: '핵심 포인트', placeholder: '가벼운 흡입력 등', type: 'textarea' }, input3: { label: '매체', type: 'select', options: [ { value: '📘 인스타/페이스북', text: '📘 인스타/페이스북' }, { value: '🟢 네이버 배너', text: '🟢 네이버 배너' } ] } }
                ]
            }
        ]
    },
    en: {
        ui: {
            docTitle: '🦊 ChattyFox - AI Workspace',
            logoText: '<span class="text-slate-800 dark:text-white transition-colors">Chatty</span><span class="text-orange-500">Fox</span>',
            subtitle: 'Professional text generation assistant.',
            historyTitle: 'History',
            historyEmpty: 'No history.',
            submitBtn: '✨ Generate Now',
            resultTitle: 'Result (Editable)',
            copyBtn: 'Copy to Clipboard',
            toastMsg: 'Copied!',
            alertEmpty: 'Fill all fields.',
            generating: '🦊 Generating...'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 Business',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: 'Memo Polisher', desc: 'Notes to docs', input1: { label: 'Doc Type', placeholder: 'e.g., Report', type: 'text' }, input2: { label: 'Notes', placeholder: 'Raw notes', type: 'textarea' }, input3: { label: 'Focus', type: 'text', placeholder: 'What to highlight' } }
                ]
            }
        ]
    }
};

// --- 전역 상태 ---
let currentLang = 'ko'; 
let currentCategoryIndex = 0;
let currentFeatureIndex = 0;

// --- DOM 요소 ---
const mainTabsContainer = document.getElementById('mainTabs');
const subFeaturesContainer = document.getElementById('subFeatures');
const aiForm = document.getElementById('aiForm');
const input1Label = document.getElementById('input1Label');
const input1 = document.getElementById('input1');
const input2Label = document.getElementById('input2Label');
const input2 = document.getElementById('input2');
const input3Container = document.getElementById('input3Container');
const resultArea = document.getElementById('resultArea');
const resultContent = document.getElementById('resultContent'); 
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const historyList = document.getElementById('historyList');
const historySidebar = document.getElementById('historySidebar');

// --- 초기화 로직 ---
function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') document.documentElement.classList.add('dark');
    document.getElementById('darkModeToggle').onclick = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    };
}

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang] || translations.ko;
    document.title = t.ui.docTitle;
    document.getElementById('appLogoText').innerHTML = t.ui.logoText;
    document.getElementById('appSubtitle').textContent = t.ui.subtitle;
    document.getElementById('submitBtn').innerHTML = t.ui.submitBtn;
    document.getElementById('resultTitle').textContent = t.ui.resultTitle;
    document.getElementById('copyBtn').textContent = t.ui.copyBtn;
    document.getElementById('toastMsg').textContent = t.ui.toastMsg;
    updateTabContent();
    renderHistory();
}

function updateTabContent() {
    renderMainTabs();
    renderSubFeatures();
    updateFormFields();
}

function renderMainTabs() {
    mainTabsContainer.innerHTML = ''; 
    translations[currentLang].appData.forEach((category, index) => {
        const btn = document.createElement('button');
        btn.className = `whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-semibold transition-colors ${currentCategoryIndex === index ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500' : 'text-gray-500 dark:text-slate-400 border-b-2 border-transparent'}`;
        btn.textContent = category.categoryName;
        btn.onclick = () => { currentCategoryIndex = index; currentFeatureIndex = 0; updateTabContent(); };
        mainTabsContainer.appendChild(btn);
    });
}

function renderSubFeatures() {
    subFeaturesContainer.innerHTML = ''; 
    const features = translations[currentLang].appData[currentCategoryIndex].subFeatures;
    features.forEach((feature, index) => {
        const btn = document.createElement('button');
        btn.className = `p-4 text-center rounded-xl border-2 transition-all ${currentFeatureIndex === index ? 'border-orange-500 bg-orange-50 dark:bg-slate-800' : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`;
        btn.innerHTML = `<span class="text-3xl mb-2">${feature.icon}</span><strong class="block text-gray-800 dark:text-slate-200 font-bold mb-1">${feature.title}</strong>`;
        btn.onclick = () => { currentFeatureIndex = index; updateTabContent(); };
        subFeaturesContainer.appendChild(btn);
    });
}

function updateFormFields() {
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    input1Label.textContent = feature.input1.label;
    input1.placeholder = feature.input1.placeholder;
    input2Label.textContent = feature.input2.label;
    input2.placeholder = feature.input2.placeholder;
    input3Container.innerHTML = `<label id="input3Label" class="block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1">${feature.input3.label}</label>`;
    const commonClasses = 'w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none transition bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:text-white';
    if (feature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3'; select.className = commonClasses;
        feature.input3.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value; option.textContent = opt.text;
            select.appendChild(option);
        });
        input3Container.appendChild(select);
    } else {
        const input = document.createElement('input');
        input.type = 'text'; input.id = 'input3'; input.className = commonClasses;
        input.placeholder = feature.input3.placeholder;
        input3Container.appendChild(input);
    }
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('quickfix_history') || '[]');
    historyList.innerHTML = '';
    if (!history.length) document.getElementById('historyEmptyMsg').style.display = 'block';
    else document.getElementById('historyEmptyMsg').style.display = 'none';
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-orange-50 mb-2';
        const cleanText = item.text.replace(/[#*`]/g, '');
        div.innerHTML = `<span class="text-xs font-bold text-primary">${item.title}</span><p class="text-xs text-gray-600 dark:text-slate-300 truncate">${cleanText}</p>`;
        div.onclick = () => { resultContent.innerHTML = marked.parse(item.text); resultArea.classList.remove('hidden'); historySidebar.classList.add('translate-x-full'); };
        historyList.appendChild(div);
    });
}

// --- 3. 최종 API 호출 로직 (Gemini 2.0 규격 준수) ---
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uiText = translations[currentLang].ui;
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    const i1 = input1.value.trim();
    const i2 = input2.value.trim();
    const i3 = document.getElementById('input3').value.trim();

    if (!i1 || !i2 || !i3) { alert(uiText.alertEmpty); return; }

    resultArea.classList.remove('hidden');
    resultContent.innerHTML = `<div class="flex flex-col items-center py-4 text-orange-500 font-bold animate-pulse"><span>${uiText.generating}</span></div>`;
    aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subCategory: feature.apiId, input1: i1, input2: i2, input3: i3, lang: currentLang })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'AI 통신 실패');

        if (data.success && data.result) {
            resultContent.innerHTML = marked.parse(data.result);
            saveHistory(data.result, feature.title);
        } else {
            throw new Error('응답이 올바르지 않습니다.');
        }
    } catch (error) {
        resultContent.innerHTML = `<div class="text-red-500 font-bold p-4 border border-red-200 bg-red-50 rounded-lg">Error: ${error.message}</div>`;
    } finally {
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
    }
});

copyBtn.onclick = () => {
    navigator.clipboard.writeText(resultContent.innerText).then(() => {
        toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => toast.classList.add('opacity-0', 'translate-y-4'), 2500);
    });
};
document.getElementById('openHistoryBtn').onclick = () => historySidebar.classList.remove('translate-x-full');
document.getElementById('closeHistoryBtn').onclick = () => historySidebar.classList.add('translate-x-full');

function init() {
    initDarkMode();
    setLanguage(new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ko');
}
init();