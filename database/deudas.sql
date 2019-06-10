-- MySQL dump 10.13  Distrib 5.7.26-ndb-7.6.10, for Linux (x86_64)
--
-- Host: 172.17.0.2    Database: deudas
-- ------------------------------------------------------
-- Server version	8.0.16

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES ('1234554321','El del Varo','qweRty789');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conceptos`
--

LOCK TABLES `conceptos` WRITE;
/*!40000 ALTER TABLE `conceptos` DISABLE KEYS */;
INSERT INTO `conceptos` VALUES ('arduino-startedpack','1234554321',450),('diy-minipc','1234554321',550);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deudas`
--

LOCK TABLES `deudas` WRITE;
/*!40000 ALTER TABLE `deudas` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deudores`
--

LOCK TABLES `deudores` WRITE;
/*!40000 ALTER TABLE `deudores` DISABLE KEYS */;
INSERT INTO `deudores` VALUES ('1237013598','12345','Fernando',0,'fernando@ucol.mx'),('2364126196','12345','Pedro',0,'pedro@ucol.mx'),('4628242298','12345','Israel',0,'israelqucol.mx');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_pago` AFTER INSERT ON `pagos` FOR EACH ROW BEGIN
    DECLARE deudor VARCHAR(10);
    DECLARE referencia INT;
    DECLARE monto_a_pagar DOUBLE;
    DECLARE pertenece VARCHAR(10);
    DECLARE debe DOUBLE;
    
    SET deudor = NEW.id_deudor;
    SET referencia = NEW.referencia_deuda;
    SET monto_a_pagar = NEW.monto;
    SET pertenece = (SELECT id_deudor FROM deudas WHERE id_deudor = deudor AND deudas.referencia = referencia);
    #SET debe = deudas.debe;
    
    IF(pertenece = deudor) THEN
		UPDATE deudas SET debe = debe - monto_a_pagar WHERE deudas.referencia = referencia;
        
        IF((SELECT debe FROM deudas WHERE id_deudor = deudor)IS NULL) THEN
            UPDATE deudas SET debe = 0 WHERE deudas.referencia = referencia;
            UPDATE deudas SET estado = 'PAGADO' WHERE deudas.referencia = referencia;
        END IF;
        
		UPDATE deudores SET adeudo = adeudo - monto_a_pagar WHERE deudor = telefono;
	END IF;
	
 END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pseudo_deudas`
--

LOCK TABLES `pseudo_deudas` WRITE;
/*!40000 ALTER TABLE `pseudo_deudas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pseudo_deudas` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_deuda` AFTER INSERT ON `pseudo_deudas` FOR EACH ROW BEGIN
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
-- Dumping events for database 'deudas'
--

--
-- Dumping routines for database 'deudas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-10 11:30:17
