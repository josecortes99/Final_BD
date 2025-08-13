// Importsmod libreria expres que permite crear rutas pata manejar las peticiones 
import express from 'express';

// importamos funcion de conectarDB
import { conectarDB } from '../db/db.js';

// crea un obejeto enrrutador de express, puede definir rutas y luego exportalas al app
const router = express.Router();

// Traer datos
router.get('/', async (req, res) => {
    try {
        const connection = await conectarDB();
        const [rows] = await connection.execute('SELECT * FROM customers');
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'Error del servidor'})
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await conectarDB();
        const query = ('SELECT * FROM customers WHERE customer_id = ?');
        const [rows] = await connection.execute(query, [id]);
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: "Error del servidor"});
    }
});

router.post('/', async (req, res) => {
    const { customer_name,identification_number,address,phone,email } = req.body;
    try {
        const connection = await conectarDB();
        const query = ('INSERT INTO customers (customer_name,identification_number,address,phone,email) VALUES (?, ?, ?, ?, ?)');
        const [rows] = await connection.execute(query, [customer_name,identification_number,address,phone,email]);
        await connection.end();
        res.status(201).json({ mensaje: "Exito al crear"});
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'error del servidor'})
    }
});

router.put('/:id', async (req, res) => {
    const { customer_name,identification_number,address,phone,email } = req.body;
    const { id } = req.params;
    try {
        const connection = await conectarDB();
        const query = ('UPDATE customers SET customer_name = ?, identification_number = ?, address = ?, phone = ?, email = ? WHERE customer_id = ?');
        const [rows] = await connection.execute(query, [customer_name, identification_number, address, phone, email, id]);
        await connection.end(); 
        res.status(200).json({ mensaje: 'Actualizado correctamente'});    
    } catch (error) {
        console.error('Error del servidor', error);
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await conectarDB();
        const query = ('DELETE FROM customers WHERE customer_id = ?');
        const [rows] = await connection.execute(query, [id]);
        await connection.end();
        res.status(200).json({ mensaje: "Exito al eliminar"}); 
    } catch (error) {
        console.error("error del servidor", error);
        res.status(500).json({ mensaje:'Error del servidor'});
    } 
});

// exporta el router para poder ser llamado en otro archivo
export default router;