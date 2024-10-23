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

    getPatientById(id){

    }
}


module.exports = new Patient()