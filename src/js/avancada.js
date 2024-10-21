const loader = document.getElementById('loader')
const inputFileDados = document.getElementById('fileInputDados')
const inputFileSip = document.getElementById('fileInputSip')
const inputFileCep = document.getElementById('fileInputCep')
const inputFileVoz = document.getElementById('fileInputVoz')
const pProcessandoDados = document.getElementById('pProcessandoDados')
const btnDados = document.getElementById('btnDados')
const btnCriarArquivo = document.getElementById('btnCriarArquivo')
const labelDados = document.getElementById('labelFileInputDados')
const labelSip = document.getElementById('labelFileInputSip')
const labelCep = document.getElementById('labelFileInputCep')
const labelVoz = document.getElementById('labelFileInputVoz')
let dadosData = [];
let sipData = [];
let cepData = [];
let vozData = [];
let faixaCep = [];


// ===========  Função DADOS  ===========
inputFileDados.addEventListener('change', function (event) {
    const file = event.target.files[0];
    labelDados.textContent = file.name
    loader.setAttribute('style', 'display: block')

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSVDados(content);
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsText(file, 'ISO-8859-1');
});

function processCSVDados(content) {
    // Divida o conteúdo em linhas
    const lines = content.split('\n');

    // Remove a ultima linha em branco
    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // Processar cada linha
    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        columns.splice(30, 3)
        columns.splice(15, 14)
        columns.splice(9, 2)
        columns.splice(4, 3)


        if (columns[3].includes('BÃSICO') || columns[3].includes('BÁSICO')) {
            columns[3] = columns[3].replace('BÃSICO', 'BASICO')
            columns[3] = columns[3].replace('BÁSICO', 'BASICO')
        } else if (columns[3].includes('GESTÃƒO') || columns[3].includes('GESTÃO')) {
            columns[3] = columns[3].replace('GESTÃƒO', 'GESTAO')
            columns[3] = columns[3].replace('GESTÃO', 'GESTAO')
        }

        if (columns[0] === '' || columns[0] === ' ' || columns[0] === undefined || columns[0] === null) {
            columns[0] = '0'
        }
        if (columns[1] === 'CLIENTE') {
            columns[1] = 'PERCENTUAL_DE_CONTRATO'
        } else {
            columns[1] = '0'
        }
        if (columns[2] === '' || columns[2] === ' ' || columns[2] === undefined || columns[2] === null) {
            columns[2] = '0'
        } else if (columns[2] !== 'NMLINHANEGOCIO') {
            columns[2] = 'SIP'
        }
        if (columns[3] === '' || columns[3] === ' ' || columns[3] === undefined || columns[3] === null) {
            columns[3] = '0'
        } else if (columns[3] !== 'NMLINHAPRODUTO') {
            columns[3] = 'PLANO FLEX'
        }
        if (columns[4] === '' || columns[4] === ' ' || columns[4] === undefined || columns[4] === null) {
            columns[4] = '0'
        } else if (columns[4] === 'SISTEMA_ORIGEM') {
            columns[4] = 'TERMINAL_TRONCO'
        }
        if (columns[5] === '' || columns[5] === ' ' || columns[5] === undefined || columns[5] === null || columns[5].length < 2) {
            columns[5] = '0'
        }
        if (columns[6] === '' || columns[6] === ' ' || columns[6] === undefined || columns[6] === null) {
            columns[6] = '0'
        }
        if (columns[7] === '' || columns[7] === ' ' || columns[7] === undefined || columns[7] === null) {
            columns[7] = '0'
        }
        if (columns[8] === '' || columns[8] === ' ' || columns[8] === undefined || columns[8] === null) {
            columns[8] = '0'
        }
        if (columns[9] === '' || columns[9] === ' ' || columns[9] === undefined || columns[9] === null) {
            columns[9] = '0'
        }
        if (columns[10] === '' || columns[10] === ' ' || columns[10] === undefined || columns[10] === null) {
            columns[10] = '0'
        }
        if (columns[11] !== 'END_CIDADE') {
            columns[11] = '0'
        }
        if (columns[12] !== 'END_ESTADO') {
            columns[12] = '0'
        }
        columns[13] = columns[13].slice(0, -1)
        if (columns[13] === '' || columns[13] === ' ' || columns[13] === undefined || columns[13] === null || columns[13].length < 3) {
            columns[13] = '0'
        }


        dadosData.push({
            col1: columns[0],
            col2: columns[2],
            col3: columns[3],
            col4: columns[5],
            col5: columns[6],
            col6: columns[7],
            col7: columns[8],
            col8: columns[9],
            col9: columns[10],
            col10: columns[11],
            col11: columns[12],
            col12: columns[13],
            col13: columns[1],
            col14: columns[4],
        });
    });
    console.log(dadosData)
}


// ===========  Função SIP  ===========
inputFileSip.addEventListener('change', function (event) {
    const file = event.target.files[0];
    labelSip.textContent = file.name

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSVSip(content);
    };

    reader.readAsText(file, 'ISO-8859-1');
});


function processCSVSip(content) {
    // Divida o conteúdo em linhas
    const lines = content.split('\n');

    // Remova a primeira linha
    lines.splice(0, 1)

    // Remove a ultima linha em branco
    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // Processar cada linha
    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        let data = columns[52].slice(0, -13).split('-')
        let dia = data[2]
        let mes = data[1]
        let ano = parseInt(data[0]) + 3

        dadosData.push({
            col1: columns[8],
            col2: 'SIP',
            col3: 'PLANO FLEX',
            col4: columns[12], // verificar
            col5: columns[9],
            col6: '36',
            col7: (columns[52].slice(0, -13)),
            col8: `${ano}-${mes}-${dia}`,
            col9: columns[11],
            col10: columns[11], // verificar
            col11: columns[12], // verificar
            col12: columns[6],
            col13: columns[1], // verificar
            col14: columns[7],
        });
    });
    console.log(dadosData)
}


