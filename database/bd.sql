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
   concepto VARCHAR(30),
   id_administrador VARCHAR(10),
   monto DOUBLE,
   PRIMARY KEY (concepto),
   FOREIGN KEY(id_administrador) REFERENCES administradores(telefono)
);

CREATE TABLE IF NOT EXISTS deudas(
   referencia INT AUTO_INCREMENT,
   concepto VARCHAR(30),
   id_deudor VARCHAR(10),
   estado VARCHAR(9), 
   debe DOUBLE,
   PRIMARY KEY (referencia),
   FOREIGN KEY(concepto) REFERENCES conceptos(concepto),
   FOREIGN KEY(id_deudor) REFERENCES deudores(telefono)
);

CREATE TABLE IF NOT EXISTS pseudo_deudas(
   referencia INT AUTO_INCREMENT,
   concepto VARCHAR(30),
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

#agregar procedures
#agregar trigger
# TRIGER PARA REGISTAR deudas CON MONTOS EN TABLA CLIENTE
DROP TRIGGER IF EXISTS after_insert_deuda;
DELIMITER $$
CREATE TRIGGER  after_insert_deuda AFTER INSERT
 ON pseudo_deudas
 FOR EACH ROW
 BEGIN
    DECLARE deudor VARCHAR(10);
    DECLARE cantidad DOUBLE;
    
    SET cantidad = (SELECT monto FROM conceptos WHERE concepto = NEW.concepto);
    SET deudor = NEW.id_deudor;
    
    INSERT INTO deudas (concepto, id_deudor, estado, debe) VALUES (NEW.concepto, NEW.id_deudor, 'PENDIENTE', cantidad);
	UPDATE deudores SET adeudo = adeudo + cantidad WHERE deudor = telefono;
	
 END$$
DELIMITER ;
#--
# TRIGER PARA REGISTAR pagos Y RESTAR EN ADEUDO DEL DEUDOR, Y SI LA DEUDA EN deudas ES 0 eliminarla
DROP TRIGGER IF EXISTS after_insert_pago;
DELIMITER $$
CREATE TRIGGER  after_insert_pago AFTER INSERT
 ON pagos
 FOR EACH ROW
 BEGIN
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
	
 END$$
DELIMITER ;

#CONSULTAS DE PRUEBA
INSERT INTO administradores (nombre,telefono, pass) 
	VALUES ('El del Varo','1234554321','qweRty789');

INSERT INTO deudores(telefono, pass, nombre, mail, adeudo) VALUES('1237013598','12345','Fernando','fernando@ucol.mx',0);
INSERT INTO deudores(telefono, pass, nombre, mail, adeudo) VALUES('2364126196','12345','Pedro','pedro@ucol.mx',0);
INSERT INTO deudores(telefono, pass, nombre, mail, adeudo) VALUES('4628242298','12345','Israel','israelqucol.mx',0);

INSERT INTO conceptos(concepto, id_administrador, monto) VALUES('arduino-startedpack', '1234554321',450);
INSERT INTO conceptos(concepto, id_administrador, monto) VALUES('diy-minipc', '1234554321',550);

#INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('arduino-startedpack', '1237013598');
#INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('diy-minipc', '2364126196');
#INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('arduino-startedpack', '2364126196');
#INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('arduino-startedpack', '4628242298');
#SELECT * FROM deudas;
#--
# TABLA: pagos
# CAMPOS: referencia ,id_administrador ,id_deudor,, referencia_deuda, monto, fecha
#INSERT INTO pagos(id_administrador ,id_deudor, referencia_deuda, monto, fecha) 
#VALUES('1234554321', '1237013598', 1, 450,now());