const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Mazapan', 
  database: 'futscript',
  allowExitOnIdle: true
});


const getTeams = async () => {
  try {
    const query = 'SELECT id, name FROM equipos';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('❌ Error en getTeams:', error);
    throw error;
  }
};


const getPlayers = async (teamID) => {
  try {
    const query = `
      SELECT j.name, j.posicion
      FROM jugadores j
      INNER JOIN equipos e ON e.id = j.team_id
      WHERE e.id = $1
    `;
    const { rows } = await pool.query(query, [teamID]);
    return rows;
  } catch (error) {
    console.error('❌ Error en getPlayers:', error);
    throw error;
  }
};

//  Agregar un nuevo equipo
const addTeam = async (equipo) => {
  try {
    const { name } = equipo;
    const query = 'INSERT INTO equipos (name) VALUES ($1)';
    await pool.query(query, [name]);
  } catch (error) {
    console.error('❌ Error en addTeam:', error);
    throw error;
  }
};

//  Agregar un nuevo jugador
const addPlayer = async ({ jugador, teamID }) => {
  try {
    const { name, posicion } = jugador;
    const query = `
      INSERT INTO jugadores (name, posicion, team_id)
      VALUES ($1, $2, $3)
    `;
    await pool.query(query, [name, posicion, teamID]);
  } catch (error) {
    console.error('❌ Error en addPlayer:', error);
    throw error;
  }
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer };
