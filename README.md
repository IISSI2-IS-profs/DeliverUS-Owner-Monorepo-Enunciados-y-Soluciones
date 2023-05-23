# DeliverUS-Owner Monorepo

## Introducción
Este repositorio incluye el backend completo (carpeta `DeliverUS-Backend`) y el frontend de owner (carpeta `DeliverUS-Frontend-Owner`). Servirá como base para los exámenes de convocatoria de la asignatura.

## Preparación del entorno

Windows:
* Abra un terminal y ejecute el comando `npm run install:all:win`.

Linux/MacOS:
* Abra un terminal y ejecute el comando `npm run install:all:bash`.

## Ejecución y depuración

* Para **ejecutar el backend**, abra un terminal y ejecute el comando `npm run start:backend`. 

* Para **ejecutar el frontend**, abra un nuevo terminal y ejecute el comando `npm run start:frontend`. 

* Para **depurar el backend**, asegúrese de que **NO** existe una instancia en ejecución, pulse en el botón `Run and Debug` de la barra lateral, seleccione `Debug Backend` en la lista desplegable, y pulse el botón de *Play*. 

* Para **depurar el frontend**, asegúrese de que **EXISTE** una instancia en ejecución, pulse en el botón `Run and Debug` de la barra lateral, seleccione `Debug Frontend` en la lista desplegable, y pulse el botón de *Play*.

* Para **rehacer las migraciones y seeders del backend**, abra un terminal y ejecute el comando `npm run migrate:backend`.
