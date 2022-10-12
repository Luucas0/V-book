# Vbook book store

## Getting started - English version

1 - Before trying to start running our repository you should use the command "npm i --force" on the Vbook folder, to install every dependency required for it to work.

2 - After every dependency is installed you will need to create a PSQL database named "vbook", that can be done from your prefered CLI using the command "createdb vbook". Remember that you will need to have PSQL installed and configured for it to work, if you don't have it, click the following link https://www.postgresql.org/docs/current/app-psql.html.

3 - Then, if everything is working as intended, go to your repository and create a .env file, fill it with the .env.example and then provide the required information, that can be finded in Facebook developer settings, Google security settings and GitHub Developers settings, some video tutorials will be provided at the end of this file.

4 - Finally we are ready to start our server, run the command "npm run start" to initialize both the client and server. If that doesn't work for you, use 2 console instances to run "npm run server" and "npm run client".

5 - Now we need some books! Go to /api and run the command "npx sequelize-cli db:seed:all" to create some test users and some books inside your database.

6 - Enjoy our project! 

-Vbook Team!

## Levantando el proyecto - Spanish version

1 - Antes de intentar correr nuestro repositorio, deberías ustilizar el comando "npm i --force" desde la carpeta principal del proyecto, eso instalará todas las dependencias necesarias para que funcione correctamente.

2 - Después de instalar las dependencias vas a necestiar un servidor de PSQL que se llame "vbook", eso lo puedes hacer desde tu CLI usando el comando "createdb vbook". Recuerda que para que eso funcione deberás tener instalado y configurado PSQL, si no lo tienes, has click en el siguiente link https://www.postgresql.org/docs/current/app-psql.html.

3 - Si todo salió bien hasta ahora, entonces crea en tu repositorio un archivo .env, llena el mismo con las variables guardadas en .env.example y rellenalas con tus propias credenciales, las mismas las puedes conseguir en Seguridad de Google, en Developers Facebook y en Developers Github, al final de este archivo encontrarás video tutoriales sobre como hacerlo.

4 - Llegó la hora de levantar nuestro proyecto! utiliza el comando "npm run start" para inicializar tanto el cliente como el servidor. Si esto no funciona, utiliza dos instancias de consola para correr los comandos "npm run server" y "npm run client".

5 - Ahora necesitamos libros! Para eso dejamos preparados algunos de ejemplo. Adentro de la carpeta /api utiliza el comando "npx sequelize-cli db:seed:all" para crear usuarios de prueba y libros adentro de tu base de datos.

6 - Disfruta nuestro proyecto! 

-Equipo Vbook!


### Usefull links

Google APP setup
https://www.youtube.com/watch?v=J4CtP1MBtOE&ab_channel=TonyTeachesTech

Facebook APP setup
https://www.youtube.com/watch?v=XGNjqpaHtk0&ab_channel=themesCode

GitHub APP setup
https://www.youtube.com/watch?v=RwUkG9MMDNM&ab_channel=Webclick

