SELECT * FROM administradores;

# INGRESAR DATOS DE PRUEBA EN LAS TABLAS EXCEPTO administradores
/*
#--
# TABLA: 
# CAMPOS: 
INSERT INTO () VALUES();
*/
#--
# INSERT INTO tabla(campos) VALUES(valores);
#--
# TODOS TIENEN id AUTO INCREMENTAL EXCEPTO deudas
#--
# TABLA: deudores
# CAMPOS: telefono, pass, nombre
INSERT INTO deudores(telefono, pass, nombre,adeudo) VALUES('1237013598','12345','Fernando',0);
INSERT INTO deudores(telefono, pass, nombre,adeudo) VALUES('2364126196','12345','Pedro',0);
INSERT INTO deudores(telefono, pass, nombre,adeudo) VALUES('4628242298','12345','Israel',0);
SELECT * FROM deudores;
#--
# TABLA: conceptos
# CAMPOS: concepto, id_administrador, monto
INSERT INTO conceptos(concepto, id_administrador, monto) VALUES('prestamo-50', '1234554321',450);
INSERT INTO conceptos(concepto, id_administrador, monto) VALUES('prestamo-51', '1234554321',550);
#SELECT * FROM conceptos;
#--
# TABLA: pseudo_deudas
# CAMPOS: concepto , id_deudor
INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('prestamo-50', '1237013598');
INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('prestamo-50', '2364126196');
INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('prestamo-51', '2364126196');
INSERT INTO pseudo_deudas(concepto , id_deudor) VALUES('prestamo-51', '4628242298');
SELECT * FROM deudas;
#--
# TABLA: pagos
# CAMPOS: referencia ,id_administrador ,id_deudor,, referencia_deuda, monto, fecha
INSERT INTO pagos(id_administrador ,id_deudor, referencia_deuda, monto, fecha) 
	VALUES('1234554321', '1237013598', 1, 450,now());
    SELECT * FROM pagos;
