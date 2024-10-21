const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

const inputMovel = document.getElementById('fileMovelInput');
const inputFixa = document.getElementById('fileFixaInput');
const inputTxt = document.getElementById('fileTxtInput');
const inputTxtFixa = document.getElementById('fileTxtFixaInput');

const labelMovel = document.getElementById('labelMovelFileInput')
const labelFixa = document.getElementById('labelFixaFileInput')
const labelTxt = document.getElementById('labelTxtFileInput')
const labelTxtFixa = document.getElementById('labelTxtFixaFileInput')

let dataMovelExport = []
let dataFixaExport = []
let dataTrabalhadoExport = []

let filesMovelProcessed = 0
let filesFixaProcessed = 0

let combinedMovelData = []
let combinedFixaData = []

let dataIdMailingExport = []

let trabalhadosMovel = 0
let trabalhadosFixa = 0
let trabalhados11 = 0
let trabalhados12 = 0
let trabalhados13 = 0
let trabalhados14 = 0
let trabalhados15 = 0
let trabalhados16 = 0
let trabalhados17 = 0
let trabalhados18 = 0
let trabalhados19 = 0

let trabalhadosM = {}
let trabalhadosF = {}

let filesDataMovel = {}; // Objeto para armazenar os dados dos arquivos
let filesDataFixa = {}; // Objeto para armazenar os dados dos arquivos



document.getElementById('fileTxtInput').addEventListener('change', function (event) {
    const files = event.target.files; // Pega todos os arquivos selecionados

    // Itera sobre cada arquivo selecionado
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        // Quando o arquivo for carregado, processa o conteúdo
        reader.onload = function (e) {
            const fileContent = e.target.result;

            // Processa o conteúdo do arquivo em linhas e colunas
            const parsedData = fileContent.split('\n').map(function (line) {
                return line.split('|');
            });

            // Identifica o arquivo pelos últimos 7 caracteres do nome (excluindo a extensão)
            const fileNameKey = file.name.slice(0, -4).slice(-7); // Remove .txt e pega os últimos 7 caracteres

            // Armazena os dados do arquivo processado no objeto com a chave do nome
            filesDataMovel[fileNameKey] = parsedData;

            // console.log(`Conteúdo do arquivo (${fileNameKey}):`, parsedData, separatedData);
        };

        console.log(filesDataMovel)

        // Lê o arquivo como texto
        reader.readAsText(file);
    });
});





document.getElementById('fileTxtFixaInput').addEventListener('change', function (event) {
    const files = event.target.files; // Pega todos os arquivos selecionados

    // Itera sobre cada arquivo selecionado
    Array.from(files).forEach(file => {
        const reader = new FileReader();

        // Quando o arquivo for carregado, processa o conteúdo
        reader.onload = function (e) {
            const fileContent = e.target.result;

            // Processa o conteúdo do arquivo em linhas e colunas
            const parsedData = fileContent.split('\n').map(function (line) {
                return line.split(';');
            });

            // Identifica o arquivo pelos últimos 7 caracteres do nome (excluindo a extensão)
            const fileNameKey = file.name.slice(0, 7);

            // Armazena os dados do arquivo processado no objeto com a chave do nome
            filesDataFixa[fileNameKey] = parsedData;

            // console.log(`Conteúdo do arquivo (${fileNameKey}):`, parsedData, separatedData);
        };

        console.log(filesDataFixa)

        // Lê o arquivo como texto
        reader.readAsText(file);
    });
});


















inputMovel.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelMovel.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelMovel.textContent = `${event.target.files.length} arquivo`
    }
})

inputFixa.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelFixa.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelFixa.textContent = `${event.target.files.length} arquivo`
    }
})

inputTxt.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelTxt.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelTxt.textContent = `${event.target.files.length} arquivo`
    }
})

inputTxtFixa.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelTxtFixa.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelTxtFixa.textContent = `${event.target.files.length} arquivo`
    }
})



document.getElementById('processBtn').addEventListener('click', function () {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const filesMovel = inputMovel.files;
    const filesFixa = inputFixa.files;


    if (filesMovel.length === 0 || filesFixa.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo CSV.');
        return;
    }


    Array.from(filesMovel).forEach(file => {
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
            combinedMovelData = combinedMovelData.concat(csvData);
            filesMovelProcessed++;

            // Se todos os arquivos foram processados, faça a manipulação dos dados
            if (filesMovelProcessed === filesMovel.length) {
                Array.from(filesFixa).forEach(file => {
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
                        combinedFixaData = combinedFixaData.concat(csvData);
                        filesFixaProcessed++;

                        // Se todos os arquivos foram processados, faça a manipulação dos dados
                        if (filesFixaProcessed === filesFixa.length) {
                            manipulateMovelData(combinedMovelData);
                        }
                    };

                    reader.readAsArrayBuffer(file);
                });
            }
        };

        reader.readAsArrayBuffer(file);
    });
});


