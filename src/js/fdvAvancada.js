const loader = document.getElementById('loader')
const p = document.getElementById('p')
const btnExportar = document.getElementById('exportBtn')
let avancadaData = []
let ufData = []
let tipoNegociacaoData = []
let tipoOperacaoData = []
const fileLabel = document.getElementById('labelFileInput')


document.getElementById('fileInput').addEventListener('change', function (event) {
    var file = event.target.files[0];
    fileLabel.textContent = file.name

    loader.setAttribute('style', 'display: block')
    p.setAttribute('style', 'display: block')

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheetName = workbook.SheetNames[0]; // Assume que estamos lendo a primeira planilha

        var sheet = workbook.Sheets[sheetName];
        var jsonAvancada = XLSX.utils.sheet_to_json(sheet, { defval: 0 });

        // displayData(json);
        console.log(jsonAvancada)
        processAvancadaData(jsonAvancada)
        p.setAttribute('style', 'display: none')
        loader.setAttribute('style', 'display: none')
        btnExportar.click()
    };

    reader.readAsArrayBuffer(file);
});


function processAvancadaData(content) {
    content.forEach(e => {
        // Deletar colunas
        delete e.esteira
        delete e.superior_imediato_id
        delete e.usuario_id
        delete e.tipoCliente
        delete e.valor_liquido
        delete e.ocorrencia_de_entrada
        delete e.cotacaoVivocorp
        delete e.pedidoVivocorp
        delete e.origemDados
        delete e.data_criacao
        delete e.cammpanha
        delete e.USUARIO_MOVIMENTACAO
        delete e.nomeRepresentante
        delete e.email
        delete e.telefone
        delete e.celular
        delete e.celular2


        // Criar propriedades
        e.UF = ''
        e.Tipo = ''
        e.Tipo2 = ''

        if (e.itemEspecificacao == 'UF') {
            ufData.push({
                item: e.item,
                itemEspecificacao: e.itemEspecificacao,
                itemEspecificacaoOpcao: e.itemEspecificacaoOpcao
            })
        }

        if (e.itemEspecificacao.includes('Negocia')) {
            tipoNegociacaoData.push({
                item: e.item,
                itemEspecificacao: e.itemEspecificacao,
                itemEspecificacaoOpcao: e.itemEspecificacaoOpcao
            })
        }

        if (e.itemEspecificacao.includes('Opera')) {
            tipoOperacaoData.push({
                item: e.item,
                itemEspecificacao: e.itemEspecificacao,
                itemEspecificacaoOpcao: e.itemEspecificacaoOpcao
            })
        }


        if (e.valor_unitario == 0 || e.valor_unitario == 0.00) {
            return
        }

        e.data_venda = new Date(e.data_venda)
        let dataBase = new Date(1900, 0, -1)
        let dataBase2 = new Date(1900, 0, -2)
        let dataInt = parseInt((e.data_venda.getTime() - dataBase) / 24 / 60 / 60 / 1000)
        e.data_venda = dataInt
        e.DATA_MOVIMENTACAO = new Date(e.DATA_MOVIMENTACAO)
        let dataMovimentacao = parseInt((e.DATA_MOVIMENTACAO.getTime() - dataBase2) / 24 / 60 / 60 / 1000)
        e.DATA_MOVIMENTACAO = dataMovimentacao
        e.venda_id = parseInt(e.venda_id)
        e.documentacaoCliente = parseInt(e.documentacaoCliente)
        e.item = parseInt(e.item)
        e.valor_unitario = Number(e.valor_unitario)


        avancadaData.push({
            venda_id: e.venda_id,
            data_venda: e.data_venda,
            adabas: e.adabas,
            vendedor: e.vendedor,
            supervisor: e.supervisor,
            razaoSocialCliente: e.razaoSocialCliente,
            documentacaoCliente: e.documentacaoCliente,
            item: e.item,
            itemEspecificacao: e.itemEspecificacao,
            itemEspecificacaoOpcao: e.itemEspecificacaoOpcao,
            valor_unitario: e.valor_unitario,
            grupoEtapa: e.grupoEtapa,
            historicoTramitacao: e.historicoTramitacao,
            DATA_MOVIMENTACAO: e.DATA_MOVIMENTACAO,
            UF: e.UF,
            Tipo: e.Tipo,
            Tipo2: e.Tipo2
        })
    })

    console.log(avancadaData)
    console.log('Terminou: Basica')
    verificacao()
}

function compareZAItemEspec(a, b) {
    if (a.itemEspecificacao > b.itemEspecificacao)
        return -1;
    if (a.itemEspecificacao < b.itemEspecificacao)
        return 1;
    return 0;
}

function compareZAGrupoEtapa(a, b) {
    if (a.grupoEtapa > b.grupoEtapa)
        return -1;
    if (a.grupoEtapa < b.grupoEtapa)
        return 1;
    return 0;
}

function compareAZVendaId(a, b) {
    if (a.venda_id < b.venda_id)
        return -1;
    if (a.venda_id > b.venda_id)
        return 1;
    return 0;
}

function compareAZDocumentacaoCliente(a, b) {
    if (a.documentacaoCliente < b.documentacaoCliente)
        return -1;
    if (a.documentacaoCliente > b.documentacaoCliente)
        return 1;
    return 0;
}


function verificacao() {
    ufData.forEach(e => {
        avancadaData.forEach(eB => {
            if (e.item == eB.item) {
                eB.UF = e.itemEspecificacaoOpcao
            }
        })
    })
    console.log('Terminou: UF')

    tipoNegociacaoData.forEach(e => {
        avancadaData.forEach(eB => {
            if (e.item == eB.item) {
                eB.Tipo = e.itemEspecificacaoOpcao
            }
        })
    })
    console.log('Terminou: Negociacao')

    tipoOperacaoData.forEach(e => {
        avancadaData.forEach(eB => {
            if (e.item == eB.item) {
                eB.Tipo2 = e.itemEspecificacaoOpcao
            }
        })
    })
    console.log('Terminou: Operacao')

    classificar()
}

function classificar() {
    avancadaData.sort(compareZAItemEspec)
    console.log('Terminou: sort')
    avancadaData.sort(compareZAGrupoEtapa)
    console.log('Terminou: sort')
    avancadaData.sort(compareAZVendaId)
    console.log('Terminou: sort')
    avancadaData.sort(compareAZDocumentacaoCliente)
    console.log('Terminou: sort')

    avancadaData.forEach(e => {
        delete Object.assign(e, { ['Tipo de Negociação +']: e['Tipo'] })['Tipo']
        delete Object.assign(e, { ['Tipo de Operação']: e['Tipo2'] })['Tipo2']
    })
}


// ===========  Criar e Exportar Novo Arquivo  ===========
document.getElementById('exportBtn').addEventListener('click', function () {
    const wsBasicaFDV = XLSX.utils.json_to_sheet(avancadaData)

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, wsBasicaFDV, "Fixa Avançada");

    const wbout = XLSX.writeFile(workbook, "AvancadaFDV.xlsx", { compression: true });
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