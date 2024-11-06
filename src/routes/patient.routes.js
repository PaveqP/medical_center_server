const Router = require("express");
const controller = require("../controllers/patient.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/patient/profile', authenticateToken, controller.getPatient)
router.get('/patient/visits', authenticateToken, controller.getPatientVisits)
router.get('/patient/visits/past', authenticateToken, controller.getPatientPastVisits)
router.get('/patient/visits/future', authenticateToken, controller.getPatientFutureVisits)
router.post('/patient/consultation/create', authenticateToken, controller.createConsultation)

module.exports = router;