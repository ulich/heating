-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.0.51a-24+lenny5 - (Debian)
-- Server OS:                    debian-linux-gnu
-- HeidiSQL version:             7.0.0.4053
-- Date/time:                    2012-07-30 09:34:27
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

-- Dumping database structure for heating
CREATE DATABASE IF NOT EXISTS `heating` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heating`;


-- Dumping structure for table heating.log
CREATE TABLE IF NOT EXISTS `log` (
  `stamp` datetime NOT NULL,
  `level` varchar(10) NOT NULL,
  `message` varchar(255) NOT NULL,
  KEY `stamp` (`stamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping structure for table heating.temperature
CREATE TABLE IF NOT EXISTS `temperature` (
  `stamp` datetime NOT NULL,
  `temperature` float NOT NULL,
  KEY `stamp` (`stamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40000 ALTER TABLE `temperature` ENABLE KEYS */;
/*!40014 SET FOREIGN_KEY_CHECKS=1 */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
