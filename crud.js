const conexao = require('./conexao_Banco.js');

//CREATE
async function criarSintomas(dados) {
    try {

         //Object.keys Extraí os nomes das colunas e transforma em um array
        const colunas = Object.keys(dados);

         //Object.values Extraí os valores que serão inseridos
        const valores = Object.values(dados);

        // Cria as interrogações separadas por vírgula com base na quantidade de colunas
        const interrogacoes = colunas.map(() => "?").join(", ");

        const nomesDasColunas = colunas.join(", ");

        const sql = `INSERT INTO tabela_geral (${nomesDasColunas}) VALUES (${interrogacoes})`;

        const [resultado] = await conexao.query(sql, valores);
        
        console.log("--- DEBUG DO BANCO ---");
        console.log(resultado);

        if (resultado.insertId > 0) {
            console.log("Registro criado com sucesso! ID:", resultado.insertId);
        } else {
            console.log(`Registro inserido com sucesso! (${resultado.affectedRows} linha afetada).`);
        }
        
    } catch (erro) {
        console.error("Erro ao inserir dados no banco:", erro);
    }
}


async function criar() {
    const dadosParaSalvar = {
        TP_NOT:'50',
        ID_AGRAVO:'S70',
        DT_NOTIFIC:'2026-05-25',
        SEM_NOT:'20265',
        NU_ANO:'2026',
        SG_UF_NOT:'70',
        ID_MUNICIP:'70000',
        ID_REGIONA:'70000',
        ID_UNIDADE:'70000',
        SEM_PRI:'70000',
        NU_IDADE_N:'70000',
        CS_SEXO:'M',
        CS_GESTANT:'7',
        CS_RACA:'7',
        CS_ESCOL_N:'7',
        SG_UF:'77',
        ID_MN_RESI:'7',
        ID_RG_RESI:'7',
        ID_PAIS:'7',
        ID_OCUPA_N:'7',
        FEBRE:'7',
        MIALGIA:'7',
        CEFALEIA:'7',
        EXANTEMA:'7',
        VOMITO:'7',
        NAUSEA:'7',
        DOR_COSTAS:'7',
        CONJUNTVIT:'7',
        ARTRITE:'7',
        ARTRALGIA:'7',
        PETEQUIA_N:'7',
        LEUCOPENIA:'7',
        DOR_RETRO:'7',
        DIABETES:'7',
        HEMATOLOG:'7',
        HEPATOPAT:'7',
        RENAL:'7',
        HIPERTENSA:'7',
        ACIDO_PEPT:'7',
        AUTO_IMUNE:'7',
        DT_CHIK_S1:'7',
        RES_CHIKS2:'7',
        RESUL_PRNT:'7',
        DT_NS1:'2026-05-25',
        DT_INTERNA:'2026-05-25',
        UF:'7',
        MUNICIPIO:'7',
        TPAUTOCTO:'7',
        COUFINF:'7',
        COPAISINF:'7',
        CLASSI_FIN:'7',
        CRITERIO:'7',
        DOENCA_TRA:'7',
        CLINC_CHIK:'7',
        EVOLUCAO:'7',
        DT_OBITO:'7',
        DT_ENCERRA:'2026-05-26',
        IDADE_MESES:'777',
        UF_CONVERTIDA:'Aqui'
    };

    console.log("Tentando salvar os dados no MySQL...");
    await criarSintomas(dadosParaSalvar);
}

// criar();

//UPDATE

async function atualizarSintomas(colunaID, valorID, dadosParaAtualizar) {
    try {
        const colunas_2 = Object.keys(dadosParaAtualizar);

        const valores_2 = Object.values(dadosParaAtualizar);

        const coluna_tabela = colunas_2.map(nomeColuna => `\`${nomeColuna}\` = ?`).join(", ");

        const sql = `UPDATE tabela_geral SET ${coluna_tabela} WHERE \`${colunaID}\` = ?`;

        // 5. No array de valores, passamos os dados que vão preencher as interrogações do SET 
        // e, por último, o valor que vai preencher a interrogação do WHERE.
        const valoresFinais = [...valores_2,valorID];

        // 6. Executamos no MySQL
        const [resultado] = await conexao.query(sql, valoresFinais);

        console.log(`Sucesso! ${resultado.changedRows} linha(s) alterada(s) no banco.`);

    } catch (erro) {
        console.error("Erro ao atualizar dados no banco:", erro);
    }
}

async function atualizar() {
    // 1. Definimos o que queremos alterar
    const correcaoDados = {
        TP_NOT:'70'
    };

    console.log("Atualizando registro no MySQL...");
    

    await atualizarSintomas('TP_NOT', '60', correcaoDados);
}

// atualizar();