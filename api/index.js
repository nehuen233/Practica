const express = require('express')
const { sayHello } = require('./controllers/sayHello')
const { getUsers, registerUser, login, me } = require('./controllers/user')
const { isAuth } = require('./middlewares/auth')

const sequelize = require('./config/db')
const server = express()


server.use(express.json())
// Middleware para configurar los headers CORS
server.use((req, res, next) => {
  // 👇 Acá decís qué origen tiene permiso
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  // 👇 Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  // 👇 Qué headers puede mandar el frontend
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  // 👇 Si querés permitir cookies/tokens en las peticiones
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // Si es una petición OPTIONS (preflight), respondemos rápido
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})


server.get('/', sayHello)
server.get('/users', isAuth, getUsers)
server.get('/me',isAuth, me)
server.post('/users', registerUser)
server.post('/login', login)




server.listen(3000, async () => {
    await sequelize.sync({ force: false })
    console.log("El server esta corriendo en el puerto 3000");
})
