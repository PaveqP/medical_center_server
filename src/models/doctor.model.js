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

    async getDoctorConsultations(id, consultationTimeType = null){
        try {
            let consultations = null
            const currentDate = new Date()
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            if(!consultationTimeType){
                consultations = await db.query('SELECT * FROM consultation WHERE id_doctor = ?', [id])
            } else if (consultationTimeType === 'past'){
                consultations = await db.query('SELECT * FROM consultation WHERE id_doctor = ? AND date < ?', [id, formattedDate])
            } else if (consultationTimeType === 'future'){
                consultations = await db.query('SELECT * FROM consultation WHERE id_doctor = ? AND date > ?', [id, formattedDate])
            }
            
            if (consultations && consultations[0] && consultations[0].length > 0) {
                return consultations[0];
            } else {
                console.log("Посещения не найдены");
                return null;
            }
        } catch (error) {
            console.error("Ошибка при получении списка записей:", error);
            return 
        }
    }

    async getDoctorConsultationById(id){
        try {
            const consultation = await db.query('SELECT * FROM consultation WHERE id = ?', [id])
            const patient = await db.query('SELECT * FROM patient WHERE id = ?', [consultation[0][0].id_patient])
            return {'consultation': consultation[0][0], 'patient': patient[0][0]}
        } catch (error) {
            console.error("Ошибка при получении данных о консультации:", error);
            return
        }
    }

    async completeConsultation(id, diagnosis, recommendations){
        const connection = await db.getConnection();

    try {
            await connection.beginTransaction();

            await connection.query(
                'INSERT INTO conclusion (diagnosis, recomendations) VALUES (?, ?)',
                [diagnosis, recommendations]
            );

            const [result] = await connection.query('SELECT LAST_INSERT_ID() as id');

            const conclusionId = result[0].id;

            await connection.query(
                'UPDATE consultation SET id_conclusion = ? WHERE id = ?',
                [conclusionId, id]
            );

            await connection.commit();

            console.log(`Консультация ${id} завершена с заключением ${conclusionId}`);
            return { success: true, consultationId: id, conclusionId };
        } catch (error) {
            await connection.rollback();
            console.error("Ошибка при завершении консультации:", error);
            throw error;
        } finally {
            connection.release();
        }
    }
}


module.exports = new Doctor()