const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');  // Importamos bcrypt
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicia OpenAI con la clave API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cadena de conexión de MongoDB desde las variables de entorno
const uri = process.env.MONGODB_URI;

// Conexión a MongoDB
let dbClient;
async function connectDB() {
  try {
    dbClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await dbClient.connect();
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

// Conectar a la base de datos MongoDB cuando el servidor se inicie
connectDB();

// Ruta para generar actividad (usando OpenAI)
app.post('/api/generate-activity', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Usa la función createCompletion para generar la actividad
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Asegúrate de usar el modelo correcto
      messages: [{ role: 'user', content: prompt }],
    });

    const result = response.choices[0].message.content;
    res.json({ activity: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando actividad' });
  }
});

// Ruta para crear un perfil de niño
app.post('/api/children', async (req, res) => {
  const { name, age } = req.body;

  try {
    const collection = dbClient.db('speechdown').collection('children');
    const newChild = { name, age, activities: [] };

    // Insertar el perfil de niño en la base de datos
    const result = await collection.insertOne(newChild);
    res.json(result);
  } catch (error) {
    console.error('Error al agregar niño:', error);
    res.status(500).json({ error: 'Error al agregar niño' });
  }
});

// Ruta para obtener todos los perfiles de niños
app.get('/api/children', async (req, res) => {
  try {
    const collection = dbClient.db('speechdown').collection('children');
    const children = await collection.find().toArray();
    res.json(children);
  } catch (error) {
    console.error('Error al obtener niños:', error);
    res.status(500).json({ error: 'Error al obtener niños' });
  }
});

// Ruta para agregar progreso de actividad de un niño
app.post('/api/progress', async (req, res) => {
  const { childId, activity, progress } = req.body;

  try {
    const collection = dbClient.db('speechdown').collection('children');

    // Actualizar el perfil de un niño con el progreso
    const result = await collection.updateOne(
      { _id: new ObjectId(childId) },
      { $push: { activities: { activity, progress } } }
    );

    res.json(result);
  } catch (error) {
    console.error('Error al agregar progreso:', error);
    res.status(500).json({ error: 'Error al agregar progreso' });
  }
});

// Ruta para autenticar usuarios (registro/login)
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = dbClient.db('speechdown').collection('users');

    // Encriptamos la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword }; 

    const result = await collection.insertOne(newUser);
    res.json({ message: 'Usuario registrado', result });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Ruta para hacer login de un usuario
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = dbClient.db('speechdown').collection('users');
    const user = await collection.findOne({ email });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login exitoso', user: { email: user.email, id: user._id } });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al hacer login:', error);
    res.status(500).json({ error: 'Error al hacer login' });
  }
});

// Cerrar la conexión a la base de datos cuando el servidor se detenga
process.on('SIGINT', async () => {
  await dbClient.close();
  console.log('Desconectado de MongoDB');
  process.exit(0);
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
