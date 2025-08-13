// Importsmod libreria expres que permite crear rutas pata manejar las peticiones 
import express from 'express';

// importamos funcion de conectarDB
import { conectarDB } from '../db/db.js';

// crea un obejeto enrrutador de express, puede definir rutas y luego exportalas al app
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const connection = await conectarDB();
        const [rows] = await connection.execute(`SELECT 
            p.platform_name,
            COUNT(*) AS transactions_number
            FROM platforms p
            JOIN transactions t ON p.platform_id = t.platform_id
            GROUP BY p.platform_name
            ORDER BY transactions_number DESC;`);
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
});

export default router;