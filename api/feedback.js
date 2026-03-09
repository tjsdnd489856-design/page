const { createClient } = require('@supabase/supabase-js');

// --- Supabase 초기화 (제공된 고정 키 사용) ---
const supabaseUrl = 'https://nqfjhryizcnkkcjnujps.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xZmpocnlpemNua2tjam51anBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjYyMjksImV4cCI6MjA4ODYwMjIyOX0.6Do14Tr2DBH_yCw1JVvrRMmetIglDjJVNWYa1VAlmzc';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { feedbackId, rating } = req.body;

    if (!feedbackId || rating === undefined) {
      return res.status(400).json({ success: false, message: '잘못된 요청입니다.' });
    }

    // DB 저장 에러 등으로 임시 생성된 ID인 경우 무시
    if (String(feedbackId).startsWith('log_err_')) {
       return res.status(200).json({ success: true, message: 'DB 저장 실패 로그에 대한 피드백 무시됨' });
    }

    // chat_logs 테이블에서 해당 id의 feedback 컬럼 업데이트
    const { error } = await supabase
      .from('chat_logs')
      .update({ feedback: rating })
      .eq('id', feedbackId);

    if (error) {
      console.error("Supabase Feedback Update Error:", error);
      return res.status(500).json({ success: false, message: 'DB 업데이트 실패' });
    }

    return res.status(200).json({ success: true, message: '피드백 저장 완료' });

  } catch (error) {
    console.error("Feedback API Error:", error);
    return res.status(500).json({ success: false, message: '서버 내부 오류' });
  }
};