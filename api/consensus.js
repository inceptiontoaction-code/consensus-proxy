export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const query = req.query.query;

  try {
    const url = `https://api.consensus.app/v1/quick_search?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": process.env.CONSENSUS_API_KEY,
      },
    });

    const text = await response.text();
    
    return res.status(200).json({
      status: response.status,
      body: text
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
