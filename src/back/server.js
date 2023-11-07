const express = require('express');
const dotenv = require('dotenv'); // Uso dotenv para mantener seguro datos vulnerables
const cors = require('cors'); // Uso CORS para poder utilizar la API desde la app (Seguridad)
const mysql = require('mysql2');
const app = express();

app.use(cors());

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

app.listen(5050, () => { // Inicia el servidor en el puerto 5050
  console.log('Servidor en ejecución en el puerto 5050');
});