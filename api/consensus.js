export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const query = req.query.query;

  try {
    const url = `https://api.consensus.app/v1/quick_search?query=${encodeURIComponent(query)}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.CONSENSUS_API_KEY}`,
      },
    });

    const text = await response.text();
    
    return res.status(200).json({
      status: response.status,
      sentKey: `Bearer ${process.env.CONSENSUS_API_KEY?.substring(0, 8)}...`,
      body: text
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
