const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

let exportData = []
let combinedLoginLogoutData = []
let combinedPausasData = []

const inputTabulacao = document.getElementById('fileTabulacaoInput');
const inputCall = document.getElementById('fileCallInput')
const inputLogin = document.getElementById('fileLoginLogoutInput')
const inputPausas = document.getElementById('filePausasInput')

const labelTabulacao = document.getElementById('labelTabulacaoFileInput')
const labelCall = document.getElementById('labelCallFileInput')
const labelLogin = document.getElementById('labelLoginLogoutFileInput')
const labelPausas = document.getElementById('labelPausasFileInput')

inputTabulacao.addEventListener('change', (event) => {
    labelTabulacao.textContent = `${event.target.files.length} Arquivos`
})
inputCall.addEventListener('change', (event) => {
    labelCall.textContent = `${event.target.files.length} Arquivos`
})
inputLogin.addEventListener('change', (event) => {
    labelLogin.textContent = `${event.target.files.length} Arquivos`
})
inputPausas.addEventListener('change', (event) => {
    labelPausas.textContent = `${event.target.files.length} Arquivos`
})


document.getElementById('processBtn').addEventListener('click', function () {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const filesTabulacao = inputTabulacao.files;
    let combinedTabulacaoData = [];
    let filesTabulacaoProcessed = 0

    const filesCall = inputCall.files
    let combinedCallData = []

    const filesLogin = inputLogin.files

    const filesPausas = inputPausas.files


    if (filesTabulacao.length === 0 || filesCall.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo .CSV em cada campo.');
        return;
    }

    Array.from(filesPausas).forEach(file => {
        const reader = new FileReader()

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: 'array' })

            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            combinedPausasData = combinedPausasData.concat(csvData)
        }

        reader.readAsArrayBuffer(file)
    })


    Array.from(filesLogin).forEach(file => {
        const reader = new FileReader()

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: 'array' })

            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            combinedLoginLogoutData = combinedLoginLogoutData.concat(csvData)
        }

        reader.readAsArrayBuffer(file)
    })

    Array.from(filesCall).forEach(file => {
        const reader = new FileReader()

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: 'array' })

            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]

            const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            combinedCallData = combinedCallData.concat(csvData)
        }

        reader.readAsArrayBuffer(file)
    })

    Array.from(filesTabulacao).forEach(file => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            combinedTabulacaoData = combinedTabulacaoData.concat(csvData);
            filesTabulacaoProcessed++;

            if (filesTabulacaoProcessed === filesTabulacao.length) {
                manipulateTabulacaoData(combinedTabulacaoData);
            }
        };

        reader.readAsArrayBuffer(file);
    });
});

let somaTempoPausa = 0

function manipulatePausasData(data) {
    let separados = separar(data, 1)

    Object.keys(separados).forEach((itemSeparado) => {
        separados[itemSeparado].forEach(e => {
            if (typeof (e[5]) == 'number') {
                somaTempoPausa += e[5]
            }
        })

        let indexExport = exportData.findIndex(elem => elem.nomeAgente == itemSeparado)
        if (indexExport != -1) {
            let provimento = (exportData[indexExport].tempoLogado - somaTempoPausa) / 1.41666666666667
            let prodDU = (exportData[indexExport].vendas / exportData[indexExport].duTrabalhados).toFixed(2)
            exportData[indexExport].provimento = `a${provimento}`
            exportData[indexExport].prodDU = `a${prodDU}`

            somaTempoPausa = 0
        }
    })

    pProcess.setAttribute('style', 'display: none')
    loader.setAttribute('style', 'display: none')

    exportToCSV(exportData, 'dataQuartil.csv');
}



function manipulateLoginData(data) {
    let separados = separar(data, 1)

    Object.keys(separados).forEach((itemSeparado) => {
        let separadoPorData = separar(separados[itemSeparado], 3)

        let somaDoDia = 0
        let somaDiasUteis = 0
        let somaDaSemana = 0

        Object.keys(separadoPorData).forEach((item) => {
            for (let i = 1; i < separadoPorData[item].length; i++) {
                if (separadoPorData[item][i][6] !== separadoPorData[item][i - 1][6]) {
                    somaDoDia += separadoPorData[item][i - 1][7]
                    somaDaSemana += separadoPorData[item][i - 1][7]
                }
            }

            somaDoDia += separadoPorData[item][separadoPorData[item].length - 1][7]
            somaDaSemana += separadoPorData[item][separadoPorData[item].length - 1][7]

            if (somaDoDia > 0.0416666666666667) {
                somaDiasUteis++
            }

            let indexExport = exportData.findIndex(elem => elem.loginAgente == itemSeparado)
            if (indexExport != -1) {
                exportData[indexExport].duTrabalhados = somaDiasUteis
                exportData[indexExport].tempoLogado = somaDaSemana
            }

            somaDoDia = 0
        });

        somaDaSemana = 0
        somaDiasUteis = 0
    });

    manipulatePausasData(combinedPausasData)
}



function manipulateTabulacaoData(data) {
    let separados = separar(data, 15)
    let contados = contar(data, 15)

    Object.keys(contados).forEach((item) => {
        exportData.push({
            nomeAgente: 'nomeAgente',
            loginAgente: item,
            duTrabalhados: 'loginLogout',
            provimento: 'formula',
            ligacoesAtendidas: contados[item],
            contatoEfetivo: contados[item],
            vendas: 'Classificacao = Vendas',
            prodDU: 'formula',
            agendamento: 'classificacao = agendamento',
            tempoLogado: 'tempoLogado',
        })
    });

    let arrayData = []

    Object.keys(separados).forEach((item) => {
        arrayData.push({
            id: item,
            content: separados[item]
        })
    });

    let contagemVenda = 0
    let contagemAgendamento = 0
    let nomeAgente = ''

    arrayData.forEach(e => {
        e.content.forEach(content => {
            if (content[10] == 'VENDA') {
                contagemVenda++
            } else if (String(content[10]).includes('AGENDAMENTO')) {
                contagemAgendamento++
            }
            nomeAgente = content[14]
        })
        let indexExport = exportData.findIndex(elem => elem.loginAgente == e.id)
        exportData[indexExport].vendas = contagemVenda
        exportData[indexExport].agendamento = contagemAgendamento
        exportData[indexExport].nomeAgente = nomeAgente
        contagemVenda = 0
        contagemAgendamento = 0
    })

    manipulateLoginData(combinedLoginLogoutData)
}



function contar(array, index) {
    const counts = array.reduce((acc, currentItem) => {
        const value = currentItem[index]; // Valor do índice
        acc[value] = (acc[value] || 0) + 1; // Incrementa a contagem
        return acc;
    }, {});

    return counts
}



function separar(array, index) {
    const grouped = array.reduce((acc, currentItem) => {
        const key = currentItem[index]; // Valor do índice
        if (!acc[key]) {
            acc[key] = []; // Inicializa o grupo se ainda não existir
        }
        acc[key].push(currentItem); // Adiciona o item ao grupo correspondente
        return acc;
    }, {});

    return grouped
}



function exportToCSV(data, filename) {
    // Cria uma nova worksheet a partir dos dados filtrados
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Cria um novo workbook e adiciona a worksheet a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Exporta o workbook como um arquivo CSV
    XLSX.writeFile(workbook, filename, { bookType: 'csv' });
}