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

    async getPatientPolicy(id){
        try {
            const policy = await db.query('SELECT * FROM policy WHERE id_patient = ?', [id])
            return policy[0][0]
        } catch (error) {
            console.error("Ошибка при получении данных полиса:", error);
            return 
        }
    }

    async setPatientPolicy(id, number, expired_date){
        try {
            const [existingPolicy] = await db.query('SELECT * FROM policy WHERE id_patient = ?', [id]);

        if (existingPolicy.length > 0) {
            const result = await db.query(
                'UPDATE policy SET number = ?, end_date = ? WHERE id_patient = ?',
                [number, expired_date, id]
            );
            return result[0];
        } else {
            const result = await db.query(
                'INSERT INTO policy (id_patient, number, end_date) VALUES (?, ?, ?)',
                [id, number, expired_date]
            );
            return result[0];
        }
        } catch (error) {
            console.error("Ошибка при создании полиса:", error);
            return 
        }
    }

    async getPatientVisits(id, visitsTimeType = null){
        try {
            let visits = null
            const currentDate = new Date()
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
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