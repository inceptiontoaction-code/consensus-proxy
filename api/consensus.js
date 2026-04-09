export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  return res.status(200).json({
    keyExists: !!process.env.CONSENSUS_API_KEY,
    keyLength: process.env.CONSENSUS_API_KEY?.length,
    keyPreview: process.env.CONSENSUS_API_KEY?.substring(0, 8) + "...",
    query: req.query.query
  });
}
