// --- 1. 다국어 언어 팩 (LANG_PACKAGE) ---
const LANG_PACKAGE = {
    ko: {
        ui: {
            title: '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>AI 뚝딱',
            subtitle: '빈칸만 채우면 일잘러의 텍스트가 완성됩니다.',
            submitBtn: '<i class="fa-solid fa-bolt mr-2 text-yellow-400"></i> ✨ 3초 만에 텍스트 뽑기',
            loadingText: '상황에 맞는 최적의 단어를 고르고 있습니다...',
            resultTitle: '<i class="fa-solid fa-check-double mr-1"></i>완성된 결과물',
            copyBtn: '📋 바로 복사해서 쓰기',
            toastMsg: '<i class="fa-solid fa-circle-check text-green-400 mr-2 text-lg"></i> <span class="font-medium">복사 완료! Ctrl+V로 붙여넣으세요.</span>',
            alertEmpty: '모든 빈칸을 채워주세요.',
            alertError: 'AI 뚝딱 에러: ',
            alertServer: '서버 응답이 없습니다. 서버가 켜져 있는지 확인해 주세요.'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 비즈니스/이메일',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: '메모 심폐소생기', desc: '두서없는 메모를 완벽한 문서로',
                        input1: { label: '어떤 형태의 문서로 만들까요?', placeholder: '예: 주간업무보고, 회의록, 기획서 초안', type: 'text' },
                        input2: { label: '날것의 메모 또는 녹음 변환 텍스트 복붙', placeholder: '예: 클로바노트 회의 녹음 텍스트 복붙, 또는 "회의결과 1. 예산 삭감됨..."', type: 'textarea' },
                        input3: { label: '가장 강조해야 할 포인트', type: 'text', placeholder: '예: 일정이 연기된 사유를 부드럽게 강조' }
                    },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: '분노조절 이메일', desc: '감정은 빼고 할 말은 다 하는',
                        input1: { label: '누구에게 보내나요?', placeholder: '예: 영업팀 김팀장님', type: 'text' },
                        input2: { label: '진짜 하고 싶은 말 (날것 그대로 작성)', placeholder: '예: 내일까지 기획서 달라고 3번이나 말했는데 왜 안 주시나요.', type: 'textarea' },
                        input3: { label: '포장지 온도 선택', type: 'select', options: [ { value: '🙇‍♂️납작 엎드리기 (최대한 정중하게)', text: '🙇‍♂️납작 엎드리기 (최대한 정중하게)' }, { value: '👔감정 0% 드라이하게 (사무적으로)', text: '👔감정 0% 드라이하게 (사무적으로)' }, { value: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)', text: '🗡️웃으면서 뼈 때리기 (부드럽게 압박)' } ] }
                    },
                    { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: '프로 사과문', desc: '핑계 없이 깔끔한 수습의 정석',
                        input1: { label: '어떤 사고가 발생했나요?', placeholder: '예: 어제 발송한 대량 이메일에 첨부파일 누락됨', type: 'text' },
                        input2: { label: '나의 수습 대안 (해결책)', placeholder: '예: 오늘 오전 중으로 파일 첨부하여 재발송하고 사과 메일 따로 보내겠습니다.', type: 'textarea' },
                        input3: { label: '대상 및 톤앤매너', type: 'select', options: [ { value: '🏢내부 상사용 (빠르고 명확한 보고)', text: '🏢내부 상사용 (빠르고 명확한 보고)' }, { value: '🤝외부 거래처용 (정중하고 철저한 사과)', text: '🤝외부 거래처용 (정중하고 철저한 사과)' } ] }
                    }
                ]
            },
            {
                categoryId: 'school', categoryName: '🏫 과제/요약',
                subFeatures: [
                    { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: '리포트 심폐소생', desc: '초안을 완벽한 리포트로',
                        input1: { label: '제출 대상', placeholder: '예: 깐깐한 전공 교수님', type: 'text' },
                        input2: { label: '날것의 초안 복붙', placeholder: '예: 서론은 대충 이렇게 쓰고... 본론1은 이거임...', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🎓학술적이고 논리적으로', text: '🎓학술적이고 논리적으로' }, { value: '📝핵심만 개조식으로', text: '📝핵심만 개조식으로' } ] }
                    },
                    { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: '발표 대본 변환', desc: '자료를 자연스러운 대본으로',
                        input1: { label: '발표 시간 및 타겟', placeholder: '예: 5분, 대학생', type: 'text' },
                        input2: { label: '발표 자료 텍스트', placeholder: '예: PPT에 들어갈 내용들 복붙...', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🎙️전문적인 프레젠테이션', text: '🎙️전문적인 프레젠테이션' }, { value: '💬청중과 소통하는 친근한 톤', text: '💬청중과 소통하는 친근한 톤' } ] }
                    },
                    { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: '자소서 영혼 주입기', desc: '초라한 경험을 빛나는 성과로',
                        input1: { label: '지원 직무/기업', placeholder: '예: 네이버 마케팅', type: 'text' },
                        input2: { label: '나의 초라한 경험 나열', placeholder: '예: 카페 알바 6개월, 동아리 회장 했음...', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🔥열정과 패기 넘치게', text: '🔥열정과 패기 넘치게' }, { value: '📊데이터/성과 중심으로', text: '📊데이터/성과 중심으로' } ] }
                    }
                ]
            },
            {
                categoryId: 'relationship', categoryName: '💌 인간관계',
                subFeatures: [
                    { id: 'reject', apiId: '철벽 방어 거절문', icon: '🛡️', title: '철벽 방어 거절문', desc: '상처 없이 확실하게 거절하기',
                        input1: { label: '거절할 대상', placeholder: '예: 돈 빌려달라는 친구', type: 'text' },
                        input2: { label: '진짜 속마음/거절 사유', placeholder: '예: 나도 지금 돈 없어. 미안해.', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '☀️둥글둥글 완곡하게', text: '☀️둥글둥글 완곡하게' }, { value: '🧊차갑고 깍듯하게 선 긋기', text: '🧊차갑고 깍듯하게 선 긋기' } ] }
                    },
                    { id: 'greet', apiId: '센스있는 인사/축하', icon: '🎉', title: '센스있는 인사/축하', desc: '마음을 담은 따뜻한 메시지',
                        input1: { label: '받는 사람 및 상황', placeholder: '예: 안 친한 직장 동료 결혼식', type: 'text' },
                        input2: { label: '꼭 포함할 내용', placeholder: '예: 참석 못해서 미안하다, 축의금 보냈다', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🌸따뜻하고 감동적으로', text: '🌸따뜻하고 감동적으로' }, { value: '👔예의 바르고 격식 있게', text: '👔예의 바르고 격식 있게' } ] }
                    },
                    { id: 'apologyPersonal', apiId: '진심 어린 사과문', icon: '🙇', title: '진심 어린 사과문', desc: '관계 회복을 위한 사과의 정석',
                        input1: { label: '사과할 대상', placeholder: '예: 화난 애인', type: 'text' },
                        input2: { label: '잘못한 내용', placeholder: '예: 연락 안 하고 게임하다가 잠들었어', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🥺변명 없이 납작 엎드리기', text: '🥺변명 없이 납작 엎드리기' }, { value: '🗣️상황 설명과 함께 진중하게', text: '🗣️상황 설명과 함께 진중하게' } ] }
                    }
                ]
            },
            {
                categoryId: 'market', categoryName: '🏪 중고거래',
                subFeatures: [
                    { id: 'marketReject', apiId: '당근 진상 퇴치기', icon: '🛑', title: '당근 진상 퇴치기', desc: '스트레스 없는 중고거래',
                        input1: { label: '상황', placeholder: '예: 본문 안 읽고 무리한 네고 요구', type: 'text' },
                        input2: { label: '전달할 팩트', placeholder: '예: 네고 안 된다고 본문에 써놨습니다. 안 팔아요.', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🛡️단호하게 철벽 방어', text: '🛡️단호하게 철벽 방어' }, { value: '🤝기분 상하지 않게 타이르기', text: '🤝기분 상하지 않게 타이르기' } ] }
                    },
                    { id: 'marketSell', apiId: '매력적인 판매글', icon: '💰', title: '매력적인 판매글', desc: '조회수 폭발하는 당근 게시글',
                        input1: { label: '파는 물건 이름', placeholder: '예: 아이패드 프로 5세대', type: 'text' },
                        input2: { label: '물건의 특징 및 하자', placeholder: '예: 1년 썼고, 모서리 찍힘 살짝 있음. 박스 풀세트', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '✨뽐뿌 오는 감성글', text: '✨뽐뿌 오는 감성글' }, { value: '📋신뢰감 주는 스펙 나열글', text: '📋신뢰감 주는 스펙 나열글' } ] }
                    },
                    { id: 'bossReview', apiId: '사장님 리뷰 답글', icon: '🌟', title: '사장님 리뷰 답글', desc: '리뷰 관리의 정석',
                        input1: { label: '고객 리뷰 별점', placeholder: '예: 1점', type: 'text' },
                        input2: { label: '고객이 쓴 리뷰 내용', placeholder: '예: 배달이 너무 늦고 음식이 다 식었어요', type: 'textarea' },
                        input3: { label: '어조 선택', type: 'select', options: [ { value: '🏥CS 정석의 정중한 사과/대처', text: '🏥CS 정석의 정중한 사과/대처' }, { value: '🙏단골을 만드는 따뜻한 감사 인사', text: '🙏단골을 만드는 따뜻한 감사 인사' } ] }
                    }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 엑셀/시트',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: '함수 수식 뚝딱이', desc: '말로 하면 수식으로 변환',
                        input1: { label: '내 데이터 상황', placeholder: '예: A열은 이름, B열은 실적', type: 'text' },
                        input2: { label: '원하는 결과', placeholder: '예: 실적이 80점 이상인 사람 수 구하기', type: 'textarea' },
                        input3: { label: '사용 프로그램', type: 'select', options: [ { value: '🟢MS 엑셀', text: '🟢MS 엑셀' }, { value: '🟡구글 스프레드시트', text: '🟡구글 스프레드시트' } ] }
                    },
                    { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: '외계어 수식 해독기', desc: '복잡한 수식과 에러 분석',
                        input1: { label: '해석할 수식/에러', placeholder: '예: =VLOOKUP(...) 또는 #N/A 에러', type: 'text' },
                        input2: { label: '궁금한 점', placeholder: '예: 무슨 뜻인지 설명해줘, 혹은 왜 에러가 나?', type: 'textarea' },
                        input3: { label: '이해 수준', type: 'select', options: [ { value: '👶초보자용(친절한 비유)', text: '👶초보자용(친절한 비유)' }, { value: '🧑‍💻실무자용(핵심만 간결히)', text: '🧑‍💻실무자용(핵심만 간결히)' } ] }
                    },
                    { id: 'excelMacro', apiId: '반복작업 매크로', icon: '🤖', title: '반복작업 매크로', desc: 'VBA / Apps Script 코드 생성',
                        input1: { label: '사용 환경', placeholder: '예: 🔵엑셀 VBA 또는 🟡구글 Apps Script', type: 'text' },
                        input2: { label: '자동화할 작업 설명', placeholder: '예: 부서별로 시트를 쪼개서 각각 저장해줘', type: 'textarea' },
                        input3: { label: '코드 스타일', type: 'select', options: [ { value: '📝친절한 주석 포함', text: '📝친절한 주석 포함' }, { value: '⚡코드만 깔끔하게', text: '⚡코드만 깔끔하게' } ] }
                    }
                ]
            }
        ]
    },
    en: {
        ui: {
            title: '<i class="fa-solid fa-wand-magic-sparkles mr-2"></i>QuickFix AI',
            subtitle: 'Fill in the blanks, and let AI do the professional writing for you.',
            submitBtn: '<i class="fa-solid fa-bolt mr-2 text-yellow-400"></i> ✨ Generate in 3 seconds',
            loadingText: 'Selecting the perfect words for your situation...',
            resultTitle: '<i class="fa-solid fa-check-double mr-1"></i>Generated Result',
            copyBtn: '📋 Copy to Clipboard',
            toastMsg: '<i class="fa-solid fa-circle-check text-green-400 mr-2 text-lg"></i> <span class="font-medium">Copied! Ready to paste.</span>',
            alertEmpty: 'Please fill in all fields.',
            alertError: 'QuickFix AI Error: ',
            alertServer: 'No response from server. Please check if the server is running.'
        },
        appData: [
            {
                categoryId: 'business', categoryName: '🏢 Business/Email',
                subFeatures: [
                    { id: 'memoRevive', apiId: '메모 심폐소생기', icon: '📝', title: 'Memo Polisher', desc: 'Turn messy notes into structured docs',
                        input1: { label: 'Document Type', placeholder: 'e.g., Weekly Report, Meeting Minutes', type: 'text' },
                        input2: { label: 'Raw Notes or Voice Transcript', placeholder: 'e.g., "Meeting results: 1. Budget cut..."', type: 'textarea' },
                        input3: { label: 'Key Point to Emphasize', type: 'text', placeholder: 'e.g., Softly highlight the reason for the delay' }
                    },
                    { id: 'angryEmail', apiId: '분노조절 이메일', icon: '✉️', title: 'Emotionless Email', desc: 'Speak your mind, professionally',
                        input1: { label: 'Recipient', placeholder: 'e.g., Sales Team Manager', type: 'text' },
                        input2: { label: 'Your Raw Thoughts', placeholder: 'e.g., I asked for the proposal 3 times, why is it delayed?!', type: 'textarea' },
                        input3: { label: 'Desired Tone', type: 'select', options: [ { value: '🙇‍♂️Extremely Polite (Submissive)', text: '🙇‍♂️Extremely Polite' }, { value: '👔0% Emotion (Dry & Objective)', text: '👔0% Emotion (Dry & Objective)' }, { value: '🗡️Polite but Firm (Passive Aggressive)', text: '🗡️Polite but Firm (Passive Aggressive)' } ] }
                    },
                    { id: 'apology', apiId: '프로 사과문', icon: '🚨', title: 'Pro Apology', desc: 'Clean crisis management',
                        input1: { label: 'What happened?', placeholder: 'e.g., Forgot to attach a file in yesterday\'s mass email', type: 'text' },
                        input2: { label: 'Solution / Action Plan', placeholder: 'e.g., Will resend the email with the attachment by this morning', type: 'textarea' },
                        input3: { label: 'Audience', type: 'select', options: [ { value: '🏢Internal Boss (Quick & Clear)', text: '🏢Internal Boss (Quick & Clear)' }, { value: '🤝External Client (Formal & Thorough)', text: '🤝External Client (Formal & Thorough)' } ] }
                    }
                ]
            },
            {
                categoryId: 'school', categoryName: '🏫 Academics',
                subFeatures: [
                    { id: 'reportReview', apiId: '리포트 심폐소생', icon: '📄', title: 'Report Refiner', desc: 'From rough draft to A+ paper',
                        input1: { label: 'Target Audience', placeholder: 'e.g., Strict University Professor', type: 'text' },
                        input2: { label: 'Rough Draft Paste', placeholder: 'e.g., Intro is like this... Body 1 is...', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🎓Highly Academic & Logical', text: '🎓Highly Academic & Logical' }, { value: '📝Bullet Points (Concise)', text: '📝Bullet Points (Concise)' } ] }
                    },
                    { id: 'speechConvert', apiId: '발표 대본 변환', icon: '🗣️', title: 'Speech Script Converter', desc: 'Natural spoken scripts from slides',
                        input1: { label: 'Time Limit & Audience', placeholder: 'e.g., 5 mins, College students', type: 'text' },
                        input2: { label: 'Presentation Material Text', placeholder: 'e.g., Paste PPT contents here...', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🎙️Professional Presentation', text: '🎙️Professional Presentation' }, { value: '💬Friendly & Engaging', text: '💬Friendly & Engaging' } ] }
                    },
                    { id: 'coverLetter', apiId: '자소서 영혼 주입기', icon: '✍️', title: 'Resume Enhancer', desc: 'Turn basic duties into impact',
                        input1: { label: 'Target Role / Company', placeholder: 'e.g., Marketing at Google', type: 'text' },
                        input2: { label: 'Raw Experience List', placeholder: 'e.g., Cafe part-time 6 mos, Club president...', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🔥Passionate & Energetic', text: '🔥Passionate & Energetic' }, { value: '📊Data & Impact Driven', text: '📊Data & Impact Driven' } ] }
                    }
                ]
            },
            {
                categoryId: 'relationship', categoryName: '💌 Relationships',
                subFeatures: [
                    { id: 'reject', apiId: '철벽 방어 거절문', icon: '🛡️', title: 'Firm Rejection', desc: 'Say NO without the guilt',
                        input1: { label: 'Recipient', placeholder: 'e.g., A friend asking for money', type: 'text' },
                        input2: { label: 'Real Reason', placeholder: 'e.g., I am broke right now too. Sorry.', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '☀️Soft & Gentle', text: '☀️Soft & Gentle' }, { value: '🧊Cold & Professional Boundries', text: '🧊Cold & Professional Boundries' } ] }
                    },
                    { id: 'greet', apiId: '센스있는 인사/축하', icon: '🎉', title: 'Tactful Greetings', desc: 'Warm messages for any occasion',
                        input1: { label: 'Recipient & Situation', placeholder: 'e.g., Coworker\'s wedding (not close)', type: 'text' },
                        input2: { label: 'Must Include', placeholder: 'e.g., Can\'t attend, but sent a gift', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🌸Warm & Touching', text: '🌸Warm & Touching' }, { value: '👔Polite & Formal', text: '👔Polite & Formal' } ] }
                    },
                    { id: 'apologyPersonal', apiId: '진심 어린 사과문', icon: '🙇', title: 'Sincere Apology', desc: 'How to say sorry properly',
                        input1: { label: 'Recipient', placeholder: 'e.g., Angry partner', type: 'text' },
                        input2: { label: 'The Mistake', placeholder: 'e.g., Fell asleep while playing games without texting', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🥺No Excuses (Full surrender)', text: '🥺No Excuses (Full surrender)' }, { value: '🗣️Serious with Context', text: '🗣️Serious with Context' } ] }
                    }
                ]
            },
            {
                categoryId: 'market', categoryName: '🏪 Marketplace',
                subFeatures: [
                    { id: 'marketReject', apiId: '당근 진상 퇴치기', icon: '🛑', title: 'Lowballer Defense', desc: 'Stress-free online selling',
                        input1: { label: 'Situation', placeholder: 'e.g., Asking for unreasonable discount', type: 'text' },
                        input2: { label: 'The Facts', placeholder: 'e.g., I wrote "Price is FIRM" in the post. No.', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🛡️Firm & Direct', text: '🛡️Firm & Direct' }, { value: '🤝Polite Decline', text: '🤝Polite Decline' } ] }
                    },
                    { id: 'marketSell', apiId: '매력적인 판매글', icon: '💰', title: 'Catchy Listing', desc: 'Listings that sell fast',
                        input1: { label: 'Item Name', placeholder: 'e.g., iPad Pro 5th Gen', type: 'text' },
                        input2: { label: 'Features & Flaws', placeholder: 'e.g., Used 1 yr, tiny scratch. NWT, full box.', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '✨Exciting & Hyped', text: '✨Exciting & Hyped' }, { value: '📋Specs & Trust Focused', text: '📋Specs & Trust Focused' } ] }
                    },
                    { id: 'bossReview', apiId: '사장님 리뷰 답글', icon: '🌟', title: 'Review Reply', desc: 'Perfect CS for your business',
                        input1: { label: 'Rating', placeholder: 'e.g., 1 Star', type: 'text' },
                        input2: { label: 'Customer Review', placeholder: 'e.g., Delivery was late and food was cold', type: 'textarea' },
                        input3: { label: 'Tone', type: 'select', options: [ { value: '🏥Professional CS Apology', text: '🏥Professional CS Apology' }, { value: '🙏Warm Thank You (For loyal fans)', text: '🙏Warm Thank You' } ] }
                    }
                ]
            },
            {
                categoryId: 'excel', categoryName: '📊 Excel/Sheets',
                subFeatures: [
                    { id: 'excelFormula', apiId: '함수 수식 뚝딱이', icon: '🧮', title: 'Formula Generator', desc: 'Describe it, get the formula',
                        input1: { label: 'My Data Context', placeholder: 'e.g., Col A is Name, Col B is Score', type: 'text' },
                        input2: { label: 'Desired Result', placeholder: 'e.g., Count people with score > 80', type: 'textarea' },
                        input3: { label: 'Program', type: 'select', options: [ { value: '🟢MS Excel', text: '🟢MS Excel' }, { value: '🟡Google Sheets', text: '🟡Google Sheets' } ] }
                    },
                    { id: 'excelDecode', apiId: '외계어 수식 해독기', icon: '🔍', title: 'Formula Decoder', desc: 'Understand complex errors',
                        input1: { label: 'Formula or Error', placeholder: 'e.g., =VLOOKUP(...) or #N/A', type: 'text' },
                        input2: { label: 'Your Question', placeholder: 'e.g., What does this do? Why the error?', type: 'textarea' },
                        input3: { label: 'My Level', type: 'select', options: [ { value: '👶Beginner (Use metaphors)', text: '👶Beginner (Use metaphors)' }, { value: '🧑‍💻Professional (Brief & core)', text: '🧑‍💻Professional (Brief & core)' } ] }
                    },
                    { id: 'excelMacro', apiId: '반복작업 매크로', icon: '🤖', title: 'Macro Automation', desc: 'VBA / Apps Script Code',
                        input1: { label: 'Environment', placeholder: 'e.g., 🔵Excel VBA or 🟡Google Apps Script', type: 'text' },
                        input2: { label: 'Task Description', placeholder: 'e.g., Split sheets by department and save', type: 'textarea' },
                        input3: { label: 'Code Style', type: 'select', options: [ { value: '📝Include Friendly Comments', text: '📝Include Friendly Comments' }, { value: '⚡Clean Code Only', text: '⚡Clean Code Only' } ] }
                    }
                ]
            }
        ]
    }
};


// --- 2. 전역 상태 변수 ---
let currentLang = 'ko'; // 기본 언어
let appData = LANG_PACKAGE[currentLang].appData;
let currentCategory = appData[0];
let currentFeature = currentCategory.subFeatures[0];

// 드래그 상태 변수
let isDragging = false;
let hasDragged = false;
let startX;
let scrollLeft;


// --- 3. HTML 요소(DOM) 가져오기 ---
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


// --- 4. 초기 언어 셋팅 및 UI 텍스트 업데이트 로직 ---
function initLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    // lang 파라미터가 'en'이면 영문 모드로 전환
    if (langParam === 'en') {
        currentLang = 'en';
    } else {
        currentLang = 'ko';
    }

    // 데이터 팩 교체
    appData = LANG_PACKAGE[currentLang].appData;
    const uiText = LANG_PACKAGE[currentLang].ui;

    // index.html의 고정 텍스트들을 선택한 언어로 갈아끼움
    const titleEl = document.querySelector('header h1');
    const subtitleEl = document.querySelector('header p');
    const submitBtnEl = document.getElementById('submitBtn');
    const loadingTextEl = loadingArea.querySelector('p');
    const resultTitleEl = resultArea.querySelector('h3');
    
    if (titleEl) titleEl.innerHTML = uiText.title;
    if (subtitleEl) subtitleEl.textContent = uiText.subtitle;
    if (submitBtnEl) submitBtnEl.innerHTML = uiText.submitBtn;
    if (loadingTextEl) loadingTextEl.textContent = uiText.loadingText;
    if (resultTitleEl) resultTitleEl.innerHTML = uiText.resultTitle;
    if (copyBtn) copyBtn.innerHTML = uiText.copyBtn;
    if (toast) toast.innerHTML = uiText.toastMsg;
}


