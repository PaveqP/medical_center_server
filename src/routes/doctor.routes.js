const Router = require("express");
const controller = require("../controllers/doctor.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/doctors', authenticateToken, controller.getDoctorsList)
router.get('/doctors/profile', authenticateToken, controller.getDoctor)
router.get('/doctors/specialization/:specialization', authenticateToken, controller.getDoctorBySpecialization)
router.get('/doctors/:id/timetable', authenticateToken, controller.getDoctorTimeTable)
router.get('/doctors/:id/consultations', authenticateToken, controller.getDoctorConsultations)

module.exports = router;