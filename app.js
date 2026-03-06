// --- [보안 경고: API 키 관리 주의] ---
// 현재 코드는 백엔드 서버 없이 브라우저(프론트엔드)에서 직접 Google Gemini API를 호출합니다.
// GitHub 등 공개된 장소에 이 파일이 올라가면 API 키가 유출될 위험이 있습니다!
// 나중에 Vercel 등으로 정식 배포하실 때는 Vercel Serverless Function 등을 통해 환경변수로 숨기는 것을 권장합니다.
const GEMINI_API_KEY = 'YOUR_API_KEY_HERE'; // 🚨 TODO: 여기에 발급받은 실제 API 키를 넣으세요! (테스트용으로만 사용)


// --- 1. AI 프롬프트 (기존 백엔드 서버에서 프론트엔드로 이동) ---
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
    '분노조절 이메일': (i1, i2, i3) => `Act as a senior manager. [Recipient:${i1}], [Content:${i2}], [Tone:${i3}].\n[Example] Input: Marketing/Late report/Firm -> Output: "Subject: Urgent: Report Status\nHi, please provide an update on the delayed report immediately."\nNow write.`,
    '메모 심폐소생기': (i1, i2, i3) => `Act as a consultant. [Type:${i1}], [Notes:${i2}], [Focus:${i3}].\n[Example] Input: Weekly Report/Bug fixed/Speed -> Output: "## Weekly Update\n- **Resolved bugs swiftly** ensuring no downtime."\nNow write.`,
    '프로 사과문': (i1, i2, i3) => `Act as PR manager. [Issue:${i1}], [Solution:${i2}], [Audience:${i3}].\n[Example] Input: Missing attachment/Resend/Client -> Output: "I sincerely apologize for the missing file. Please find it attached here."\nNow write.`,
    '리포트 심폐소생': (i1, i2, i3) => `Act as an academic tutor. [Audience:${i1}], [Draft:${i2}], [Tone:${i3}].\n[Example] Input: Professor/Messy intro/Academic -> Output: "This paper aims to explore the theoretical implications..."\nNow write.`,
    '발표 대본 변환': (i1, i2, i3) => `Act as a speech coach. [Target:${i1}], [Slides:${i2}], [Tone:${i3}].\n[Example] Input: 5 mins/AI rules/Engaging -> Output: "Hey everyone! AI is everywhere today, let's dive right in!"\nNow write.`,
    '자소서 영혼 주입기': (i1, i2, i3) => `Act as a tech recruiter. [Role:${i1}], [Exp:${i2}], [Tone:${i3}].\n[Example] Input: Marketing/Cafe job/Data-driven -> Output: "Boosted customer retention by 15% through optimized service at a busy cafe."\nNow write.`,
    '철벽 방어 거절문': (i1, i2, i3) => `Act as an assertiveness coach. [Recipient:${i1}], [Reason:${i2}], [Tone:${i3}].\n[Example] Input: Friend/No money/Firm -> Output: "I can't lend you money right now as I'm on a strict budget. Thanks for understanding."\nNow write.`,
    '센스있는 인사/축하': (i1, i2, i3) => `Act as a greeting expert. [Situation:${i1}], [Details:${i2}], [Tone:${i3}].\n[Example] Input: Wedding/Can't attend/Warm -> Output: "So happy for your wedding! Sorry I can't be there, wishing you the absolute best."\nNow write.`,
    '진심 어린 사과문': (i1, i2, i3) => `Act as a counselor. [Recipient:${i1}], [Mistake:${i2}], [Tone:${i3}].\n[Example] Input: Partner/Missed call/Sincere -> Output: "I am truly sorry for missing your call and making you worry. I'll do better."\nNow write.`,
    '당근 진상 퇴치기': (i1, i2, i3) => `Act as an expert seller. [Situation:${i1}], [Facts:${i2}], [Tone:${i3}].\n[Example] Input: Lowballer/Price is FIRM/Direct -> Output: "As stated, the price is FIRM. I cannot accept lower offers."\nNow write.`,
    '매력적인 판매글': (i1, i2, i3) => `Act as a copywriter. [Item:${i1}], [Features:${i2}], [Tone:${i3}].\n[Example] Input: iPad/Minor scratch/Trustworthy -> Output: "Selling my iPad. Works perfectly, just one minor scratch. NWT condition otherwise."\nNow write.`,
    '사장님 리뷰 답글': (i1, i2, i3) => `Act as a CS Manager. [Rating:${i1}], [Review:${i2}], [Tone:${i3}].\n[Example] Input: 1 Star/Cold food/Professional -> Output: "We sincerely apologize for the cold food. Please contact us directly to resolve this."\nNow write.`,
    '함수 수식 뚝딱이': (i1, i2, i3) => `Act as a Data Analyst. [Context:${i1}], [Goal:${i2}], [Program:${i3}].\n[Example] Input: Col A/Sum/Excel -> Output: "\`\`\`excel\n=SUM(A:A)\n\`\`\`\nThis formula sums up all values in column A."\nNow write.`,
    '외계어 수식 해독기': (i1, i2, i3) => `Act as an Excel Instructor. [Formula:${i1}], [Question:${i2}], [Level:${i3}].\n[Example] Input: =SUM/What is this?/Beginner -> Output: "It simply adds numbers together, just like a calculator!"\nNow write.`,
    '반복작업 매크로': (i1, i2, i3) => `Act as an Automation Engineer. [Env:${i1}], [Task:${i2}], [Style:${i3}].\n[Example] Input: VBA/Copy sheet/With comments -> Output: "\`\`\`vba\n' Copies the active sheet\nActiveSheet.Copy\n\`\`\`"\nNow write.`,
    'SQL 쿼리 짜기': (i1, i2, i3) => `Act as a Senior DBA. [Table:${i1}], [Data Needed:${i2}], [DBMS:${i3}].\n[Example] Input: users/age > 30/MySQL -> Output: "\`\`\`sql\nSELECT * FROM users WHERE age > 30;\n\`\`\`\nRetrieves users older than 30."\nNow write.`,
    '정규식(Regex) 설명': (i1, i2, i3) => `Act as a Developer. [Pattern:${i1}], [Request:${i2}], [Level:${i3}].\n[Example] Input: email/give regex/beginner -> Output: "\`\`\`regex\n^\\S+@\\S+\\.\\S+$\n\`\`\`\nMatches basic email formats."\nNow write.`,
    '인스타그램 해시태그': (i1, i2, i3) => `Act as a Social Media Manager. [Topic:${i1}], [Target:${i2}], [Vibe:${i3}].\n[Example] Input: Coffee shop/Gen Z/Aesthetic -> Output: "#CafeVibes #AestheticCafe #CoffeeLover #GenZ #Daily"\nNow write.`,
    '광고 카피라이팅': (i1, i2, i3) => `Act as an Ad Copywriter. [Product:${i1}], [Hook:${i2}], [Platform:${i3}].\n[Example] Input: Vacuum/Strong suction/Facebook -> Output: "Say goodbye to dust! Experience unmatched suction power today. 🧹✨"\nNow write.`
  }
};

