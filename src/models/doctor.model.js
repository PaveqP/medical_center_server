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

    async getDoctorBySpecialization(specialization){
        try {
            const spec_id = await db.query('SELECT id FROM specialization WHERE name = ?', [specialization])
            const users = await db.query('SELECT * FROM doctor WHERE id_specialization = ?', [spec_id[0][0].id])
            return users[0]
        } catch (error) {
            console.error("Ошибка при получении данных специалиста:", error);
            return 
        }
    }

    async getDoctorsList(){
        try {
            const users = await db.query('SELECT * FROM doctor')
            return users[0]
        } catch (error) {
            console.error("Ошибка при получении списка врачей:", error);
            return 
        }
    }

    async getDoctorsTimetable(id){
        try {
            const timeSlots = await db.query('SELECT t.* FROM doctor_timetable dt JOIN timetable t ON dt.id_timetable = t.id WHERE dt.id_doctor = ?', [id])
            return timeSlots[0] 
        } catch (error) {
            console.error("Ошибка при получении графика работы:", error);
            return 
        }
    }

    async getDoctorConsultations(id){
        try {
            const consultations = await db.query('SELECT * FROM consultation WHERE id_doctor = ?', [id])
            return consultations[0] 
        } catch (error) {
            console.error("Ошибка при получении списка записей:", error);
            return 
        }
    }
}


module.exports = new Doctor()