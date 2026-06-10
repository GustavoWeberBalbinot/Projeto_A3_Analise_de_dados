const conexao = require('./conexao_Banco.js');

async function listarTabelasEDados() {
    try {
        console.log("=== LISTANDO TABELAS DO BANCO ===");
        
        // 1. Query para mostrar as tabelas existentes
        const [tabelas] = await conexao.query("SHOW TABLES");
        
        // Exibimos o array de tabelas usando o console.table (deixa super organizado!)
        console.table(tabelas);

        console.log("\n=== EXIBINDO DADOS DA TABELA GERAL ===");
        
        // 2. Query para buscar os dados (colocamos um LIMIT para não poluir o terminal)
        const sqlDados = "SELECT TP_NOT, ID_AGRAVO, DT_NOTIFIC, NU_ANO, MUNICIPIO FROM tabela_geral";
        const [linhas] = await conexao.query(sqlDados);

        // O console.table formata arrays de objetos em uma tabela linda no terminal
        console.table(linhas);

    } catch (erro) {
        console.error("Erro ao buscar dados no banco:", erro);
    }
}

// Para testar, basta chamar a função dentro do seu bloco rodar()
async function listar() {
    await listarTabelasEDados();
}

listar(listarTabelasEDados);