const GLOBAL_RULES = {
  ko: `\n\n[필수 요구사항]\n- 불필요한 인사말이나 서론("네, 작성해 드릴게요", "다음은~" 등)을 절대 쓰지 마세요.\n- 바로 복사해서 사용할 수 있는 최종 결과물만 출력하세요.`,
  en: `\n\n[GLOBAL RULE]\n- Absolutely NO conversational fillers like "Sure, here is..." or "I hope this helps".\n- Output ONLY the final result.`
};

// --- 2. 다국어 완벽 번역 객체 (translations) ---
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
            alertError: '채티폭스 에러: ',
            fetchError: '데이터를 가져오는 중 오류가 발생했습니다. API 키를 확인해주세요.',
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
                categoryId: 'school', categoryName: '🏫 과제/요약',
                subFeatures: [
                    { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: '리포트 심폐소생', desc: '초안을 완벽한 리포트로', input1: { label: '제출 대상', placeholder: '예: 깐깐한 교수님', type: 'text' }, input2: { label: '초안 복붙', placeholder: '예: 서론은 대충 이렇게 쓰고...', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [ { value: '🎓학술적이고 논리적으로', text: '🎓학술적이고 논리적으로' }, { value: '📝핵심만 개조식으로', text: '📝핵심만 개조식으로' } ] } },
                    { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: '발표 대본 변환', desc: '자료를 자연스러운 대본으로', input1: { label: '발표 시간 및 타겟', placeholder: '예: 5분, 대학생', type: 'text' }, input2: { label: '발표 자료 텍스트', placeholder: '예: PPT 내용 복붙', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [ { value: '🎙️전문적인 프레젠테이션', text: '🎙️전문적인 프레젠테이션' }, { value: '💬청중과 소통하는 톤', text: '💬청중과 소통하는 톤' } ] } },
                    { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: '자소서 영혼 주입기', desc: '초라한 경험을 성과로', input1: { label: '지원 직무', placeholder: '예: 네이버 마케팅', type: 'text' }, input2: { label: '나의 경험 나열', placeholder: '예: 카페 알바 6개월...', type: 'textarea' }, input3: { label: '어조 선택', type: 'select', options: [ { value: '🔥열정과 패기 넘치게', text: '🔥열정과 패기 넘치게' }, { value: '📊데이터 중심으로', text: '📊데이터 중심으로' } ] } }
                ]
            },
            {
                categoryId: 'relationship', categoryName: '💌 인간관계',
                subFeatures: [
                    { id: 'reject', apiId: '철벽 방어 거절문', icon: '🛡️', title: '철벽 방어 거절문', desc: '상처 없이 거절하기', input1: { label: '거절 대상', placeholder: '예: 돈 빌려달라는 친구', type: 'text' }, input2: { label: '진짜 속마음', placeholder: '예: 나도 돈 없어', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '☀️둥글둥글하게', text: '☀️둥글둥글하게' }, { value: '🧊차갑게 선 긋기', text: '🧊차갑게 선 긋기' } ] } },
                    { id: 'greet', apiId: '센스있는 인사/축하', icon: '🎉', title: '센스있는 인사/축하', desc: '마음을 담은 메시지', input1: { label: '상황', placeholder: '예: 안 친한 동료 결혼식', type: 'text' }, input2: { label: '포함할 내용', placeholder: '예: 못가서 미안하다, 축의금 보냄', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🌸따뜻하게', text: '🌸따뜻하게' }, { value: '👔격식 있게', text: '👔격식 있게' } ] } },
                    { id: 'apologyPersonal', apiId: '진심 어린 사과문', icon: '🙇', title: '진심 어린 사과문', desc: '사과의 정석', input1: { label: '사과 대상', placeholder: '예: 화난 애인', type: 'text' }, input2: { label: '잘못한 내용', placeholder: '예: 게임하다 잠듦', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🥺납작 엎드리기', text: '🥺납작 엎드리기' }, { value: '🗣️상황 설명과 함께', text: '🗣️상황 설명과 함께' } ] } }
                ]
            },
            {
                categoryId: 'market', categoryName: '🏪 중고거래',
                subFeatures: [
                    { id: 'marketReject', apiId: '당근 진상 퇴치기', icon: '🛑', title: '당근 진상 퇴치기', desc: '스트레스 없는 거래', input1: { label: '상황', placeholder: '예: 무리한 네고 요구', type: 'text' }, input2: { label: '팩트', placeholder: '예: 네고 불가라고 적어둠', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🛡️단호하게', text: '🛡️단호하게' }, { value: '🤝타이르기', text: '🤝타이르기' } ] } },
                    { id: 'marketSell', apiId: '매력적인 판매글', icon: '💰', title: '매력적인 판매글', desc: '조회수 폭발 게시글', input1: { label: '물건 이름', placeholder: '예: 아이패드', type: 'text' }, input2: { label: '특징/하자', placeholder: '예: 생활기스 있음', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '✨뽐뿌 오는 감성', text: '✨뽐뿌 오는 감성' }, { value: '📋스펙 나열', text: '📋스펙 나열' } ] } },
                    { id: 'bossReview', apiId: '사장님 리뷰 답글', icon: '🌟', title: '사장님 리뷰 답글', desc: '리뷰 관리의 정석', input1: { label: '별점', placeholder: '예: 1점', type: 'text' }, input2: { label: '고객 리뷰', placeholder: '예: 배달이 늦어요', type: 'textarea' }, input3: { label: '어조', type: 'select', options: [ { value: '🏥정중한 사과', text: '🏥정중한 사과' }, { value: '🙏따뜻한 감사', text: '🙏따뜻한 감사' } ] } }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 엑셀/시트',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: '함수 수식 뚝딱이', desc: '말로 하면 수식으로', input1: { label: '데이터 상황', placeholder: '예: A열은 이름, B열은 실적', type: 'text' }, input2: { label: '원하는 결과', placeholder: '예: 실적 80 이상 인원수', type: 'textarea' }, input3: { label: '프로그램', type: 'select', options: [ { value: '🟢MS 엑셀', text: '🟢MS 엑셀' }, { value: '🟡구글 시트', text: '🟡구글 시트' } ] } },
                    { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: '외계어 수식 해독기', desc: '복잡한 수식 분석', input1: { label: '수식/에러', placeholder: '예: =VLOOKUP(...)', type: 'text' }, input2: { label: '궁금한 점', placeholder: '예: 무슨 뜻이야?', type: 'textarea' }, input3: { label: '이해 수준', type: 'select', options: [ { value: '👶초보자용', text: '👶초보자용' }, { value: '🧑‍💻실무자용', text: '🧑‍💻실무자용' } ] } },
                    { id: 'excelMacro', apiId: '반복작업 매크로', icon: '🤖', title: '반복작업 매크로', desc: 'VBA/Apps Script 생성', input1: { label: '환경', placeholder: '예: 엑셀 VBA', type: 'text' }, input2: { label: '작업 설명', placeholder: '예: 부서별 시트 쪼개기', type: 'textarea' }, input3: { label: '스타일', type: 'select', options: [ { value: '📝주석 포함', text: '📝주석 포함' }, { value: '⚡코드만 깔끔하게', text: '⚡코드만 깔끔하게' } ] } }
                ]
            },
            {
                categoryId: 'dev', categoryName: '💻 개발/코딩',
                subFeatures: [
                    { id: 'sqlGen', apiId: 'SQL 쿼리 짜기', icon: '🗄️', title: 'SQL 쿼리 짜기', desc: '원하는 데이터를 쿼리로', input1: { label: '테이블 구조', placeholder: '예: users(id, name, age)', type: 'text' }, input2: { label: '원하는 데이터', placeholder: '예: 나이가 30 이상인 사람 이름만', type: 'textarea' }, input3: { label: 'DBMS 종류', type: 'select', options: [ { value: '🐬 MySQL', text: '🐬 MySQL' }, { value: '🐘 PostgreSQL', text: '🐘 PostgreSQL' }, { value: '🍃 Oracle', text: '🐘 Oracle' } ] } },
                    { id: 'regexGen', apiId: '정규식(Regex) 설명', icon: '🧩', title: '정규식 해독/생성', desc: '어려운 정규식을 쉽게', input1: { label: '상황 또는 패턴', placeholder: '예: 이메일 추출하기, 또는 ^[a-z]+$', type: 'text' }, input2: { label: '요청사항', placeholder: '예: 정규식 만들어줘, 혹은 설명해줘', type: 'textarea' }, input3: { label: '이해 수준', type: 'select', options: [ { value: '👶 정규식 초보', text: '👶 정규식 초보' }, { value: '🧑‍💻 시니어 개발자', text: '🧑‍💻 시니어 개발자' } ] } }
                ]
            },
            {
                categoryId: 'marketing', categoryName: '📱 마케팅/SNS',
                subFeatures: [
                    { id: 'hashGen', apiId: '인스타그램 해시태그', icon: '🏷️', title: '해시태그 생성기', desc: '조회수 터지는 태그', input1: { label: '주제/사진 설명', placeholder: '예: 강남역 감성 카페 사진', type: 'text' }, input2: { label: '타겟 고객', placeholder: '예: 20대 데이트 코스 찾는 커플', type: 'textarea' }, input3: { label: '분위기/톤', type: 'text', placeholder: '예: 감성적이고 힙한 느낌' } },
                    { id: 'adCopy', apiId: '광고 카피라이팅', icon: '🎯', title: '광고 카피라이팅', desc: '클릭을 부르는 문구', input1: { label: '제품/서비스', placeholder: '예: 무선 청소기', type: 'text' }, input2: { label: '핵심 소구 포인트', placeholder: '예: 가볍지만 흡입력은 괴물', type: 'textarea' }, input3: { label: '광고 매체', type: 'select', options: [ { value: '📘 페이스북/인스타', text: '📘 페이스북/인스타' }, { value: '🟢 네이버 배너', text: '🟢 네이버 배너' }, { value: '📨 카카오톡 푸시', text: '📨 카카오톡 푸시' } ] } }
                ]
            }
        ]
    },
    en: {
        ui: {
            docTitle: '🦊 ChattyFox - AI Workspace',
            logoText: '<span class="text-slate-800 dark:text-white tracking-tight">Chatty</span><span class="text-orange-500 tracking-tight">Fox</span>',
            subtitle: 'Let the smart fox handle your professional writing in seconds.',
            historyTitle: '<i class="fa-solid fa-history mr-2 text-primary"></i>Recent History',
            historyEmpty: 'No recent generations found.',
            submitBtn: '<i class="fa-solid fa-bolt mr-2 text-yellow-300"></i> ✨ Generate in 3s',
            resultTitle: '<i class="fa-solid fa-pen-to-square mr-1"></i>Result (Click to Edit)',
            copyBtn: '<i class="fa-regular fa-copy mr-2"></i> Copy to Clipboard',
            toastMsg: 'Copied! Ready to paste.',
            alertEmpty: 'Please fill all fields.',
            alertError: 'ChattyFox Error: ',
            fetchError: 'An error occurred while fetching data. Check your API key.',
            feedbackThanks: 'Feedback received. Thanks! 🦊'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 Business',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: 'Memo Polisher', desc: 'Messy notes to pro docs', input1: { label: 'Doc Type', placeholder: 'e.g., Weekly Report', type: 'text' }, input2: { label: 'Raw Notes', placeholder: 'e.g., Budget cut...', type: 'textarea' }, input3: { label: 'Key Point', type: 'text', placeholder: 'e.g., Soften the delay' } },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: 'Firm Email', desc: 'Speak your mind, politely', input1: { label: 'Recipient', placeholder: 'e.g., Sales Manager', type: 'text' }, input2: { label: 'Raw Thoughts', placeholder: 'e.g., Why is it late?!', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🙇‍♂️Very Polite', text: '🙇‍♂️Very Polite' }, { value: '👔Dry & Objective', text: '👔Dry & Objective' }, { value: '🗡️Polite but Firm', text: '🗡️Polite but Firm' } ] } },
                    { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: 'Pro Apology', desc: 'Crisis management', input1: { label: 'Issue', placeholder: 'e.g., Missing file', type: 'text' }, input2: { label: 'Solution', placeholder: 'e.g., Resend now', type: 'textarea' }, input3: { label: 'Audience', type: 'select', options: [ { value: '🏢Internal Boss', text: '🏢Internal Boss' }, { value: '🤝External Client', text: '🤝External Client' } ] } }
                ]
            },
            {
                categoryId: 'school', categoryName: '🏫 Academics',
                subFeatures: [
                    { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: 'Report Refiner', desc: 'Draft to A+ paper', input1: { label: 'Audience', placeholder: 'e.g., Strict Prof', type: 'text' }, input2: { label: 'Draft', placeholder: 'e.g., Intro is...', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🎓Highly Academic', text: '🎓Highly Academic' }, { value: '📝Concise Bullets', text: '📝Concise Bullets' } ] } },
                    { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: 'Speech Script', desc: 'Slides to spoken words', input1: { label: 'Time & Target', placeholder: 'e.g., 5 mins, Students', type: 'text' }, input2: { label: 'Slide Text', placeholder: 'e.g., PPT contents', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🎙️Professional', text: '🎙️Professional' }, { value: '💬Engaging', text: '💬Engaging' } ] } },
                    { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: 'Resume Enhancer', desc: 'Duties to impact', input1: { label: 'Role', placeholder: 'e.g., Marketing', type: 'text' }, input2: { label: 'Raw Exp', placeholder: 'e.g., Cafe part-time...', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🔥Passionate', text: '🔥Passionate' }, { value: '📊Data Driven', text: '📊Data Driven' } ] } }
                ]
            },
            {
                categoryId: 'relationship', categoryName: '💌 Relations',
                subFeatures: [
                    { id: 'reject', apiId: '철벽 방어 거절문', icon: '🛡️', title: 'Firm Rejection', desc: 'Say NO guilt-free', input1: { label: 'Recipient', placeholder: 'e.g., Friend', type: 'text' }, input2: { label: 'Real Reason', placeholder: 'e.g., I have no money', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '☀️Soft', text: '☀️Soft' }, { value: '🧊Cold Boundary', text: '🧊Cold Boundary' } ] } },
                    { id: 'greet', apiId: '센스있는 인사/축하', icon: '🎉', title: 'Tactful Greetings', desc: 'Warm messages', input1: { label: 'Situation', placeholder: 'e.g., Coworker wedding', type: 'text' }, input2: { label: 'Must Include', placeholder: 'e.g., Sent a gift', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🌸Warm', text: '🌸Warm' }, { value: '👔Formal', text: '👔Formal' } ] } },
                    { id: 'apologyPersonal', apiId: '진심 어린 사과문', icon: '🙇', title: 'Sincere Apology', desc: 'Say sorry properly', input1: { label: 'Recipient', placeholder: 'e.g., Partner', type: 'text' }, input2: { label: 'Mistake', placeholder: 'e.g., Fell asleep', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🥺No Excuses', text: '🥺No Excuses' }, { value: '🗣️With Context', text: '🗣️With Context' } ] } }
                ]
            },
            {
                categoryId: 'market', categoryName: '🏪 Marketplace',
                subFeatures: [
                    { id: 'marketReject', apiId: '당근 진상 퇴치기', icon: '🛑', title: 'Lowballer Defense', desc: 'Stress-free selling', input1: { label: 'Situation', placeholder: 'e.g., Unreasonable offer', type: 'text' }, input2: { label: 'Facts', placeholder: 'e.g., Price is FIRM', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🛡️Firm', text: '🛡️Firm' }, { value: '🤝Polite Decline', text: '🤝Polite Decline' } ] } },
                    { id: 'marketSell', apiId: '매력적인 판매글', icon: '💰', title: 'Catchy Listing', desc: 'Listings that sell', input1: { label: 'Item', placeholder: 'e.g., iPad', type: 'text' }, input2: { label: 'Flaws', placeholder: 'e.g., Tiny scratch', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '✨Hyped', text: '✨Hyped' }, { value: '📋Specs Focused', text: '📋Specs Focused' } ] } },
                    { id: 'bossReview', apiId: '사장님 리뷰 답글', icon: '🌟', title: 'Review Reply', desc: 'Perfect CS', input1: { label: 'Rating', placeholder: 'e.g., 1 Star', type: 'text' }, input2: { label: 'Review', placeholder: 'e.g., Cold food', type: 'textarea' }, input3: { label: 'Tone', type: 'select', options: [ { value: '🏥Pro CS Apology', text: '🏥Pro CS Apology' }, { value: '🙏Warm Thank You', text: '🙏Warm Thank You' } ] } }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 Excel/Sheets',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: 'Formula Gen', desc: 'Describe it, get formula', input1: { label: 'Context', placeholder: 'e.g., Col A Name', type: 'text' }, input2: { label: 'Result', placeholder: 'e.g., Count > 80', type: 'textarea' }, input3: { label: 'Program', type: 'select', options: [ { value: '🟢Excel', text: '🟢Excel' }, { value: '🟡Sheets', text: '🟡Sheets' } ] } },
                    { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: 'Decoder', desc: 'Understand errors', input1: { label: 'Error', placeholder: 'e.g., =VLOOKUP(...)', type: 'text' }, input2: { label: 'Question', placeholder: 'e.g., What does this do?', type: 'textarea' }, input3: { label: 'Level', type: 'select', options: [ { value: '👶Beginner', text: '👶Beginner' }, { value: '🧑‍💻Pro', text: '🧑‍💻Pro' } ] } },
                    { id: 'excelMacro', apiId: '반복작업 매크로', icon: '🤖', title: 'Macro Auto', desc: 'VBA / Apps Script', input1: { label: 'Env', placeholder: 'e.g., VBA', type: 'text' }, input2: { label: 'Task', placeholder: 'e.g., Split sheets', type: 'textarea' }, input3: { label: 'Style', type: 'select', options: [ { value: '📝With Comments', text: '📝With Comments' }, { value: '⚡Clean Code', text: '⚡Clean Code' } ] } }
                ]
            },
            {
                categoryId: 'dev', categoryName: '💻 Dev Helper',
                subFeatures: [
                    { id: 'sqlGen', apiId: 'SQL 쿼리 짜기', icon: '🗄️', title: 'SQL Generator', desc: 'Generate SQL queries', input1: { label: 'Table Schema', placeholder: 'e.g., users(id, name, age)', type: 'text' }, input2: { label: 'Data Needed', placeholder: 'e.g., name where age > 30', type: 'textarea' }, input3: { label: 'DBMS', type: 'select', options: [ { value: '🐬 MySQL', text: '🐬 MySQL' }, { value: '🐘 PostgreSQL', text: '🐘 PostgreSQL' }, { value: '🍃 Oracle', text: '🐘 Oracle' } ] } },
                    { id: 'regexGen', apiId: '정규식(Regex) 설명', icon: '🧩', title: 'Regex Helper', desc: 'Create or explain regex', input1: { label: 'Pattern/Task', placeholder: 'e.g., extract email', type: 'text' }, input2: { label: 'Request', placeholder: 'e.g., create regex for it', type: 'textarea' }, input3: { label: 'Level', type: 'select', options: [ { value: '👶 Beginner', text: '👶 Beginner' }, { value: '🧑‍💻 Senior', text: '🧑‍💻 Senior' } ] } }
                ]
            },
            {
                categoryId: 'marketing', categoryName: '📱 Marketing',
                subFeatures: [
                    { id: 'hashGen', apiId: '인스타그램 해시태그', icon: '🏷️', title: 'Hashtags', desc: 'Viral IG tags', input1: { label: 'Topic/Photo', placeholder: 'e.g., Cozy cafe', type: 'text' }, input2: { label: 'Target', placeholder: 'e.g., Gen Z', type: 'textarea' }, input3: { label: 'Vibe', type: 'text', placeholder: 'e.g., Aesthetic' } },
                    { id: 'adCopy', apiId: '광고 카피라이팅', icon: '🎯', title: 'Ad Copy', desc: 'Click-worthy text', input1: { label: 'Product', placeholder: 'e.g., Vacuum', type: 'text' }, input2: { label: 'Hook', placeholder: 'e.g., Strong suction', type: 'textarea' }, input3: { label: 'Platform', type: 'select', options: [ { value: '📘 Facebook/IG', text: '📘 Facebook/IG' }, { value: '🟢 Web Banner', text: '🟢 Web Banner' }, { value: '📨 Email/Push', text: '📨 Email/Push' } ] } }
                ]
            }
        ]
    }
};

// --- 3. 전역 상태 변수 ---
let currentLang = 'ko'; 
let currentCategoryIndex = 0;
let currentFeatureIndex = 0;

// 드래그 상태
let isDragging = false;
let hasDragged = false;
let startX;
let scrollLeft;

// --- 4. DOM 요소 ---
const mainTabsContainer = document.getElementById('mainTabs');
const subFeaturesContainer = document.getElementById('subFeatures');
const aiForm = document.getElementById('aiForm');

const input1Label = document.getElementById('input1Label');
const input1 = document.getElementById('input1');
const input2Label = document.getElementById('input2Label');
const input2 = document.getElementById('input2');
const input3Container = document.getElementById('input3Container');

// 로딩 스피너 및 결과창 DOM
const resultArea = document.getElementById('resultArea');
const resultSpinner = document.getElementById('resultSpinner');
const resultContent = document.getElementById('resultContent'); 
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// 다크모드 및 히스토리 DOM
const darkModeToggle = document.getElementById('darkModeToggle');
const openHistoryBtn = document.getElementById('openHistoryBtn');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historySidebar = document.getElementById('historySidebar');
const historyList = document.getElementById('historyList');
const historyEmptyMsg = document.getElementById('historyEmptyMsg');
const historyTitle = document.getElementById('historyTitle');

// 피드백 DOM
const btnLike = document.getElementById('btnLike');
const btnDislike = document.getElementById('btnDislike');


// --- 5. 다크모드 로직 ---
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) document.documentElement.classList.add('dark');
    
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isNowDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isNowDark);
    });
}


