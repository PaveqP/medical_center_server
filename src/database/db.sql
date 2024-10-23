-- Active: 1728569146182@@localhost@3306@medical_center_db
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema medical_center_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema medical_center_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `medical_center_db` DEFAULT CHARACTER SET utf8;

USE `medical_center_db`;

-- -----------------------------------------------------
-- Table `medical_center_db`.`specialization`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`specialization` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(1000) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`post` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`doctor`
-- -----------------------------------------------------

DROP TABLE doctor

CREATE TABLE IF NOT EXISTS `medical_center_db`.`doctor` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NOT NULL,
    `unique_identifier` VARCHAR(10) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `id_specialization` INT NOT NULL,
    `practice` DECIMAL(2, 1),
    `rating` DECIMAL(1, 1) NULL,
    `office` INT,
    `id_post` INT NOT NULL,
    `consultation_cost` DECIMAL(10, 2),
    `department` VARCHAR(200) NULL,
    PRIMARY KEY (`id`),
    INDEX `id_specialization_idx` (`id_specialization` ASC) VISIBLE,
    INDEX `id_post_idx` (`id_post` ASC) VISIBLE,
    CONSTRAINT `id_specialization` FOREIGN KEY (`id_specialization`) REFERENCES `medical_center_db`.`specialization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `id_post` FOREIGN KEY (`id_post`) REFERENCES `medical_center_db`.`post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`patient`
-- -----------------------------------------------------
DROP TABLE patient

CREATE TABLE IF NOT EXISTS `medical_center_db`.`patient` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100),
    `password` VARCHAR(100),
    `age` INT NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `balance` DECIMAL(10, 2) NULL,
    `id_policy` INT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`conclusion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`conclusion` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `diagnosis` VARCHAR(1000) NOT NULL,
    `recomendations` VARCHAR(10000) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`consultation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`consultation` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `time` TIME NOT NULL,
    `Id_doctor` INT NOT NULL,
    `id_patient` INT NOT NULL,
    `cost` DECIMAL(10, 2) NULL,
    `reason` VARCHAR(10000) NOT NULL,
    `id_conclusion` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `id_doctor_idx` (`Id_doctor` ASC) VISIBLE,
    INDEX `id_patient_idx` (`id_patient` ASC) VISIBLE,
    INDEX `id_conclusion_idx` (`id_conclusion` ASC) VISIBLE,
    CONSTRAINT `id_doctor` FOREIGN KEY (`Id_doctor`) REFERENCES `medical_center_db`.`doctor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `id_patient` FOREIGN KEY (`id_patient`) REFERENCES `medical_center_db`.`patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `id_conclusion` FOREIGN KEY (`id_conclusion`) REFERENCES `medical_center_db`.`conclusion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`timetable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`timetable` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(20) NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`doctor_timetable`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`doctor_timetable` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_timetable` INT NOT NULL,
    `id_doctor` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `idx_timetable` (`id_timetable` ASC) VISIBLE,
    INDEX `idx_doctor` (`id_doctor` ASC) VISIBLE,
    CONSTRAINT `fk_timetable` FOREIGN KEY (`id_timetable`) REFERENCES `medical_center_db`.`timetable` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_doctor` FOREIGN KEY (`id_doctor`) REFERENCES `medical_center_db`.`doctor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`medical_card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`medical_card` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_patient` INT NOT NULL,
    `id_doctor` INT NOT NULL,
    `visit_date` DATE NOT NULL,
    `visit_time` TIME NOT NULL,
    `visit_cost` DECIMAL(10, 2) NULL,
    `id_conclusion` INT NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `idx_patient` (`id_patient` ASC) VISIBLE,
    INDEX `idx_doctor` (`id_doctor` ASC) VISIBLE,
    INDEX `idx_conclusion` (`id_conclusion` ASC) VISIBLE,
    CONSTRAINT `fk_medical_card_patient` FOREIGN KEY (`id_patient`) REFERENCES `medical_center_db`.`patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_medical_card_doctor` FOREIGN KEY (`id_doctor`) REFERENCES `medical_center_db`.`doctor` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_medical_card_conclusion` FOREIGN KEY (`id_conclusion`) REFERENCES `medical_center_db`.`conclusion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `medical_center_db`.`policy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `medical_center_db`.`policy` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_patient` INT NOT NULL,
    `number` INT NOT NULL,
    `end_date` DATE NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `id_patient_idx` (`id_patient` ASC) VISIBLE,
    CONSTRAINT `fk_patient` FOREIGN KEY (`id_patient`) REFERENCES `medical_center_db`.`patient` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;