// --- 5. 화면 그리기 (렌더링 로직) ---
function renderMainTabs() {
    mainTabsContainer.innerHTML = ''; 

    appData.forEach(category => {
        const btn = document.createElement('button');
        const isSelected = currentCategory.categoryId === category.categoryId;
        
        btn.className = `whitespace-nowrap flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200 ${
            isSelected 
            ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' 
            : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`;
        btn.textContent = category.categoryName;

        btn.addEventListener('click', (e) => {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            currentCategory = category;
            currentFeature = category.subFeatures[0]; 
            renderMainTabs(); 
            renderSubFeatures(); 
            updateFormFields(); 
        });

        mainTabsContainer.appendChild(btn);
    });
}

// 메인 탭 마우스 드래그 이벤트 연결
mainTabsContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasDragged = false;
    mainTabsContainer.classList.remove('cursor-grab');
    mainTabsContainer.classList.add('cursor-grabbing');
    startX = e.pageX - mainTabsContainer.offsetLeft;
    scrollLeft = mainTabsContainer.scrollLeft;
});
mainTabsContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    mainTabsContainer.classList.add('cursor-grab');
    mainTabsContainer.classList.remove('cursor-grabbing');
});
mainTabsContainer.addEventListener('mouseup', () => {
    isDragging = false;
    mainTabsContainer.classList.add('cursor-grab');
    mainTabsContainer.classList.remove('cursor-grabbing');
});
mainTabsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - mainTabsContainer.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) hasDragged = true; 
    mainTabsContainer.scrollLeft = scrollLeft - walk;
});


