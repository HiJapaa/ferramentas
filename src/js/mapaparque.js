const loader = document.getElementById('loader')
const name = document.getElementById('fileName')
const btn = document.getElementById('btn')
const btnGerar = document.getElementById('btnGerar')
const mark = document.getElementById('downloadMark')
const fileName = document.getElementById('labelFileInput')
const inputFileCep = document.getElementById('fileInputCep')
const btnEstagio01 = document.getElementById('estagio01')
const btnEstagio02 = document.getElementById('estagio02')
const btnEstagio03 = document.getElementById('estagio03')
const btnExportar = document.getElementById('exportBtn')
let mapaParqueData = []
let dispData = []
let cnaeData = []
let cepData = []

fetch('../public/cep.json').then(response => {
    response.json().then(e => {
        console.log(e)

        e.forEach(el => {
            faixaCep.push(el.col3)
            faixaCep.push(el.col4)
        })

        faixaCep.sort((a, b) => {
            return parseInt(a) - parseInt(b)
        })

        cepData = e
    })
})

fetch('../public/cnae.json').then(response => {
    response.json().then(e => {
        cnaeData = e
    })
})

let fixaData = []
let fixaFTTH = []
let fixaFTTC = []
let faixaCep = []
let tiData = []
let movelData = []
let avancadaData = []
let suspensoData = []
let recomendacaoMovelData = []
let recomendacaoFixaData = []
let sipData = []
let vozData = []
let M2MData = []
let newCSVContent = ''

let cnaeFile
let cepFile
let recFixaFile
let recMovelFile
let vozFile
let sipFile
let suspensoFile
let tiFile
let avancadaFile
let movelFile
let m2mFile
let fixaFile
let mapaDispFile
let mapaParqueFile
let filesArray = []



// ===========  Arquivos  ===========
document.getElementById('fileInput').addEventListener('change', async function (event) {
    loader.setAttribute('style', 'display: block')
    document.getElementById('pProcessando').setAttribute('style', 'display: block')
    var files = event.target.files;
    console.log(files)
    filesArray = Object.keys(files).map(chave => files[chave]);
    console.log(filesArray);

    console.log('Terminou todas as leituras!')
    btnEstagio01.click()
});

function estanciar() {
    recFixaFile = filesArray.find(e => e.name == 'recomendacaofixa.xlsx')

    recMovelFile = filesArray.find(e => e.name == 'recomendacaomovel.xlsx')

    vozFile = filesArray.find(e => e.name == 'voz.xlsx')

    sipFile = filesArray.find(e => e.name == 'sip.xlsx')

    suspensoFile = filesArray.find(e => e.name == 'suspenso.xlsx')

    tiFile = filesArray.find(e => e.name == 'ti.xlsx')

    avancadaFile = filesArray.find(e => e.name == 'avancada.xlsx')

    movelFile = filesArray.find(e => e.name == 'movel.xlsx')

    m2mFile = filesArray.find(e => e.name == 'penm2mfwt.xlsx')

    fixaFile = filesArray.find(e => e.name == 'fixa.xlsx')

    mapaDispFile = filesArray.find(e => e.name == 'mapadisp.xlsx')

    mapaParqueFile = filesArray.find(e => e.name.includes('mapaparque'))

    console.log('Estanciou, pressione o Estágio 02')
    btnEstagio02.click()
}

async function compilar() {
    recFixa(recFixaFile)
}


// ===========  Arquivo Mapa Parque  ===========
function mapaParque(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        var jsonMapa = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(jsonMapa)
        processCSVMapaParque(jsonMapa)
    };

    reader.readAsArrayBuffer(file);
};

