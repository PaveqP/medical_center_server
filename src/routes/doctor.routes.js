const Router = require("express");
const controller = require("../controllers/doctor.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/doctor', authenticateToken, controller.getDoctor)

module.exports = router;