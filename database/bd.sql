CREATE DATABASE IF NOT EXISTS deudas;

USE deudas;

CREATE TABLE IF NOT EXISTS administradores( 
	id INT AUTO_INCREMENT,
    telefono VARCHAR(10) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    );
    
CREATE TABLE IF NOT EXISTS deudores(
   id INT AUTO_INCREMENT,
   telefono VARCHAR(10) NOT NULL,
   pass VARCHAR(20) NOT NULL,
   nombre VARCHAR(30) NOT NULL,
   deuda DOUBLE,
   PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS deudas(
   concepto VARCHAR(15) NOT NULL,
   id_administrador INT,
   id_deudor INT NOT NULL,
   adeudo DOUBLE,
   PRIMARY KEY (concepto),
   FOREIGN KEY(id_deudor) REFERENCES deudores(id),
   FOREIGN KEY(id_administrador) REFERENCES administradores(id)
);

CREATE TABLE IF NOT EXISTS pagos(
   id INT AUTO_INCREMENT,
   id_administrador INT,
   id_deudor INT NOT NULL,
   concepto VARCHAR(15),
   monto DOUBLE,
   fecha DATE,
   PRIMARY KEY (id),
   FOREIGN KEY(id_deudor) REFERENCES deudores(id),
   FOREIGN KEY(id_administrador) REFERENCES administradores(id),
   FOREIGN KEY(concepto) REFERENCES deudas(concepto)
);

INSERT INTO administradores (telefono, pass) 
	VALUES ('1234554321','qweRty789');
