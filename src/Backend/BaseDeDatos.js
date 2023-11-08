const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3000,
  user: 'root',
  password: 'admin',
  database: 'colegio'
});

// Conecta a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos: ' + err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.get('/api/crearAlumno', (req, res) => {
  console.log("El servidor está preparado!")
});
// Ruta para insertar un estudiante en la base de datos
app.post('/api/crearAlumno', (req, res) => {

  console.log("He recibido la petición de añadir un usuario!");
  const { dni, nombre, apellido1, apellido2, contraseña, discapacidad, fechaNac } = req.body;

  const query1 = 'INSERT INTO usuarios (dni, nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, ?, ?,?)';
  db.query(query1, [dni, nombre, apellido1, apellido2, fechaNac, contraseña, null], (err, result) => {
    if (err) {
      console.error('Error al insertar estudiante: ' + err);
      return;
    }

    console.log('Estudiante insertado con éxito en Usuarios');
  });


  const query2 = 'INSERT INTO estudiantes (dni, discapacidad) VALUES (?, ?)';
  db.query(query2, [dni, discapacidad], (err, result) => {
    if (err) {
      console.error('Error al insertar estudiante: ' + err);
      res.status(500).json({ error: 'Error al insertar estudiante en la base de datos' });
      return;
    }

    console.log('Estudiante insertado con éxito en Estudiantes');
    res.status(201).json({ message: 'Estudiante insertado con éxito' });
  });

});


app.get('/api/crearProfe', (req, res) => {
  console.log("El servidor está preparado!")
});

// Ruta para insertar un estudiante en la base de datos
app.post('/api/crearProfe', (req, res) => {

  console.log("He recibido la petición de añadir un profesor!");

  const { dni, nombre, apellido1, apellido2, contraseña, admin, fechaNac } = req.body;

  const query1 = 'INSERT INTO usuarios (dni, nombre, apellido1, apellido2, fecha_nac, PASSWORD,img_perfil) VALUES (?, ?, ?, ?, ?, ?,?)';

  db.query(query1, [dni, nombre, apellido1, apellido2, fechaNac, contraseña, null], (err, result) => {
    if (err) {
      console.error('Error al insertar profesor: ' + err);
      return;
    }

    console.log('Profesor insertado con éxito en Usuarios');
  });

  const query2 = 'INSERT INTO profesores (dni, admin) VALUES (?, ?)';
  db.query(query2, [dni, admin], (err, result) => {
    if (err) {
      console.error('Error al insertar profesor: ' + err);
      res.status(500).json({ error: 'Error al insertar profesor en la base de datos' });
      return;
    }

    console.log('Profesor insertado con éxito en Profesores');
    res.status(201).json({ message: 'Profesor insertado con éxito' });
  });

});


app.get('/api/crearAula', (req, res) => {
  console.log("El servidor está preparado!")
});




// Ruta para insertar un estudiante en la base de datos
app.post('/api/crearAula', (req, res) => {
  console.log("He recibido la petición de añadir un aula!");

  const { id, capacidad, profesor, estudiantes } = req.body;

  console.log("Parámetros recibidos:");
  console.log("id:", id);
  console.log("capacidad:", capacidad);
  console.log("profesor:", profesor);
  console.log("estudiantes:", estudiantes);

  // Comprobar si los parámetros son undefined o vacíos
  if (
    id === undefined || id.trim() === '' ||
    capacidad === undefined || capacidad.trim() === '' ||
    profesor === undefined || profesor.trim() === '' ||
    !Array.isArray(estudiantes) || estudiantes.length === 0
  ) {
    return res.status(400).json({ error: 'Parámetros incompletos o inválidos' });
  }

  // Insertar el aula en la tabla clases
  const query1 = 'INSERT INTO clases (id, capacidad) VALUES (?, ?)';
  db.query(query1, [id, capacidad], (err, result) => {
    if (err) {
      console.error('Error al insertar aula: ' + err);
      res.status(500).json({ error: 'Error al insertar aula en la base de datos' });
      return;
    }

    console.log('Aula insertada con éxito en clases');

    // Insertar estudiantes en la tabla profesor_estudiante_clase
    const query2 = 'INSERT INTO profesor_estudiante_clase (id_estudiante, id_profesor, id_clase) VALUES (?, ?, ?)';
    estudiantes.forEach(estudianteId => {
      db.query(query2, [estudianteId, profesor, id], (err, result) => {
        if (err) {
          console.error('Error al insertar estudiante en clase: ' + err);
          // Puedes manejar el error aquí si lo deseas
        }
      });
    });

    console.log('Estudiantes insertados en profesor_estudiante_clase');
    
    // Envía una respuesta exitosa
    res.status(200).json({ mensaje: 'Aula creada con éxito' });
  });
});




app.get('/api/getprofesores', (req, res) => {
  const query = 'SELECT id, nombre, apellido1, apellido2 FROM usuarios WHERE id IN (SELECT id FROM profesores)';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de profesores: ' + err);
      res.status(500).json({ error: 'Error al obtener la lista de profesores' });
      return;
    }

    res.json(result);
  });
});

app.get('/api/getestudiantes', (req, res) => {
  const query = 'SELECT id, nombre, apellido1, apellido2 FROM usuarios WHERE id IN (SELECT id FROM estudiantes)';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error al obtener la lista de estudiantes: ' + err);
      res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
      return;
    }

    res.json(result);
  });
});

// Inicia el servidor en el puerto 5050
app.listen(5050, () => {
  console.log('Servidor en ejecución en el puerto 5050');
});