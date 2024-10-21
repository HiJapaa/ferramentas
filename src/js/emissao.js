const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

const inputInput = document.getElementById('fileInputInput');
const inputTabulacao = document.getElementById('fileTabulacaoInput');

const labelInput = document.getElementById('labelInputFileInput')
const labelTabulacao = document.getElementById('labelTabulacaoFileInput')

let dataInputExport = []


let filesInputProcessed = 0
let filesTabulacaoProcessed = 0


let combinedInputData = []
let combinedTabulacaoData = []



inputInput.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelInput.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelInput.textContent = `${event.target.files.length} arquivo`
    }
})

inputTabulacao.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelTabulacao.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelTabulacao.textContent = `${event.target.files.length} arquivo`
    }
})



document.getElementById('processBtn').addEventListener('click', function () {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const filesInput = inputInput.files;
    const filesTabulacao = inputTabulacao.files;

    if (filesInput.length === 0 || filesTabulacao.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo CSV.');
        return;
    }

    Array.from(filesInput).forEach(file => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assume que o CSV tem apenas uma folha (sheet)
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Converte o sheet para JSON
            const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Adiciona os dados ao array combinado
            combinedInputData = combinedInputData.concat(csvData);
            filesInputProcessed++;

            // Se todos os arquivos foram processados, faça a manipulação dos dados
            if (filesInputProcessed === filesInput.length) {
                Array.from(filesTabulacao).forEach(file => {
                    const reader = new FileReader();

                    reader.onload = function (event) {
                        const data = new Uint8Array(event.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });

                        // Assume que o CSV tem apenas uma folha (sheet)
                        const sheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[sheetName];

                        // Converte o sheet para JSON
                        const csvData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                        // Adiciona os dados ao array combinado
                        combinedTabulacaoData = combinedTabulacaoData.concat(csvData);
                        filesTabulacaoProcessed++;

                        // Se todos os arquivos foram processados, faça a manipulação dos dados
                        if (filesTabulacaoProcessed === filesTabulacao.length) {
                            manipulateTabulacaoData(combinedTabulacaoData)
                        }
                    };

                    reader.readAsArrayBuffer(file);
                });
            }
        };

        reader.readAsArrayBuffer(file);
    });
})




function manipulateTabulacaoData(data) {
    console.log(data)

    manipulateInputData(combinedInputData);
}



function manipulateInputData(data) {
    console.log(data)

    data.forEach(e => {
        let index = combinedTabulacaoData.findIndex(element => element[6] == String(e[6]).slice(2) && element[10] == 'VENDA')
        let id = ''

        if(index != -1) {
            id = combinedTabulacaoData[index][16]
        }

        let ddd = String(e[6]).slice(0, 2)
        let regiao = ''

        if(ddd == '11' || ddd == '12' || ddd == '13') {
            regiao = 'SP1'
        } else if(ddd == '14' || ddd == '15' || ddd == '16' || ddd == '17' || ddd == '18' || ddd == '19'){
            regiao = 'SPI'
        }

        dataInputExport.push({
            iD: id,
            Fila: e[28],
            Regiao: regiao,
            DDD: ddd,
            Telefone: e[6],
            Agente: e[37],
            Status: e[46]
        })
    })

    exportToCSV(dataInputExport, 'dataInput.xlsx');

    loader.setAttribute('style', 'display: none')
    pProcess.setAttribute('style', 'display: none')
}



function exportToCSV(dataInput, filename) {
    // Cria uma nova worksheet a partir dos dados filtrados
    const worksheet1 = XLSX.utils.json_to_sheet(dataInput);

    // Cria um novo workbook e adiciona a worksheet a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Input');

    // Exporta o workbook como um arquivo XLSX
    XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });
}