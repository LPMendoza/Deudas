#TRIGGERS PARA LAS TABLAS
#--
/*
CREATE TRIGGER trigger_name trigger_time trigger_event
 ON table_name
 FOR EACH ROW
 BEGIN
 ...
 END;
*/
#--
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
    
    INSERT INTO deudas (concepto, id_deudor, debe) VALUES (NEW.concepto, NEW.id_deudor, cantidad);
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
        
        DELETE FROM deudas WHERE id_deudor = deudor AND debe IS NULL;
        
		UPDATE deudores SET adeudo = adeudo - monto_a_pagar WHERE deudor = telefono;
	END IF;
	
 END$$
DELIMITER ;

