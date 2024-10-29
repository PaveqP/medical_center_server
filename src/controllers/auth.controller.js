const { validationResult } = require("express-validator");
const db = require("../database/connection");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const patientModel = require('../models/patient.model');
const { json } = require("express");
const doctorModel = require("../models/doctor.model");

class authController {

  constructor() {
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
    this.token = this.token.bind(this);
    this.validation = this.validation.bind(this);
    this.findUser = this.findUser.bind(this)
    this.findDoctor = this.findDoctor.bind(this)
    this.createTokens = this.createTokens.bind(this)
    this.doctorLogin = this.doctorLogin.bind(this)
    this.doctorRegistration = this.doctorRegistration.bind(this)
  }

  createTokens(userData){
    const accessToken = jwt.sign(
      { id: userData.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: userData.id },
      process.env.REFRESH_TOKEN_SECRET
    );

    return {accessToken, refreshToken}
  }

  validation(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors });
    }
  }
  async findUser(email, res){
    const patient = await patientModel.getPatientByCredentials(email)

    if(patient.length > 0){
      return patient
    }

    return false
  }

  async findDoctor(email, res){
    console.log(email)
    const doctor = await doctorModel.getDoctorByCredentials(email)

    if(doctor.length > 0){
      return doctor
    }

    return false
  }
  async registration(req, res) {
    try {
      const { email, password } = req.body;

      const validationErrors = this.validation(req, res);
      if (validationErrors) return;
      const userExists = await this.findUser(email, res);
      if (userExists){
        res.status(400).json({ message: `Пользователь ${email} уже существует` });
        return
      };

      const hashedPassword = await bcrypt.hash(password, 10);

      await patientModel.addNewPatient(email, hashedPassword)

      res.json({message: 'success!'});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ошибка регистрации пользователя' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const validationErrors = this.validation(req, res);
      if (validationErrors) return;
      const patient = await this.findUser(email, res);
      if (!patient){
        return res.status(404).json({ message: `Пользователь ${email} не найден` });
      };

      const userData = patient[0];

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
      }

      const tokens = this.createTokens(userData)

      res.json(tokens);
    } catch (error) {
      console.error('Ошибка при аутентификации', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async doctorLogin(req, res) {
    try {
      const { email, password } = req.body;

      const validationErrors = this.validation(req, res);
      if (validationErrors) return;
      const doctor = await this.findDoctor(email, res);
      if (!doctor){
        return res.status(404).json({ message: `Пользователь ${email} не найден` });
      };

      const userData = doctor[0];

      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
      }

      const tokens = this.createTokens(userData)

      res.json(tokens);
    } catch (error) {
      console.error('Ошибка при аутентификации', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async doctorRegistration(req, res) {
    try {
      const { 
        name, 
        surname, 
        middle_name, 
        email, 
        password, 
        id_specialization, 
        practice, 
        rating, 
        office, 
        id_post, 
        consultation_cost, 
        department 
      } = req.body;

      const validationErrors = this.validation(req, res);
      if (validationErrors) return;
      const doctorExists = await this.findDoctor(email, res);
      if (doctorExists){
        res.status(400).json({ message: `Сотрудник ${email} уже существует` });
        return
      };

      const hashedPassword = await bcrypt.hash(password, 10);

      await doctorModel.addNewDoctor(name, surname, middle_name, email, hashedPassword, id_specialization, practice, rating, office, id_post, consultation_cost, department)

      res.json({message: 'success!'});
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Ошибка регистрации сотрудника' });
    }
  }

  async token(req, res) {
    try {
      const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401); 
    }

    if (!req.user) {
        return res.status(403);
    }

    const tokens = this.createTokens(req.user)

    res.json(tokens);
    } catch (error) {
      console.error('Ошибка получения токена', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new authController()