// --- 6. 완벽한 다국어 동적 UI 업데이트 로직 (setLanguage) ---
function setLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.title = t.ui.docTitle;
    document.getElementById('appLogoText').innerHTML = t.ui.logoText;
    
    document.getElementById('appSubtitle').textContent = t.ui.subtitle;
    document.getElementById('submitBtn').innerHTML = t.ui.submitBtn;
    document.getElementById('resultTitle').innerHTML = t.ui.resultTitle;
    document.getElementById('copyBtn').innerHTML = t.ui.copyBtn;
    document.getElementById('toastMsg').textContent = t.ui.toastMsg;
    historyTitle.innerHTML = t.ui.historyTitle;
    historyEmptyMsg.textContent = t.ui.historyEmpty;

    const btnKo = document.getElementById('btn-ko');
    const btnEn = document.getElementById('btn-en');
    if (lang === 'en') {
        btnEn.className = 'px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 transition-colors';
        btnKo.className = 'px-3 py-1 rounded-full text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors bg-transparent';
    } else {
        btnKo.className = 'px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 transition-colors';
        btnEn.className = 'px-3 py-1 rounded-full text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors bg-transparent';
    }

    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    updateTabContent();
    renderHistory();
}

// --- 7. 화면 그리기 (렌더링) ---
function updateTabContent() {
    renderMainTabs();
    renderSubFeatures();
    updateFormFields();
}

