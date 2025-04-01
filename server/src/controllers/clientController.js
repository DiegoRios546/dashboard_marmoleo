const db = require('../config/db');

const getClients = (req, res) => {
    const query = 'SELECT id, name, email, phone, address FROM clients';
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching clients:", err);
            return res.status(500).json({ message: "Error al obtener los clientes" });
        }
        res.json(results);
    });
};

const createClient = (req, res) => {
    const { name, email, phone, address } = req.body;
    const query = 'INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, address], (err, result) => {
        if (err) {
            console.error("Error creating client:", err);
            return res.status(500).json({ message: "Error al crear el cliente" });
        }
        res.status(201).json({ message: "Cliente creado exitosamente", clientId: result.insertId });
    });
};

const updateClient = (req, res) => {
    const { clientId } = req.params;
    const { name, email, phone, address } = req.body;
    const query = 'UPDATE clients SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?';
    db.query(query, [name, email, phone, address, clientId], (err, result) => {
        if (err) {
            console.error(`Error updating client with ID ${clientId}:`, err);
            return res.status(500).json({ message: "Error al actualizar el cliente" });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Cliente con ID ${clientId} actualizado exitosamente` });
        } else {
            res.status(404).json({ message: `Cliente con ID ${clientId} no encontrado` });
        }
    });
};

const deleteClient = (req, res) => {
    const { clientId } = req.params;
    const query = 'DELETE FROM clients WHERE id = ?';
    db.query(query, [clientId], (err, result) => {
        if (err) {
            console.error(`Error deleting client with ID ${clientId}:`, err);
            return res.status(500).json({ message: "Error al eliminar el cliente" });
        }
        if (result.affectedRows > 0) {
            res.status(200).json({ message: `Cliente con ID ${clientId} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Cliente con ID ${clientId} no encontrado` });
        }
    });
};

module.exports = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
};