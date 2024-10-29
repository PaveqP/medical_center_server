const db = require("../database/connection");

class Patient{
    async getPatientByCredentials(email){
        try {
            const result = await db.query('SELECT * FROM patient WHERE email = ?', [email])
            return result[0]
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return null
        }
    }

    async addNewPatient(email, password){
        try {
            const newUser = await db.query('INSERT INTO patient (email, password) VALUES (?, ?)', [email, password]);
            console.log(!!newUser)
            return !!newUser
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            return 
        }
    }

    async getPatientById(id){
        try {
            const user = await db.query('SELECT * FROM patient WHERE id = ?', [id])
            return user[0][0]
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return 
        }
    }
}


module.exports = new Patient()