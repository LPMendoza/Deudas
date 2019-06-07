DROP DATABASE IF EXISTS deudas;
CREATE DATABASE deudas;

USE deudas;

CREATE TABLE IF NOT EXISTS administradores( 
	telefono VARCHAR(10),
    nombre VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    PRIMARY KEY (telefono)
    );
    
CREATE TABLE IF NOT EXISTS deudores(
   telefono VARCHAR(10),
   pass VARCHAR(20) NOT NULL,
   nombre VARCHAR(30) NOT NULL,
   adeudo DOUBLE,
   mail VARCHAR(30),
   PRIMARY KEY (telefono)
);

CREATE TABLE IF NOT EXISTS conceptos(
   concepto VARCHAR(15),
   id_administrador VARCHAR(10),
   monto DOUBLE,
   PRIMARY KEY (concepto),
   FOREIGN KEY(id_administrador) REFERENCES administradores(telefono)
);

CREATE TABLE IF NOT EXISTS deudas(
   referencia INT AUTO_INCREMENT,
   concepto VARCHAR(15),
   id_deudor VARCHAR(10),
   debe DOUBLE,
   PRIMARY KEY (referencia),
   FOREIGN KEY(concepto) REFERENCES conceptos(concepto),
   FOREIGN KEY(id_deudor) REFERENCES deudores(telefono)
);

CREATE TABLE IF NOT EXISTS pseudo_deudas(
   referencia INT AUTO_INCREMENT,
   concepto VARCHAR(15),
   id_deudor VARCHAR(10),
   PRIMARY KEY (referencia),
   FOREIGN KEY(concepto) REFERENCES conceptos(concepto),
   FOREIGN KEY(id_deudor) REFERENCES deudores(telefono)
);

CREATE TABLE IF NOT EXISTS pagos(
   referencia INT AUTO_INCREMENT,
   id_administrador VARCHAR(10),
   id_deudor VARCHAR(10),
   referencia_deuda INT,
   monto DOUBLE,
   fecha DATETIME,
   PRIMARY KEY (referencia),
   FOREIGN KEY(id_deudor) REFERENCES deudores(telefono),
   FOREIGN KEY(id_administrador) REFERENCES administradores(telefono)
);

INSERT INTO administradores (nombre,telefono, pass) 
	VALUES ('El del Varo','1234554321','qweRty789');

#agregar procedures
#agregar trigger
