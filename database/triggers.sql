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
DROP TRIGGER IF EXISTS befor_insert_deuda;
DELIMITER $$
CREATE TRIGGER  befor_insert_deuda BEFORE INSERT
 ON deudas
 FOR EACH ROW
 BEGIN
	DECLARE amount DOUBLE;
    SET amount = (SELECT monto FROM conceptos WHERE concepto = NEW.concepto); 
	UPDATE deudores SET adeudo = adeudo + (amount);
 END$$
DELIMITER ;

