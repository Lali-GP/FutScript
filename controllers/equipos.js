const { getTeams, addTeam } = require('../db/consultas');

const obtenerEquipos = async (req, res) => {
    const equipos = await getTeams();
    res.status(200).json(equipos);
};

const agregarEquipo = async (req, res) => {
    const equipo = req.body;

    //  Validación (requerido para evitar inserts vacíos)
    if (!equipo.name || equipo.name.trim() === "") {
        return res.status(400).json({ error: "El nombre del equipo es obligatorio" });
    }

    await addTeam(equipo);
    res.status(201).json({ message: "Equipo agregado con éxito" });
};

module.exports = { obtenerEquipos, agregarEquipo };
