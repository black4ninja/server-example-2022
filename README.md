# Server Example 2022
Proyecto base para la materia TC3005B ITESM

## Instalación
Es requerido instalar [Node](https://nodejs.org/es/) en una versión superior a la 12, así como el gestor de paquetes npm y se recomienda usar [PM2](https://pm2.keymetrics.io/) para el despliegue de la aplicación.
 
Para instalar las dependencias puede ejecutar el comando de npm en la raíz del proyecto
```
npm install
``` 
Para ejecutar el proyecto ejecute el siguiente script en la raíz del proyecto:
```
pm2 start dev-server-example.json
pm2 start prod-server-example.json
``` 
