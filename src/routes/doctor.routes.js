const Router = require("express");
const controller = require("../controllers/doctor.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.get('/doctors', authenticateToken, controller.getDoctorsList)
router.get('/doctors/profile', authenticateToken, controller.getDoctor)
router.get('/doctors/specialization/:specialization', authenticateToken, controller.getDoctorBySpecialization)
router.get('/doctors/:id/timetable', authenticateToken, controller.getDoctorTimeTable)
router.get('/doctors/:id/consultations', authenticateToken, controller.getDoctorConsultations)
router.get('/doctors/consultations/future', authenticateToken, controller.getDoctorFutureConsultations)
router.get('/doctors/consultations/past', authenticateToken, controller.getDoctorPastConsultations)
router.get('/doctors/consultation/:id', authenticateToken, controller.getDoctorConsultationById)
router.post('/doctors/consultation/complete', authenticateToken, controller.completeConsultation)

module.exports = router;