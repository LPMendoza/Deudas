DROP procedure IF EXISTS add_debe;  -- borrar si previamente existe

DELIMITER $$
CREATE PROCEDURE add_debe(
	 in  concepto_deuda VARCHAR(15), 
	 out debe_now DOUBLE)
BEGIN
    
    SET debe_now = (SELECT monto FROM conceptos WHERE concepto = concepto_deuda);
    
 END $$
DELIMITER ;