function renderSubFeatures() {
    subFeaturesContainer.innerHTML = ''; 

    currentCategory.subFeatures.forEach(feature => {
        const btn = document.createElement('button');
        btn.type = 'button';
        const isSelected = currentFeature.id === feature.id;
        
        btn.className = `p-4 text-center rounded-xl border-2 transition-all duration-200 group flex flex-col items-center justify-center ${
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
            renderSubFeatures(); 
            updateFormFields();  
        });

        subFeaturesContainer.appendChild(btn);
    });
}

function updateFormFields() {
    input1Label.textContent = currentFeature.input1.label;
    input1.placeholder = currentFeature.input1.placeholder;
    input1.value = '';

    input2Label.textContent = currentFeature.input2.label;
    input2.placeholder = currentFeature.input2.placeholder;
    input2.value = '';

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

// --- 6. 서버 통신 (AI 생성 요청) ---
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const uiText = LANG_PACKAGE[currentLang].ui;
    const currentInput1 = document.getElementById('input1').value.trim();
    const currentInput2 = document.getElementById('input2').value.trim();
    const currentInput3 = document.getElementById('input3').value.trim();

    if (!currentInput1 || !currentInput2 || !currentInput3) {
        alert(uiText.alertEmpty);
        return;
    }

    loadingArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    aiForm.classList.add('opacity-50', 'pointer-events-none');

    try {
        const response = await fetch('http://localhost:3000/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subCategory: currentFeature.apiId, // 백엔드가 인식하는 고유 ID 전달
                input1: currentInput1,
                input2: currentInput2,
                input3: currentInput3,
                lang: currentLang // 현재 언어 상태를 서버로 전송
            })
        });

        const data = await response.json();

        if (data.success) {
            resultContent.innerHTML = marked.parse(data.text);
            resultArea.classList.remove('hidden');
        } else {
            alert(uiText.alertError + data.message);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert(uiText.alertServer);
    } finally {
        loadingArea.classList.add('hidden');
        aiForm.classList.remove('opacity-50', 'pointer-events-none');
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// --- 7. 편의 기능 (복사 버튼) ---
copyBtn.addEventListener('click', async () => {
    try {
        const textToCopy = resultContent.innerText;
        await navigator.clipboard.writeText(textToCopy);
        
        toast.classList.remove('opacity-0', 'translate-y-4');
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-4');
        }, 2500);
    } catch (err) {
        // 복사 실패 처리
        alert(currentLang === 'en' ? 'Failed to copy.' : '복사에 실패했습니다.');
    }
});

// --- 8. URL 파라미터 처리 (초기 탭 연동) ---
function handleUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    const subParam = urlParams.get('sub');

    if (tabParam) {
        const targetCategory = appData.find(cat => cat.categoryId === tabParam);
        if (targetCategory) {
            currentCategory = targetCategory;
            currentFeature = targetCategory.subFeatures[0]; 
            
            if (subParam) {
                const targetSubFeature = targetCategory.subFeatures.find(sub => sub.id === subParam);
                if (targetSubFeature) {
                    currentFeature = targetSubFeature;
                }
            }
        }
    }
}

// --- 9. 최초 실행 (초기화) ---
function init() {
    initLanguage();       // 1. URL 언어 파라미터 확인 및 화면 글자 교체
    handleUrlParams();    // 2. 파라미터에 맞는 탭 선택
    renderMainTabs();     // 3. 카테고리 탭 생성
    renderSubFeatures();  // 4. 서브 기능 생성
    updateFormFields();   // 5. 입력 폼 셋팅
}

init();