function manipulateMovelData(data) {
    console.log(data)

    // let dividedArrays = divideArrayByIndex(data, 16);
    // console.log(dividedArrays)

    data.forEach(e => {
        let telefone = ''
        let id = ''
        let found = false;

        if (e[8] == 'AlÃ´') {
            telefone = `${e[5]}${e[6]}`

            for (let key in filesDataMovel) {
                // Encontra o índice do array interno que contém o item
                const index = filesDataMovel[key].findIndex(innerArray => innerArray.includes(telefone));

                if (index !== -1) { // Se o índice for encontrado
                    // console.log(`Item ${telefone} found in ${key}, removing array ${JSON.stringify(filesDataMovel[key][index])}`);
                    filesDataMovel[key].splice(index, 1); // Remove o array do objeto
                    id = key
                    if (!trabalhadosM[key]) {
                        trabalhadosM[key] = []
                    }
                    trabalhadosM[key].push(telefone)
                    found = true;
                    break; // Sai do loop ao encontrar o item
                }
            }
        }
    })

    console.log(filesDataMovel)
    console.log(trabalhadosM)

    // let arrayTrabalhadosMovel = Object.keys(trabalhadosM).map(key => trabalhadosM[key])
    
    // arrayTrabalhadosMovel.forEach(eT => {
    //     console.log(eT)
    //     if (String(eT).slice(0, 2) == 11) {
    //         trabalhados11++
    //     } else if (String(eT).slice(0, 2) == 12) {
    //         trabalhados12++
    //     } else if (String(eT).slice(0, 2) == 13) {
    //         trabalhados13++
    //     } else if (String(eT).slice(0, 2) == 14) {
    //         trabalhados14++
    //     } else if (String(eT).slice(0, 2) == 15) {
    //         trabalhados15++
    //     } else if (String(eT).slice(0, 2) == 16) {
    //         trabalhados16++
    //     } else if (String(eT).slice(0, 2) == 17) {
    //         trabalhados17++
    //     } else if (String(eT).slice(0, 2) == 18) {
    //         trabalhados18++
    //     } else if (String(eT).slice(0, 2) == 19) {
    //         trabalhados19++
    //     }
    // })

    // dataMovelExport.push({
    //     _11: trabalhados11,
    //     _12: trabalhados12,
    //     _13: trabalhados13,
    //     _14: trabalhados14,
    //     _15: trabalhados15,
    //     _16: trabalhados16,
    //     _17: trabalhados17,
    //     _18: trabalhados18,
    //     _19: trabalhados19,
    // })

    let arrayMovel = Object.keys(filesDataMovel).map(key => filesDataMovel[key])
    arrayMovel.forEach(e => {
        let fileName = ''
        let indexName = e.findIndex(element => element[element.length - 1] != 'ID_PLAY\r' && element[element.length - 1] != element.length - 1)
        if (indexName != -1) {
            fileName = String(e[indexName][e[indexName].length - 1]).slice(0, 7)

            let array = transformarEmArray(trabalhadosM, fileName)
            // console.log(array)
            array.forEach(eA => {
                if (String(eA).slice(0, 2) == 11) {
                    trabalhados11++
                } else if (String(eA).slice(0, 2) == 12) {
                    trabalhados12++
                } else if (String(eA).slice(0, 2) == 13) {
                    trabalhados13++
                } else if (String(eA).slice(0, 2) == 14) {
                    trabalhados14++
                } else if (String(eA).slice(0, 2) == 15) {
                    trabalhados15++
                } else if (String(eA).slice(0, 2) == 16) {
                    trabalhados16++
                } else if (String(eA).slice(0, 2) == 17) {
                    trabalhados17++
                } else if (String(eA).slice(0, 2) == 18) {
                    trabalhados18++
                } else if (String(eA).slice(0, 2) == 19) {
                    trabalhados19++
                }
            })

            dataMovelExport.push({
                iD: fileName,
                _11: trabalhados11,
                _12: trabalhados12,
                _13: trabalhados13,
                _14: trabalhados14,
                _15: trabalhados15,
                _16: trabalhados16,
                _17: trabalhados17,
                _18: trabalhados18,
                _19: trabalhados19,
            })
        }

        exportToCSV(e, dataMovelExport, `Movel_${fileName}.xlsx`)

        dataMovelExport = []
        trabalhados11 = 0
        trabalhados12 = 0
        trabalhados13 = 0
        trabalhados14 = 0
        trabalhados15 = 0
        trabalhados16 = 0
        trabalhados17 = 0
        trabalhados18 = 0
        trabalhados19 = 0
    })


    pProcess.setAttribute('style', 'display: none')
    loader.setAttribute('style', 'display: none')

    manipulateFixaData(combinedFixaData)
}

