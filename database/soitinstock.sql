-- version 1.0

-- MySQL Workbench Forward Engineering


SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `Customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Customer` ;

CREATE TABLE IF NOT EXISTS `Customer` (
  `id_customer` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_customer`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_customer_UNIQUE` (`id_customer` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `Instrument_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Instrument_type` ;

CREATE TABLE IF NOT EXISTS `Instrument_type` (
  `id_type` INT NOT NULL,
  `type_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_type`),
  UNIQUE INDEX `id_types_UNIQUE` (`id_type` ASC) VISIBLE,
  UNIQUE INDEX `type_name_UNIQUE` (`type_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `Instrument`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Instrument` ;

CREATE TABLE IF NOT EXISTS `Instrument` (
  `name` VARCHAR(40) NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `Description` TEXT NULL DEFAULT NULL,
  `Instrument_type_id` INT NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `model_UNIQUE` (`model` ASC) VISIBLE,
  INDEX `fk_Instrument_Instrument_type1_idx` (`Instrument_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_Instrument_Instrument_type1`
    FOREIGN KEY (`Instrument_type_id`)
    REFERENCES `mydb`.`Instrument_type` (`id_type`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Item` ;

CREATE TABLE IF NOT EXISTS `Item` (
  `id_Item` INT NOT NULL AUTO_INCREMENT,
  `barcode` VARCHAR(7) NOT NULL COMMENT 'This is supposed to be for example violin/viulu = viu-001 and so on.',
  `rent_day` DECIMAL(10,2) NOT NULL,
  `rent_week` DECIMAL(10,2) NOT NULL,
  `rent_month` DECIMAL(10,2) NOT NULL,
  `is_available` TINYINT NOT NULL,
  `condition` ENUM('excellent', 'good', 'damaged', 'under_repair') NOT NULL,
  `Instrument_name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id_Item`),
  UNIQUE INDEX `id_Item_UNIQUE` (`id_Item` ASC) VISIBLE,
  UNIQUE INDEX `barcode_UNIQUE` (`barcode` ASC) VISIBLE,
  INDEX `fk_Item_Instrument_idx` (`Instrument_name` ASC) VISIBLE,
  CONSTRAINT `fk_Item_Instrument`
    FOREIGN KEY (`Instrument_name`)
    REFERENCES `Instrument` (`name`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `Rentals`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rentals` ;

CREATE TABLE IF NOT EXISTS `Rentals` (
  `id_Rentals` INT NOT NULL AUTO_INCREMENT COMMENT 'UUID\\n',
  `start_date` DATETIME NOT NULL,
  `end_date` DATE NOT NULL,
  `returned_date` DATETIME NOT NULL,
  `employee` CHAR(36) NOT NULL COMMENT 'UUID',
  `payment_status` TINYINT NOT NULL,
  `rent_status` ENUM('active', 'returned', 'overdue') NOT NULL,
  `customer_id` INT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_Rentals`),
  UNIQUE INDEX `idRentals_UNIQUE` (`id_Rentals` ASC) VISIBLE,
  INDEX `fk_Rentals_Customer1_idx` (`customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Rentals_Customer1`
    FOREIGN KEY (`customer_id`)
    REFERENCES `Customer` (`id_customer`)
    ON UPDATE CASCADE
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `Rentals_has_Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rentals_has_Item` ;

CREATE TABLE IF NOT EXISTS `Rentals_has_Item` (
  `Rentals_id` INT NOT NULL,
  `Item_id` INT NOT NULL,
  PRIMARY KEY (`Rentals_id`, `Item_id`),
  INDEX `fk_Rentals_has_Item_Item1_idx` (`Item_id` ASC) VISIBLE,
  INDEX `fk_Rentals_has_Item_Rentals1_idx` (`Rentals_id` ASC) VISIBLE,
  CONSTRAINT `fk_Rentals_has_Item_Item1`
    FOREIGN KEY (`Item_id`)
    REFERENCES `Item` (`id_Item`)
	ON UPDATE RESTRICT
    ON DELETE RESTRICT,
  CONSTRAINT `fk_Rentals_has_Item_Rentals1`
    FOREIGN KEY (`Rentals_id`)
    REFERENCES `Rentals` (`id_Rentals`)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
