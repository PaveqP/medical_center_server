const doctorModel = require('../models/doctor.model');

class doctorController {

  constructor() {
  }

  async getDoctor(req, res) {
    try {
        const id = req.user.id  
        const user = await doctorModel.getDoctorById(id)
        res.json(user)
    } catch (error) {
      console.error('Ошибка при аутентификации', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new doctorController()