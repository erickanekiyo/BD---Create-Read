const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');


db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    resumo TEXT,
    conteudo TEXT
)`);

module.exports = {
    cadastrarPost: (titulo, resumo, conteudo) => {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO posts (titulo, resumo, conteudo) VALUES (?, ?, ?)`,
                [titulo, resumo, conteudo],
                function (err) {
                if (err) reject(err);
                else resolve();
                }
            );
        });
    },

    buscarPosts: () => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM posts`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
};
