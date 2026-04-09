export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const query = req.query.query;

  console.log("Query received:", query);
  console.log("API Key exists:", !!process.env.CONSENSUS_API_KEY);

  if (!query) {
    return res.status(400).json({ error: "query parameter is required" });
  }

  try {
    const url = `https://api.consensus.app/v1/quick_search?query=${encodeURIComponent(query)}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.CONSENSUS_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Consensus response status:", response.status);
    const data = await response.json();
    console.log("Consensus response:", JSON.stringify(data));
    return res.status(response.status).json(data);

  } catch (err) {
    console.log("Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
