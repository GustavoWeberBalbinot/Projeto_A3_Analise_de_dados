const express = require('express');
const path = require('path');
const conexao = require('./conexao_Banco_Render.js');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// CREATE
async function criarSintomas(dados) {
    try {
        // Extrai os nomes das colunas e transforma em um array
        const colunas = Object.keys(dados);
        // Extrai os valores que serão inseridos
        const valores = Object.values(dados);
        // Cria as interrogações separadas por vírgula com base na quantidade de colunas
        const interrogacoes = colunas.map(() => "?").join(", ");
        const nomesDasColunas = colunas.join(", ");

    
        const sql = `INSERT INTO tabela_geral (${nomesDasColunas}) VALUES (${interrogacoes})`;
        
        const [resultado] = await conexao.query(sql, valores);
        return resultado;
    } catch (erro) {
        console.error("Erro ao inserir dados no banco:", erro);
        throw erro; // Lança o erro para ser capturado pela rota do Express
    }
}

// UPDATE
async function atualizarSintomas(colunaID, valorID, dadosParaAtualizar) {
    try {
        const colunas_2 = Object.keys(dadosParaAtualizar);
        const valores_2 = Object.values(dadosParaAtualizar);
        const coluna_tabela = colunas_2.map(nomeColuna => `\`${nomeColuna}\` = ?`).join(", ");

        const sql = `UPDATE tabela_geral SET ${coluna_tabela} WHERE \`${colunaID}\` = ?`;
        
        // Passamos os dados do SET e por último o valor do WHERE
        const valoresFinais = [...valores_2, valorID];

        const [resultado] = await conexao.query(sql, valoresFinais);
        return resultado;
    } catch (erro) {
        console.error("Erro ao atualizar dados no banco:", erro);
        throw erro;
    }
}

// DELETE
async function deletarSintomas(colunaID, valorID) {
    try {
        const sql = `DELETE FROM tabela_geral WHERE \`${colunaID}\` = ?`;
        const [resultado] = await conexao.query(sql, [valorID]);
        return resultado;
    } catch (erro) {
        console.error("Erro ao deletar dados no banco:", erro);
        throw erro;
    }
}

// 2. ROTAS DA API HTTP (EXPRESS)

// Rota HTTP para CREATE
app.post('/api/casos', async (req, res) => {
    try {
        const resultado = await criarSintomas(req.body);
        res.status(201).json({ message: "Inserido com sucesso!", id: resultado.insertId });
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
});

// Rota HTTP para Atualizar UPDATE
app.put('/api/casos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await atualizarSintomas('ID', id, req.body);
        res.json({ message: "Registro atualizado com sucesso!" });
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
});

// Rota HTTP para READ
app.get('/api/casos', async (req, res) => {
    try {
        const [linhas] = await conexao.query('SELECT * FROM tabela_geral ORDER BY ID DESC LIMIT 10');
        res.json(linhas);
    } catch (erro) {
        console.error("Erro no banco de dados", erro.message);
        res.status(500).json({ error: erro.message });
    }
});

// Rota HTTP para DELETE
app.delete('/api/casos/:coluna/:valor', async (req, res) => {
    const { coluna, valor } = req.params;
    try {
        const resultado = await deletarSintomas(coluna, valor);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: "Nenhum registro encontrado." });
        }
        
        res.json({ message: "Registro removido com sucesso!", linhasAfetadas: resultado.affectedRows });
    } catch (erro) {
        res.status(500).json({ error: erro.message });
    }
});

async function criar() {
    const dadosParaSalvar = {
        NOME:'',
        DATA:"",
        FEBRE:"",
        DENGUE:"",
        CIDADE:"",
        IDADE: 12 

    };

    console.log("Salvando os dados no MySQL...");
    await criarSintomas(dadosParaSalvar);
}

async function atualizar() {
    const correcaoDados = { 
        NOME: 'Kevin Kleinschmidt Alterado',
        DATA:'2026-05-27',
        FEBRE: 'Não',
        DENGUE:'Sim',
        CIDADE:"Joinville",
        IDADE: 12 
    };
    
    console.log("Atualizando registro no MySQL");
    await atualizarSintomas('ID', '1', correcaoDados);
}

async function deletar() {
    const colunaAlvo = 'TP_NOT';
    const valorAlvo = '33';

    console.log(`\n Deletando linhas onde ${colunaAlvo} = ${valorAlvo}...`);
    
    try {
        const resultado = await deletarSintomas(colunaAlvo, valorAlvo);
        console.log(`Sucesso! Linhas apagadas no Railway: ${resultado.affectedRows}\n`);
    } catch (erro) {
        console.error("Falha ao rodar o delete:", erro.message);
    }
}

// criar();
// atualizar();
// deletar();


// =========================================================================
// 4. INICIALIZAÇÃO DO SERVIDOR HTTP
// =========================================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor HTTP funcionando ${PORT}`);
});