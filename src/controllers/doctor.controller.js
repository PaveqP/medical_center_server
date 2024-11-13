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
      console.error('Ошибка при получении данных специалиста', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorBySpecialization(req, res) {
    try {
        const specialization = req.params.specialization;
        const users = await doctorModel.getDoctorBySpecialization(specialization)
        res.json(users)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorTimeTable(req, res) {
    try {
        const id = req.params.id;
        const users = await doctorModel.getDoctorsTimetable(id)
        res.json(users)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorConsultations(req, res) {
    try {
        const id = req.params.id;
        const consultations = await doctorModel.getDoctorConsultations(id)
        res.json(consultations)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorsList(req, res) {
    try {
        const user = await doctorModel.getDoctorsList()
        res.json(user)
    } catch (error) {
      console.error('Ошибка при получении списка врачей', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorFutureConsultations(req, res) {
    try {
        const id = req.user.id;
        const consultations = await doctorModel.getDoctorConsultations(id, 'future')
        res.json(consultations)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorPastConsultations(req, res) {
    try {
        const id = req.user.id;
        const consultations = await doctorModel.getDoctorConsultations(id, 'past')
        res.json(consultations)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getDoctorConsultationById(req, res) {
    try {
        const id = req.params.id;
        const consultation = await doctorModel.getDoctorConsultationById(id)
        res.json(consultation)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async completeConsultation(req, res) {
    try {
        const {id, diagnosis, recommendations} = req.body;
        const consultation = await doctorModel.completeConsultation(id, diagnosis, recommendations)
        res.json(consultation)
    } catch (error) {
      console.error('Ошибка при получении данных', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new doctorController()