const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Projects.html');
});

app.get('/blog', async (req, res) => {
    const posts = await db.buscarPosts();
    res.render('blog', { posts });
});

app.get('/cadastrar', (req, res) => {
    res.sendFile(__dirname + '/cadastrar_post.html');
});

app.post('/cadastrar', async (req, res) => {
    const { titulo, resumo, conteudo } = req.body;
    await db.cadastrarPost(titulo, resumo, conteudo);
    res.redirect('/blog');
});

app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
});
