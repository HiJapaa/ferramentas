const loader = document.getElementById('loader')
let csvMovelData = [];
let csvRecomendacaoData = [];
let csvSuspensaoData = [];
let resultado = [];
const fileMovelLabel = document.getElementById('labelMovelFileInput')
const fileRecomendacaoLabel = document.getElementById('labelRecomendacaoFileInput')
const fileSuspensaoLabel = document.getElementById('labelSuspensaoFileInput')

function atualizar() {
    loader.setAttribute('style', 'display: block')
    let newCSVContent = '';

    for (let i = 0; i < csvSuspensaoData.length; i++) {
        csvMovelData[i].col16 = csvSuspensaoData[i].col2
        csvMovelData[i].col17 = csvSuspensaoData[i].col1
    }

    for (let i = 0; i < csvSuspensaoData.length; i++) {
        csvMovelData.forEach(e => {
            if (csvMovelData[i].col16 === e.col3) {
                e.col12 = csvMovelData[i].col17
            }
        })
    }

    csvMovelData.forEach(e => {
        if (e.col12 !== 'LINHA_SUSPENSA_STATUS') {
            if (e.col12 === '0') {
                e.col11 = 'Nao'
            } else {
                e.col11 = 'Sim'
            }
        }
    })

    csvMovelData.forEach(eA => {
        csvRecomendacaoData.forEach(eB => {
            if (eA.col3 === eB.col1) {
                eA.col9 = eB.col2
                eA.col10 = eB.col3
            }
        })
    })

    csvMovelData.forEach(e => {
        delete e.col16
        delete e.col17
    })

    csvMovelData.forEach(function (row) {
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

    loader.setAttribute('style', 'display: none')
    pProcessando.setAttribute('style', 'display: none')

    downloadLink.click();

    btnMovel.classList.toggle('hide')
    btnMovel.addEventListener('click', () => downloadLink.click())
}



// Ler arquivo Suspensão
function lerArquivoSuspensao(event) {
    const fileSuspensao = event.target.files[0];
    fileSuspensaoLabel.textContent = fileSuspensao.name

    loader.setAttribute('style', 'display: block')

    if (!fileSuspensao) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        const suspensaoData = parseCSVSuspensao(content);
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsText(fileSuspensao, 'ISO-8859-1');
};

// Processar arquivo Suspensao
function parseCSVSuspensao(content) {
    const lines = content.split('\n');

    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // let csvSuspensaoData = [];

    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        columns.splice(12, 6)
        columns.splice(10, 1)
        columns.splice(0, 9)

        if (columns[0] === '' || columns[0] === '\u0000' || columns[0] === ' ' || columns[0] === undefined) {
            columns[0] = '0'
        } else {
            columns[0] = columns[0].trim()
        }
        if (columns[1] === '' || columns[1] === '\u0000' || columns[1] === ' ' || columns[1] === undefined) {
            columns[1] = '0'
        } else {
            columns[1] = columns[1].trim()
        }

        csvSuspensaoData.push({
            col1: columns[0],
            col2: columns[1],
        })
    })

    return csvSuspensaoData
}





// Ler arquivo Recomendação
function lerArquivoCSV(event) {
    const fileRecomendacao = event.target.files[0];
    fileRecomendacaoLabel.textContent = fileRecomendacao.name

    loader.setAttribute('style', 'display: block')

    if (!fileRecomendacao) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        const recomendacaoData = parseCSVRecomendacao(content);
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsText(fileRecomendacao, 'ISO-8859-1');
};


// Processar arquivo Recomendação
function parseCSVRecomendacao(content) {
    const lines = content.split('\n');

    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // let csvRecomendacaoData = [];

    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        columns.splice(12, 8)
        columns.splice(6, 4)
        columns.splice(0, 5)

        if (columns[0] === '' || columns[0] === '\u0000' || columns[0] === ' ' || columns[0] === undefined) {
            columns[0] = '0'
        } else {
            columns[0] = columns[0].trim()
        }
        if (columns[1] === '' || columns[1] === '\u0000' || columns[1] === ' ' || columns[1] === undefined) {
            columns[1] = '0'
        } else {
            columns[1] = columns[1].trim()
        }
        if (columns[2] === '' || columns[2] === '\u0000' || columns[2] === ' ' || columns[2] === undefined) {
            columns[2] = '0'
        } else {
            columns[2] = columns[2].trim()
        }

        csvRecomendacaoData.push({
            col1: columns[0],
            col2: columns[1],
            col3: columns[2],
        })
    })

    return csvRecomendacaoData
}






const arquivo = document.getElementById('MovelFileInput')
const btnMovel = document.getElementById('btnMovel')
const fileName = document.getElementById('labelMovelFileInput')
const pProcessando = document.getElementById('pProcessando')


