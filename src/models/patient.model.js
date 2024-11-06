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

    async getPatientVisits(id, visitsTimeType = null){
        try {
            let visits = null
            const currentDate = new Date()
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript считаются от 0 до 11
            const day = String(currentDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            if(!visitsTimeType){
                visits = await db.query('SELECT * FROM consultation WHERE id_patient = ?', [id])
                //console.log(visits)
            } else if (visitsTimeType === 'past'){
                visits = await db.query('SELECT * FROM consultation WHERE id_patient = ? AND date < ?', [id, formattedDate])
            } else if (visitsTimeType === 'future'){
                visits = await db.query('SELECT * FROM consultation WHERE id_patient = ? AND date > ?', [id, formattedDate])
            }
            
            if (visits && visits[0] && visits[0].length > 0) {
                return visits[0];
            } else {
                console.log("Посещения не найдены");
                return null;
            }
        } catch (error) {
            console.error("Ошибка при получении списка посещений:", error);
            return 
        }
    }

    async createConsultation(data){
        try {
            const response = await db.query('INSERT INTO consultation (date, time, id_doctor, id_patient, cost, reason) VALUES (?, ?, ?, ?, ?, ?)', 
                [
                    data.date,
                    data.time,
                    data.id_doctor,
                    data.id_patient,
                    data.cost,
                    data.reason
                ])
            return response
        } catch (error) {
            console.error("Ошибка при добавлении записи о консультации:", error);
            return 
        }
    }
}


module.exports = new Patient()