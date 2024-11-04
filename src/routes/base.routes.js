const Router = require("express");
const controller = require("../controllers/base.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/specializations', authenticateToken, controller.getSpecializations)

module.exports = router;