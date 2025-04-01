const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    connection.query(query, [username], async (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.length === 0) {
            return res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Incluye el rol en el token JWT
            const token = jwt.sign(
                { username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.send({ token });
        } else {
            res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
        }
    });
};
