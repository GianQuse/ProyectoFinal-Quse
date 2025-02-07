IMPORTANTE PARA INGRESAR COMO ADMIN!!
Usuario: admin
Contraseña: 1234

Esta web consta de 2 partes:
Ingresar como Cliente que nos lleva a ingresar nuestros datos personales, en el fomulario se recupera los datos de localStorage para comparar el DNI cada vez que se escribe y lo compara para saber si ya fue registrado si es asi nos salta un cartel y nos bloqua el boton de Enviar. Cuando lo enviamos se crea un objeto mediante class y lo guarda en un array.
De ahi nos lleva a una pagina donde podemos elegir 3 opciones de eventos cuando seleccionamos 1 nos crea unos Checkbox dinamicamente los cuales selecinamos, recuperamos los datos y creamos un nuevo objetos con class que se envia a un array interno del objeto anteriormente creado y guardado en el array. Enviamos ese array completo al localStorage.


Ingresar como admin, nos da un form para iniciar sesion, al 3er intento erroneo nos saca de dicho formulario.
Cuando ingresamos nos permite lista los contratos cerrados desde la seccion cliente, para filtrar recuperamos el localStorage y si se encuentra lo pintamos en el DOM dinamicamente. Estos se recuperan simulando una busqueda en una API.
