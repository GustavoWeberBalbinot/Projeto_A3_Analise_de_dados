// // Puxamos a biblioteca mysql2 (na versão que aceita Promises/async/await)
// const mysql = require('mysql2/promise');

// // Criamos o pool de conexões com os dados do seu banco
// const pool = mysql.createPool({
//     host: 'localhost',       // Endereço do servidor
//     user: 'root',            // Seu usuário do MySQL
//     password: '12345678', // Sua senha do MySQL
//     database: 'bd_dengue', // Nome da database
//     waitForConnections: true,
//     connectionLimit: 10,     // Máximo de conexões abertas ao mesmo tempo
//     queueLimit: 0
// });

// // Exportamos o 'pool' para que outros arquivos consigam usar essa conexão
// module.exports = pool;