const specializationModel = require('../models/specialization.model');
const BaseModel = require('../models/base.model')

class baseController {

  constructor() {
  }

  async getSpecializations(req, res) {
    try {
        const result = await specializationModel.getSpecializations()
        res.json(result)
    } catch (error) {
      console.error('Ошибка при получении списка направлений', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getConclusionById(req, res) {
    try {
        const id = req.params.id
        const result = await BaseModel.getConclusionById(id)
        res.json(result)
    } catch (error) {
      console.error('Ошибка при получении заключения', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new baseController()