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
      console.error('Ошибка при получении данных пользователя', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async createConsultation(req, res) {
    try {
        const id = req.user.id  
        const consultationData = req.body
        const data = {id_patient: id, ...consultationData}
        const postResult = await patientModel.createConsultation(data)
        res.json(postResult)
    } catch (error) {
      console.error('Ошибка при создании записи', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new patientController()