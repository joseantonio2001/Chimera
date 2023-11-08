const express = require('express');
const dotenv = require('dotenv'); // Uso dotenv para mantener seguro datos vulnerables
const cors = require('cors'); // Uso CORS para poder utilizar la API desde la app (Seguridad)
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path: '../../.env' }); // Path del .env

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

app.get('/estudiantes', async (req, res) => { // GET Estudiantes
  try {
    const connection = await abrirConexion();
    const queryEstudiantes = 'SELECT usuarios.*, estudiantes.* FROM usuarios INNER JOIN estudiantes ON usuarios.id = estudiantes.id;';
    const [resultado] = await connection.promise().query(queryEstudiantes);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

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

// Insercioones / POST
// Ruta para insertar un estudiante en la base de datos
app.post('/estudiantes/crearAlumno', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, apellido1, apellido2, contraseña,  preferencias, fechaNac} = req.body;
    const query1 = 'INSERT INTO usuarios (id, nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, ?, MD5(?),?)';
    await connection.promise().query(query1, [id, nombre, apellido1, apellido2, fechaNac, contraseña, null ], (err, result) => {
    if (err) {
      console.error('Error al insertar estudiante: ' + err);
      return;
    }
    console.log('Estudiante insertado con éxito en usuarios');
    });

    const query2 = 'INSERT INTO estudiantes (id, preferencias) VALUES (?, ?)';
    await connection.promise().query(query2, [id,preferencias], (err, result) => {
    if (err) {
      console.error('Error al insertar estudiante: ' + err);
      res.status(500).json({ error: 'Error al insertar estudiante en la base de datos' });
      return;
    }
    console.log('Estudiante insertado con éxito en Estudiantes');
    res.status(201).json({ message: 'Estudiante insertado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir estudiante:', error);
    res.status(500).json({ error: 'Error al introducir estudiante' });
  }

});

// Ruta para insertar un profesor en la base de datos
app.post('/profesores/crearProfe',  async (req, res) => {
  try{
    const connection = await abrirConexion();
    const { id, nombre, apellido1, apellido2, contraseña,  admin, fechaNac} = req.body;
    const query1 = 'INSERT INTO usuarios (id, nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, ?, MD5(?),?)';
    
      connection.promise().query(query1, [id, nombre, apellido1, apellido2, fechaNac, contraseña, null ], (err, result) => {
      if (err) {
        console.error('Error al insertar profesor: ' + err);
        return;
      }

      console.log('Profesor insertado con éxito en usuarios');
    });

    const query2 = 'INSERT INTO profesores (id, admin) VALUES (?, ?)';
    connection.promise().query(query2, [id,admin], (err, result) => {
    if (err) {
      console.error('Error al insertar profesor: ' + err);
      res.status(500).json({ error: 'Error al insertar profesor en la base de datos' });
      return;
    }
    console.log('Profesor insertado con éxito en Profesores');
    res.status(201).json({ message: 'Profesor insertado con éxito' });
    });
    connection.end();
  } catch (error){
    console.error('Error al introducir estudiante:', error);
    res.status(500).json({ error: 'Error al introducir estudiante' });
  }
});

app.listen(5050, () => { // Inicia el servidor en el puerto 5050
  console.log('Servidor en ejecución en el puerto 5050');
});