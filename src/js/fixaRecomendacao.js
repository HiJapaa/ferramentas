const loader = document.getElementById('loader')
const arquivo = document.getElementById('fileInput')
const btn = document.getElementById('btn')
const fileName = document.getElementById('labelFileInput')
const pProcessando = document.getElementById('pProcessando')
const fileLabel = document.getElementById('labelRecomendadoFileInput')

let recomendadoCSV = []

document.getElementById('recomendadoFileInput').addEventListener('change', function (event) {
    console.time('meu timer')
    const file = event.target.files[0];
    fileLabel.textContent = file.name

    loader.setAttribute('style', 'display: block')

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;
        // Processar o conteúdo do arquivo
        processCSVRecomendado(content);
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsText(file, 'ISO-8859-1');
});


function processCSVRecomendado(content) {
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

        columns.splice(8, 7)

        if (columns[2].includes('Adesão')) {
            columns[2] = columns[2].replace('Adesão', 'Adesao')
        } else if (columns[2].includes('Fidelização')) {
            columns[2] = columns[2].replace('Fidelização', 'Fidelizacao')
            columns[2] = columns[2].replace('Móvel', 'Movel')
            columns[2] = columns[2].replace('Metálico', 'Metalico')
        } else if (columns[2].includes('Móvel')) {
            columns[2] = columns[2].replace('Móvel', 'Movel')
            columns[2] = columns[2].replace('Migração', 'Migracao')
            columns[2] = columns[2].replace('Metálico', 'Metalico')
        } else if (columns[2].includes('Metálico')) {
            columns[2] = columns[2].replace('Metálico', 'Metalico')
        } else if (columns[2].includes('Migração')) {
            columns[2] = columns[2].replace('Migração', 'Migracao')
        }

        if (columns[3].includes('Totalização')) {
            columns[3] = columns[3].replace('Totalização', 'Totalizacao')
        }

        if (columns[4].includes('Avançado')) {
            columns[4] = columns[4].replace('Avançado', 'Avancado')
        }

        recomendadoCSV.push({
            col1: columns[0],
            col2: columns[1],
            col3: columns[2],
            col4: columns[3],
            col5: columns[4],
            col6: columns[5],
            col7: columns[6],
            col8: columns[7],
        });
    });

    recomendadoCSV.forEach(e => {
        // Colocar em uma coluna já existente e renomear o cabeçalho para TIPO_OFERTA
        if (e.col3.includes('DS_RECOMENDACAO')) {
            e.col8 = 'TIPO_OFERTA'
        } else if (e.col3.includes('Fidelizacao')) {
            e.col8 = 'Fidelizacao'
        } else if (e.col3.includes('Adesao')) {
            e.col8 = 'Adesao'
        } else if (e.col3.includes('Upgrade')) {
            e.col8 = 'Upgrade'
        } else if (e.col3.includes('Migracao')) {
            e.col8 = 'Migracao'
        }
    })

    recomendadoCSV.forEach(eA => {
        if (parseInt(eA.col7) > 0) {
            eA.col8 = 'Totalizacao'
        }
    })

    recomendadoCSV.forEach(e => {
        if (e.col4.includes('(2P)') && e.col5.includes('Ilimitado')) {
            e.col7 = 0
        }
    })

    let newCSVContent = '';

    recomendadoCSV.forEach(function (row) {
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

    downloadLink.click();

    btn.setAttribute('style', 'display: block; border: none; background-color: cadetblue; border-radius: 5px; color: aliceblue; cursor: pointer; padding: 5px 10px; margin-top: 15px')
    btn.addEventListener('click', () => downloadLink.click())
}