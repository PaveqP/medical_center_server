const patientModel = require('../models/patient.model');

class patientController {

  constructor() {
  }

  async getPatient(req, res) {
    try {
        const id = req.user.id  
        const user = await patientModel.getPatientById(id)
        res.json(user)
    } catch (error) {
      console.error('Ошибка при аутентификации', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new patientController()