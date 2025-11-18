const { getPlayers, addPlayer } = require('../db/consultas');

const obtenerJugadores = async (req, res) => {
    const { teamID } = req.params;
    const jugadores = await getPlayers(teamID);
    res.status(200).json(jugadores);
};

const registrarJugador = async (req, res) => {
    const { teamID } = req.params;
    const jugador = req.body;

    // ✅ Validaciones
    if (!jugador.name || jugador.name.trim() === "") {
        return res.status(400).json({ error: "El nombre del jugador es obligatorio" });
    }

    if (!jugador.posicion || jugador.posicion.trim() === "") {
        return res.status(400).json({ error: "La posición del jugador es obligatoria" });
    }

    await addPlayer({ jugador, teamID });
    res.status(201).json({ message: "Jugador agregado con éxito" });
};

module.exports = { obtenerJugadores, registrarJugador };