function transformarEmArray(objeto, key) {
    // Verifica se a chave existe no objeto
    if (objeto[key]) {
        // Retorna o array correspondente à chave
        return objeto[key];
    } else {
        // Caso a chave não exista, retorna um array vazio ou outro valor
        return [];
    }
}



function manipulateFixaData(data) {
    console.log(data)

    // let dividedArrays = divideArrayByIndex(data, 16);

    data.forEach(e => {
        let telefone = ''
        let id = ''
        let found = false;

        if (e[8] == 'AlÃ´') {
            telefone = `${e[5]}${e[6]}`

            for (let key in filesDataFixa) {
                // Encontra o índice do array interno que contém o item
                const index = filesDataFixa[key].findIndex(innerArray => innerArray.includes(telefone));

                if (index !== -1) { // Se o índice for encontrado
                    // console.log(`Item ${telefone} found in ${key}, removing array ${JSON.stringify(filesDataFixa[key][index])}`);
                    filesDataFixa[key].splice(index, 1); // Remove o array do objeto
                    id = key
                    if (!trabalhadosF[key]) {
                        trabalhadosF[key] = []
                    }
                    trabalhadosF[key].push(telefone)
                    found = true;
                    break; // Sai do loop ao encontrar o item
                }
            }
        }
    })

    console.log(filesDataFixa)
    console.log(trabalhadosF)

    let arrayFixa = Object.keys(filesDataFixa).map(key => filesDataFixa[key])
    arrayFixa.forEach(e => {
        let fileName = ''
        let indexName = e.findIndex(element => element[0] != 'ID_PLAY' && element[0] != 0)

        if (indexName != -1) {
            fileName = `${e[indexName][0]}`

            let array = transformarEmArray(trabalhadosF, fileName)
            // console.log(array)
            array.forEach(eA => {
                if (String(eA).slice(0, 2) == 11) {
                    trabalhados11++
                } else if (String(eA).slice(0, 2) == 12) {
                    trabalhados12++
                } else if (String(eA).slice(0, 2) == 13) {
                    trabalhados13++
                } else if (String(eA).slice(0, 2) == 14) {
                    trabalhados14++
                } else if (String(eA).slice(0, 2) == 15) {
                    trabalhados15++
                } else if (String(eA).slice(0, 2) == 16) {
                    trabalhados16++
                } else if (String(eA).slice(0, 2) == 17) {
                    trabalhados17++
                } else if (String(eA).slice(0, 2) == 18) {
                    trabalhados18++
                } else if (String(eA).slice(0, 2) == 19) {
                    trabalhados19++
                }
            })
            
            dataFixaExport.push({
                iD: fileName,
                _11: trabalhados11,
                _12: trabalhados12,
                _13: trabalhados13,
                _14: trabalhados14,
                _15: trabalhados15,
                _16: trabalhados16,
                _17: trabalhados17,
                _18: trabalhados18,
                _19: trabalhados19,
            })
        }

        exportToCSV(e, dataFixaExport, `Fixa_${fileName}.xlsx`)

        dataFixaExport = []
        trabalhados11 = 0
        trabalhados12 = 0
        trabalhados13 = 0
        trabalhados14 = 0
        trabalhados15 = 0
        trabalhados16 = 0
        trabalhados17 = 0
        trabalhados18 = 0
        trabalhados19 = 0
    })


    pProcess.setAttribute('style', 'display: none')
    loader.setAttribute('style', 'display: none')

    // exportToCSV(filesDataMovel, filesDataFixa, 'dataTrabalhados.xlsx');
}



function divideArrayByIndex(arr, index) {
    return arr.reduce((acc, current) => {
        const key = current[index];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(current);
        return acc;
    }, {});
}



function exportToCSV(dataTrabalhados, trabalhados, filename) {
    // Cria uma nova worksheet a partir dos dados filtrados
    const worksheet1 = XLSX.utils.json_to_sheet(dataTrabalhados);
    const worksheet2 = XLSX.utils.json_to_sheet(trabalhados);

    // Cria um novo workbook e adiciona a worksheet a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Trabalhados');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'TrabalhadosNumero');

    // Exporta o workbook como um arquivo XLSX
    XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });
}