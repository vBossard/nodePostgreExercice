const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)

// Créer un GET de base
app.get('/', (request, response) => {
    response.json({info : 'Node.js, Express, and PostgreSQL API'})
})

// Configurer l'app à écouter sur le port 3000
app.listen(port, () => {
    console.log('Application tourne sur le port 3000');
})