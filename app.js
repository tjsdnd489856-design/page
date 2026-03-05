// --- 1. 전체 설정 데이터 (카테고리 및 서브 기능 12종) ---
const appData = [
    {
        categoryId: 'business',
        categoryName: '🏢 비즈니스/이메일',
        subFeatures: [
            {
                id: 'angryEmail', icon: '✉️', title: '분노조절 이메일', desc: '감정은 빼고 할 말은 다 하는',
                input1: { label: '누구에게 보내나요?', placeholder: '예: 영업팀 김팀장님', type: 'text' },
                input2: { label: '진짜 하고 싶은 말 (날것 그대로 작성)', placeholder: '예: 내일까지 기획서 달라고 3번이나 말했는데 왜 안 주시나요. 장난하십니까?', type: 'textarea' },
                input3: { 
                    label: '포장지 온도 선택', type: 'select', 
                    options: [
                        { value: '🙇‍♂️납작 엎드리기 (최대한 정중하게)', text: '🙇‍♂️납작 엎드리기 (최대한 정중하게)' },
                        { value: '👔감정 0% 드라이하게 (사무적으로)', text: '👔감정 0% 드라이하게 (사무적으로)' },
                        { value: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)', text: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)' }
                    ] 
                }
            },
            {
                id: 'memoRevive', icon: '📝', title: '개떡 메모 심폐소생기', desc: '두서없는 메모를 완벽한 문서로',
                input1: { label: '어떤 형태의 문서로 만들까요?', placeholder: '예: 주간업무보고, 회의록, 기획서 초안', type: 'text' },
                input2: { label: '날것의 메모 텍스트 복붙', placeholder: '예: 회의결과 1. 예산 삭감됨 2. 일정 1주일 연기 3. 김대리가 업체 연락하기로함...', type: 'textarea' },
                input3: { label: '가장 강조해야 할 포인트', type: 'text', placeholder: '예: 일정이 연기된 사유를 부드럽게 강조' }
            },
            {
                id: 'apology', icon: '🚨', title: '프로페셔널 사과문', desc: '핑계 없이 깔끔한 수습의 정석',
                input1: { label: '어떤 사고가 발생했나요?', placeholder: '예: 어제 발송한 대량 이메일에 첨부파일 누락됨', type: 'text' },
                input2: { label: '나의 수습 대안 (해결책)', placeholder: '예: 오늘 오전 중으로 파일 첨부하여 재발송하고 사과 메일 따로 보내겠습니다.', type: 'textarea' },
                input3: { 
                    label: '대상 및 톤앤매너', type: 'select', 
                    options: [
                        { value: '🏢내부 상사용 (빠르고 명확한 보고)', text: '🏢내부 상사용 (빠르고 명확한 보고)' },
                        { value: '🤝외부 거래처용 (정중하고 철저한 사과)', text: '🤝외부 거래처용 (정중하고 철저한 사과)' }
                    ] 
                }
            }
        ]
    },
    {
        categoryId: 'school',
        categoryName: '🏫 과제/요약',
        subFeatures: [
            {
                id: 'reportReview', icon: '📄', title: 'A+ 리포트 심폐소생', desc: '초안을 완벽한 리포트로',
                input1: { label: '제출 대상', placeholder: '예: 깐깐한 전공 교수님', type: 'text' },
                input2: { label: '날것의 초안 복붙', placeholder: '예: 서론은 대충 이렇게 쓰고... 본론1은 이거임...', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🎓학술적이고 논리적으로', text: '🎓학술적이고 논리적으로' },
                        { value: '📝핵심만 개조식으로', text: '📝핵심만 개조식으로' }
                    ] 
                }
            },
            {
                id: 'speechConvert', icon: '🗣️', title: '찰떡 발표 대본 변환', desc: '자료를 자연스러운 대본으로',
                input1: { label: '발표 시간 및 타겟', placeholder: '예: 5분, 대학생', type: 'text' },
                input2: { label: '발표 자료 텍스트', placeholder: '예: PPT에 들어갈 내용들 복붙...', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🎙️전문적인 프레젠테이션', text: '🎙️전문적인 프레젠테이션' },
                        { value: '💬청중과 소통하는 친근한 톤', text: '💬청중과 소통하는 친근한 톤' }
                    ] 
                }
            },
            {
                id: 'coverLetter', icon: '✍️', title: '자소서 영혼 주입기', desc: '초라한 경험을 빛나는 성과로',
                input1: { label: '지원 직무/기업', placeholder: '예: 네이버 마케팅', type: 'text' },
                input2: { label: '나의 초라한 경험 나열', placeholder: '예: 카페 알바 6개월, 동아리 회장 했음...', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🔥열정과 패기 넘치게', text: '🔥열정과 패기 넘치게' },
                        { value: '📊데이터/성과 중심으로', text: '📊데이터/성과 중심으로' }
                    ] 
                }
            }
        ]
    },
    {
        categoryId: 'relationship',
        categoryName: '💌 인간관계',
        subFeatures: [
            {
                id: 'reject', icon: '🛡️', title: '철벽 방어 거절문', desc: '상처 없이 확실하게 거절하기',
                input1: { label: '거절할 대상', placeholder: '예: 돈 빌려달라는 친구', type: 'text' },
                input2: { label: '진짜 속마음/거절 사유', placeholder: '예: 나도 지금 돈 없어. 미안해.', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '☀️둥글둥글 완곡하게', text: '☀️둥글둥글 완곡하게' },
                        { value: '🧊차갑고 깍듯하게 선 긋기', text: '🧊차갑고 깍듯하게 선 긋기' }
                    ] 
                }
            },
            {
                id: 'greet', icon: '🎉', title: '센스있는 인사/축하', desc: '마음을 담은 따뜻한 메시지',
                input1: { label: '받는 사람 및 상황', placeholder: '예: 안 친한 직장 동료 결혼식', type: 'text' },
                input2: { label: '꼭 포함할 내용', placeholder: '예: 참석 못해서 미안하다, 축의금 보냈다', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🌸따뜻하고 감동적으로', text: '🌸따뜻하고 감동적으로' },
                        { value: '👔예의 바르고 격식 있게', text: '👔예의 바르고 격식 있게' }
                    ] 
                }
            },
            {
                id: 'apologyPersonal', icon: '🙇', title: '진심 어린 사과문', desc: '관계 회복을 위한 사과의 정석',
                input1: { label: '사과할 대상', placeholder: '예: 화난 애인', type: 'text' },
                input2: { label: '잘못한 내용', placeholder: '예: 연락 안 하고 게임하다가 잠들었어', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🥺변명 없이 납작 엎드리기', text: '🥺변명 없이 납작 엎드리기' },
                        { value: '🗣️상황 설명과 함께 진중하게', text: '🗣️상황 설명과 함께 진중하게' }
                    ] 
                }
            }
        ]
    },
    {
        categoryId: 'market',
        categoryName: '🏪 중고거래',
        subFeatures: [
            {
                id: 'marketReject', icon: '🛑', title: '당근 진상 퇴치기', desc: '스트레스 없는 중고거래',
                input1: { label: '상황', placeholder: '예: 본문 안 읽고 무리한 네고 요구', type: 'text' },
                input2: { label: '전달할 팩트', placeholder: '예: 네고 안 된다고 본문에 써놨습니다. 안 팔아요.', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🛡️단호하게 철벽 방어', text: '🛡️단호하게 철벽 방어' },
                        { value: '🤝기분 상하지 않게 타이르기', text: '🤝기분 상하지 않게 타이르기' }
                    ] 
                }
            },
            {
                id: 'marketSell', icon: '💰', title: '매력적인 판매글', desc: '조회수 폭발하는 당근 게시글',
                input1: { label: '파는 물건 이름', placeholder: '예: 아이패드 프로 5세대', type: 'text' },
                input2: { label: '물건의 특징 및 하자', placeholder: '예: 1년 썼고, 모서리 찍힘 살짝 있음. 박스 풀세트', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '✨뽐뿌 오는 감성글', text: '✨뽐뿌 오는 감성글' },
                        { value: '📋신뢰감 주는 스펙 나열글', text: '📋신뢰감 주는 스펙 나열글' }
                    ] 
                }
            },
            {
                id: 'bossReview', icon: '🌟', title: '사장님 리뷰 답글', desc: '리뷰 관리의 정석',
                input1: { label: '고객 리뷰 별점', placeholder: '예: 1점', type: 'text' },
                input2: { label: '고객이 쓴 리뷰 내용', placeholder: '예: 배달이 너무 늦고 음식이 다 식었어요', type: 'textarea' },
                input3: { 
                    label: '어조 선택', type: 'select', 
                    options: [
                        { value: '🏥CS 정석의 정중한 사과/대처', text: '🏥CS 정석의 정중한 사과/대처' },
                        { value: '🙏단골을 만드는 따뜻한 감사 인사', text: '🙏단골을 만드는 따뜻한 감사 인사' }
                    ] 
                }
            }
        ]
    }
];

