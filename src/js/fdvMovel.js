const loader = document.getElementById('loader')
const p = document.getElementById('p')
const span = document.getElementById('span')
const btnExportar = document.getElementById('exportBtn')
let movelData = []
let movelData2 = []
let dataFinal = []
let filtroData = []
let m2mData = []
const fileMovel1Label = document.getElementById('labelFileInputMovel')
const fileMovel2Label = document.getElementById('labelFileInputMovel2')


document.getElementById('fileInputMovel').addEventListener('change', function (event) {
    var file = event.target.files[0];
    fileMovel1Label.textContent = file.name
    loader.setAttribute('style', 'display: block')
    p.setAttribute('style', 'display: block')
    span.innerHTML = 'Movel 01'

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        var jsonMovel = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(jsonMovel)
        processMovelData(jsonMovel)
        p.setAttribute('style', 'display: none')
        span.innerHTML = ''
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsArrayBuffer(file);
});


function processMovelData(content) {
    content.forEach(e => {
        // Deletar colunas
        delete e.DS_VGI
        delete e.DS_ESTADO_CABECALHO
        delete e.DS_SUB_STATUS
        delete e.NM_PARCEIRO
        delete e.DT_INICIO
        delete e.QT_QTDE
        delete e.NM_CANAL
        delete e.CD_APARELHO
        delete e.DS_SERVICO_SMS
        delete e.DS_PLANO
        delete e.DS_APARELHO
        delete e.NM_FABRICANTE
        delete e.DS_MAILING
        delete e.DT_MES
        delete e.DS_STATUS_LINHA
        delete e.NR_NF
        delete e.DT_JANELA_PORT
        delete e.DS_SERV_PTT
        delete e.TP_ESTOQUE
        delete e.DS_PROJECAO
        delete e.DS_MOTIVO_PROJECAO
        delete e.DS_CHECK_D1
        delete e.QT_MINUTOS
        delete e.QT_MINUTOS_ANTERIOR
        delete e.VL_DESCONTOS
        delete e.DS_REVISAO
        delete e.DS_PRES_DIGITAL
        delete e.DS_VPOL
        delete e.DS_APONTADOR
        delete e.DS_ONEDRIVE
        delete e.DS_SEG_PROT
        delete e.DS_SEG_MULT
        delete e.VL_NEGOCIACAO
        delete e.VL_EXP
        delete e.DS_PROJ_VL_NEG
        delete e.VL_NEG_PLANO
        delete e.CD_CONSULTOR_VENDAS_CPF
        delete e.NM_CONSULTOR_VENDAS
        delete e.NM_CONSULTOR_VENDAS_SOBRENOME
        delete e.NR_VPL
        delete e.DS_SEGMENTO
        delete e.DS_TIPO_ATUACAO
        delete e.DS_TIPO_PARCEIRO
        delete e.FL_MIG_PLANO_N_SMART
        delete e.DS_VSOL
        delete e.DS_VIVO_SYNC
        delete e.DS_FILA_SP
        delete e.DS_PNT_INOV
        delete e.FL_ATV_DW
        delete e.FL_ALTA_ANT
        delete e.FL_TROCA_ANT
        delete e.DT_CARGA
        delete e.NR_OV
        delete e.DS_GESTAO_EQUIPE
        delete e.DS_OFFICE365
        delete e.FL_MIG_PLANO

        if (e.FL_CNPJ_FRESH == 'S') {
            e.FL_CNPJ_FRESH = e.FL_CNPJ_FRESH.replace('S', 'Fresh')
        }
        if (e.FL_CNPJ_FRESH == 'N') {
            e.FL_CNPJ_FRESH = e.FL_CNPJ_FRESH.replace('N', 'Base')
        }

        if (e.DS_TIPO_NEGOCIACAO == 'Venda' && e.VL_APARELHO > 0) {
            filtroData.push(e)
        }

        e.CD_CNPJ_CLIENTE = parseInt(e.CD_CNPJ_CLIENTE)

        if (e.TP_LINHA == 'M2M') {

        } else {
            movelData.push({
                NR_PEDIDO: e.NR_PEDIDO,
                DS_STATUS_PEDIDO: e.DS_STATUS_PEDIDO,
                NR_COTACAO: e.NR_COTACAO,
                CD_ADABAS: e.CD_ADABAS,
                DT_INPUT: e.DT_INPUT,
                DT_ULTIMA_ATU: e.DT_ULTIMA_ATU,
                CD_DDD: e.CD_DDD,
                NR_LINHA: e.NR_LINHA,
                TP_SOLICITACAO: e.TP_SOLICITACAO,
                DS_FILA: e.DS_FILA,
                NM_OPERADORA_DOADORA: e.NM_OPERADORA_DOADORA,
                CD_CNPJ_CLIENTE: e.CD_CNPJ_CLIENTE,
                NM_CLIENTE: e.NM_CLIENTE,
                SEGMENTO_CLIENTE: e.SEGMENTO_CLIENTE,
                TP_LINHA: e.TP_LINHA,
                DS_SERVICO_INTERNET: e.DS_SERVICO_INTERNET,
                DS_PLANO_EXPIRADO: e.DS_PLANO_EXPIRADO,
                FL_CNPJ_FRESH: e.FL_CNPJ_FRESH,
                VL_NEG_SERV: e.VL_NEG_SERV,
            })
        }
    })

    console.log(filtroData)
    console.log(movelData)
    console.log('Terminou: Movel')
    alterarDuplicados()
}