// Ler arquivo Movel
document.getElementById('MovelFileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    fileMovelLabel.textContent = file.name

    loader.setAttribute('style', 'display: block')

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSV(content);
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsText(file, 'ISO-8859-1');

    pProcessando.setAttribute('style', 'display: inline-block')
    fileName.textContent = file.name
});

// Processar arquivo Movel
function processCSV(content) {
    // Divida o conteúdo em linhas
    const lines = content.split('\n');

    let newCSVContent = '';

    // Remove a ultima linha em branco
    let lastLine = lines.length - 1
    if (lines[lastLine] == "") {
        lines.splice(lastLine, 1)
    }

    // Processar cada linha
    lines.forEach(function (line) {
        // Divida cada linha em colunas
        const columns = line.split(';');

        if (columns[12] == '' || columns[12] == '0' || columns[12] == 0 || columns[12] == undefined) {
            columns[12] = columns[11]
        }

        // 2. Excluir colunas
        columns.splice(21, 18)
        columns.splice(18, 1)
        columns.splice(14, 1)
        columns.splice(11, 1)
        columns.splice(6, 1)
        columns.splice(0, 4)

        if (columns[6].includes('M_RECOMENDACAO')) {
            columns[6] = columns[6].replace('M_RECOMENDACAO', 'M')
        }


        if (columns[0] == '' || columns[0] === undefined || columns[0] === "\u0000" || columns[0] === ' ') {
            columns[0] = '0'
        } else {
            columns[0] = columns[0].trim()
        }

        if (columns[1] == '' || columns[1] === undefined || columns[1] === "\u0000" || columns[1] === ' ') {
            columns[1] = '0'
        } else {
            columns[1] = columns[1].trim()
        }

        if (columns[2] == '' || columns[2] === undefined || columns[2] === "\u0000" || columns[2] === ' ') {
            columns[2] = '0'
        } else {
            columns[2] = columns[2].trim()
        }

        if (columns[3] == '' || columns[3] === undefined || columns[3] === "\u0000" || columns[3] === ' ') {
            columns[3] = '0'
        } else {
            columns[3] = columns[3].trim()
        }

        if (columns[4] == '' || columns[4] === undefined || columns[4] === "\u0000" || columns[4] === ' ') {
            columns[4] = '0'
        } else {
            columns[4] = columns[4].trim()
        }

        if (columns[5] == '' || columns[5] === undefined || columns[5] === "\u0000" || columns[5] === ' ') {
            columns[5] = '0'
        } else {
            columns[5] = columns[5].trim()
        }

        if (columns[6] == '' || columns[6] === undefined || columns[6] === "\u0000" || columns[6] === ' ') {
            columns[6] = '0'
        } else {
            columns[6] = columns[6].trim()
        }

        if (columns[7] == '' || columns[7] === undefined || columns[7] === "\u0000" || columns[7] === ' ') {
            columns[7] = '0'
        } else {
            columns[7] = columns[7].trim()
        }

        if (columns[8] == '' || columns[8] === undefined || columns[8] === "\u0000" || columns[8] === ' ') {
            columns[8] = '0'
        } else {
            columns[8] = columns[8].trim()
        }

        if (columns[9] == '' || columns[9] == undefined || columns[9] === "\u0000" || columns[9] === ' ') {
            columns[9] = '0'
        } else {
            columns[9] = columns[9].trim()
        }

        if (columns[10] == '' || columns[10] === undefined || columns[10] === "\u0000" || columns[10] === ' ') {
            columns[10] = '0'
        } else {
            columns[10] = columns[10].trim()
        }

        if (columns[11] == '' || columns[11] === undefined || columns[11] === "\u0000" || columns[11] === ' ' || columns[11] !== 'PLANO_CONTA') {
            columns[11] = '0'
        } else {
            columns[11] = columns[11].trim()
        }

        if (columns[12] == '' || columns[12] === undefined || columns[12] === "\u0000" || columns[12] === ' ' || columns[12] !== 'PLANO_LINHA') {
            columns[12] = '0'
        } else {
            columns[12] = columns[12].trim()
        }



        if (columns[6] == 'M') {
            console.log(columns[6])
        } else if (parseInt(columns[6]) >= 17) {
            columns[9] = 'Nao Fidelizado'
        } else if (parseInt(columns[6]) < 17) {
            columns[9] = 'Fidelizado'
        }

        csvMovelData.push({
            col1: columns[0],
            col2: columns[1],
            col3: columns[2],
            col4: columns[3],
            col5: columns[4],
            col6: columns[6],
            col7: columns[9],
            col8: columns[10],
            col9: columns[11],
            col10: columns[12],
            col11: '0',
            col12: '0',
            col13: columns[5],
            col14: columns[7],
            col15: columns[8],
        });

        csvMovelData[0].col11 = 'LINHA_SUSPENSA'
        csvMovelData[0].col12 = 'LINHA_SUSPENSA_STATUS'
    });
}