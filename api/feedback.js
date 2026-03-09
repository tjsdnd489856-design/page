const { createClient } = require('@supabase/supabase-js');

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

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase 환경변수가 설정되지 않아 피드백을 저장하지 못했습니다.");
      return res.status(200).json({ success: true, message: 'Supabase 미설정 (성공으로 간주)' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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