function renderMainTabs() {
    mainTabsContainer.innerHTML = ''; 
    const currentAppData = translations[currentLang].appData;
    
    currentAppData.forEach((category, index) => {
        const btn = document.createElement('button');
        const isSelected = currentCategoryIndex === index;
        
        btn.className = `whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
            isSelected 
            ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500' 
            : 'bg-transparent text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 border-b-2 border-transparent'
        }`;
        btn.textContent = category.categoryName;
        btn.addEventListener('click', (e) => {
            if (hasDragged) { e.preventDefault(); e.stopPropagation(); return; }
            currentCategoryIndex = index;
            currentFeatureIndex = 0; 
            updateTabContent();
        });
        mainTabsContainer.appendChild(btn);
    });
}

mainTabsContainer.addEventListener('mousedown', (e) => {
    isDragging = true; hasDragged = false;
    mainTabsContainer.classList.add('cursor-grabbing');
    startX = e.pageX - mainTabsContainer.offsetLeft;
    scrollLeft = mainTabsContainer.scrollLeft;
});
mainTabsContainer.addEventListener('mouseleave', () => { isDragging = false; mainTabsContainer.classList.remove('cursor-grabbing'); });
mainTabsContainer.addEventListener('mouseup', () => { isDragging = false; mainTabsContainer.classList.remove('cursor-grabbing'); });
mainTabsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const walk = (e.pageX - mainTabsContainer.offsetLeft) - startX;
    if (Math.abs(walk) > 5) hasDragged = true; 
    mainTabsContainer.scrollLeft = scrollLeft - walk;
});


