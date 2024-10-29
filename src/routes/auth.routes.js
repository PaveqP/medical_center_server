const Router = require("express");
const {check} = require("express-validator");
const controller = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = new Router();

router.post('/registration', [
    check('email', 'Поле email не может быть пустым').notEmpty(),
    check('password', 'Поле пароль не может быть пустым').notEmpty()
],controller.registration);
router.post('/stuff/registration', [
    check('name', 'Поле имя не может быть пустым').notEmpty(),
    check('surname', 'Поле фамилия не может быть пустым').notEmpty(),
    check('email', 'Поле email не может быть пустым').notEmpty(),
    check('password', 'Поле пароль не может быть пустым').notEmpty()
],controller.doctorRegistration);
router.post('/login', controller.login);
router.post('/stuff/login', controller.doctorLogin);
router.post('/token', authenticateToken, controller.token)

module.exports = router;
