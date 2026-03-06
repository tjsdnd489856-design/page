// --- [보안 알림] 브라우저 직접 호출용 API 키 (테스트 후 Vercel 환경 변수로 옮기는 것을 권장) ---
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // 🚨 여기에 실제 API 키를 넣으세요.

// --- AI 명령어 설정 ---
const SYSTEM_PROMPTS = {
  ko: {
    '분노조절 이메일': (i1, i2, i3) => `너는 10년 차 기획팀 에이스 과장이야. [수신자:${i1}], [내용:${i2}], [온도:${i3}].\n조건에 맞춰 작성해.`,
    '메모 심폐소생기': (i1, i2, i3) => `너는 전략 컨설턴트야. [문서형태:${i1}], [메모:${i2}], [강조:${i3}].\n조건에 맞춰 작성해.`,
    '프로 사과문': (i1, i2, i3) => `너는 위기관리 전문가야. [사고:${i1}], [대안:${i2}], [대상:${i3}].\n조건에 맞춰 작성해.`,
    '리포트 심폐소생': (i1, i2, i3) => `너는 논문 전문가야. [대상:${i1}], [초안:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '발표 대본 변환': (i1, i2, i3) => `너는 프레젠테이션 코치야. [타겟/시간:${i1}], [자료:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `너는 취업 컨설턴트야. [직무:${i1}], [경험:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '철벽 방어 거절문': (i1, i2, i3) => `너는 커뮤니케이션 전문가야. [대상:${i1}], [사유:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '센스있는 인사/축하': (i1, i2, i3) => `너는 카피라이터야. [상황:${i1}], [내용:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '진심 어린 사과문': (i1, i2, i3) => `너는 심리상담사야. [대상:${i1}], [잘못:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `너는 중고거래 고수야. [상황:${i1}], [팩트:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '매력적인 판매글': (i1, i2, i3) => `너는 판매글 장인이야. [물건:${i1}], [특징:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `너는 CS 매니저야. [별점:${i1}], [리뷰:${i2}], [어조:${i3}].\n조건에 맞춰 작성해.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `너는 데이터 분석가야. [상황:${i1}], [결과:${i2}], [프로그램:${i3}].\n조건에 맞춰 작성해.`,
    '외계어 수식 해독기': (i1, i2, i3) => `너는 친절한 엑셀 강사야. [수식:${i1}], [질문:${i2}], [수준:${i3}].\n조건에 맞춰 작성해.`,
    '반복작업 매크로': (i1, i2, i3) => `너는 자동화 전문가야. [환경:${i1}], [작업:${i2}], [스타일:${i3}].\n조건에 맞춰 작성해.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `너는 시니어 DB 관리자야. [테이블:${i1}], [원하는데이터:${i2}], [DBMS종류:${i3}].\n조건에 맞춰 작성해.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `너는 시니어 개발자야. [상황/패턴:${i1}], [요청사항:${i2}], [이해수준:${i3}].\n조건에 맞춰 작성해.`,
    '인스타그램 해시태그': (i1, i2, i3) => `너는 SNS 마케터야. [주제/사진설명:${i1}], [타겟고객:${i2}], [분위기:${i3}].\n조건에 맞춰 작성해.`,
    '광고 카피라이팅': (i1, i2, i3) => `너는 광고 카피라이터야. [제품/서비스:${i1}], [소구포인트:${i2}], [광고매체:${i3}].\n조건에 맞춰 작성해.`
  },
  en: {
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}]. Now write.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}]. Now write.`
  }
};

const GLOBAL_RULES = {
  ko: `\n\n[필수 요구사항]\n- 불필요한 인사말을 절대 쓰지 마세요.\n- 최종 결과물만 출력하세요.`,
  en: `\n\n[GLOBAL RULE]\n- Output ONLY the final result.`
};

const translations = {
    ko: {
        ui: {
            docTitle: '🦊 채티폭스 - AI Workspace',
            logoText: '<span class="text-slate-800 dark:text-white tracking-tight">채티</span><span class="text-orange-500 tracking-tight">폭스</span>',
            subtitle: '스마트한 여우 비서가 찾아주는 세련된 정답',
            historyTitle: '<i class="fa-solid fa-history mr-2"></i>최근 기록',
            historyEmpty: '기록이 없습니다.',
            submitBtn: '<i class="fa-solid fa-bolt mr-2"></i> ✨ 텍스트 뽑기',
            resultTitle: '결과물 (수정 가능)',
            copyBtn: '바로 복사해서 쓰기',
            toastMsg: '복사 완료!',
            alertEmpty: '빈칸을 채워주세요.',
            generating: '🦊 여우 비서가 생성 중입니다...',
            err404: '모델을 찾을 수 없습니다.',
            err403: 'API 키 권한 오류',
            err429: '사용량 초과'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 비즈니스',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: '메모 심폐소생기', desc: '메모를 문서로', input1: { label: '문서 형태', placeholder: '주간보고 등', type: 'text' }, input2: { label: '메모 내용', placeholder: '내용 입력', type: 'textarea' }, input3: { label: '강조 포인트', type: 'text', placeholder: '강조할 점' } },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: '분노조절 이메일', desc: '정중한 이메일', input1: { label: '수신자', placeholder: '누구에게', type: 'text' }, input2: { label: '하고 싶은 말', placeholder: '날것 그대로', type: 'textarea' }, input3: { label: '온도', type: 'select', options: [ { value: '정중하게', text: '정중하게' }, { value: '사무적으로', text: '사무적으로' } ] } }
                ]
            }
        ]
    }
};

let currentLang = 'ko'; 
let currentCategoryIndex = 0;
let currentFeatureIndex = 0;

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

function initDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') document.documentElement.classList.add('dark');
}

function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.title = t.ui.docTitle;
    document.getElementById('appLogoText').innerHTML = t.ui.logoText;
    document.getElementById('appSubtitle').textContent = t.ui.subtitle;
    document.getElementById('submitBtn').innerHTML = t.ui.submitBtn;
    document.getElementById('copyBtn').textContent = t.ui.copyBtn;
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
        btn.className = `whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-semibold ${currentCategoryIndex === index ? 'text-orange-600 border-b-2 border-orange-500' : 'text-gray-500'}`;
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
        btn.className = `p-4 border-2 rounded-xl ${currentFeatureIndex === index ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`;
        btn.innerHTML = `<strong>${feature.title}</strong><br><small>${feature.desc}</small>`;
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
    input3Container.innerHTML = `<label class="block text-sm font-bold mb-1">${feature.input3.label}</label>`;
    if (feature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3'; select.className = 'w-full px-4 py-3 border rounded-lg';
        feature.input3.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value; option.textContent = opt.text;
            select.appendChild(option);
        });
        input3Container.appendChild(select);
    } else {
        const input = document.createElement('input');
        input.type = 'text'; input.id = 'input3'; input.className = 'w-full px-4 py-3 border rounded-lg';
        input.placeholder = feature.input3.placeholder;
        input3Container.appendChild(input);
    }
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('quickfix_history') || '[]');
    historyList.innerHTML = '';
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-3 border-b cursor-pointer hover:bg-gray-50';
        // 정규식 백틱 문제 해결을 위해 별도 처리
        const cleanText = item.text.replace(/[#*`]/g, '');
        div.innerHTML = `<strong>${item.title}</strong><p class="truncate">${cleanText}</p>`;
        div.onclick = () => { resultContent.innerHTML = marked.parse(item.text); resultArea.classList.remove('hidden'); };
        historyList.appendChild(div);
    });
}

aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uiText = translations[currentLang].ui;
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    const i1 = input1.value.trim();
    const i2 = input2.value.trim();
    const i3 = document.getElementById('input3').value.trim();

    if (!i1 || !i2 || !i3) return;

    resultArea.classList.remove('hidden');
    resultContent.innerHTML = `<p class="animate-pulse text-orange-500">${uiText.generating}</p>`;

    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
        const prompt = SYSTEM_PROMPTS[currentLang][feature.apiId](i1, i2, i3) + GLOBAL_RULES[currentLang];

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (!response.ok) {
            if (response.status === 404) throw new Error(uiText.err404);
            if (response.status === 403) throw new Error(uiText.err403);
            throw new Error('Error: ' + response.status);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        resultContent.innerHTML = marked.parse(text);

        const history = JSON.parse(localStorage.getItem('quickfix_history') || '[]');
        history.unshift({ title: feature.title, text: text });
        localStorage.setItem('quickfix_history', JSON.stringify(history.slice(0, 10)));
        renderHistory();

    } catch (error) {
        resultContent.innerHTML = `<p class="text-red-500">${error.message}</p>`;
    }
});

copyBtn.onclick = () => {
    navigator.clipboard.writeText(resultContent.innerText).then(() => {
        toast.classList.remove('opacity-0');
        setTimeout(() => toast.classList.add('opacity-0'), 2000);
    });
};

initDarkMode();
setLanguage('ko');