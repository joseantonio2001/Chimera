<<<<<<< HEAD
# Chimera
Desarrollo de un proyecto para el Colegio de Educación Especial Clínica San Rafael de Granada
=======
# Nombre de la app
(Deberímos de pensar un nombre)

## Instalación 🔧

### Clonar el repo
Ejecutar el comando ```git clone git@github.com:joseantonio2001/Chimera.git``` en el directorio donde queráis tener el proyecto.

🔴 ¡Importante! Esto solo funciona si tenéis en vuestra cuenta de GitHub una clave SSH vinculada a vuestro ordenador. [Guía en GitHub.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=mac)

### Cambiar a la rama *Master*
Dentro de la carpeta que se ha clonado, ejecutar el comando ```git checkout master```.

### Instalar todos los paquetes necesarios
Para instalar todas las dependencias del proyecto, ejecutar el comando ```npm i```

## Estilo del código 📝

Se han añadido al proyecto las herramientas Prettier y ESLint, estas facilitan que todos sigamos unas normas comunes a la hora de escribir el código. En principio, habiendo ejecutado el comando ```npm i``` y teniendo las extensiones de ESLint y Prettier instaladas deberían de aparecer subrayados los errores.

[Link a ESLint en VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | [Link a Prettier en VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Por otro lado, se han añadido dos comandos, ```npm run format``` y ```npm run lint```. Estos dos comandos ejecutan las herramientas anteriores, es recomendable hacerlo en el orden que se han puesto aquí. El *format* soluciona diversos errores sencillos, eliminando líneas en blanco inncesarias o cambiando las comillas dobles por simples, por ejemplo. Después, el *lint* solucionar algunos otros problemas e indica aquellos que se tienen que solventar a mano, normalmente estarán relacionados con ordenar alfabéticamente los *imports*.

La idea con estos dos comandos ejecutarlos justo antes de subir un commit a la rama en la que cada uno esté trabajando de forma que, cuando se haga *merge* con la rama ```Master```, mantengamos el código limpio.
>>>>>>> origin/panelAdmin
