/* Eliminar claves externas para poder hacer cambios en las tablas */
ALTER TABLE estudiantes DROP FOREIGN KEY estudiantes_ibfk_1;
ALTER TABLE profesor_estudiante_clase DROP FOREIGN KEY profesor_estudiante_clase_ibfk_1;
ALTER TABLE profesores DROP FOREIGN KEY profesores_ibfk_1;
ALTER TABLE profesor_estudiante_clase DROP FOREIGN KEY profesor_estudiante_clase_ibfk_2;

/* Eliminar datos para poder hacer cambios en las tablas */
DELETE FROM estudiantes;
DELETE FROM profesores;
DELETE FROM usuarios;
DELETE FROM profesor_estudiante_clase;

/* Mantener todo en un mismo idioma, como la mayoría de cosas estaban en español lo he traducido */
ALTER TABLE clases CHANGE `capacity` `capacidad` INT NOT NULL;


/* --- Cambios en la tabla de estudiantes --- */

/* Cambiar dni por id, además se cambia el tipo de dato a INT */
ALTER TABLE `estudiantes` CHANGE `dni` `id` INT NOT NULL;

/* Cambio en la forma de representar la forma de visualización */
ALTER TABLE `estudiantes` CHANGE `discapacidad` `preferencias` INT NOT NULL DEFAULT '111';

/*
    Sobre el campo preferencias, he pensado hacer como una especie de códigos.
    La cosa es que tenemos tres tipos de visualización, texto (que sirve además
    para el lector de pantalla), vídeo y pictogramas. Entonces el código
    funcionaría como una cadena de bits (texto, vídeo, pictogramas), por ejemplo:
    - 100: Solo texto
    - 010: Solo vídeo
    - 001: Solo pictogramas
    - 110: Texto y vídeo
    ...

    No sé si es la mejor forma de hacerlo, pero es la que se me ha ocurrido.
*/


/* --- Cambios en la tabla inventario --- */
ALTER TABLE `inventario` CHANGE `capacidad` `cantidad` INT NOT NULL;


/* --- Cambios en la tabla profesores --- */

/* Cambiar dni por id, además se cambia el tipo de dato a INT */
ALTER TABLE `profesores` CHANGE `dni` `id` INT NOT NULL;

/* El campo admin de la tabla profesores no debería de ser nulo */
ALTER TABLE `profesores` CHANGE `admin` `admin` TINYINT(1) NOT NULL DEFAULT '0';


/* --- Cambios en la tabla profesor_estudiante_clase --- */

/* Cambiar el tipo de dato de los campos id_estudiante e id_profesor a INT */
ALTER TABLE `profesor_estudiante_clase` CHANGE `id_estudiante` `id_estudiante` INT NOT NULL;
ALTER TABLE `profesor_estudiante_clase` CHANGE `id_profesor` `id_profesor` INT NOT NULL;


/* --- Cambios en la tabla tareas --- */

/* Añadir el campo "tipo" */
ALTER TABLE `tareas` ADD `tipo` INT NOT NULL DEFAULT '1' AFTER `video`;

/*
    El campo tipo es para saber si la tarea es de tipo pasos, comanda o pedidos.
    - 1: Pasos
    - 2: Comanda
    - 3: Pedidos
*/


/* --- Cambios en la tabla usuarios --- */

/* Cambiar dni por id, además se cambia el tipo de dato a INT y se hace autoincrementable */
ALTER TABLE `usuarios` CHANGE `dni` `id` INT NOT NULL AUTO_INCREMENT;


/* --- Volver a introducir las claves externas --- */
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`);

ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`);

ALTER TABLE `profesor_estudiante_clase`
  ADD CONSTRAINT `profesor_estudiante_clase_ibfk_1` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`),
  ADD CONSTRAINT `profesor_estudiante_clase_ibfk_2` FOREIGN KEY (`id_profesor`) REFERENCES `profesores` (`id`);


/* --- Añadir datos --- */
INSERT INTO `usuarios` (`id`, `nombre`, `apellido1`, `apellido2`, `fecha_nac`, `PASSWORD`, `img_perfil`) VALUES
('1', 'Pedro', 'Porro', 'Sauced', '2023-10-31', '*AA1420F182E88B9E5F874F6FBE7459291E8F4601', NULL),
('2', 'Lionel Andrés', 'Messi', 'Cuccittini', '2023-10-31', '*AA1420F182E88B9E5F874F6FBE7459291E8F4601', NULL);

INSERT INTO `profesores` (`id`, `admin`) VALUES
('1', 1);

INSERT INTO `estudiantes` (`id`, `preferencias`) VALUES
('2', 100);

INSERT INTO `profesor_estudiante_clase` (`id_estudiante`, `id_clase`, `id_profesor`) VALUES
('2', 1, '1');
