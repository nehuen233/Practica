const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'misecreto'

const isAuth = (req, res, next) => {
    const token = req.headers['authorization']
    console.log(token);
    
    jwt.verify(token, SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Error al acceder' })

        const user = await User.findByPk(decoded.id)

        if (!user) return res.json({ message: 'Usuario no encontrado' })

        req.user = {
            id: user.id,
            email: user.email
        }
        next()
    });
}

module.exports = {
    isAuth
}