function alterarDuplicados() {
    filtroData.forEach(e => {
        e.TP_SOLICITACAO = 'Aparelho'
        e.DS_SERVICO_INTERNET = 'EQUIPAMENTO_VOZ'
        e.DS_PLANO_EXPIRADO = 0
        e.VL_NEG_SERV = e.VL_APARELHO
        movelData.push(e)
    })

    movelData.forEach(e => {
        delete e.DS_TIPO_NEGOCIACAO
        delete e.VL_APARELHO
    })

    console.log(filtroData)
    console.log(movelData)
    excluirPelaData()
}

function excluirPelaData() {
    let dataBase = new Date(1900, 0, -1)
    movelData.forEach((e, index) => {
        let data = new Date(dataBase.getTime() + e.DT_ULTIMA_ATU * 24 * 60 * 60 * 1000)
        let month = data.getMonth()
        let mesHoje = new Date().getMonth()
        if (month < mesHoje - 1) {
            movelData.splice(index, 1)
        }
    })

    console.log('Terminou: Exclusao pela data')
    tpSolicitacaoTT()
}

let tt = []

function tpSolicitacaoTT() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO != 'Alta' && !e.TP_SOLICITACAO.startsWith('Troca') && e.TP_SOLICITACAO != 'Aparelho') {
            tt.push(e)
        }
    })
    console.log('Terminou: TT')
    apagarTT()
}

function apagarTT() {
    if (tt.length > 0) {
        for (let index = 0; index < tt.length; index++) {
            movelData.forEach((e, eI) => {
                if (e.TP_SOLICITACAO.includes('TT')) {
                    movelData.splice(eI, 1)
                }
            })
        }
    }
    tpSolicitacaoTroca0()
}

let Troca0 = []
function tpSolicitacaoTroca0() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO.includes('Troca') || e.TP_SOLICITACAO.startsWith('Troca')) {
            Troca0.push(e)
        }
    })
    apagarTroca0()
}

function apagarTroca0() {
    if (Troca0.length > 0) {
        for (let index = 0; index < Troca0.length; index++) {
            movelData.forEach((e, eI) => {
                if ((e.TP_SOLICITACAO.includes('Troca') || e.TP_SOLICITACAO.startsWith('Troca')) && e.DS_SERVICO_INTERNET == 0) {
                    movelData.splice(eI, 1)
                }
            })
        }
    }
    troca()
}