function processCSVMapaParque(content) {
    content.forEach(e => {

        if (e.__EMPTY_1 !== 0) {
            console.log(e)
            e.DS_ENDERECO = e.DS_ENDERECO + e.DS_CIDADE + e.NR_CEP
            e.DS_CIDADE = e.NUMERO
            e.NR_CEP = e.NM_CONTATO_SFA
            e.NUMERO = e.EMAIL_CONTATO_PRINCIPAL_SFA
            e.NM_CONTATO_SFA = e.CELULAR_CONTATO_PRINCIPAL_SFA
            e.EMAIL_CONTATO_PRINCIPAL_SFA = e.PAPEL_CONTATO_SFA
            e.CELULAR_CONTATO_PRINCIPAL_SFA = e.FLG_DOMINIO_PUBLICO_SFA
            e.PAPEL_CONTATO_SFA = e.TLFN_1
            e.FLG_DOMINIO_PUBLICO_SFA = e.TLFN_2
            e.TLFN_1 = e.TLFN_3
            e.TLFN_2 = e.TLFN_4
            e.TLFN_3 = e.TLFN_5
            e.TLFN_4 = e.TLFN_6
            e.TLFN_5 = e.TLFN_7
            e.TLFN_6 = e.TLFN_8
            e.TLFN_7 = e.TEL_COMERCIAL_SIEBEL
            e.TLFN_8 = e.TEL_CELULAR_SIEBEL
            e.TEL_COMERCIAL_SIEBEL = e.TEL_RESIDENCIAL_SIEBEL
            e.TEL_CELULAR_SIEBEL = e.SEMAFORO_SERASA
            e.TEL_RESIDENCIAL_SIEBEL = e.MENSAGEM_RETORNO_SERASA
            e.SEMAFORO_SERASA = e.PROPENSAO_MOVEL_AVANCADA
            e.MENSAGEM_RETORNO_SERASA = e.DS_CNAE
            e.PROPENSAO_MOVEL_AVANCADA = e.DS_ATIVIDADE_ECONOMICA
            e.DS_CNAE = e.NOMEREDE
            e.DS_ATIVIDADE_ECONOMICA = e.ADABASMOVEL
            e.NOMEREDE = e.ADABASFIXA
            e.ADABASMOVEL = e.DT_INCLUSAO_CARTEIRA
            e.ADABASFIXA = e.NOMEGN
            e.DT_INCLUSAO_CARTEIRA = e.NOMEGERENTESECAO
            e.NOMEGN = e.NOMEGERENTEDIVISAO
            e.NOMEGERENTESECAO = e.NOMEDIRETORREGIONAL
            e.NOMEGERENTEDIVISAO = e.NOMEDIRETORCOMERCIAL
            e.NOMEDIRETORREGIONAL = e.CLUSTER
            e.NOMEDIRETORCOMERCIAL = e.VERTICAL
            e.CLUSTER = e.POSSE
            e.VERTICAL = e.TRILHA
            e.POSSE = e.PRIMEIRA_OFERTA
            e.TRILHA = e.SEGUNDA_OFERTA
            e.PRIMEIRA_OFERTA = e.TERCEIRA_OFERTA
            e.SEGUNDA_OFERTA = e.RECOMENDACAO
            e.TERCEIRA_OFERTA = e.__EMPTY
            e.RECOMENDACAO = e.__EMPTY_1
        }

        // Deletar colunas
        delete e.TIPO_DOCUMENTO
        delete e.SITUACAO_RECEITA
        delete e.NM_CLIENTE
        delete e.QT_BL_FTTH
        delete e.QT_BL_FTTC
        delete e.QT_BASICA_TERM
        delete e.AVANCADA_VOZ
        delete e.DS_ENDERECO
        delete e.QT_VVN
        delete e.FAT_VVN_LIQUIDO
        delete e.FAT_VVN_BRUTO
        delete e.DS_REDE
        delete e.FLG_FIXA
        delete e.FLG_MOVEL
        delete e.FLG_TOTALIZADO
        delete e.FLG_COBERTURA
        delete e.FLG_FIDELIZADO
        delete e.FLG_BOOK_FIDELIZADO
        delete e.NOMEREDE
        delete e.DT_INCLUSAO_CARTEIRA
        delete e.NOMEGN
        delete e.NOMEGERENTESECAO
        delete e.NOMEGERENTEDIVISAO
        delete e.NOMEDIRETORREGIONAL
        delete e.NOMEDIRETORCOMERCIAL
        delete e.NUMERO
        delete e.VERTICAL
        delete e.POSSE
        delete e.TRILHA
        delete e.RECOMENDACAO
        delete e.__EMPTY
        delete e.__EMPTY_1

        // Renomear propriedade
        delete Object.assign(e, { ['PROPENSAO_CONCORRENCIA_PMG']: e['PROPENSAO_MOVEL_AVANCADA'] })['PROPENSAO_MOVEL_AVANCADA']
        delete Object.assign(e, { ['ADABAS_MOVEL']: e['ADABASMOVEL'] })['ADABASMOVEL']
        delete Object.assign(e, { ['ADABAS_FIXA']: e['ADABASFIXA'] })['ADABASFIXA']
        delete Object.assign(e, { ['TORRE_PRODUTOS']: e['TP_PRODUTO'] })['TP_PRODUTO']
        delete Object.assign(e, { ['OFERTA_1']: e['PRIMEIRA_OFERTA'] })['PRIMEIRA_OFERTA']
        delete Object.assign(e, { ['OFERTA_2']: e['SEGUNDA_OFERTA'] })['SEGUNDA_OFERTA']
        delete Object.assign(e, { ['OFERTA_3']: e['TERCEIRA_OFERTA'] })['TERCEIRA_OFERTA']
        delete Object.assign(e, { ['MUNICIPIO']: e['DS_CIDADE'] })['DS_CIDADE']

        // Zerar propriedades
        e.VL_CAR_MOVEL = 0
        e.QT_CAR_MOVEL = 0
        e.VL_CAR_FIXA = 0
        e.QT_CAR_FIXA = 0
        e.DS_CIDADE = 0
        e.DS_DISPONIBILIDADE = 0

        // Criar propriedades
        e.EXCLUIR_PARQUE = 'NAO'
        e.PERFIL_PARQUE_MOVEL = '%PERFIL_PARQUE_MOVEL'
        e.PERFIL_PARQUE_BASICA = '%PERFIL_PARQUE_BASICA'
        e.PERFIL_PARQUE_AVANCADA = '%PERFIL_PARQUE_AVANCADA'
        e.BOAS_VINDAS = 0
        e.TIPO_CLIENTE_BASICA = '%TIPO_CLIENTE_BASICA'
        e.FLG_DISP_GPON = '%FLG_DISP_GPON'
        e.AGRUPAMENTO_CNAE_MACRO_ATUAL = 0
        e.AGRUPAMENTO_CNAE_MICRO_ATUAL = 0
        e.OFERTA_4 = 0
        e.OFERTA_5 = 0
        e.UF = 0
        e.FATURAMENTO = 0

        // Verificação
        if (e.TORRE_PRODUTOS !== 0) {
            if (e.TORRE_PRODUTOS.includes('AVANÇADO')) {
                e.TORRE_PRODUTOS = e.TORRE_PRODUTOS.replace('AVANÇADO', 'AVANÇADA')
            }
        }

        let valorCep = e.NR_CEP.toString()
        if (valorCep !== undefined) {
            e.NR_CEP = valorCep.replace('-', '')
        }


        cnaeData.forEach(eC => {
            if (e.DS_CNAE === eC.COD_CNAE) {
                e.AGRUPAMENTO_CNAE_MACRO_ATUAL = eC.AGRUPAMENTOCNAEMACROATUAL
                e.AGRUPAMENTO_CNAE_MICRO_ATUAL = eC.AGRUPAMENTOCNAEMICROATUAL
            }
        })

        const indexFTTH = fixaFTTH.findIndex(eB => eB.DOCUMENTO === e.NR_CNPJ)
        const indexFTTC = fixaFTTC.findIndex(eB => eB.DOCUMENTO === e.NR_CNPJ)

        if (e.TORRE_PRODUTOS !== 0) {
            if (indexFTTH !== -1) {
                e.TIPO_CLIENTE_BASICA = 'FTTH'
            } else if (indexFTTC !== -1) {
                e.TIPO_CLIENTE_BASICA = 'FTTC'
            } else if (e.TORRE_PRODUTOS.includes('BASICA')) {
                e.TIPO_CLIENTE_BASICA = '1P_VOZ_SOLO'
            } else {
                e.TIPO_CLIENTE_BASICA = 'SEM PRODUTO'
            }
        } else {
            e.TIPO_CLIENTE_BASICA = 'SEM PRODUTO'
        }

        const result = dispData.findIndex(eB => eB.NR_CNPJ === e.NR_CNPJ)
        if (result !== -1) {
            e.DS_DISPONIBILIDADE = dispData[result].DS_DISPONIBILIDADE
        }

        if (e.DS_DISPONIBILIDADE === 0) {
            e.FLG_DISP_GPON = 0
        } else {
            e.FLG_DISP_GPON = 1
        }

        let valor = e.NR_CEP

        let maisProximo = faixaCep.reduce(function (anterior, corrente) {
            return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
        });

        cepData.forEach(eB => {
            if (maisProximo === eB.col3 || maisProximo === eB.col4) {
                e.UF = eB.col1
                e.DS_CIDADE = eB.col2
            }
        })

        fixaData.forEach(eFixa => {
            if (e.NR_CNPJ === eFixa.DOCUMENTO) {
                e.FATURAMENTO += parseFloat(eFixa.VL_FAT_BRUTO)
            }
        })
        avancadaData.forEach(eAvancada => {
            if (e.NR_CNPJ === eAvancada.NRCNPJ) {
                e.FATURAMENTO += parseFloat(eAvancada.VALOR_TOTAL)
            }
        })
        movelData.forEach(eMovel => {
            if (e.NR_CNPJ === eMovel.CNPJ_CLIENTE) {
                e.FATURAMENTO += parseFloat(eMovel.FAT_MEDIO_03_MESES)
            }
        })
        tiData.forEach(eTi => {
            if (e.NR_CNPJ === eTi.CNPJ) {
                e.FATURAMENTO += parseFloat(eTi.VALOR)
            }
        })


        mapaParqueData.push({
            COD_CLIENTE: e.COD_CLIENTE,
            NR_CNPJ: e.NR_CNPJ,
            QT_MOVEL_TERM: e.QT_MOVEL_TERM,
            QT_MOVEL_PEN: e.QT_MOVEL_PEN,
            QT_MOVEL_M2M: e.QT_MOVEL_M2M,
            QT_MOVEL_FWT: e.QT_MOVEL_FWT,
            QT_BASICA_FWT: e.QT_BASICA_FWT,
            QT_BASICA_TERM_FIBRA: e.QT_BASICA_TERM_FIBRA,
            QT_BASICA_TERM_METALICO: e.QT_BASICA_TERM_METALICO,
            QT_BASICA_BL: e.QT_BASICA_BL,
            QT_BASICA_TV: e.QT_BASICA_TV,
            QT_BASICA_OUTROS: e.QT_BASICA_OUTROS,
            QT_BASICA_LINAS: e.QT_BASICA_LINAS,
            QT_AVANCADA_DDR: e.QT_AVANCADA_DDR,
            QT_AVANCADA_RI: e.QT_AVANCADA_RI,
            QT_AVANCADA_RDSI: e.QT_AVANCADA_RDSI,
            QT_AVANCADA_TERM: e.QT_AVANCADA_TERM,
            QT_AVANCADA_VOX: e.QT_AVANCADA_VOX,
            QT_AVANCADA_SIP: e.QT_AVANCADA_SIP,
            QT_AVANCADA_DADOS: e.QT_AVANCADA_DADOS,
            QT_VIVO_TECH: e.QT_VIVO_TECH,
            QT_OFFICE_365: e.QT_OFFICE_365,
            VL_CAR_MOVEL: e.VL_CAR_MOVEL,
            QT_CAR_MOVEL: e.QT_CAR_MOVEL,
            VL_CAR_FIXA: e.VL_CAR_FIXA,
            QT_CAR_FIXA: e.QT_CAR_FIXA,
            DS_DISPONIBILIDADE: e.DS_DISPONIBILIDADE,
            FLG_MEI: e.FLG_MEI,
            FLG_NAO_PERTURBE: e.FLG_NAO_PERTURBE,
            SEMAFORO_SERASA: e.SEMAFORO_SERASA,
            MENSAGEM_RETORNO_SERASA: e.MENSAGEM_RETORNO_SERASA,
            PROPENSAO_CONCORRENCIA_PMG: e.PROPENSAO_CONCORRENCIA_PMG,
            DS_CNAE: e.DS_CNAE,
            DS_ATIVIDADE_ECONOMICA: e.DS_ATIVIDADE_ECONOMICA,
            ADABAS_MOVEL: e.ADABAS_MOVEL,
            ADABAS_FIXA: e.ADABAS_FIXA,
            EXCLUIR_PARQUE: e.EXCLUIR_PARQUE,
            TORRE_PRODUTOS: e.TORRE_PRODUTOS,
            PERFIL_PARQUE_MOVEL: e.PERFIL_PARQUE_MOVEL,
            PERFIL_PARQUE_BASICA: e.PERFIL_PARQUE_BASICA,
            PERFIL_PARQUE_AVANCADA: e.PERFIL_PARQUE_AVANCADA,
            BOAS_VINDAS: e.BOAS_VINDAS,
            TIPO_CLIENTE_BASICA: e.TIPO_CLIENTE_BASICA,
            FLG_CID_DISP_VVN: e.FLG_CID_DISP_VVN,
            FLG_ERB: e.FLG_ERB,
            FLG_DISP_GPON: e.FLG_DISP_GPON,
            AGRUPAMENTO_CNAE_MACRO_ATUAL: e.AGRUPAMENTO_CNAE_MACRO_ATUAL,
            AGRUPAMENTO_CNAE_MICRO_ATUAL: e.AGRUPAMENTO_CNAE_MICRO_ATUAL,
            CLUSTER: e.CLUSTER,
            OFERTA_1: e.OFERTA_1,
            OFERTA_2: e.OFERTA_2,
            OFERTA_3: e.OFERTA_3,
            OFERTA_4: e.OFERTA_4,
            OFERTA_5: e.OFERTA_5,
            NM_CONTATO_SFA: e.NM_CONTATO_SFA,
            EMAIL_CONTATO_PRINCIPAL_SFA: e.EMAIL_CONTATO_PRINCIPAL_SFA,
            CELULAR_CONTATO_PRINCIPAL_SFA: e.CELULAR_CONTATO_PRINCIPAL_SFA,
            PAPEL_CONTATO_SFA: e.PAPEL_CONTATO_SFA,
            FLG_DOMINIO_PUBLICO_SFA: e.FLG_DOMINIO_PUBLICO_SFA,
            TLFN_1: e.TLFN_1,
            TLFN_2: e.TLFN_2,
            TLFN_3: e.TLFN_3,
            TLFN_4: e.TLFN_4,
            TLFN_5: e.TLFN_5,
            TLFN_6: e.TLFN_6,
            TLFN_7: e.TLFN_7,
            TLFN_8: e.TLFN_8,
            TEL_COMERCIAL_SIEBEL: e.TEL_COMERCIAL_SIEBEL,
            TEL_CELULAR_SIEBEL: e.TEL_CELULAR_SIEBEL,
            TEL_RESIDENCIAL_SIEBEL: e.TEL_RESIDENCIAL_SIEBEL,
            UF: e.UF,
            MUNICIPIO: e.MUNICIPIO,
            FATURAMENTO: e.FATURAMENTO,
        })
    })

    console.log(mapaParqueData)
    console.log('Terminou Mapa Parque')
    btnEstagio03.click()
}

