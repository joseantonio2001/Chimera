const express = require('express');
const dotenv = require('dotenv'); // Uso dotenv para mantener seguro datos vulnerables
const cors = require('cors'); // Uso CORS para poder utilizar la API desde la app (Seguridad)
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path:'.env' }); // Revisar siempre si no va bien conexión a BD

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
};

async function abrirConexion(){
  const connection = await mysql.createConnection(dbConfig);
  return connection;
} 

// Rutas API
// Consultas / GETS

// Get de todos los usuarios
app.get('/usuarios', async (req, res) => { // GET Usuarios
  try {
    const connection = await abrirConexion();
    const queryUsuarios = 'SELECT * FROM usuarios';
    const [resultado] = await connection.promise().query(queryUsuarios);
    connection.end(); // Libera recursos BD
    connection.destroy();
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Get de un usuario por id
app.get('/usuarios/:id', async (req, res) => { // GET Usuarios
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryUsuarios = 'SELECT * FROM usuarios WHERE id = ?';
    const [resultado] = await connection.promise().query(queryUsuarios, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Get de todos los estudiantes
app.get('/estudiantes', async (req, res) => { // GET Estudiantes
  try {
    const connection = await abrirConexion();
    console.log('Información de todos los estudiantes de la bd');
    const queryEstudiantes = 'SELECT usuarios.*, estudiantes.* FROM usuarios INNER JOIN estudiantes ON usuarios.id = estudiantes.id;';
    const [resultado] = await connection.promise().query(queryEstudiantes);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Get de un estudiante por id
app.get('/estudiantes/:id', async (req, res) => { // GET Estudiantes
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    console.log('Información del alumno con ID ', id)
    const queryEstudiantes = 'SELECT usuarios.*, estudiantes.* FROM usuarios INNER JOIN estudiantes ON usuarios.id = estudiantes.id WHERE usuarios.id = ?';
    const [resultado] = await connection.promise().query(queryEstudiantes, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});


// Get de todos los estudiantes de una clase por el id de la clase
app.get('/estudiantes/clases/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryEstudiantes = 'SELECT usuarios.*, estudiantes.* FROM usuarios INNER JOIN estudiantes ON usuarios.id = estudiantes.id INNER JOIN asignaciones ON estudiantes.id = asignaciones.id_estudiante WHERE asignaciones.id_clase = ?';
    const [resultado] = await connection.promise().query(queryEstudiantes, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  }catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Get de todos los profesores
app.get('/profesores', async (req, res) => { // GET Profesores
  try {
    const connection = await abrirConexion();
    const queryProfesores = 'SELECT usuarios.*, profesores.* FROM usuarios INNER JOIN profesores ON usuarios.id = profesores.id;';
    const [resultado] = await connection.promise().query(queryProfesores);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Get de un profesor por id
app.get('/profesores/:id', async (req, res) => { // GET Profesores
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryProfesores = 'SELECT usuarios.*, profesores.* FROM usuarios INNER JOIN profesores ON usuarios.id = profesores.id WHERE usuarios.id = ?';
    const [resultado] = await connection.promise().query(queryProfesores, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener profesores:', error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Get de todas las tareas
app.get('/tareas', async (req, res) => { // GET Tareas
  try {
    const connection = await abrirConexion();
    const queryTareas = 'SELECT * FROM tareas';
    const [resultado] = await connection.promise().query(queryTareas);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Get de una tarea por id
app.get('/tareas/:id', async (req, res) => { // GET Tareas
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryTareas = 'SELECT * FROM tareas WHERE id = ?';
    const [resultado] = await connection.promise().query(queryTareas, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Get de todas las clases
app.get('/clases', async (req, res) => { // GET Clases
  try {
    const connection = await abrirConexion();
    const queryClases = 'SELECT * FROM clases';
    const [resultado] = await connection.promise().query(queryClases);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).json({ error: 'Error al obtener clases' });
  }
});

// Get de una clase por id
app.get('/clases/:id', async (req, res) => { // GET Clases
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryClases = 'SELECT * FROM clases WHERE id = ?';
    const [resultado] = await connection.promise().query(queryClases, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener clases:', error);
    res.status(500).json({ error: 'Error al obtener clases' });
  }
});

// Get de todos los elementos del inventario
app.get('/inventario', async (req, res) => { // GET Inventario
  try {
    const connection = await abrirConexion();
    const queryInventario = 'SELECT * FROM inventario';
    const [resultado] = await connection.promise().query(queryInventario);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// Get de un elemento del inventario por id
app.get('/inventario/:id', async (req, res) => { // GET Inventario
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryInventario = 'SELECT * FROM inventario WHERE id = ?';
    const [resultado] = await connection.promise().query(queryInventario, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// Get de todos los menús
app.get('/menus', async (req, res) => { // GET Menus
  try {
    const connection = await abrirConexion();
    const queryMenus = 'SELECT * FROM menus';
    const [resultado] = await connection.promise().query(queryMenus);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener menus:', error);
    res.status(500).json({ error: 'Error al obtener menus' });
  }
});

// Get de un menú por id
app.get('/menus/:id', async (req, res) => { // GET Menus
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryMenus = 'SELECT * FROM menus WHERE id = ?';
    const [resultado] = await connection.promise().query(queryMenus, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener menus:', error);
    res.status(500).json({ error: 'Error al obtener menus' });
  }
});

// Get de todos los pasos
app.get('/pasos', async (req, res) => { // GET Pasos
  try {
    const connection = await abrirConexion();
    const queryPasos = 'SELECT * FROM pasos';
    const [resultado] = await connection.promise().query(queryPasos);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener pasos:', error);
    res.status(500).json({ error: 'Error al obtener pasos' });
  }
});

// Get de un paso por id
app.get('/pasos/:id', async (req, res) => { // GET Pasos
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryPasos = 'SELECT * FROM pasos WHERE id = ?';
    const [resultado] = await connection.promise().query(queryPasos, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener pasos:', error);
    res.status(500).json({ error: 'Error al obtener pasos' });
  }
});

// Get de todos los pasos de una tarea por id ordenados por n_paso
app.get('/pasosTarea/:id', async (req, res) => { // GET Pasos
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryPasos = 'SELECT * FROM pasos WHERE id_tarea = ? ORDER BY n_paso';
    const [resultado] = await connection.promise().query(queryPasos, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener pasos:', error);
    res.status(500).json({ error: 'Error al obtener pasos' });
  }
});

// Insercioones / POST
// Ruta para insertar un estudiante en la base de datos
app.post('/estudiantes/crearAlumno', async (req, res) => {
  try{
    let nuevoElementoId = '-1';
    const connection = await abrirConexion();
    const { nombre, apellido1, apellido2, contraseña,  preferencias, fechaNac} = req.body;
    const query1 = 'INSERT INTO usuarios (nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, MD5(?),?)';
    const result = await connection.promise().query(query1, [nombre, apellido1, apellido2, fechaNac, contraseña, null ]);
    if (result[0].err) {
      console.error('Error al insertar estudiante: ' + err);
      return;
    }
    nuevoElementoId = result[0].insertId;
    console.log(result[0]);
    console.log('Estudiante insertado con éxito en usuarios');

    const query2 = 'INSERT INTO estudiantes (id, preferencias) VALUES (?, ?)';
    const result2 = await connection.promise().query(query2, [nuevoElementoId, preferencias]);
    if (result2[0].err) {
      console.error('Error al insertar estudiante: ' + err);
      res.status(500).json({ error: 'Error al insertar estudiante en la base de datos' });
      return;
    }
    console.log('Estudiante insertado con éxito en Estudiantes');
    res.status(201).json({ message: 'Estudiante insertado con éxito' });

    console.log('Estudiante insertado con éxito');
    connection.end();
  } catch (error){
    console.error('Error al introducir estudiante:', error);
    res.status(500).json({ error: 'Error al introducir estudiante' });
  }

});


// Ruta para insertar un profesor en la base de datos
app.post('/profesores/crearProfe',  async (req, res) => {
  try{
    let nuevoElementoId = '-1';
    const connection = await abrirConexion();
    const {nombre, apellido1, apellido2, contraseña,  admin, fechaNac} = req.body;
    const query1 = 'INSERT INTO usuarios (nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, MD5(?),?)';
    
    const result = await connection.promise().query(query1, [nombre, apellido1, apellido2, fechaNac, contraseña, null ]);
    if (result[0].err) {
      console.error('Error al insertar profesor: ' + result[0].err);
      return;
    }
    console.log('Profesor insertado con éxito en usuarios');
    nuevoElementoId = result[0].insertId;

    const query2 = 'INSERT INTO profesores (id, admin) VALUES (?, ?)';
    const result2 = await connection.promise().query(query2, [nuevoElementoId, admin]);
    if (result2[0].err) {
      console.error('Error al insertar profesor: ' + result2[0].err);
      res.status(500).json({ error: 'Error al insertar profesor en la base de datos' });
      return;
    }
    console.log('Profesor insertado con éxito en Profesores');
    res.status(201).json({ message: 'Profesor insertado con éxito' });
    connection.end();
  } catch (error){
    console.error('Error al introducir profesor:', error);
    res.status(500).json({ error: 'Error al introducir profesor' });
  }
  console.log('Profesor insertado con éxito en la base de datos!');
});

// Insertar clase
app.post('/clases/crearAula', async (req, res) => {
  try{
    let nuevoElementoId = '-1';
    const connection = await abrirConexion();
    const { capacidad, id_profesor, estudiantes } = req.body;

    // Validar capacidad antes de realizar las inserciones
    if (estudiantes.length > capacidad) {
      res.status(400).json({ error: 'Error en la creación del aula: La cantidad de estudiantes supera la capacidad del aula.' });
      return;
    }
    const query1 = 'INSERT INTO clases (capacidad) VALUES (?)';
    const result = await connection.promise().query(query1, [capacidad]);
    if (result[0].err) {
      console.error('Error al insertar clase: ' + result[0].err);
      res.status(500).json({ error: 'Error al insertar clase en la base de datos' });
      return;
    }
    nuevoElementoId = result[0].insertId;
    console.log('Clase insertada con éxito en clases');

    let limite = capacidad;

    const query2 = 'INSERT INTO asignaciones (id_estudiante, id_profesor, id_clase) VALUES (?, ?, ?)';
    await Promise.all(estudiantes.map(async estudianteId => {
      if (limite > 0) {
        await connection.promise().query(query2, [estudianteId, id_profesor, nuevoElementoId]);
        limite--;
      }
    }));

    connection.end();
    res.status(201).json({ mensaje: 'Aula creada con éxito' });
  } catch (error) {
    console.error('Error al introducir clase:', error);
    res.status(500).json({ error: 'Error al introducir clase' });
  }
});


// Insertar elemento inventario
app.post('/inventario/crearElemento', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { nombre, cantidad } = req.body;
    const query1 = 'INSERT INTO inventario (nombre, cantidad) VALUES (?, ?)';
    await connection.promise().query(query1, [nombre, cantidad ], (err, result) => {
    if (err) {
      console.error('Error al insertar elemento: ' + err);
      res.status(500).json({ error: 'Error al insertar elemento en la base de datos' });
      return;
    }
    console.log('Elemento insertado con éxito en inventario');
    res.status(201).json({ message: 'Elemento insertado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir elemento:', error);
    res.status(500).json({ error: 'Error al introducir elemento' });
  }
});

// Insertar menú
app.post('/menus/crearMenu', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { nombre, descripcion } = req.body;
    const query1 = 'INSERT INTO menus (nombre, descripcion) VALUES (?, ?)';
    await connection.promise().query(query1, [nombre, descripcion ], (err, result) => {
    if (err) {
      console.error('Error al insertar menu: ' + err);
      res.status(500).json({ error: 'Error al insertar menu en la base de datos' });
      return;
    }
    console.log('Menu insertado con éxito en menus');
    res.status(201).json({ message: 'Menu insertado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir menu:', error);
    res.status(500).json({ error: 'Error al introducir menu' });
  }
});

// Insertar paso
app.post('/pasos/crearPaso', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const {id_tarea, n_paso, imagen } = req.body;
    const query1 = 'INSERT INTO pasos (id_tarea, n_paso, imagen) VALUES (?, ?, ?, ?)';
    await connection.promise().query(query1, [id_tarea, n_paso, imagen], (err, result) => {
    if (err) {
      console.error('Error al insertar paso: ' + err);
      res.status(500).json({ error: 'Error al insertar paso en la base de datos' });
      return;
    }
    console.log('Paso insertado con éxito en pasos');
    res.status(201).json({ message: 'Paso insertado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir paso:', error);
    res.status(500).json({ error: 'Error al introducir paso' });
  }
});

// Insertar tarea
app.post('/tareas/crearTarea', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { nombre, descripcion, video, portada, tipo } = req.body;
    const query1 = 'INSERT INTO tareas (nombre, descripcion, video, portada, tipo) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.promise().query(query1, [nombre, descripcion, video, portada, tipo ], (err, result) => {
    if (err) {
      console.error('Error al insertar tarea: ' + err);
      res.status(500).json({ error: 'Error al insertar tarea en la base de datos' });
      return;
    }
    console.log('Tarea insertada con éxito en tareas');
    res.status(201).json({ message: 'Tarea insertada con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir tarea:', error);
    res.status(500).json({ error: 'Error al introducir tarea' });
  }
});

// Insertar asignaciones

app.post('/clases/aniadealumnos', async (req, res) => {
  try {
    const { claseId, estudiantes } = req.body;
    const connection = await abrirConexion();

    try {
      // Iterar sobre los estudiantes seleccionados
      for (const estudianteId of estudiantes) {
        // Insertar una nueva fila en la tabla de asignaciones
        const queryInsert = 'INSERT INTO asignaciones (id_clase, id_estudiante) VALUES (?, ?)';
        await connection.promise().query(queryInsert, [claseId, estudianteId], (err, result) =>{
        if (err){
          console.error('Error al establecer conexión con la base de datos:' + err);
          res.status(500).json({ error: 'Error al establecer conexión con la base de datos.' });
        }
        // Enviar respuesta exitosa
        });
        connection.end();

      }

       } catch (error) {
      console.error('Error al añadir alumnos a la clase:', error);
      res.status(500).json({ error: 'Error al añadir alumnos a la clase.' });
    } 
  } catch (error) {
    console.error('Error al añadir los estudiantes:', error);
    res.status(500).json({ error: 'Error al añadir los estudiantes.' });
  }
  console.log('Estudiante añadido cone exito')
  res.status(201).json({ message: 'Alumnos añadidos con éxito a la clase.' });

});

// eliminar asignaciones

app.post('/clases/quitaralumnos', async (req, res) => {
  try {
    const { claseId, estudiantes } = req.body;
    const connection = await abrirConexion();

    try {
      // Iterar sobre los estudiantes seleccionados
      for (const estudianteId of estudiantes) {
        // Eliminar la fila correspondiente a la asignación
        const queryDelete = 'DELETE FROM asignaciones WHERE id_clase = ? AND id_estudiante = ?';
        await connection.promise().query(queryDelete, [claseId, estudianteId], (err, result) => {
          if (err) {
            console.error('Error al establecer conexión con la base de datos:' + err);
            res.status(500).json({ error: 'Error al establecer conexión con la base de datos.' });
          }
        });
      }

    } catch (error) {
      console.error('Error al quitar alumnos de la clase:', error);
      res.status(500).json({ error: 'Error al quitar alumnos de la clase.' });
    } finally {
      connection.end();
    }

  } catch (error) {
    console.error('Error al quitar los estudiantes:', error);
    res.status(500).json({ error: 'Error al quitar los estudiantes.' });
  }
  console.log('Estudiante(s) quitado(s) con éxito');
  res.status(200).json({ message: 'Estudiantes quitados con éxito de la clase.' });
});
    


// Actualizaciones / PUT
// Ruta para actualizar un estudiante en la base de datos

app.put('/estudiantes/actualizarAlumno', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, apellido1, apellido2,  preferencias, fechaNac} = req.body;
    const query1 = 'UPDATE usuarios SET nombre = ?, apellido1 = ?, apellido2 = ?, fecha_nac = ? WHERE id = ?';
    await connection.promise().query(query1, [nombre, apellido1, apellido2, fechaNac, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar estudiante: ' + err);
      return;
    }
    console.log('Estudiante actualizado con éxito en usuarios');
    });

    const query2 = 'UPDATE estudiantes SET preferencias = ? WHERE id = ?';
    await connection.promise().query(query2, [preferencias,id], (err, result) => {
    if (err) {
      console.error('Error al actualizar estudiante: ' + err);
      res.status(500).json({ error: 'Error al actualizar estudiante en la base de datos' });
      return;
    }
    console.log('Estudiante actualizado con éxito en Estudiantes');
    res.status(201).json({ message: 'Estudiante actualizado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
  console.log('Estudiante actualizado con éxito en la base de datos!');
  res.status(201).json({ message: 'Estudiante actualizado con éxito' });
});

// Actualizar profesor
app.put('/profesores/actualizarProfe', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, apellido1, apellido2, admin, fechaNac} = req.body;
    const query1 = 'UPDATE usuarios SET nombre = ?, apellido1 = ?, apellido2 = ?, fecha_nac = ? WHERE id = ?';
    await connection.promise().query(query1, [nombre, apellido1, apellido2, fechaNac,  id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar profesor: ' + err);
      return;
    }
    console.log('Profesor actualizado con éxito en usuarios');
    });

    const query2 = 'UPDATE profesores SET admin = ? WHERE id = ?';
    await connection.promise().query(query2, [admin,id], (err, result) => {
    if (err) {
      console.error('Error al actualizar profesor: ' + err);
      res.status(500).json({ error: 'Error al actualizar profesor en la base de datos' });
      return;
    }
    console.log('Profesor actualizado con éxito en Profesores');
    res.status(201).json({ message: 'Profesor actualizado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar profesor:', error);
    res.status(500).json({ error: 'Error al actualizar profesor' });
  }
  console.log('Profesor actualizado con éxito en la base de datos!');
  res.status(201).json({ message: 'Profesor actualizado con éxito' });
});

// Actualizar clase
app.put('/clases/actualizarClase', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, capacidad, id_profesor, id_estudiante } = req.body;
    const query1 = 'UPDATE clases SET capacidad = ?, id_profesor = ?, id_estudiante = ? WHERE id = ?';
    await connection.promise().query(query1, [capacidad, id_profesor, id_estudiante, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar clase: ' + err);
      res.status(500).json({ error: 'Error al actualizar clase en la base de datos' });
      return;
    }
    console.log('Clase actualizada con éxito en clases');
    res.status(201).json({ message: 'Clase actualizada con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar clase:', error);
    res.status(500).json({ error: 'Error al actualizar clase' });
  }
});

// Actualizar elemento inventario
app.put('/inventario/actualizarElemento', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, cantidad } = req.body;
    const query1 = 'UPDATE inventario SET nombre = ?, cantidad = ? WHERE id = ?';
    await connection.promise().query(query1, [nombre, cantidad, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar elemento: ' + err);
      res.status(500).json({ error: 'Error al actualizar elemento en la base de datos' });
      return;
    }
    console.log('Elemento actualizado con éxito en inventario');
    res.status(201).json({ message: 'Elemento actualizado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar elemento:', error);
    res.status(500).json({ error: 'Error al actualizar elemento' });
  }
});

// Actualizar menú
app.put('/menus/actualizarMenu', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, descripcion } = req.body;
    const query1 = 'UPDATE menus SET nombre = ?, descripcion = ? WHERE id = ?';
    await connection.promise().query(query1, [nombre, descripcion, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar menu: ' + err);
      res.status(500).json({ error: 'Error al actualizar menu en la base de datos' });
      return;
    }
    console.log('Menu actualizado con éxito en menus');
    res.status(201).json({ message: 'Menu actualizado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar menu:', error);
    res.status(500).json({ error: 'Error al actualizar menu' });
  }
});

// Actualizar paso
app.put('/pasos/actualizarPaso', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, id_tarea, n_paso, imagen } = req.body;
    const query1 = 'UPDATE pasos SET id_tarea = ?, n_paso = ?, imagen = ? WHERE id = ?';
    await connection.promise().query(query1, [id_tarea, n_paso, imagen, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar paso: ' + err);
      res.status(500).json({ error: 'Error al actualizar paso en la base de datos' });
      return;
    }
    console.log('Paso actualizado con éxito en pasos');
    res.status(201).json({ message: 'Paso actualizado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar paso:', error);
    res.status(500).json({ error: 'Error al actualizar paso' });
  }
});

// Actualizar tarea
app.put('/tareas/actualizarTarea', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, descripcion, video, portada, tipo } = req.body;
    const query1 = 'UPDATE tareas SET nombre = ?, descripcion = ?, video = ?, portada = ?, tipo = ? WHERE id = ?';
    await connection.promise().query(query1, [nombre, descripcion, video, portada, tipo, id ], (err, result) => {
    if (err) {
      console.error('Error al actualizar tarea: ' + err);
      res.status(500).json({ error: 'Error al actualizar tarea en la base de datos' });
      return;
    }
    console.log('Tarea actualizada con éxito en tareas');
    res.status(201).json({ message: 'Tarea actualizada con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// Borrado / DELETE
// Ruta para borrar un estudiante en la base de datos

app.delete('/estudiantes/borrarAlumno/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar alumno. ID: ',id)

    const query1 = 'DELETE FROM estudiantes WHERE id = ?';
    await connection.promise().query(query1, id, (err, result) => {
    if (err) {
      console.error('Error al borrar estudiante: ' + err);
      res.status(500).json({ error: 'Error al borrar estudiante en la base de datos' });
      return;
    }
    console.log('Estudiante borrado con éxito en Estudiantes');
    res.status(201).json({ message: 'Estudiante borrado con éxito' });
    });

    const query2 = 'DELETE FROM usuarios WHERE id = ?';
    await connection.promise().query(query2, id, (err, result) => {
    if (err) {
      console.error('Error al borrar estudiante: ' + err);
      return;
    }
    console.log('Estudiante borrado con éxito en usuarios');
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar estudiante:', error);
    res.status(500).json({ error: 'Error al borrar estudiante' });
  }
  console.log('Estudiante eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Estudiante eliminado con éxito' });
});

// Borrar profesor
app.delete('/profesores/borrarProfe/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar profesor. ID: ',id)

    const query1 = 'DELETE FROM profesores WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar profesor: ' + err);
      res.status(500).json({ error: 'Error al borrar profesor en la base de datos' });
      return;
    }
    console.log('Profesor borrado con éxito en Profesores');
    res.status(201).json({ message: 'Profesor borrado con éxito' });
    });

    const query2 = 'DELETE FROM usuarios WHERE id = ?';
    await connection.promise().query(query2, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar profesor: ' + err);
      return;
    }
    console.log('Profesor borrado con éxito en usuarios');
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar profesor:', error);
    res.status(500).json({ error: 'Error al borrar profesor' });
  }
  console.log('Profesor eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Profesor eliminado con éxito' });
});

// Borrar clase
app.delete('/clases/borrarClase/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar clase. ID: ',id)

    const query1 = 'DELETE FROM clases WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar clase: ' + err);
      res.status(500).json({ error: 'Error al borrar clase en la base de datos' });
      return;
    }
    console.log('Clase borrada con éxito en clases');
    res.status(201).json({ message: 'Clase borrada con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar clase:', error);
    res.status(500).json({ error: 'Error al borrar clase' });
  }
  console.log('Clase eliminada con éxito en la base de datos!');
  res.status(201).json({ message: 'Clase eliminada con éxito' });
});

// Borrar elemento inventario
app.delete('/inventario/borrarElemento/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar un elemento del inventario. ID: ',id)

    const query1 = 'DELETE FROM inventario WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar elemento: ' + err);
      res.status(500).json({ error: 'Error al borrar elemento en la base de datos' });
      return;
    }
    console.log('Elemento borrado con éxito en inventario');
    res.status(201).json({ message: 'Elemento borrado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar elemento:', error);
    res.status(500).json({ error: 'Error al borrar elemento' });
  }
  console.log('Elemento del inventario eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Elemento del inventario eliminado con éxito' });
});

// Borrar menú
app.delete('/menus/borrarMenu/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar manú. ID: ',id)

    const query1 = 'DELETE FROM menus WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar menu: ' + err);
      res.status(500).json({ error: 'Error al borrar menu en la base de datos' });
      return;
    }
    console.log('Menu borrado con éxito en menus');
    res.status(201).json({ message: 'Menu borrado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar menu:', error);
    res.status(500).json({ error: 'Error al borrar menu' });
  }
  console.log('Menú eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Menú eliminado con éxito' });
});

// Borrar paso
app.delete('/pasos/borrarPaso/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar un paso de una tarea. ID: ',id)

    const query1 = 'DELETE FROM pasos WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar paso: ' + err);
      res.status(500).json({ error: 'Error al borrar paso en la base de datos' });
      return;
    }
    console.log('Paso borrado con éxito en pasos');
    res.status(201).json({ message: 'Paso borrado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar paso:', error);
    res.status(500).json({ error: 'Error al borrar paso' });
  }
  console.log('Paso de una tarea eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Paso de una tarea eliminado con éxito' });
});

// Borrar tarea
app.delete('/tareas/borrarTarea/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = parseInt(req.params.id, 10);
    console.log('Queremos borrar tarea. ID: ',id)

    const query1 = 'DELETE FROM tareas WHERE id = ?';
    await connection.promise().query(query1, [id], (err, result) => {
    if (err) {
      console.error('Error al borrar tarea: ' + err);
      res.status(500).json({ error: 'Error al borrar tarea en la base de datos' });
      return;
    }
    console.log('Tarea borrada con éxito en tareas');
    res.status(201).json({ message: 'Tarea borrada con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al borrar tarea:', error);
    res.status(500).json({ error: 'Error al borrar tarea' });
  }
  console.log('Tarea eliminada con éxito en la base de datos!');
  res.status(201).json({ message: ' Tarea eliminada con éxito' });
});

app.listen(5050, () => { // Inicia el servidor en el puerto 5050
  console.log('Servidor en ejecución en el puerto 5050');
});


