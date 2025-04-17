const axios = require("axios");

const getCryptoMarketChart = async (req, res) => {
  try {
    const { coinId, days } = req.query;
    // console.log(coinId);

    if (!coinId || !days) {
      return res.status(400).json({
        error: "coinId and days are required as query parameters.",
      });
    }

    const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
      coinId
    )}/market_chart`;
    const params = { vs_currency: "usd", days };

    const response = await axios.get(url, { params });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};

const getTopGainers = async (req, res) => {
  try {
    const { vs_currency = "usd", per_page = 10, page = 1 } = req.query;
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency,
          order: "price_change_percentage_24h_desc",
          per_page,
          page,
          price_change_percentage: "24h",
        },
      }
    );

    const topGainers = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }));

    return res.status(200).json(topGainers);
  } catch (error) {
    console.error("Error fetching top gainers:", error.message);
    return res.status(500).json({ error: "Failed to fetch top gainers" });
  }
};

const getTopLosers = async (req, res) => {
  try {
    const { vs_currency = "usd", per_page = 10, page } = req.query; // Get values from frontend

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency,
          order: "price_change_percentage_24h_asc",
          per_page,
          page,
          price_change_percentage: "24h",
        },
      }
    );

    const topLosers = response.data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    }));

    return res.status(200).json(topLosers);
  } catch (error) {
    console.error("Error fetching top losers:", error.message);
    return res.status(500).json({ error: "Failed to fetch top losers" });
  }
};

module.exports = { getCryptoMarketChart, getTopGainers, getTopLosers };
