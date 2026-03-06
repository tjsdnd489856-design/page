// --- 1. 다국어 완벽 번역 객체 (translations) ---
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
            fetchError: '데이터를 가져오는 중 오류가 발생했습니다. (API 키 및 네트워크 확인)',
            feedbackThanks: '소중한 피드백이 전달되었습니다. 감사합니다! 🦊'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 비즈니스/이메일',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: '메모 심폐소생기', desc: '두서없는 메모를 완벽한 문서로', input1: { label: '어떤 형태의 문서로 만들까요?', placeholder: '예: 주간업무보고, 회의록', type: 'text' }, input2: { label: '날것의 메모 텍스트', placeholder: '예: "회의결과 1. 예산 삭감됨..."', type: 'textarea' }, input3: { label: '강조해야 할 포인트', type: 'text', placeholder: '예: 일정 연기 사유 부드럽게 강조' } },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: '분노조절 이메일', desc: '감정은 빼고 할 말은 다 하는', input1: { label: '누구에게 보내나요?', placeholder: '예: 영업팀 김팀장님', type: 'text' }, input2: { label: '진짜 하고 싶은 말 (날것 그대로)', placeholder: '예: 기획서 3번이나 말했는데 왜 안주나', type: 'textarea' }, input3: { label: '포장지 온도 선택', type: 'select', options: [ { value: '🙇‍♂️최대한 정중하게', text: '🙇‍♂️최대한 정중하게' }, { value: '👔감정 0% (사무적으로)', text: '👔감정 0% (사무적으로)' }, { value: '🗡️웃으면서 뼈 때리기', text: '🗡️웃으면서 뼈 때리기' } ] } },
                    { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: '프로 사과문', desc: '핑계 없는 수습의 정석', input1: { label: '발생한 사고', placeholder: '예: 첨부파일 누락됨', type: 'text' }, input2: { label: '수습 대안 (해결책)', placeholder: '예: 재발송하고 사과 메일 따로 보냄', type: 'textarea' }, input3: { label: '대상 및 톤앤매너', type: 'select', options: [ { value: '🏢내부 상사용', text: '🏢내부 상사용' }, { value: '🤝외부 거래처용', text: '🤝외부 거래처용' } ] } }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 엑셀/시트',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: '함수 수식 뚝딱이', desc: '말로 하면 수식으로', input1: { label: '데이터 상황', placeholder: '예: A열은 이름, B열은 실적', type: 'text' }, input2: { label: '원하는 결과', placeholder: '예: 실적 80 이상 인원수', type: 'textarea' }, input3: { label: '프로그램', type: 'select', options: [ { value: '🟢MS 엑셀', text: '🟢MS 엑셀' }, { value: '🟡구글 시트', text: '🟡구글 시트' } ] } }
                ]
            },
            {
                categoryId: 'marketing', categoryName: '📱 마케팅/SNS',
                subFeatures: [
                    { id: 'adCopy', apiId: '광고 카피라이팅', icon: '🎯', title: '광고 카피라이팅', desc: '클릭을 부르는 문구', input1: { label: '제품/서비스', placeholder: '예: 무선 청소기', type: 'text' }, input2: { label: '핵심 소구 포인트', placeholder: '예: 가볍지만 흡입력은 괴물', type: 'textarea' }, input3: { label: '광고 매체', type: 'select', options: [ { value: '📘 페이스북/인스타', text: '📘 페이스북/인스타' }, { value: '🟢 네이버 배너', text: '🟢 네이버 배너' } ] } }
                ]
            }
        ]
    },
    en: {
        ui: {
            docTitle: '🦊 ChattyFox - AI Workspace',
            logoText: '<span class="text-slate-800 dark:text-white tracking-tight">Chatty</span><span class="text-orange-500 tracking-tight">Fox</span>',
            subtitle: 'Let the smart fox handle your professional writing in seconds.',
            historyTitle: '<i class="fa-solid fa-history mr-2 text-primary"></i>History',
            historyEmpty: 'No recent history.',
            submitBtn: '<i class="fa-solid fa-bolt mr-2 text-yellow-300"></i> ✨ Generate',
            resultTitle: 'Result (Editable)',
            copyBtn: 'Copy to Clipboard',
            toastMsg: 'Copied!',
            alertEmpty: 'Please fill all fields.',
            generating: '🦊 Fox is thinking...',
            fetchError: 'An error occurred during generation.',
            feedbackThanks: 'Thanks for your feedback! 🦊'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 Business',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: 'Memo Polisher', desc: 'Notes to documents', input1: { label: 'Doc Type', placeholder: 'e.g., Report', type: 'text' }, input2: { label: 'Notes', placeholder: 'Your raw notes', type: 'textarea' }, input3: { label: 'Focus', type: 'text', placeholder: 'What to highlight' } }
                ]
            }
        ]
    }
};

