// --- 1. 직장인 맞춤형 서브 기능(무기) 설정 데이터 ---
// 각 기능별로 화면에 표시될 입력창의 제목과 힌트, 그리고 옵션(Select/Input)을 정의합니다.
const subFeaturesData = [
    {
        id: 'angryEmail',
        icon: '✉️',
        title: '분노조절 이메일',
        desc: '감정은 빼고 할 말은 다 하는',
        input1: { label: '누구에게 보내나요?', placeholder: '예: 영업팀 김팀장님', type: 'text' },
        input2: { label: '진짜 하고 싶은 말 (날것 그대로 작성)', placeholder: '예: 내일까지 기획서 달라고 3번이나 말했는데 왜 안 주시나요. 장난하십니까?', type: 'textarea' },
        input3: { 
            label: '포장지 온도 선택', 
            type: 'select', 
            options: [
                { value: '🙇‍♂️납작 엎드리기 (최대한 정중하게)', text: '🙇‍♂️납작 엎드리기 (최대한 정중하게)' },
                { value: '👔감정 0% 드라이하게 (사무적으로)', text: '👔감정 0% 드라이하게 (사무적으로)' },
                { value: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)', text: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)' }
            ] 
        }
    },
    {
        id: 'memoRevive',
        icon: '📝',
        title: '개떡 메모 심폐소생기',
        desc: '두서없는 메모를 완벽한 문서로',
        input1: { label: '어떤 형태의 문서로 만들까요?', placeholder: '예: 주간업무보고, 회의록, 기획서 초안', type: 'text' },
        input2: { label: '날것의 메모 텍스트 복붙', placeholder: '예: 회의결과 1. 예산 삭감됨 2. 일정 1주일 연기 3. 김대리가 업체 연락하기로함...', type: 'textarea' },
        input3: { 
            label: '가장 강조해야 할 포인트', 
            type: 'text', 
            placeholder: '예: 일정이 연기된 사유를 부드럽게 강조' 
        }
    },
    {
        id: 'apology',
        icon: '🚨',
        title: '프로페셔널 사과문',
        desc: '핑계 없이 깔끔한 수습의 정석',
        input1: { label: '어떤 사고가 발생했나요?', placeholder: '예: 어제 발송한 대량 이메일에 첨부파일 누락됨', type: 'text' },
        input2: { label: '나의 수습 대안 (해결책)', placeholder: '예: 오늘 오전 중으로 파일 첨부하여 재발송하고 사과 메일 따로 보내겠습니다.', type: 'textarea' },
        input3: { 
            label: '대상 및 톤앤매너', 
            type: 'select', 
            options: [
                { value: '🏢내부 상사용 (빠르고 명확한 보고)', text: '🏢내부 상사용 (빠르고 명확한 보고)' },
                { value: '🤝외부 거래처용 (정중하고 철저한 사과)', text: '🤝외부 거래처용 (정중하고 철저한 사과)' }
            ] 
        }
    }
];

// --- 2. HTML 요소(DOM) 가져오기 ---
const subFeaturesContainer = document.getElementById('subFeatures');
const aiForm = document.getElementById('aiForm');

// 입력 폼 요소들
const input1Label = document.getElementById('input1Label');
const input1 = document.getElementById('input1');
const input2Label = document.getElementById('input2Label');
const input2 = document.getElementById('input2');
const input3Container = document.getElementById('input3Container');

// 상태 및 결과 영역 요소들
const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');
const resultContent = document.getElementById('resultContent');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

// 현재 선택된 서브 기능 추적 변수 (기본값 설정됨)
let currentFeature = subFeaturesData[0];

// --- 3. 화면 그리기 (렌더링) ---

