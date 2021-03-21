-- --------------------------------------------------------
-- Host:                         us-cdbr-east-03.cleardb.com
-- Server version:               5.6.50-log - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for heroku_fc6cdbfbf539248
CREATE DATABASE
IF NOT EXISTS `heroku_fc6cdbfbf539248` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_fc6cdbfbf539248`;

-- Dumping structure for table heroku_fc6cdbfbf539248.options
CREATE TABLE
IF NOT EXISTS `options`
(
  `id` int
(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int
(10) unsigned DEFAULT NULL,
  `text` varchar
(255) DEFAULT NULL,
  `is_correct` tinyint
(1) DEFAULT NULL,
  PRIMARY KEY
(`id`),
  KEY `options_question_id_foreign`
(`question_id`),
  CONSTRAINT `options_question_id_foreign` FOREIGN KEY
(`question_id`) REFERENCES `questions`
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=494 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table heroku_fc6cdbfbf539248.questions
CREATE TABLE
IF NOT EXISTS `questions`
(
  `id` int
(10) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