// --- 전역 상태 변수 ---
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
const toastMsg = document.getElementById('toastMsg');
const darkModeToggle = document.getElementById('darkModeToggle');
const openHistoryBtn = document.getElementById('openHistoryBtn');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historySidebar = document.getElementById('historySidebar');
const historyList = document.getElementById('historyList');
const historyEmptyMsg = document.getElementById('historyEmptyMsg');
const historyTitle = document.getElementById('historyTitle');
const btnLike = document.getElementById('btnLike');
const btnDislike = document.getElementById('btnDislike');

// --- 다크모드 및 다국어 초기화 ---
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.documentElement.classList.add('dark');
    darkModeToggle.onclick = () => {
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
    historyTitle.innerHTML = t.ui.historyTitle;
    historyEmptyMsg.textContent = t.ui.historyEmpty;
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

// --- 히스토리 관리 ---
function getHistory() { return JSON.parse(localStorage.getItem('quickfix_history') || '[]'); }
function saveHistory(text, featureTitle) {
    let history = getHistory();
    history.unshift({ id: Date.now(), title: featureTitle, text: text, date: new Date().toLocaleString() });
    localStorage.setItem('quickfix_history', JSON.stringify(history.slice(0, 10)));
    renderHistory();
}
function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = '';
    historyEmptyMsg.style.display = history.length ? 'none' : 'block';
    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-orange-50';
        const cleanText = item.text.replace(/[#*`]/g, '');
        div.innerHTML = `<div class="flex justify-between mb-1"><span class="text-xs font-bold text-primary">${item.title}</span></div><p class="text-xs text-gray-600 dark:text-slate-300 truncate">${cleanText}</p>`;
        div.onclick = () => { resultContent.innerHTML = marked.parse(item.text); resultArea.classList.remove('hidden'); historySidebar.classList.add('translate-x-full'); };
        historyList.appendChild(div);
    });
}

// --- API 호출 로직 (안정성 강화 버전) ---
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uiText = translations[currentLang].ui;
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    const i1 = input1.value.trim();
    const i2 = input2.value.trim();
    const i3 = document.getElementById('input3').value.trim();

    if (!i1 || !i2 || !i3) return;

    resultArea.classList.remove('hidden');
    resultContent.innerHTML = `<div class="flex flex-col items-center py-4 text-orange-500 font-bold animate-pulse"><span>${uiText.generating}</span></div>`;
    aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subCategory: feature.apiId, input1: i1, input2: i2, input3: i3, lang: currentLang })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const text = data.result || '';

        if (text) {
            resultContent.innerHTML = marked.parse(text);
            saveHistory(text, feature.title);
        } else {
            throw new Error('응답이 비어있습니다.');
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
openHistoryBtn.onclick = () => historySidebar.classList.remove('translate-x-full');
closeHistoryBtn.onclick = () => historySidebar.classList.add('translate-x-full');

function init() {
    initDarkMode();
    setLanguage(new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ko');
}
init();