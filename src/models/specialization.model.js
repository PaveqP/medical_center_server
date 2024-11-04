const db = require("../database/connection");

class Specialization{
    async getSpecializations(){
        try {
            const result = await db.query('SELECT * FROM specialization')
            return result[0]
        } catch (error) {
            console.error("Ошибка при получении списка направлений:", error);
            return null
        }
    }
}


module.exports = new Specialization()