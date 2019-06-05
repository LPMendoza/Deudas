CREATE DATABASE IF NOT EXISTS deudas;

USE deudas;

CREATE TABLE IF NOT EXISTS deudores(
   id INT AUTO_INCREMENT,
   telefono VARCHAR(10) NOT NULL,
   nombre VARCHAR(30) NOT NULL,
   deuda DOUBLE,
   PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pagos(
   id INT AUTO_INCREMENT,
   id_deudor INT NOT NULL,
   monto DOUBLE,
   fecha DATE,
   PRIMARY KEY (id),
   FOREIGN KEY(id_deudor) REFERENCES deudores(id)
);

CREATE TABLE IF NOT EXISTS deudas(
   concepto VARCHAR(30) NOT NULL,
   id_deudor INT NOT NULL,
   cantidad DOUBLE,
   PRIMARY KEY (concepto),
   FOREIGN KEY(id_deudor) REFERENCES deudores(id)
);

CREATE TABLE IF NOT EXISTS admins(
   id INT AUTO_INCREMENT,
   telefono VARCHAR(30) NOT NULL,
   pass VARCHAR(16) NOT NULL,
);