// --- 2. HTML 요소(DOM) 가져오기 ---
const mainTabsContainer = document.getElementById('mainTabs');
const subFeaturesContainer = document.getElementById('subFeatures');
const aiForm = document.getElementById('aiForm');

const input1Label = document.getElementById('input1Label');
const input1 = document.getElementById('input1');
const input2Label = document.getElementById('input2Label');
const input2 = document.getElementById('input2');
const input3Container = document.getElementById('input3Container');

const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');
const resultContent = document.getElementById('resultContent');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

// --- 3. 전역 상태 변수 ---
let currentCategory = appData[0]; // 기본값: 첫 번째 탭 (비즈니스)
let currentFeature = currentCategory.subFeatures[0]; // 기본값: 첫 번째 서브 기능

// --- 4. 화면 그리기 (렌더링 로직) ---

// (1) 메인 카테고리 탭 렌더링
function renderMainTabs() {
    mainTabsContainer.innerHTML = ''; // 초기화

    appData.forEach(category => {
        const btn = document.createElement('button');
        const isSelected = currentCategory.categoryId === category.categoryId;
        
        // 탭 스타일: 선택된 탭은 진한 파란색, 나머지는 회색 바탕
        btn.className = `px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200 ${
            isSelected 
            ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' 
            : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`;
        btn.textContent = category.categoryName;

        // 메인 탭 클릭 이벤트
        btn.addEventListener('click', () => {
            currentCategory = category;
            currentFeature = category.subFeatures[0]; // 탭을 바꾸면 첫 번째 서브 기능으로 자동 선택
            renderMainTabs(); // 탭 색상 갱신
            renderSubFeatures(); // 서브 기능 카드 갱신
            updateFormFields(); // 입력 폼 갱신
        });

        mainTabsContainer.appendChild(btn);
    });
}