function troca() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO.includes('Troca') || e.TP_SOLICITACAO.startsWith('Troca')) {
            e.TP_SOLICITACAO = 'Troca em linha móvel'
        }
    })
    altaPortabilidade()
}

function altaPortabilidade() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO === 'Alta' && e.NM_OPERADORA_DOADORA !== 0) {
            e.TP_SOLICITACAO = 'Alta de linha móvel com portabilidade'
        }
    })
    altaMovel()
}

function altaMovel() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO === 'Alta' && e.NM_OPERADORA_DOADORA === 0) {
            e.TP_SOLICITACAO = 'Alta de linha móvel'
        }
    })
    altaFWT()
}

function altaFWT() {
    movelData.forEach(e => {
        if (e.TP_SOLICITACAO.includes('FWT')) {
            e.TP_SOLICITACAO = 'Alta de linha fixa'
        }
    })
    migracao()
}

function migracao() {
    movelData.forEach(e => {
        if ((e.TP_SOLICITACAO.includes('Troca') || e.TP_SOLICITACAO.startsWith('Troca')) && e.DS_SERVICO_INTERNET.startsWith('SM') && e.DS_PLANO_EXPIRADO === 0) {
            e.TP_SOLICITACAO = 'Migração pré para pós com TT'
        }
    })
    console.log('Terminou: Todas as trocas de nome')
    final()
}

function final() {
    dataFinal = movelData
    
    console.log(movelData)
    console.log(dataFinal)
}


// Ler arquivo Movel 2
document.getElementById('fileInputMovel2').addEventListener('change', function (event) {
    var file = event.target.files[0];
    fileMovel2Label.textContent = file.name
    p.setAttribute('style', 'display: block')
    span.innerHTML = 'Movel 02'

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        var jsonMovel2 = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(jsonMovel2)
        processMovelData2(jsonMovel2)
        p.setAttribute('style', 'display: none')
        span.innerHTML = ''
        btnExportar.click()
    };

    reader.readAsArrayBuffer(file);
});