function renderSubFeatures() {
    subFeaturesContainer.innerHTML = ''; 
    const currentAppData = translations[currentLang].appData;
    const features = currentAppData[currentCategoryIndex].subFeatures;

    features.forEach((feature, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = currentFeatureIndex === index;
        
        btn.className = `p-4 text-center rounded-xl border-2 transition-all duration-200 group flex flex-col items-center justify-center ${
            isSelected 
            ? 'border-orange-500 bg-orange-50 dark:bg-slate-800 shadow-md transform scale-[1.02]' 
            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-orange-300 dark:hover:border-orange-400 hover:bg-gray-50 dark:hover:bg-slate-800'
        }`;

        btn.innerHTML = `
            <span class="text-3xl mb-2">${feature.icon}</span>
            <strong class="block text-gray-800 dark:text-slate-200 font-bold mb-1 group-hover:text-orange-500 dark:group-hover:text-orange-400">${feature.title}</strong>
            <span class="text-xs text-gray-500 dark:text-slate-400 break-keep">${feature.desc}</span>
        `;
        btn.addEventListener('click', () => {
            currentFeatureIndex = index;
            updateTabContent();
        });
        subFeaturesContainer.appendChild(btn);
    });
}

function updateFormFields() {
    const currentAppData = translations[currentLang].appData;
    const feature = currentAppData[currentCategoryIndex].subFeatures[currentFeatureIndex];

    input1Label.textContent = feature.input1.label;
    input1.placeholder = feature.input1.placeholder;

    input2Label.textContent = feature.input2.label;
    input2.placeholder = feature.input2.placeholder;

    input3Container.innerHTML = '';
    const label = document.createElement('label');
    label.id = 'input3Label';
    label.className = 'block text-sm font-bold text-gray-700 dark:text-slate-300 mb-1';
    label.textContent = feature.input3.label;
    input3Container.appendChild(label);

    const commonClasses = 'w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none transition bg-gray-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-950 dark:text-white placeholder-gray-400 dark:placeholder-gray-500';

    if (feature.input3.type === 'select') {
        const select = document.createElement('select');
        select.id = 'input3'; select.required = true;
        select.className = commonClasses + ' cursor-pointer';
        feature.input3.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value; option.textContent = opt.text;
            select.appendChild(option);
        });
        input3Container.appendChild(select);
    } else {
        const input = document.createElement('input');
        input.type = 'text'; input.id = 'input3'; input.required = true;
        input.className = commonClasses;
        input.placeholder = feature.input3.placeholder;
        input3Container.appendChild(input);
    }
}


