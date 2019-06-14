CREATE DATABASE  IF NOT EXISTS `ru6l6f3lvoegvrl8` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ru6l6f3lvoegvrl8`;
-- MySQL dump 10.13  Distrib 5.7.26-ndb-7.6.10, for Linux (x86_64)
--
-- Host: u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com    Database: ru6l6f3lvoegvrl8
-- ------------------------------------------------------
-- Server version	5.7.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administradores` (
  `telefono` varchar(10) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `pass` varchar(30) NOT NULL,
  PRIMARY KEY (`telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES ('1234554321','El Patron','qweRty789');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conceptos`
--

DROP TABLE IF EXISTS `conceptos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conceptos` (
  `concepto` varchar(30) NOT NULL,
  `id_administrador` varchar(10) DEFAULT NULL,
  `monto` double DEFAULT NULL,
  PRIMARY KEY (`concepto`),
  KEY `id_administrador` (`id_administrador`),
  CONSTRAINT `conceptos_ibfk_1` FOREIGN KEY (`id_administrador`) REFERENCES `administradores` (`telefono`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptos`
--

LOCK TABLES `conceptos` WRITE;
/*!40000 ALTER TABLE `conceptos` DISABLE KEYS */;
INSERT INTO `conceptos` VALUES ('300m-cobre','1234554321',300),('arduino-startedpack','1234554321',450),('caja-materiales','1234554321',350),('cautin-y-cobre','1234554321',200),('diy-minipc','1234554321',550),('kit-arduino-cable-utp','1234554321',200),('kit-leds-resistencias','1234554321',50);
/*!40000 ALTER TABLE `conceptos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deudas`
--

DROP TABLE IF EXISTS `deudas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deudas` (
  `referencia` int(11) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(30) DEFAULT NULL,
  `id_deudor` varchar(10) DEFAULT NULL,
  `estado` varchar(9) DEFAULT NULL,
  `debe` double DEFAULT NULL,
  PRIMARY KEY (`referencia`),
  KEY `concepto` (`concepto`),
  KEY `id_deudor` (`id_deudor`),
  CONSTRAINT `deudas_ibfk_1` FOREIGN KEY (`concepto`) REFERENCES `conceptos` (`concepto`) ON DELETE CASCADE,
  CONSTRAINT `deudas_ibfk_2` FOREIGN KEY (`id_deudor`) REFERENCES `deudores` (`telefono`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deudas`
--

LOCK TABLES `deudas` WRITE;
/*!40000 ALTER TABLE `deudas` DISABLE KEYS */;
INSERT INTO `deudas` VALUES (1,'caja-materiales','2364126196','PENDIENTE',150),(2,'caja-materiales','1237013598','PENDIENTE',350),(3,'caja-materiales','4628242298','PENDIENTE',350);
/*!40000 ALTER TABLE `deudas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deudores`
--

DROP TABLE IF EXISTS `deudores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deudores` (
  `telefono` varchar(10) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `adeudo` double DEFAULT NULL,
  `mail` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deudores`
--

LOCK TABLES `deudores` WRITE;
/*!40000 ALTER TABLE `deudores` DISABLE KEYS */;
INSERT INTO `deudores` VALUES ('1234567890','12345','poncho',0,'ponchosabe@gmail.com'),('1237013598','12345','Fernando',350,'fernando@ucol.mx'),('2364126196','12345','Pedro',150,'pedro@ucol.mx'),('4628242298','12345','Israel',350,'israel@ucol.mx');
/*!40000 ALTER TABLE `deudores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pagos` (
  `referencia` int(11) NOT NULL AUTO_INCREMENT,
  `id_administrador` varchar(10) DEFAULT NULL,
  `id_deudor` varchar(10) DEFAULT NULL,
  `referencia_deuda` int(11) DEFAULT NULL,
  `monto` double DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`referencia`),
  KEY `id_deudor` (`id_deudor`),
  KEY `id_administrador` (`id_administrador`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_deudor`) REFERENCES `deudores` (`telefono`) ON DELETE CASCADE,
  CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`id_administrador`) REFERENCES `administradores` (`telefono`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
INSERT INTO `pagos` VALUES (1,'1234554321','2364126196',1,200,'2019-06-13 18:25:30');
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pseudo_deudas`
--

DROP TABLE IF EXISTS `pseudo_deudas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pseudo_deudas` (
  `referencia` int(11) NOT NULL AUTO_INCREMENT,
  `concepto` varchar(30) DEFAULT NULL,
  `id_deudor` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`referencia`),
  KEY `concepto` (`concepto`),
  KEY `id_deudor` (`id_deudor`),
  CONSTRAINT `pseudo_deudas_ibfk_1` FOREIGN KEY (`concepto`) REFERENCES `conceptos` (`concepto`) ON DELETE CASCADE,
  CONSTRAINT `pseudo_deudas_ibfk_2` FOREIGN KEY (`id_deudor`) REFERENCES `deudores` (`telefono`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pseudo_deudas`
--

LOCK TABLES `pseudo_deudas` WRITE;
/*!40000 ALTER TABLE `pseudo_deudas` DISABLE KEYS */;
INSERT INTO `pseudo_deudas` VALUES (1,'caja-materiales','1237013598'),(2,'caja-materiales','2364126196'),(3,'caja-materiales','4628242298');
/*!40000 ALTER TABLE `pseudo_deudas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`vmsjoijd5ei7v2ek`@`%`*/ /*!50003 TRIGGER `after_insert_deuda` AFTER INSERT ON `pseudo_deudas` FOR EACH ROW BEGIN
    DECLARE deudor VARCHAR(10);
    DECLARE cantidad DOUBLE;
    
    SET cantidad = (SELECT monto FROM conceptos WHERE concepto = NEW.concepto);
    SET deudor = NEW.id_deudor;
    
    INSERT INTO deudas (concepto, id_deudor, estado, debe) VALUES (NEW.concepto, NEW.id_deudor, 'PENDIENTE', cantidad);
	UPDATE deudores SET adeudo = adeudo + cantidad WHERE deudor = telefono;
	
 END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'ru6l6f3lvoegvrl8'
--

--
-- Dumping routines for database 'ru6l6f3lvoegvrl8'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-13 21:20:08
