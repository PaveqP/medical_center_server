const db = require("../database/connection");

class Doctor{
    async getDoctorByCredentials(email){
        try {
            const result = await db.query('SELECT * FROM doctor WHERE email = ?', [email])
            return result[0]
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
            return null
        }
    }

    async addNewDoctor(name, surname, middle_name, email, password, id_specialization, practice, rating, office, id_post, consultation_cost, department){
        try {
            const newUser = await db.query('INSERT INTO doctor (name, surname, middle_name, email, password, id_specialization, practice, rating, office, id_post, consultation_cost, department ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, surname, middle_name, email, password, id_specialization, practice, rating, office, id_post, consultation_cost, department]);
            console.log(!!newUser)
            return !!newUser
        } catch (error) {
            console.error("Ошибка при добавлении пользователя:", error);
            return 
        }
    }

    async getDoctorById(id){
        try {
            const user = await db.query('SELECT * FROM doctor WHERE id = ?', [id])
            return user[0][0]
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            return 
        }
    }
}


module.exports = new Doctor()