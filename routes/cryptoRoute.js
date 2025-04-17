const express = require("express");
const router = express.Router();
const {
  getCryptoMarketChart,
  getTopGainers,
  getTopLosers,
} = require("../controller/cryptoController");

router.route("/singlecrypto").get(getCryptoMarketChart);
router.route("/topgainer").get(getTopGainers);
router.route("/toploser").get(getTopLosers);

module.exports = router;
