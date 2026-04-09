export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "query parameter is required" });
  }

  try {
    const response = await fetch(
      `https://api.consensus.app/v1/quick_search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.CONSENSUS_API_KEY,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
