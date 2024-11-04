const Router = require("express");
const controller = require("../controllers/patient.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/patient/profile', authenticateToken, controller.getPatient)
router.post('/patient/consultation/create', authenticateToken, controller.createConsultation)

module.exports = router;