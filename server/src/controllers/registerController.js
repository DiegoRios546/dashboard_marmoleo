const bcrypt = require("bcrypt");
const connection = require("../config/db");

module.exports.register = async (req, res) => {
  const { document, name, email, username, password, role = "user" } = req.body;

  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Consulta para insertar un nuevo usuario con el rol
    const query = `INSERT INTO users (document, name, email, username, password, role) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [document, name, email, username, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .send({ message: "El usuario o documento ya existe" });
          }
          return res.status(500).send(err);
        }
        res.status(201).send({ message: "Usuario registrado exitosamente" });
      }
    );
  } catch (err) {
    console.error("Error en el bloque catch:", err); // Imprimir errores del bloque catch
    res
      .status(500)
      .send({ message: "Error en el servidor al encriptar la contraseña" });
  }
};
