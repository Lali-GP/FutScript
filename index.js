const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { secretKey } = require('./utils');

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores');
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos');

const app = express();
app.use(cors());
app.use(express.json());


const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token faltante o inválido' });
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token no válido' });
  }
};


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }

  return res.status(400).json({ error: 'Credenciales incorrectas' });
});

app.get('/equipos', obtenerEquipos);
app.post('/equipos', verificarToken, agregarEquipo); 


app.get('/equipos/:teamID/jugadores', obtenerJugadores);
app.post('/equipos/:teamID/jugadores', verificarToken, registrarJugador); 

// Iniciar servidor
app.listen(3000, () => console.log('✅ SERVER ON - Puerto 3000'));
