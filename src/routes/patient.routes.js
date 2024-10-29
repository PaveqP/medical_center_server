const Router = require("express");
const controller = require("../controllers/patient.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/patient', authenticateToken, controller.getPatient)

module.exports = router;