// (1) 서브 기능 버튼(카드) 생성
function renderSubFeatures() {
    subFeaturesContainer.innerHTML = ''; // 초기화

    subFeaturesData.forEach(feature => {
        const btn = document.createElement('button');
        btn.type = 'button';
        
        // 선택된 상태에 따른 스타일 적용 (Tailwind)
        const isSelected = currentFeature.id === feature.id;
        btn.className = `p-4 text-left rounded-xl border-2 transition-all duration-200 group flex flex-col items-center sm:items-start text-center sm:text-left ${
            isSelected 
            ? 'border-blue-600 bg-blue-50 shadow-md transform scale-[1.02]' 
            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
        }`;

        // 버튼 내부 내용 조립
        btn.innerHTML = `
            <span class="text-3xl mb-2">${feature.icon}</span>
            <strong class="block text-gray-800 font-bold mb-1 group-hover:text-blue-600">${feature.title}</strong>
            <span class="text-xs text-gray-500">${feature.desc}</span>
        `;

        // 클릭 이벤트 등록
        btn.addEventListener('click', () => {
            currentFeature = feature;
            renderSubFeatures(); // 다른 버튼 선택 해제 및 자신 선택 스타일 적용
            updateFormFields();  // 하단 폼 내용 동적 변경
        });

        subFeaturesContainer.appendChild(btn);
    });
}

// (2) 선택된 기능에 맞게 폼(Input) 동적 변경
function updateFormFields() {
    // Input 1 세팅
    input1Label.textContent = currentFeature.input1.label;
    input1.placeholder = currentFeature.input1.placeholder;
    input1.value = ''; // 초기화

    // Input 2 (Textarea) 세팅
    input2Label.textContent = currentFeature.input2.label;
    input2.placeholder = currentFeature.input2.placeholder;
    input2.value = ''; // 초기화

    // Input 3 세팅 (Select인지 Input인지에 따라 다르게 그림)
    input3Container.innerHTML = ''; // 기존 요소 초기화
    
    // 라벨 공통 생성
    const label = document.createElement('label');
    label.id = 'input3Label';
    label.htmlFor = 'input3';
    label.className = 'block text-sm font-bold text-gray-700 mb-1';
    label.textContent = currentFeature.input3.label;
    input3Container.appendChild(label);

    // 요소 생성 (Select or Input)
    if (currentFeature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3';
        select.required = true;
        select.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-gray-50 focus:bg-white cursor-pointer';
        
        // 옵션 추가
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

// --- 4. 서버 통신 (AI 생성 요청) ---

aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 동적으로 생성된 요소이므로 매번 새로 찾아서 값을 가져옵니다.
    const currentInput1 = document.getElementById('input1').value.trim();
    const currentInput2 = document.getElementById('input2').value.trim();
    const currentInput3 = document.getElementById('input3').value.trim();

    if (!currentInput1 || !currentInput2 || !currentInput3) return;

    // UI 상태 변경 (로딩 보이고 버튼 잠금)
    loadingArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        // 백엔드로 데이터 전송 (이름, 1번값, 2번값, 3번값 전송)
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: currentFeature.title, // '분노조절 이메일' 등
                target: currentInput1,          // 서버 코드와 호환을 위해 변수명 유지
                message: currentInput2,
                tone: currentInput3             // 어조 혹은 강조포인트
            })
        });

        const data = await response.json();

        if (data.success) {
            // 결과 화면 표시 (marked.js로 마크다운 적용)
            resultContent.innerHTML = marked.parse(data.text);
            resultArea.classList.remove('hidden');
        } else {
            alert('AI 뚝딱 에러: ' + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('서버 응답이 없습니다. 서버가 켜져 있는지 확인해 주세요.');
    } finally {
        // UI 상태 복구
        loadingArea.classList.add('hidden');
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// --- 5. 편의 기능 (복사 버튼) ---

copyBtn.addEventListener('click', async () => {
    try {
        const textToCopy = resultContent.innerText;
        await navigator.clipboard.writeText(textToCopy);
        
        // 멋진 토스트 알림 띄우기 (위로 뿅 올라왔다가 사라짐)
        toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
        }, 2500);
    } catch (err) {
        alert('복사에 실패했습니다. 권한을 확인해주세요.');
    }
});

// --- 6. 최초 실행 ---
function init() {
    renderSubFeatures(); // 버튼 그리고
    updateFormFields();  // 첫 번째 기능 폼 세팅
}

init();