// (2) 선택된 메인 탭에 속한 3개의 서브 기능 버튼(카드) 렌더링
function renderSubFeatures() {
    subFeaturesContainer.innerHTML = ''; // 초기화

    currentCategory.subFeatures.forEach(feature => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = currentFeature.id === feature.id;
        
        btn.className = `p-4 text-left rounded-xl border-2 transition-all duration-200 group flex flex-col items-center sm:items-start text-center sm:text-left ${
            isSelected 
            ? 'border-blue-600 bg-blue-50 shadow-md transform scale-[1.02]' 
            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
        }`;

        btn.innerHTML = `
            <span class="text-3xl mb-2">${feature.icon}</span>
            <strong class="block text-gray-800 font-bold mb-1 group-hover:text-blue-600">${feature.title}</strong>
            <span class="text-xs text-gray-500 break-keep">${feature.desc}</span>
        `;

        btn.addEventListener('click', () => {
            currentFeature = feature;
            renderSubFeatures(); // 버튼 선택 상태 갱신
            updateFormFields();  // 입력 폼 갱신
        });

        subFeaturesContainer.appendChild(btn);
    });
}

// (3) 선택된 서브 기능에 맞게 폼(Input) 동적 변경
function updateFormFields() {
    // Input 1
    input1Label.textContent = currentFeature.input1.label;
    input1.placeholder = currentFeature.input1.placeholder;
    input1.value = '';

    // Input 2 (Textarea)
    input2Label.textContent = currentFeature.input2.label;
    input2.placeholder = currentFeature.input2.placeholder;
    input2.value = '';

    // Input 3 (Select or Input)
    input3Container.innerHTML = '';
    
    const label = document.createElement('label');
    label.id = 'input3Label';
    label.htmlFor = 'input3';
    label.className = 'block text-sm font-bold text-gray-700 mb-1';
    label.textContent = currentFeature.input3.label;
    input3Container.appendChild(label);

    if (currentFeature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3';
        select.required = true;
        select.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white cursor-pointer';
        
        currentFeature.input3.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });
        input3Container.appendChild(select);
        
    } else if (currentFeature.input3.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'input3';
        input.required = true;
        input.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white';
        input.placeholder = currentFeature.input3.placeholder;
        input3Container.appendChild(input);
    }
}

// --- 5. 서버 통신 (AI 생성 요청) ---
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentInput1 = document.getElementById('input1').value.trim();
    const currentInput2 = document.getElementById('input2').value.trim();
    const currentInput3 = document.getElementById('input3').value.trim();

    if (!currentInput1 || !currentInput2 || !currentInput3) return;

    // UI 상태 변경
    loadingArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subCategory: currentFeature.title,
                input1: currentInput1,
                input2: currentInput2,
                input3: currentInput3
            })
        });

        const data = await response.json();

        if (data.success) {
            resultContent.innerHTML = marked.parse(data.text);
            resultArea.classList.remove('hidden');
        } else {
            alert('AI 뚝딱 에러: ' + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('서버 응답이 없습니다. 서버가 켜져 있는지 확인해 주세요.');
    } finally {
        loadingArea.classList.add('hidden');
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// --- 6. 편의 기능 (복사 버튼) ---
copyBtn.addEventListener('click', async () => {
    try {
        const textToCopy = resultContent.innerText;
        await navigator.clipboard.writeText(textToCopy);
        
        toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
        }, 2500);
    } catch (err) {
        alert('복사에 실패했습니다. 권한을 확인해주세요.');
    }
});

// --- 7. 최초 실행 ---
function init() {
    renderMainTabs();     // 상단 4개 탭 생성
    renderSubFeatures();  // 첫 번째 탭의 서브 기능 3개 생성
    updateFormFields();   // 첫 번째 기능 폼 세팅
}

init();
