// --- 1. 설정값 (카테고리별 동적 데이터) ---
// 향후 카테고리를 추가하고 싶다면 이 배열에 새로운 객체를 추가하기만 하면 됩니다. (확장성 고려)
const categories = [
    {
        id: 'business',
        name: '🏢 비즈니스/이메일',
        targetLabel: '받는 사람 (직급/이름)',
        targetPlaceholder: '예: 영업팀 김팀장님',
        messageLabel: '전달할 핵심 내용',
        messagePlaceholder: '예: 내일 회의 일정을 오후 3시로 미룰 수 있을까요?',
        tones: ['정중하고 격식 있게', '부드럽고 친절하게', '단호하고 명확하게', '간결하고 핵심만']
    },
    {
        id: 'school',
        name: '🏫 과제/요약',
        targetLabel: '제출 대상 (교수님/강사님)',
        targetPlaceholder: '예: 마케팅원론 박교수님',
        messageLabel: '과제 주제 또는 요약할 내용',
        messagePlaceholder: '예: 이번 학기 팀 프로젝트 진행 상황 보고',
        tones: ['학술적이고 전문적으로', '창의적이고 설득력 있게', '핵심 위주로 깔끔하게']
    },
    {
        id: 'relationship',
        name: '💌 인간관계(거절/사과)',
        targetLabel: '대상 (친구/지인)',
        targetPlaceholder: '예: 주말 모임에 초대한 동창',
        messageLabel: '상황 설명',
        messagePlaceholder: '예: 선약이 있어서 못 간다고 부드럽게 거절해 줘',
        tones: ['진심 어린 사과와 함께', '가볍고 유쾌하게 넘기듯', '상처받지 않게 완곡하게']
    },
    {
        id: 'usedMarket',
        name: '🏪 중고거래',
        targetLabel: '거래 대상',
        targetPlaceholder: '예: 당근마켓 구매자',
        messageLabel: '전달할 메시지',
        messagePlaceholder: '예: 네고 불가라고 확실히 말해줘. 찔러보기 사절.',
        tones: ['친절하고 둥글게', '단호하고 철벽 치듯', '쿨하고 짧게']
    }
];

// --- 2. HTML 요소(DOM) 가져오기 ---
const categoryTabsContainer = document.getElementById('categoryTabs');
const targetLabel = document.getElementById('targetLabel');
const targetInput = document.getElementById('target');
const messageLabel = document.getElementById('messageLabel');
const messageInput = document.getElementById('message');
const toneSelect = document.getElementById('tone');
const aiForm = document.getElementById('aiForm');
const loadingArea = document.getElementById('loadingArea');
const resultArea = document.getElementById('resultArea');
const resultContent = document.getElementById('resultContent');
const copyBtn = document.getElementById('copyBtn');
const retryBtn = document.getElementById('retryBtn');
const toast = document.getElementById('toast');

// 현재 선택된 카테고리를 추적하는 변수 (기본값은 첫 번째 카테고리)
let currentCategory = categories[0];

// --- 3. UI 렌더링 함수 ---

// (1) 카테고리 탭 버튼 생성
function renderTabs() {
    categoryTabsContainer.innerHTML = ''; // 기존 탭 초기화
    
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = category.name;
        // 선택된 탭과 아닌 탭의 스타일을 다르게 적용
        btn.className = `px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
            currentCategory.id === category.id 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`;
        
        // 탭 클릭 이벤트: 선택된 카테고리를 변경하고 입력 폼을 업데이트
        btn.addEventListener('click', () => {
            currentCategory = category;
            renderTabs(); // 탭 색상 변경을 위해 다시 렌더링
            updateFormFields(); // 입력 폼 동적 업데이트
        });
        
        categoryTabsContainer.appendChild(btn);
    });
}

// (2) 선택된 카테고리에 맞게 입력 폼 동적 변경
function updateFormFields() {
    targetLabel.textContent = currentCategory.targetLabel;
    targetInput.placeholder = currentCategory.targetPlaceholder;
    targetInput.value = ''; // 탭 변경 시 기존 입력값 초기화
    
    messageLabel.textContent = currentCategory.messageLabel;
    messageInput.placeholder = currentCategory.messagePlaceholder;
    messageInput.value = '';

    toneSelect.innerHTML = ''; // 기존 어조 옵션 초기화
    currentCategory.tones.forEach(tone => {
        const option = document.createElement('option');
        option.value = tone;
        option.textContent = tone;
        toneSelect.appendChild(option);
    });
}

// --- 4. API 통신 및 이벤트 처리 ---

// (1) 폼 제출 이벤트 (AI 생성 요청)
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const targetValue = targetInput.value.trim();
    const messageValue = messageInput.value.trim();
    const toneValue = toneSelect.value;

    if (!targetValue || !messageValue) return;

    // 로딩 화면 표시 및 결과창 숨김
    loadingArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    aiForm.classList.add('opacity-50', 'pointer-events-none'); // 입력 폼 비활성화

    try {
        // 서버(server.js)의 /api/generate 주소로 데이터 전송
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                category: currentCategory.name, // 선택된 탭의 이름
                target: targetValue,
                message: messageValue,
                tone: toneValue
            })
        });

        const data = await response.json();

        if (data.success) {
            // marked.js를 사용하여 마크다운 텍스트를 깔끔한 HTML로 변환하여 출력
            resultContent.innerHTML = marked.parse(data.text);
            resultArea.classList.remove('hidden');
        } else {
            alert('오류 발생: ' + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert('서버와 통신할 수 없습니다. 서버가 켜져 있는지 확인해 주세요.');
    } finally {
        // 통신이 끝나면 로딩 숨기고 폼 다시 활성화
        loadingArea.classList.add('hidden');
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
        // 결과창으로 스크롤 부드럽게 이동
        resultArea.scrollIntoView({ behavior: 'smooth' });
    }
});

// (2) 복사 버튼 클릭 이벤트 (클립보드 복사)
copyBtn.addEventListener('click', async () => {
    try {
        // HTML 태그를 제외한 순수 텍스트만 복사
        const textToCopy = resultContent.innerText; 
        await navigator.clipboard.writeText(textToCopy);
        
        // 토스트 알림 표시 (3초 후 사라짐)
        toast.classList.remove('opacity-0');
        setTimeout(() => {
            toast.classList.add('opacity-0');
        }, 3000);
    } catch (err) {
        alert('복사에 실패했습니다. 브라우저 설정을 확인해 주세요.');
    }
});

// (3) 다시 돌리기 버튼 클릭 이벤트
retryBtn.addEventListener('click', () => {
    // 숨겨진 submit 버튼을 강제로 클릭하는 효과 (이전 입력값 그대로 다시 요청)
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.click();
});

// --- 5. 초기화 (페이지 로드 시 최초 1회 실행) ---
function init() {
    renderTabs();
    updateFormFields();
}

init();
