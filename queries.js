// Connection a la BDD
const Pool = require('pg').Pool;
// Configuration du pool de connexion
const pool = new Pool({
    user:'me',
    host:'localhost',
    database:'api',
    password:'password',
    port: 5432,
})

//============ Requetes =============//

// Récupère tout les utilisateurs
/**
 * Récupère tout les utilisateurs
 * /GET
 * @param {*} request 
 * @param {*} response 
 */
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

/**
 * Récupère un utilisateur par ID
 * /users/:id/
 * @param id
 */
const getUserById = (request, response) => {
    // Récupère l'ID voulue
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
/**
 * Création d'un nouvel utilisateur
 * @param {*} request 
 * @param {*} response 
 */
const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}
/**
 * Mise à jour d'un utilisateur
 * @param {*} request 
 * @param {*} response 
 */
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

/**
 * Suppression d'un utilisateur
 * @param {*} request 
 * @param {*} response 
 */
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

// Pour utiliser les fonctions à l'exterieur, on les exportent
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}