// Processar arquivo Movel 2
function processMovelData2(content) {
    content.forEach(e => {
        // Deletar colunas
        delete e.esteira
        delete e.superior_imediato_id
        delete e.usuario_id
        delete e.vendedor
        delete e.supervisor
        delete e.tipoCliente
        delete e.valor_liquido
        delete e.historicoTramitacao
        delete e.ocorrencia_de_entrada
        delete e.origemDados
        delete e.data_criacao
        delete e.cammpanha
        delete e.USUARIO_MOVIMENTACAO
        delete e.nomeRepresentante
        delete e.email
        delete e.telefone
        delete e.celular2
        delete e.cotacaoVivocorp
        delete e.pedidoVivocorp

        if (e.valor_unitario == 0 || e.valor_unitario == 0.00) {
            return
        }

        let ddd = Number(e.celular.substring(0, 2))

        let grupos = [{ grupo: 'Correção', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Input', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Pendente', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Antifraude', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Lançamento', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Pendências', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Qualidade', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Input MVP', fila: 'AGUARDANDO_IMPUT_MVP' }, { grupo: 'Atualização', fila: 'AGUARDANDO_IMPUT_MVP' }, { grupo: 'BKO Análise', fila: 'ANALISE_BKO' }, { grupo: 'Em Tratativa', fila: 'ANALISE_BKO' }, { grupo: 'Executado', fila: 'FINALIZADO' }, { grupo: 'Cancelado', fila: 'CANCELADO' }, { grupo: 'Correção', fila: 'CORREÇÃO' }, { grupo: 'Em Tratativa', fila: 'EM TRATATIVA' }, { grupo: 'Executado', fila: 'FINALIZADO' }, { grupo: 'Fraude', fila: 'MESA_FRAUDE' }, { grupo: 'A Executar', fila: 'PENDENTE' }, { grupo: 'Cotação Reprovado', fila: 'REPROVADO' }, { grupo: 'Aguardando Aceite', fila: 'AGUARDANDO_IMPUT' }, { grupo: 'Cotação Análise', fila: 'CREDITO' }, { grupo: 'BKO Reprovado', fila: 'REPROVADO' }, { grupo: 'Pendente', fila: 'AGUARDANDO_IMPUT' }]

        let fila = 0
        grupos.forEach(eB => {
            if (e.grupoEtapa == eB.grupo) {
                fila = eB.fila
            }
        })

        e.data_venda = new Date(e.data_venda.substring(0, 11))
        e.DATA_MOVIMENTACAO = new Date(e.DATA_MOVIMENTACAO.substring(0, 11))
        let dataBase = new Date(1900, 0, -1)
        let dataBase2 = new Date(1900, 0, -2)
        let hoje = new Date()
        let diffYear = e.data_venda.getFullYear() == hoje.getFullYear()
        let diffMonth = e.data_venda.getMonth() < hoje.getMonth()
        let dataInit = parseInt((e.data_venda.getTime() - dataBase) / 24 / 60 / 60 / 1000)
        e.data_venda = dataInit
        let dataMov = parseInt((e.DATA_MOVIMENTACAO.getTime() - dataBase2) / 24 / 60 / 60 / 1000)
        e.DATA_MOVIMENTACAO = dataMov
        e.documentacaoCliente = parseInt(e.documentacaoCliente)
        e.valor_unitario = Number(e.valor_unitario)
        e.venda_id = Number(e.venda_id)

        if (e.itemEspecificacaoOpcao == 'M2M') {
            if (e.grupoEtapa == 'Executado' && (diffMonth && diffYear)) {
                fila = 'BACKLOG'
            }

            m2mData.push({
                NR_PEDIDO: e.venda_id,
                DS_STATUS_PEDIDO: e.grupoEtapa,
                NR_COTACAO: 1,
                CD_ADABAS: e.adabas,
                DT_INPUT: e.data_venda,
                DT_ULTIMA_ATU: e.DATA_MOVIMENTACAO,
                CD_DDD: ddd,
                NR_LINHA: 0,
                TP_SOLICITACAO: 'Alta de linha móvel',
                DS_FILA: fila,
                NM_OPERADORA_DOADORA: 0,
                CD_CNPJ_CLIENTE: e.documentacaoCliente,
                NM_CLIENTE: e.razaoSocialCliente,
                SEGMENTO_CLIENTE: 'PME',
                TP_LINHA: 'M2M',
                DS_SERVICO_INTERNET: 'PAC_SC_M2M_20MB2',
                DS_PLANO_EXPIRADO: 0,
                FL_CNPJ_FRESH: 'Base',
                VL_NEG_SERV: e.valor_unitario
            })
        }

        if (e.itemEspecificacao == 'Microsoft Office' || e.itemEspecificacao == 'MDM' || e.itemEspecificacao == 'Vivo Gestão de Equipe' || e.itemEspecificacao == 'Vivo Travel Mensal' || e.itemEspecificacao == 'Caixas de Saldo Smart Empresas  / Internet PJ' || e.itemEspecificacao == 'Vivo Proteção Celular') {

        } else {
            return
        }

        if (e.grupoEtapa == 'Auditoria') {
            e.grupoEtapa = 'Pendente'
        }

        if (e.grupoEtapa == 'Executado') {
            if (diffMonth && diffYear) {
                fila = 'BACKLOG'
            }

            movelData2.push({
                NR_PEDIDO: e.venda_id,
                DS_STATUS_PEDIDO: e.grupoEtapa,
                NR_COTACAO: 1,
                CD_ADABAS: e.adabas,
                DT_INPUT: e.data_venda,
                DT_ULTIMA_ATU: e.DATA_MOVIMENTACAO,
                CD_DDD: ddd,
                NR_LINHA: 0,
                TP_SOLICITACAO: 'Alta em linha móvel',
                DS_FILA: fila,
                NM_OPERADORA_DOADORA: 0,
                CD_CNPJ_CLIENTE: e.documentacaoCliente,
                NM_CLIENTE: e.razaoSocialCliente,
                SEGMENTO_CLIENTE: 'PME',
                TP_LINHA: 'CHIPAGEM',
                DS_SERVICO_INTERNET: e.itemEspecificacaoOpcao,
                DS_PLANO_EXPIRADO: 0,
                FL_CNPJ_FRESH: 'Base',
                VL_NEG_SERV: e.valor_unitario
            })
        }
    })

    console.log(movelData2)
    console.log('Terminou: Movel')
    final2()
}

function final2() {
    movelData2.forEach(e => {
        dataFinal.push(e)
    })
    m2mData.forEach(e => {
        dataFinal.push(e)
    })
    console.log(m2mData)
    console.log(movelData2)
    console.log(dataFinal)

    dataFinal.sort(compareFila)
    dataFinal.sort(compareTpSolicitacao)
    dataFinal.sort(compareCdCnpjCliente)
    teste()
}

function compareCdCnpjCliente(a, b) {
    if (String(a.CD_CNPJ_CLIENTE).length < String(b.CD_CNPJ_CLIENTE).length) {
        return -1
    } else if (String(a.CD_CNPJ_CLIENTE).length > String(b.CD_CNPJ_CLIENTE).length) {
        return 1
    } else if (String(a.CD_CNPJ_CLIENTE).length == String(b.CD_CNPJ_CLIENTE).length) {
        if (Number(a.CD_CNPJ_CLIENTE) < Number(b.CD_CNPJ_CLIENTE))
            return -1;
        if (Number(a.CD_CNPJ_CLIENTE) > Number(b.CD_CNPJ_CLIENTE))
            return 1;
    }
    return 0;
}

function compareTpSolicitacao(b, a) {
    if (a.TP_SOLICITACAO < b.TP_SOLICITACAO)
        return -1;
    if (a.TP_SOLICITACAO > b.TP_SOLICITACAO)
        return 1;
    return 0;
}

const orderFila = ['ABERTO', 'AGUARDANDO ESTOQUE', 'AGUARDANDO_JANELA', 'AGUARDANDO_PISTOLAGEM', 'ANALISE_BKO', 'CANCELADO', 'CANCELADO_FRAUDE', 'CREDITO', 'CREDITO_NEGADO', 'ERRO_SOLICITACAO_PORTIN', 'EM_TRAMITE', 'ERRO_ATIVACAO', 'AGUARDANDO_IMPUT', 'AGUARDANDO_IMPUT_MVP', 'MESA_FRAUDE', 'PENDENTE', 'REPROVADO_BKO', 'REPROVADO_CRED', 'BACKLOG', 'FINALIZADO']

const compareFila = (a, b) => {
    const indexA = orderFila.indexOf(a.DS_FILA);
    const indexB = orderFila.indexOf(b.DS_FILA);
    return indexA - indexB;
};

function teste() {
    dataFinal.forEach((e, index) => {
        if (e.TP_SOLICITACAO == 'Alta em linha móvel' && e.DS_STATUS_PEDIDO != 'Executado') {
            dataFinal.splice(index, 1)
            console.log('deletou ' + index)
        }
    })
}


// ===========  Criar e Exportar Novo Arquivo  ===========
document.getElementById('exportBtn').addEventListener('click', function () {
    const wsMovelFDV = XLSX.utils.json_to_sheet(dataFinal)

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, wsMovelFDV, "Fixa Movel");

    const wbout = XLSX.writeFile(workbook, "MovelFDV.xlsx", { compression: true });
    // Crie um blob com o conteúdo do arquivo XLSX
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Crie um URL para o blob
    const url = URL.createObjectURL(blob);

    // Crie um link de download e atribua o URL do blob como seu href
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.xlsx';
    document.body.appendChild(a);

    // Simule um clique no link para iniciar o download
    a.click();
});