const db = require("../database/connection");

class Base{
    async getConclusionById(id){
        try {
            const result = await db.query('SELECT * FROM conclusion WHERE id = ?', [id])
            return result[0][0]
        } catch (error) {
            console.error("Ошибка при получении заключения:", error);
            return null
        }
    }
}


module.exports = new Base()