// --- 8. 히스토리 로컬 스토리지 ---
function getHistory() {
    const history = localStorage.getItem('quickfix_history');
    return history ? JSON.parse(history) : [];
}

function saveHistory(text, featureTitle) {
    let history = getHistory();
    const newItem = {
        id: Date.now(),
        title: featureTitle,
        text: text,
        date: new Date().toLocaleString(currentLang === 'ko' ? 'ko-KR' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    history.unshift(newItem); 
    if (history.length > 10) history.pop(); 
    localStorage.setItem('quickfix_history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyEmptyMsg.style.display = 'block';
        return;
    }
    historyEmptyMsg.style.display = 'none';

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold text-primary">${item.title}</span>
                <span class="text-[10px] text-gray-400">${item.date}</span>
            </div>
            <p class="text-xs text-gray-600 dark:text-slate-300 truncate">${item.text.replace(/[#*`]/g, '')}</p>
        `;
        div.addEventListener('click', () => {
            historySidebar.classList.add('translate-x-full');
            resultContent.innerHTML = marked.parse(item.text);
            resultArea.classList.remove('hidden');
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        historyList.appendChild(div);
    });
}

openHistoryBtn.addEventListener('click', () => {
    renderHistory();
    historySidebar.classList.remove('translate-x-full');
});
closeHistoryBtn.addEventListener('click', () => {
    historySidebar.classList.add('translate-x-full');
});


// --- 9. 구글 AI 직접 통신 (서버 의존성 제거 완료) ---
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const uiText = translations[currentLang].ui;
    const feature = translations[currentLang].appData[currentCategoryIndex].subFeatures[currentFeatureIndex];
    
    const currentInput1 = document.getElementById('input1').value.trim();
    const currentInput2 = document.getElementById('input2').value.trim();
    const currentInput3 = document.getElementById('input3').value.trim();

    if (!currentInput1 || !currentInput2 || !currentInput3) {
        alert(uiText.alertEmpty); return;
    }

    // 1. API 키 확인
    if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
        alert("app.js 파일 맨 위에 있는 GEMINI_API_KEY 변수에 실제 API 키를 입력해주세요!");
        return;
    }

    resultArea.classList.remove('hidden');
    resultContent.innerHTML = ''; 
    if (resultSpinner) resultSpinner.classList.remove('hidden');
    
    aiForm.classList.add('opacity-50', 'pointer-events-none');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    try {
        // 2. 프롬프트(명령어) 조립 (기존 서버 로직을 프론트엔드로 가져옴)
        const promptsForLang = SYSTEM_PROMPTS[currentLang];
        const promptGenerator = promptsForLang[feature.apiId];
        const finalPrompt = promptGenerator(currentInput1, currentInput2, currentInput3) + GLOBAL_RULES[currentLang];

        // 3. 구글 제미나이(1.5-flash) API로 직접 요청 발송
        // 요리사(백엔드)를 거치지 않고 바로 구글 본사에 주문을 넣습니다.
        const apiUrl = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\${GEMINI_API_KEY}\`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: finalPrompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API Error:', errorData);
            throw new Error(errorData.error?.message || \`HTTP Status \${response.status}\`);
        }

        const data = await response.json();

        if (resultSpinner) resultSpinner.classList.add('hidden');

        // 4. 구글이 보내준 응답 데이터 구조에 맞게 텍스트 추출
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        if (generatedText) {
            resultContent.innerHTML = marked.parse(generatedText);
            saveHistory(generatedText, feature.title);
        } else {
            alert(uiText.alertError + 'AI가 빈 답변을 반환했습니다.');
        }

    } catch (error) {
        console.error('Direct API Request Failed:', error);
        if (resultSpinner) resultSpinner.classList.add('hidden');
        alert(uiText.fetchError + '\\n(' + error.message + ')');
    } finally {
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
    }
});


// --- 10. 편의 기능 (복사 및 피드백) ---
copyBtn.addEventListener('click', async () => {
    try {
        const textToCopy = resultContent.innerText;
        await navigator.clipboard.writeText(textToCopy);
        toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => { toast.classList.add('opacity-0', 'translate-y-4'); }, 2500);
    } catch (err) {
        alert(currentLang === 'en' ? 'Failed to copy.' : '복사에 실패했습니다.');
    }
});

async function sendFeedback(rating) {
    const text = resultContent.innerText;
    if(!text) return;
    
    // [참고] 백엔드 서버를 제거했으므로, 현재 피드백은 서버로 전송되지 않습니다.
    // 사용자에게는 정상적으로 피드백이 들어갔다는 감사 인사만 출력합니다.
    // 추후 데이터베이스(DB)나 서버리스 함수가 준비되면 이곳에 저장 로직을 추가하세요.
    console.log(\`[피드백 임시 기록] 평가: \${rating}, 내용: \${text.substring(0, 20)}...\`);
    alert(translations[currentLang].ui.feedbackThanks);
}
btnLike.addEventListener('click', () => sendFeedback('like'));
btnDislike.addEventListener('click', () => sendFeedback('dislike'));


// --- 11. 초기화 ---
function init() {
    initDarkMode();
    
    // URL에서 파라미터 감지
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    const targetLang = (langParam === 'en') ? 'en' : 'ko';
    
    const tabParam = urlParams.get('tab');
    if (tabParam) {
        const appData = translations[targetLang].appData;
        const catIdx = appData.findIndex(cat => cat.categoryId === tabParam);
        if (catIdx !== -1) {
            currentCategoryIndex = catIdx;
            
            const subParam = urlParams.get('sub');
            if(subParam) {
                const subIdx = appData[catIdx].subFeatures.findIndex(sub => sub.id === subParam);
                if(subIdx !== -1) currentFeatureIndex = subIdx;
            }
        }
    }
    
    // UI 및 다국어 렌더링 시작
    setLanguage(targetLang); 
}

init();