// ===========  Função CEP  ===========
inputFileCep.addEventListener('change', function (event) {
    const file = event.target.files[0];
    labelCep.textContent = file.name

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSVCep(content);
    };

    reader.readAsText(file, 'ISO-8859-1');
});


function processCSVCep(content) {
    // Divida o conteúdo em linhas
    const lines = content.split('\n');

    // Remove a ultima linha em branco
    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // Processar cada linha
    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        if (columns[3] !== "" || columns[3] !== undefined || columns[3] !== ' ' || columns[3] !== null) {
            faixaCep.push(columns[3])
            faixaCep.push(columns[4])
        }

        if (columns[1].includes('á')) {
            columns[1] = columns[1].replace('á', 'a')
        }
        if (columns[1].includes('â')) {
            columns[1] = columns[1].replace('â', 'a')
        }
        if (columns[1].includes('ç')) {
            columns[1] = columns[1].replace('ç', 'c')
        }
        if (columns[1].includes('í')) {
            columns[1] = columns[1].replace('í', 'i')
        }
        if (columns[1].includes('ú')) {
            columns[1] = columns[1].replace('ú', 'u')
        }
        if (columns[1].includes('é')) {
            columns[1] = columns[1].replace('é', 'e')
        }
        if (columns[1].includes('ã')) {
            columns[1] = columns[1].replace('ã', 'a')
        }
        if (columns[1].includes('ó')) {
            columns[1] = columns[1].replace('ó', 'o')
        }
        if (columns[1].includes('João')) {
            columns[1] = columns[1].replace('João', 'Joao')
        }

        cepData.push({
            col1: columns[0],
            col2: columns[1],
            col3: columns[3],
            col4: columns[4],
        });
    });
    faixaCep.sort((a, b) => {
        return parseInt(a) - parseInt(b)
    })
    console.log(cepData)
}


// ===========  Função VOZ  ===========
inputFileVoz.addEventListener('change', function (event) {
    const file = event.target.files[0];
    labelVoz.textContent = file.name

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSVVoz(content);
    };

    reader.readAsText(file, 'ISO-8859-1');
});

function processCSVVoz(content) {
    // Divida o conteúdo em linhas
    const lines = content.split('\n');

    // Remova a primeira linha
    lines.splice(0, 1)

    // Remove a ultima linha em branco
    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // Processar cada linha
    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        const string = columns[14];
        let match = ''
        if (string.includes(' ')) {
            [, match] = string.match(/(\S+) /) || [];
        } else {
            match = columns[14]
        }

        if (columns[9] === undefined || columns[9] === '' || columns[9] === null || columns[9].length < 7) {
            columns[9] = '0'
        }


        dadosData.push({
            col1: columns[1],
            col2: match,
            col3: columns[14],
            col4: columns[6],
            col5: '0',
            col6: '0',
            col7: '0',
            col8: '0',
            col9: columns[5],
            col10: '0',
            col11: '0',
            col12: columns[9],
            col13: '0',
            col14: columns[0],
        });
    });
    console.log(dadosData)
}


// ===========  Funções de Atualizações  ===========
function atualizarCep() {
    dadosData.forEach(eA => {
        let valor = eA.col12

        let maisProximo = faixaCep.reduce(function (anterior, corrente) {
            return (Math.abs(corrente - valor) < Math.abs(anterior - valor) ? corrente : anterior);
        });

        if (eA.col12 !== 'END_CEP') {
            cepData.forEach(eB => {
                if (maisProximo === eB.col3 || maisProximo === eB.col4) {
                    eA.col11 = eB.col1
                    eA.col10 = eB.col2
                }
            })
        }
        if (eA.col10.includes('Ã£')) {
            eA.col10 = eA.col10.replace('Ã£', 'a')
        }
    })
    console.log('Terminou Atualizar CEP')
}


function dataDiff() {
    dadosData.forEach(e => {
        if (e.col1 !== 'CD_PESSOA') {
            let dataInicial = new Date(e.col7)
            let dataFinal = new Date(e.col8)
            let hoje = new Date()

            if (e.col7 !== '0') {
                let result1 = Math.abs(dataFinal - dataInicial)
                let days1 = result1 / (1000 * 3600 * 24)

                let result2 = Math.abs(hoje - dataInicial)
                let days2 = result2 / (1000 * 3600 * 24)

                let result3 = (days2 / days1) * 100
                e.col13 = `${result3.toFixed(1)}%`
            } else {
                e.col13 = '100%'
            }
        }
    })
    console.log('Terminou Percentual')
    btnCriarArquivo.setAttribute('style', 'display: block; border: none; background-color: cadetblue; border-radius: 5px; color: aliceblue; cursor: pointer; padding: 5px 10px; margin-top: 15px')
}


function criarArquivo() {
    let newCSVContent = ''

    dadosData.forEach(function (row) {
        newCSVContent += Object.values(row).join(',') + '\n';
    });

    // Criar um novo arquivo Blob
    const newCSVBlob = new Blob([newCSVContent], { type: 'text/csv' });

    // Criar um link de download para o novo arquivo
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(newCSVBlob);
    
    downloadLink.download = 'newFile.csv';

    // Adicionar o link ao corpo do documento
    document.body.appendChild(downloadLink);

    console.log('Terminou')

    pProcessandoDados.setAttribute('style', 'display: none')

    
    downloadLink.click();

    btnDados.setAttribute('style', 'display: block; border: none; background-color: cadetblue; border-radius: 5px; color: aliceblue; cursor: pointer; padding: 5px 10px; margin-top: 15px')
    btnDados.addEventListener('click', () => downloadLink.click())
}