function objectToCsvRow(obj) {
    const values = Object.values(obj);
    return values.map(value => `"${value}"`).join(',') + '\n';
}



// ===========  Arquivo Suspenso  ===========
function suspenso(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        suspensoData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(suspensoData)
        console.log('Lido: Suspenso')
        await ti(tiFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo M2M  ===========
function m2m(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        M2MData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(M2MData)
        M2MData.forEach(e => {

            let ttttt = numeroInteiroParaData(e.DT_PRIMEIRA_ATIVACAO)

            movelData.push({
                CODCLI: e.CODCLI,
                CNPJ_CLIENTE: e.CNPJ_CLIENTE,
                NR_TELEFONE: e.NR_TELEFONE,
                UF: e.UF,
                PLANO: e.PLANO,
                M: 0,
                FIDELIZADO: e.FIDELIZADO,
                DT_PRIMEIRA_ATIVACAO: `${ttttt.getDate() + 1}/${ttttt.getMonth() + 1}/${ttttt.getFullYear()}`,
                PLANO_CONTA: e.PLANO_CONTA,
                PLANO_LINHA: e.PLANO_LINHA,
                LINHA_SUSPENSA: 0,
                LINHA_SUSPENSA_STATUS: 'Verificar',
                FAT_MEDIO_03_MESES: 0,
                QT_DIAS_TRAF_DADOS: 0,
                QT_MB_TRAF_DADOS: 0
            })
        })
        console.log('Lido: M2M')
        await fixa(fixaFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Recomendação Móvel  ===========
function recMovel(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        recomendacaoMovelData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(recomendacaoMovelData)
        console.log('Lido: Recomendação Móvel')
        await voz(vozFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Sip  ===========
function sip(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        sipData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(sipData)
        sipData.forEach(e => {

            let valor = e.END_CEP

            let maisProximo = faixaCep.reduce(function (anterior, corrente) {
                return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
            });

            cepData.forEach(eB => {
                if (maisProximo === eB.col3 || maisProximo === eB.col4) {
                    e.END_UF = eB.col1
                    e.END_CIDADE = eB.col2
                }
            })


            let data_criacao = new Date(e.DATA_CRIACAO.slice(0, -13))
            let dataFinal = new Date(data_criacao)
            dataFinal.setFullYear(data_criacao.getFullYear() + 3)
            avancadaData.push({
                CD_PESSOA: e.COD_CLIENTE,
                NMLINHANEGOCIO: 'SIP',
                NMLINHAPRODUTO: 'PLANO FLEX',
                VELOCIDADE: e.QTD_CANAIS,
                NRCNPJ: e.CNPJ,
                NUM_MESES_PRAZO_CONTRATUAL: 36,
                DT_ASS: data_criacao,
                DT_FIM_PRAZO_CONTRATUAL: dataFinal,
                VALOR_TOTAL: e.VL_TOTAL,
                END_CIDADE: e.END_CIDADE,
                END_ESTADO: e.END_UF,
                END_CEP: e.END_CEP,
                PERCENTUAL_DE_CONTRATO: 100,
                TERMINAL_TRONCO: e.TERMINAL,
            })
        })
        console.log('Lido: Sip')
        await suspenso(suspensoFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Voz  ===========
function voz(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        vozData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(vozData)
        vozData.forEach(e => {
            const string = e.TP_PRODUTO;
            let match = ''
            if (string.includes(' ')) {
                [, match] = string.match(/(\S+) /) || [];
            } else {
                match = e.TP_PRODUTO
            }

            let valor = e.NR_CEP

            let maisProximo = faixaCep.reduce(function (anterior, corrente) {
                return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
            });

            cepData.forEach(eB => {
                if (maisProximo === eB.col3 || maisProximo === eB.col4) {
                    e.UF = eB.col1
                    e.DS_MUNICIPIO = eB.col2
                }
            })

            avancadaData.push({
                CD_PESSOA: e.CD_PESSOA,
                NMLINHANEGOCIO: match,
                NMLINHAPRODUTO: e.TP_PRODUTO,
                VELOCIDADE: e.QTD_ACESSO,
                NRCNPJ: 0,
                NUM_MESES_PRAZO_CONTRATUAL: 0,
                DT_ASS: 0,
                DT_FIM_PRAZO_CONTRATUAL: 0,
                VALOR_TOTAL: e.VL_TOTAL,
                END_CIDADE: e.DS_MUNICIPIO,
                END_ESTADO: e.UF,
                END_CEP: e.NR_CEP,
                PERCENTUAL_DE_CONTRATO: 100,
                TERMINAL_TRONCO: e.TRONCO,
            })
        })
        console.log('Lido: Voz')
        await sip(sipFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Recomendação Fixa  ===========
function recFixa(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        let jsonRecomendacaoFixa = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(jsonRecomendacaoFixa)
        console.log('Lido: Recomendação Fixa')
        processarRecomendacaoFixa(jsonRecomendacaoFixa)
    };

    reader.readAsArrayBuffer(file);

};

async function processarRecomendacaoFixa(content) {
    content.forEach(e => {
        delete e.NM_PARCEIRO
        delete e.ADABAS_MOVEL
        delete e.ADABAS_FIXA
        delete e.NM_GN
        delete e.NM_GER_SECAO
        delete e.NM_GER_DIVISAO
        delete e.NM_DIR_REGIONAL
        delete e.NM_DIR_COMERCIAL

        e.TIPO_OFERTA = 0

        if (e.DS_RECOMENDACAO.includes('Fideliza')) {
            e.TIPO_OFERTA = 'Fidelização'
        }
        if (e.DS_RECOMENDACAO.includes('Ades')) {
            e.TIPO_OFERTA = 'Adesão'
        }
        if (e.DS_RECOMENDACAO.includes('Upgrade')) {
            e.TIPO_OFERTA = 'Upgrade'
        }
        if (e.DS_RECOMENDACAO.includes('Migra')) {
            e.TIPO_OFERTA = 'Migração'
        }

        if (parseInt(e.VL_CONSUMO_MOVEL) > 0) {
            e.TIPO_OFERTA = 'Totalização'
        }

        if (e.DS_TIPO_PRECO.includes('(2P)') && e.PLANO.includes('Ilimitado')) {
            e.VL_CONSUMO_MOVEL = 0
        }

        recomendacaoFixaData.push({
            DOCUMENTO: e.DOCUMENTO,
            RECOMENDACAO: e.RECOMENDACAO,
            DS_RECOMENDACAO: e.DS_RECOMENDACAO,
            DS_TIPO_PRECO: e.DS_TIPO_PRECO,
            PLANO: e.PLANO,
            VL_RECOMENDACAO: e.VL_RECOMENDACAO,
            VL_CONSUMO_MOVEL: e.VL_CONSUMO_MOVEL,
            TIPO_OFERTA: e.TIPO_OFERTA
        })
    })

    await recMovel(recMovelFile)
}



// ===========  Arquivo Movel  ===========
function movel(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        let jsonMovel = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(jsonMovel)
        console.log('Lido: Movel')
        processarMovel(jsonMovel)
    };

    reader.readAsArrayBuffer(file);
};

async function processarMovel(content) {
    content.forEach(e => {
        delete e.MOMEREDE
        delete e.CD_DEALER
        delete e.NOME_DIRETOR
        delete e.NOME_DIVISAO
        delete e.CLIENTE
        delete e.M
        delete e.QT_CHAMADAS_TRAF_DADOS
        delete e.ELEGIVEL_BLINDAR
        delete e.QT_ELEGIVEIS
        delete e.QT_PLANTA
        delete e.TIPO_REDE
        delete e.TEM_COBERTURA_BANDA_LARGA
        delete e.TEM_LINHA_FIXA
        delete e.PERCENTUAL_FIDELIZADO
        delete e.VERTICAL
        delete e.CLIENTE_APTO_CONVERGENCIA
        delete e.DS_MUNICIPIO
        delete e.NR_CEP
        delete e.NR_ENDERECO
        delete e.SEMAFORO_SERASA
        delete e.MENSAGEM_RETORNO_SERASA
        delete e.PROPENSAO
        delete e.DT_CARGA
        delete e.TIPO_DOCUMENTO
        delete e.SITUACAO_RECEITA
        delete e.DS_APARELHO

        //Criar
        e.LINHA_SUSPENSA = 0
        e.LINHA_SUSPENSA_STATUS = 0

        // Renomear
        delete Object.assign(e, { ['M']: e['M_RECOMENDACAO'] })['M_RECOMENDACAO']

        // Zerar
        e.PLANO_CONTA = 0
        e.PLANO_LINHA = 0

        if (parseInt(e.M) >= 17) {
            e.FIDELIZADO = 'Nao Fidelizado'
        } else if (parseInt(e.M < 17)) {
            e.FIDELIZADO = 'Fidelizado'
        }

        let indexSusp = suspensoData.findIndex(element => element.CNPJ_CLIENTE === e.CNPJ_CLIENTE)
        if (indexSusp !== -1) {
            e.LINHA_SUSPENSA_STATUS = suspensoData[indexSusp].STATUS
        }

        if (e.LINHA_SUSPENSA_STATUS === 0) {
            e.LINHA_SUSPENSA = 'Nao'
        } else {
            e.LINHA_SUSPENSA = 'Sim'
        }

        let tdata = 0
        if (e.DT_PRIMEIRA_ATIVACAO !== 0) {
            let ttttt = numeroInteiroParaData(e.DT_PRIMEITA_ATIVACAO)
            tdata = `${ttttt.getDate() + 1}/${ttttt.getMonth() + 1}/${ttttt.getFullYear()}`
        } else {
            tdata = 0
        }

        let indexRec = recomendacaoMovelData.findIndex(element => element.NR_DOCUMENTO === e.CNPJ_CLIENTE)
        if (indexRec !== -1) {
            e.PLANO_CONTA = recomendacaoMovelData[indexRec].PLANO_RECOMENDADO
            e.PLANO_LINHA = recomendacaoMovelData[indexRec].PLANO_RECOMENDADO_UP
        }

        movelData.push({
            CODCLI: e.CODCLI,
            CNPJ_CLIENTE: e.CNPJ_CLIENTE,
            NR_TELEFONE: e.NR_TELEFONE,
            UF: e.UF,
            PLANO: e.PLANO,
            M: e.M,
            FIDELIZADO: e.FIDELIZADO,
            DT_PRIMEIRA_ATIVACAO: tdata,
            PLANO_CONTA: e.PLANO_CONTA,
            PLANO_LINHA: e.PLANO_LINHA,
            LINHA_SUSPENSA: e.LINHA_SUSPENSA,
            LINHA_SUSPENSA_STATUS: e.LINHA_SUSPENSA_STATUS,
            FAT_MEDIO_03_MESES: e.FAT_MEDIO_03_MESES,
            QT_DIAS_TRAF_DADOS: e.QT_DIAS_TRAF_DADOS,
            QT_MB_TRAF_DADOS: e.QT_MB_TRAF_DADOS
        })
    })
    console.log('Processou: Movel')
    await m2m(m2mFile)
}



// ===========  Arquivo Avançada  ===========
function avancada(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        var jsonAvancada = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        console.log(jsonAvancada)
        console.log('Lido: Avançada')
        processarAvancada(jsonAvancada)
    };

    reader.readAsArrayBuffer(file);
};

// Função para converter número inteiro em data
function numeroInteiroParaData(numero) {
    var dataBase = new Date(1900, 0, -1); // Data base do Excel (1º de janeiro de 1900)
    var data = new Date(dataBase.getTime() + numero * 24 * 60 * 60 * 1000);
    return data;
}

async function processarAvancada(content) {
    content.forEach(e => {
        delete e.END_NOME
        delete e.END_NUM
        delete e.END_COMPL

        delete e.DSSEGVALOR
        delete e.TT_QTD_PLANTA
        delete e.TT_VLR
        delete e.TT_VLR_NRC
        delete e.NUM_LP
        delete e.TECNOLOGIA
        delete e.DT_CONTRATO
        delete e.VALOR_ROTEADOR
        delete e.NU_CONTRATO
        delete e.STATUS_VANTIVE
        delete e.NOME_ROTEADOR
        delete e.MODELO_ROTEADOR
        delete e.ID_VANTIVE_PAI
        delete e.PROJETO_ESPECIAL

        delete e.IDENTIFICADOR
        delete e.IDENTLINHAPRIV

        delete e.NMPRODUTOMKT
        delete e.NMPRODUTOCG
        delete e.NMPRODUTOORIGEM
        delete e.CLIENTE


        // Renomear Propriedade
        delete Object.assign(e, { ['TERMINAL_TRONCO']: e['SISTEMA_ORIGEM'] })['SISTEMA_ORIGEM']


        // Zerar
        e.NMLINHANEGOCIO = 'SIP'
        e.NMLINHAPRODUTO = 'PLANO FLEX'
        e.END_CIDADE = 0
        e.END_ESTADO = 0


        // Criar
        e.PERCENTUAL_DE_CONTRATO = 0

        let tInicial = numeroInteiroParaData(e.DT_ASS)
        let tFinal = numeroInteiroParaData(e.DT_FIM_PRAZO_CONTRATUAL)
        let hoje = new Date()

        let dataInicial = `${tInicial.getDate()}/${tInicial.getMonth() + 1}/${tInicial.getFullYear()}`
        let dataFinal = `${tFinal.getDate()}/${tFinal.getMonth() + 1}/${tFinal.getFullYear()}`

        let result1 = tFinal.getTime() - tInicial.getTime()
        let result2 = hoje.getTime() - tInicial.getTime()
        let result3 = (result2 / result1) * 100

        let valor = e.END_CEP

        let maisProximo = faixaCep.reduce(function (anterior, corrente) {
            return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
        });

        cepData.forEach(eB => {
            if (maisProximo === eB.col3 || maisProximo === eB.col4) {
                e.END_ESTADO = eB.col1
                e.END_CIDADE = eB.col2
            }
        })

        avancadaData.push({
            CD_PESSOA: e.CD_PESSOA,
            NMLINHANEGOCIO: e.NMLINHANEGOCIO,
            NMLINHAPRODUTO: e.NMLINHAPRODUTO,
            VELOCIDADE: e.VELOCIDADE,
            NRCNPJ: e.NRCNPJ,
            NUM_MESES_PRAZO_CONTRATUAL: e.NUM_MESES_PRAZO_CONTRATUAL,
            DT_ASS: dataInicial,
            DT_FIM_PRAZO_CONTRATUAL: dataFinal,
            VALOR_TOTAL: e.VALOR_TOTAL,
            END_CIDADE: e.END_CIDADE,
            END_ESTADO: e.END_ESTADO,
            END_CEP: e.END_CEP,
            PERCENTUAL_DE_CONTRATO: parseInt(result3),
            TERMINAL_TRONCO: e.TERMINAL_TRONCO
        })
    })

    await movel(movelFile)
}



// ===========  Arquivo Ti  ===========
function ti(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        tiData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        tiData.forEach(e => {
            let tInicio = numeroInteiroParaData(e.INICIO)
            let tFim = numeroInteiroParaData(e.FIM)

            e.INICIO = `${tInicio.getDate() + 1}/${tInicio.getMonth() + 1}/${tInicio.getFullYear()}`
            e.FIM = `${tFim.getDate() + 1}/${tFim.getMonth() + 1}/${tFim.getFullYear()}`

            e.PERCENTUAL_CONTRATO = `${parseFloat(e.PERCENTUAL_CONTRATO * 100).toFixed(2)}%`
        })

        console.log(tiData)
        console.log('Lido: Ti')
        await avancada(avancadaFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Fixa  ===========
function fixa(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        fixaData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(fixaData)

        fixaData.forEach(e => {
            if (e.DS_PRODUTO_TECNOLOGIA === 'BANDA LARGA - FIBRA') {
                fixaFTTH.push(e)
            } else if (e.DS_PRODUTO_TECNOLOGIA === 'BANDA LARGA - METALICO') {
                fixaFTTC.push(e)
            }

            if (e.DT_INI_FDLZ != 0) {
                let tIniFdlz = numeroInteiroParaData(e.DT_INI_FDLZ)
                let tFimFdlz = numeroInteiroParaData(e.DT_FIM_FDLZ)

                e.DT_INI_FDLZ = `${tIniFdlz.getDate() + 1}/${tIniFdlz.getMonth() + 1}/${tIniFdlz.getFullYear()}`
                e.DT_FIM_FDLZ = `${tFimFdlz.getDate() + 1}/${tFimFdlz.getMonth() + 1}/${tFimFdlz.getFullYear()}`
            } else {
                e.DT_INI_FDLZ = 0
                e.DT_FIM_FDLZ = 0
            }
        })
        console.log(fixaFTTH)
        console.log(fixaFTTC)
        console.log('Lido: Fixa')
        await mapaDisp(mapaDispFile)
    };

    reader.readAsArrayBuffer(file);
};



// ===========  Arquivo Disp  ===========
function mapaDisp(arquivo) {
    var file = arquivo

    var reader = new FileReader();
    reader.onload = async function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        dispData = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(dispData)
        console.log('Lido: Disp')
        await mapaParque(mapaParqueFile)
    };

    reader.readAsArrayBuffer(file);
};



function verificar() {
    avancadaData.forEach(e => {
        if (e.NRCNPJ === 0) {
            let index = mapaParqueData.findIndex(element => element.COD_CLIENTE === e.CD_PESSOA)
            if (index !== -1) {
                e.NRCNPJ = mapaParqueData[index].NR_CNPJ
            } else {
                e.NRCNPJ = 0
            }
        }
    })
    console.log('Verificou: CNPJ Faltante')

    movelData.forEach(e => {
        if (e.LINHA_SUSPENSA_STATUS === 'Verificar') {
            let index = suspensoData.findIndex(element => element.CNPJ_CLIENTE === e.CNPJ_CLIENTE)
            if (index !== -1) {
                e.LINHA_SUSPENSA_STATUS = suspensoData[index].STATUS
            } else {
                e.LINHA_SUSPENSA_STATUS = 0
            }
            if (e.LINHA_SUSPENSA_STATUS === 0) {
                e.LINHA_SUSPENSA = 'Nao'
            } else {
                e.LINHA_SUSPENSA = 'Sim'
            }
        }
    })
    console.log('Verificou: Status PEN M2M FWT')

    mapaParqueData.forEach(e => {
        let eAvancada = avancadaData.find(element => element.NRCNPJ === e.NR_CNPJ)
        if (eAvancada !== undefined) {
            let percent = eAvancada.PERCENTUAL_DE_CONTRATO
            if (percent < 50) {
                e.PERFIL_PARQUE_AVANCADA = 'CONTRATO < 50%'
            } else if (percent < 75) {
                e.PERFIL_PARQUE_AVANCADA = 'CONTRATO > 50% E < 75%'
            } else {
                e.PERFIL_PARQUE_AVANCADA = 'CONTRATO >= 75%'
            }
        } else {
            e.PERFIL_PARQUE_AVANCADA = 'SEM PRODUTOS AVANÇADA'
        }

        function compare(a, b) {
            if (a.M < b.M)
                return -1;
            if (a.M > b.M)
                return 1;
            return 0;
        }

        let eBasica = fixaData.filter(element => element.DOCUMENTO === e.NR_CNPJ)
        if (eBasica.length !== 0) {
            eBasica.sort(compare);
            let menor = eBasica[0]
            let maior = eBasica[eBasica.length - 1]

            if (maior.M < 7 && menor.M >= 0) {
                e.PERFIL_PARQUE_BASICA = 'PRODUTOS M < 7'
            } else if (maior.M < 17 && menor.M > 6) {
                e.PERFIL_PARQUE_BASICA = 'PRODUTOS M 7 A 16'
            } else if (maior.M > 24 && menor.M > 24) {
                e.PERFIL_PARQUE_BASICA = 'PRODUTOS M >= 25'
            } else {
                e.PERFIL_PARQUE_BASICA = 'PRODUTOS MIX'
            }
        } else {
            e.PERFIL_PARQUE_BASICA = 'SEM PRODUTOS BASICA'
        }

        let eMovel = movelData.filter(element => element.CNPJ_CLIENTE === e.NR_CNPJ)
        if (eMovel.length !== 0) {
            eMovel.sort(compare)
            let menor = eMovel[0]
            let maior = eMovel[eMovel.length - 1]

            if (maior.M < 7 && menor.M >= 0) {
                e.PERFIL_PARQUE_MOVEL = 'PRODUTOS M < 7'
            } else if (maior.M < 17 && menor.M > 6) {
                e.PERFIL_PARQUE_MOVEL = 'PRODUTOS M 7 A 16'
            } else if (maior.M < 25 && menor.M > 16) {
                e.PERFIL_PARQUE_MOVEL = 'PRODUTOS M 17 A 24'
            } else if (maior.M > 24 && menor.M > 24) {
                e.PERFIL_PARQUE_MOVEL = 'PRODUTOS M >= 25'
            } else {
                e.PERFIL_PARQUE_MOVEL = 'PRODUTOS MIX'
            }
        } else {
            e.PERFIL_PARQUE_MOVEL = 'SEM LINHA TERMINAL'
        }
    })
    console.log('Verificou: Perfil')

    console.log('Terminou a verificação! Exporte o arquivo')
    btnExportar.removeAttribute('disabled')
    btnExportar.click()
    loader.setAttribute('style', 'display: none')
    document.getElementById('pProcessando').setAttribute('style', 'display: none')
}



// ===========  Criar e Exportar Novo Arquivo  ===========
document.getElementById('exportBtn').addEventListener('click', function () {
    const wsMapaParque = XLSX.utils.json_to_sheet(mapaParqueData)
    const wsTi = XLSX.utils.json_to_sheet(tiData)
    const wsFixa = XLSX.utils.json_to_sheet(fixaData)
    const wsMovel = XLSX.utils.json_to_sheet(movelData)
    const wsAvancada = XLSX.utils.json_to_sheet(avancadaData)
    const wsRecomendacaoFixa = XLSX.utils.json_to_sheet(recomendacaoFixaData)

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, wsMapaParque, "Mapa Parque");
    XLSX.utils.book_append_sheet(workbook, wsMovel, "Parque Móvel");
    XLSX.utils.book_append_sheet(workbook, wsFixa, "Parque Básica");
    XLSX.utils.book_append_sheet(workbook, wsAvancada, "Parque de Avançada");
    XLSX.utils.book_append_sheet(workbook, wsTi, "Parque TI");
    XLSX.utils.book_append_sheet(workbook, wsRecomendacaoFixa, 'Recomendações')

    const wbout = XLSX.writeFile(workbook, "Data.xlsx", { compression: true });
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