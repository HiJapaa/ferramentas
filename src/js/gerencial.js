const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

const inputMovel = document.getElementById('fileMovelInput');
const inputFixa = document.getElementById('fileFixaInput');
const inputMovelCall = document.getElementById('fileMovelCallInput');
const inputFixaCall = document.getElementById('fileFixaCallInput');
const inputTxt = document.getElementById('fileTxtInput');
const inputTxtFixa = document.getElementById('fileTxtFixaInput');

const labelMovel = document.getElementById('labelMovelFileInput')
const labelFixa = document.getElementById('labelFixaFileInput')
const labelMovelCall = document.getElementById('labelMovelCallFileInput')
const labelFixaCall = document.getElementById('labelFixaCallFileInput')
const labelTxt = document.getElementById('labelTxtFileInput')
const labelTxtFixa = document.getElementById('labelTxtFixaFileInput')

let dataMovelExport = []
let dataFixaExport = []
let dataCallExport = []
let dataIdMovelExport = []
let dataIdFixaExport = []
let dataIdResultadoExport = []
let dataTrabalhadoExport = []
let dataAtendidasExport = []
let dataAloExport = []
let dataAloUnicoExport = []
let dataAceiteExport = []
let dataCpcEsforcoExport = []
let dataCpcUnicoExport = []

let filesMovelProcessed = 0
let filesFixaProcessed = 0
let filesMovelCallProcessed = 0
let filesFixaCallProcessed = 0

let combinedMovelData = []
let combinedFixaData = []
let combinedMovelCallData = []
let combinedFixaCallData = []

let aceitesMovel = 0
let aceitesFixa = 0

let arrayDivididoMovel = []
let arrayDivididoFixa = []

let dataIdMailingExport = []






document.getElementById('fileTxtInput').addEventListener('change', function (event) {
    const files = event.target.files; // Pega todos os arquivos selecionados
    let filesData = {}; // Objeto para armazenar os dados dos arquivos

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

            const separatedData = {
                group11: [],  // Grupo 1: Exemplo para dados que começam com certos caracteres
                group12: [],  // Grupo 2: Outro grupo para diferentes valores iniciais
                group12: [],   // Grupo para quaisquer outros dados
                group13: [],
                group14: [],
                group15: [],
                group16: [],
                group17: [],
                group18: [],
                group19: []
            };

            parsedData.forEach(row => {
                const firstTwoChars = row[0].substring(0, 2); // Pega os 2 primeiros caracteres do índice 0

                // Verifica e agrupa os dados
                if (firstTwoChars === '11') {
                    separatedData.group11.push(row);
                } else if (firstTwoChars === '12') {
                    separatedData.group12.push(row);
                } else if (firstTwoChars === '13') {
                    separatedData.group13.push(row)
                } else if (firstTwoChars === '14') {
                    separatedData.group14.push(row)
                } else if (firstTwoChars === '15') {
                    separatedData.group15.push(row)
                } else if (firstTwoChars === '16') {
                    separatedData.group16.push(row)
                } else if (firstTwoChars === '17') {
                    separatedData.group17.push(row)
                } else if (firstTwoChars === '18') {
                    separatedData.group18.push(row)
                } else if (firstTwoChars === '19') {
                    separatedData.group19.push(row)
                }
            });

            // Armazena os dados do arquivo processado no objeto com a chave do nome
            filesData[fileNameKey] = parsedData;

            // console.log(`Conteúdo do arquivo (${fileNameKey}):`, parsedData, separatedData);

            dataIdMailingExport.push({
                iD: fileNameKey,
                _11: separatedData.group11.length,
                _12: separatedData.group12.length,
                _13: separatedData.group13.length,
                _14: separatedData.group14.length,
                _15: separatedData.group15.length,
                _16: separatedData.group16.length,
                _17: separatedData.group17.length,
                _18: separatedData.group18.length,
                _19: separatedData.group19.length
            })
        };

        // Lê o arquivo como texto
        reader.readAsText(file);
    });
});





document.getElementById('fileTxtFixaInput').addEventListener('change', function (event) {
    const files = event.target.files; // Pega todos os arquivos selecionados
    let filesData = {}; // Objeto para armazenar os dados dos arquivos

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

            const separatedData = {
                group11: [],  // Grupo 1: Exemplo para dados que começam com certos caracteres
                group12: [],  // Grupo 2: Outro grupo para diferentes valores iniciais
                group12: [],   // Grupo para quaisquer outros dados
                group13: [],
                group14: [],
                group15: [],
                group16: [],
                group17: [],
                group18: [],
                group19: []
            };

            parsedData.forEach(row => {
                const firstTwoChars = String(row[14]).substring(0, 2); // Pega os 2 primeiros caracteres do índice 0

                // Verifica e agrupa os dados
                if (firstTwoChars == '11') {
                    separatedData.group11.push(row);
                } else if (firstTwoChars == '12') {
                    separatedData.group12.push(row);
                } else if (firstTwoChars == '13') {
                    separatedData.group13.push(row)
                } else if (firstTwoChars == '14') {
                    separatedData.group14.push(row)
                } else if (firstTwoChars == '15') {
                    separatedData.group15.push(row)
                } else if (firstTwoChars == '16') {
                    separatedData.group16.push(row)
                } else if (firstTwoChars == '17') {
                    separatedData.group17.push(row)
                } else if (firstTwoChars == '18') {
                    separatedData.group18.push(row)
                } else if (firstTwoChars == '19') {
                    separatedData.group19.push(row)
                }
            });

            // Armazena os dados do arquivo processado no objeto com a chave do nome
            filesData[fileNameKey] = parsedData;

            // console.log(`Conteúdo do arquivo (${fileNameKey}):`, parsedData, separatedData);

            dataIdMailingExport.push({
                iD: fileNameKey,
                _11: separatedData.group11.length,
                _12: separatedData.group12.length,
                _13: separatedData.group13.length,
                _14: separatedData.group14.length,
                _15: separatedData.group15.length,
                _16: separatedData.group16.length,
                _17: separatedData.group17.length,
                _18: separatedData.group18.length,
                _19: separatedData.group19.length
            })
        };

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

inputMovelCall.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelMovelCall.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelMovelCall.textContent = `${event.target.files.length} arquivo`
    }
})

inputFixaCall.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelFixaCall.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelFixaCall.textContent = `${event.target.files.length} arquivo`
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


    const filesMovelCall = inputMovelCall.files;
    const filesFixaCall = inputFixaCall.files;


    if (filesMovel.length === 0 || filesFixa.length === 0 || filesMovelCall.length === 0 || filesFixaCall.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo CSV.');
        return;
    }



    Array.from(filesMovelCall).forEach(file => {
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
            combinedMovelCallData = combinedMovelCallData.concat(csvData);
            filesMovelCallProcessed++;

            // Se todos os arquivos foram processados, faça a manipulação dos dados
            if (filesMovelCallProcessed === filesMovelCall.length) {
                Array.from(filesFixaCall).forEach(file => {
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
                        combinedFixaCallData = combinedFixaCallData.concat(csvData);
                        filesFixaCallProcessed++;

                        // Se todos os arquivos foram processados, faça a manipulação dos dados
                        if (filesFixaCallProcessed === filesFixaCall.length) {
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
    // console.log(data)

    let dividedArrays = divideArrayByIndex(data, 16);
    // console.log(dividedArrays)


    Object.keys(dividedArrays).forEach(e => {
        let _11 = 0
        let _12 = 0
        let _13 = 0
        let _14 = 0
        let _15 = 0
        let _16 = 0
        let _17 = 0
        let _18 = 0
        let _19 = 0
        let nenhumDDD = 0

        let atendida11 = 0
        let atendida12 = 0
        let atendida13 = 0
        let atendida14 = 0
        let atendida15 = 0
        let atendida16 = 0
        let atendida17 = 0
        let atendida18 = 0
        let atendida19 = 0

        let aloEsforco11 = 0
        let aloEsforco12 = 0
        let aloEsforco13 = 0
        let aloEsforco14 = 0
        let aloEsforco15 = 0
        let aloEsforco16 = 0
        let aloEsforco17 = 0
        let aloEsforco18 = 0
        let aloEsforco19 = 0

        let aloUnico11 = []
        let aloUnico12 = []
        let aloUnico13 = []
        let aloUnico14 = []
        let aloUnico15 = []
        let aloUnico16 = []
        let aloUnico17 = []
        let aloUnico18 = []
        let aloUnico19 = []

        let aceite11 = 0
        let aceite12 = 0
        let aceite13 = 0
        let aceite14 = 0
        let aceite15 = 0
        let aceite16 = 0
        let aceite17 = 0
        let aceite18 = 0
        let aceite19 = 0

        let cpc11 = 0
        let cpc12 = 0
        let cpc13 = 0
        let cpc14 = 0
        let cpc15 = 0
        let cpc16 = 0
        let cpc17 = 0
        let cpc18 = 0
        let cpc19 = 0

        // console.log(dividedArrays[e])
        dividedArrays[e].forEach(eE => {
            // console.log(eE)
            if (eE[5] == 11) {
                _11++
                if (eE[8] == "AlÃ´") {
                    atendida11++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco11++
                        if (!aloUnico11.includes(eE[19])) {
                            aloUnico11.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc11++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite11++
                    }
                }
            } else if (eE[5] == 12) {
                _12++
                if (eE[8] == "AlÃ´") {
                    atendida12++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco12++
                        if (!aloUnico12.includes(eE[19])) {
                            aloUnico12.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc12++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite12++
                    }
                }
            } else if (eE[5] == 13) {
                _13++
                if (eE[8] == "AlÃ´") {
                    atendida13++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco13++
                        if (!aloUnico13.includes(eE[19])) {
                            aloUnico13.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc13++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite13++
                    }
                }
            } else if (eE[5] == 14) {
                _14++
                if (eE[8] == "AlÃ´") {
                    atendida14++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco14++
                        if (!aloUnico14.includes(eE[19])) {
                            aloUnico14.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc14++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite14++
                    }
                }
            } else if (eE[5] == 15) {
                _15++
                if (eE[8] == "AlÃ´") {
                    atendida15++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco15++
                        if (!aloUnico15.includes(eE[19])) {
                            aloUnico15.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc15++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite15++
                    }
                }
            } else if (eE[5] == 16) {
                _16++
                if (eE[8] == "AlÃ´") {
                    atendida16++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco16++
                        if (!aloUnico16.includes(eE[19])) {
                            aloUnico16.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc16++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite16++
                    }
                }
            } else if (eE[5] == 17) {
                _17++
                if (eE[8] == "AlÃ´") {
                    atendida17++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco17++
                        if (!aloUnico17.includes(eE[19])) {
                            aloUnico17.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc17++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite17++
                    }
                }
            } else if (eE[5] == 18) {
                _18++
                if (eE[8] == "AlÃ´") {
                    atendida18++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco18++
                        if (!aloUnico18.includes(eE[19])) {
                            aloUnico18.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc18++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite18++
                    }
                }
            } else if (eE[5] == 19) {
                _19++
                if (eE[8] == "AlÃ´") {
                    atendida19++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco19++
                        if (!aloUnico19.includes(eE[19])) {
                            aloUnico19.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc19++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite19++
                    }
                }
            } else {
                nenhumDDD++
            }
        })
        dataIdResultadoExport.push({
            iD: e,
            quantidade: dividedArrays[e].length,
            _11: _11,
            _12: _12,
            _13: _13,
            _14: _14,
            _15: _15,
            _16: _16,
            _17: _17,
            _18: _18,
            _19: _19,
            nenhumDDD: nenhumDDD
        })
        dataAloExport.push({
            iD: e,
            aloEsforco11: aloEsforco11,
            aloEsforco12: aloEsforco12,
            aloEsforco13: aloEsforco13,
            aloEsforco14: aloEsforco14,
            aloEsforco15: aloEsforco15,
            aloEsforco16: aloEsforco16,
            aloEsforco17: aloEsforco17,
            aloEsforco18: aloEsforco18,
            aloEsforco19: aloEsforco19
        })
        dataAtendidasExport.push({
            iD: e,
            atendida11: atendida11,
            atendida12: atendida12,
            atendida13: atendida13,
            atendida14: atendida14,
            atendida15: atendida15,
            atendida16: atendida16,
            atendida17: atendida17,
            atendida18: atendida18,
            atendida19: atendida19,
        })
        dataAloUnicoExport.push({
            iD: e,
            aloUnico11: aloUnico11.length,
            aloUnico12: aloUnico12.length,
            aloUnico13: aloUnico13.length,
            aloUnico14: aloUnico14.length,
            aloUnico15: aloUnico15.length,
            aloUnico16: aloUnico16.length,
            aloUnico17: aloUnico17.length,
            aloUnico18: aloUnico18.length,
            aloUnico19: aloUnico19.length
        })
        dataAceiteExport.push({
            iD: e,
            aceite11: aceite11,
            aceite12: aceite12,
            aceite13: aceite13,
            aceite14: aceite14,
            aceite15: aceite15,
            aceite16: aceite16,
            aceite17: aceite17,
            aceite18: aceite18,
            aceite19: aceite19
        })
        dataCpcEsforcoExport.push({
            iD: e,
            cpcEsforco11: cpc11,
            cpcEsforco12: cpc12,
            cpcEsforco13: cpc13,
            cpcEsforco14: cpc14,
            cpcEsforco15: cpc15,
            cpcEsforco16: cpc16,
            cpcEsforco17: cpc17,
            cpcEsforco18: cpc18,
            cpcEsforco19: cpc19,
        })
    })


    arrayDivididoMovel = Object.keys(dividedArrays).map(chave => dividedArrays[chave])

    // console.log(arrayDivididoMovel)
    arrayDivididoMovel.forEach(e => {
        let arrayDividido = divideArrayByIndex(e, 5)
        Object.keys(arrayDividido).map(chave => arrayDividido[chave]).forEach(e => {
            // Usando Set para armazenar valores únicos no índice 22
            let uniqueData = [];
            let seen = new Set();

            uniqueData = e.filter((item) => {
                let valueAtIndex22 = item[22]; // Pegando o valor no índice 22
                if (!seen.has(valueAtIndex22)) {
                    seen.add(valueAtIndex22); // Adiciona o valor ao Set se ainda não foi visto
                    return true; // Mantém o item no array filtrado
                }
                return false; // Remove o item duplicado
            });

            let cpcUnico = 0


            console.log(uniqueData)
            uniqueData.forEach((eB, index) => {
                if (eB[10] != 'TELEFONE NAO PERTENCE AO CONTATO' && eB[10] != undefined) {
                    cpcUnico++
                    // if (eB[5] == 11) {
                    //     cpcUnico11++
                    // } else if (eB[5] == 12) {
                    //     cpcUnico12++
                    // } else if (eB[5] == 13) {
                    //     cpcUnico13++
                    // } else if (eB[5] == 14) {
                    //     cpcUnico14++
                    // } else if (eB[5] == 15) {
                    //     cpcUnico15++
                    // } else if (eB[5] == 16) {
                    //     cpcUnico16++
                    // } else if (eB[5] == 17) {
                    //     cpcUnico17++
                    // } else if (eB[5] == 18) {
                    //     cpcUnico18++
                    // } else if (eB[5] == 19) {
                    //     cpcUnico19++
                    // }
                }
                if (index + 1 == uniqueData.length) {
                    dataTrabalhadoExport.push({
                        idPlay: eB[16],
                        ddd: eB[5],
                        target: `${eB[16]}${eB[5]}`,
                        quantidade: uniqueData.length
                    })
                    dataCpcUnicoExport.push({
                        idPlay: eB[16],
                        target: `${eB[16]}${eB[5]}`,
                        cpc: cpcUnico
                        // _11: cpcUnico11,
                        // _12: cpcUnico12,
                        // _13: cpcUnico13,
                        // _14: cpcUnico14,
                        // _15: cpcUnico15,
                        // _16: cpcUnico16,
                        // _17: cpcUnico17,
                        // _18: cpcUnico18,
                        // _19: cpcUnico19,
                    })
                }
            })
        })




        // e.forEach(eB => {
        //     dataIdMovelExport.push({
        //         idPlay: eB[16],
        //         movimento: eB[1],
        //         ddd: eB[5],
        //         telefone: eB[6],
        //         isdnClass: eB[8],
        //         classificacao: eB[10],
        //         mailing: eB[2],
        //         codCliente: eB[19]
        //     })
        // })
    })


    const sp1 = data.filter(arr => [11, 12, 13].includes(arr[5]));
    const spi = data.filter(arr => [14, 15, 16, 17, 18, 19].includes(arr[5]));

    // SP1
    let naoAtendeSP1 = 0
    let ocupadoSP1 = 0
    let amdSP1 = 0
    let dropSP1 = 0
    let falhaDaOperadoraSP1 = 0

    let ligacaoInterrompidaSP1 = 0
    let linhaMudaSP1 = 0
    let mensagemOperadoraSP1 = 0
    let semCoberturaSP1 = 0
    let naoUtilizaraOProdutoSP1 = 0
    let insatisfeitoComAVivoSP1 = 0
    let semCondicoesFinanceirasSP1 = 0
    let possuiConcorrenciaSP1 = 0
    let portabilidadeEmProcessoSP1 = 0
    let telefoneNaoPertenceAoContatoSP1 = 0
    let aceitesVendeuSP1 = 0
    let agendamentoSP1 = 0
    let resistenteEmOuvirPropostaSP1 = 0
    let naoQuerCompromissoMensalSP1 = 0
    let utilizaPoucoCelularSP1 = 0
    let mensalidadeAltaSP1 = 0
    let naoTitularSP1 = 0
    let menorDe18AnosSP1 = 0
    let clienteAbordadoRecentementeSP1 = 0
    let clienteComMenosDe3MesesNaBaseSP1 = 0
    let clientePjSP1 = 0
    let falecimentoDoAssinanteSP1 = 0
    let possuiFidelidadeComConcorrenciaSP1 = 0
    let naoQuerReceberLigacoesDaVivoSP1 = 0
    let insegurancaComExcedenteNaFaturaSP1 = 0
    let restricaoDeCreditoInternaSP1 = 0
    let planosOfertadosNaoAtendemSP1 = 0
    let clienteSatisfeitoComOPlanoSP1 = 0
    let jaFoiControleSP1 = 0
    let clienteMigradoEmOutroCanalSP1 = 0
    let recebeuOfertaDaConcorrenciaSP1 = 0
    let naoQuerFazerMigracaoPorTelefoneSP1 = 0
    let naoDesejaPassarPorAnaliseDeCreditoSP1 = 0
    let querOfertaDeAparelhoSP1 = 0
    let naoQuerFazerAtivacaoPorTelefoneSP1 = 0
    let naoAceitouFazerARecargaSP1 = 0
    let jaFoiPosPagoSP1 = 0
    let temUmPosClaroSP1 = 0
    let temUmPosTimSP1 = 0
    let temUmPosOutrasSP1 = 0
    let jaPossuiPosVivoSP1 = 0
    let clienteJaMigradoSP1 = 0
    let restricaoDeCreditoExternaSP1 = 0
    let clienteNaoElegivelOfertaSP1 = 0
    let cpfInvalidoSP1 = 0
    let dadosDaContaSP1 = 0
    let erroAoEmitirOsSP1 = 0
    let erroDivergenciaDadosGeraisSP1 = 0
    let erroPidSP1 = 0
    let insercaoDeEnderecoSP1 = 0
    let semOfertaSP1 = 0


    // SPI
    let naoAtendeSPI = 0
    let ocupadoSPI = 0
    let amdSPI = 0
    let dropSPI = 0
    let falhaDaOperadoraSPI = 0

    let ligacaoInterrompidaSPI = 0
    let linhaMudaSPI = 0
    let mensagemOperadoraSPI = 0
    let semCoberturaSPI = 0
    let naoUtilizaraOProdutoSPI = 0
    let insatisfeitoComAVivoSPI = 0
    let semCondicoesFinanceirasSPI = 0
    let possuiConcorrenciaSPI = 0
    let portabilidadeEmProcessoSPI = 0
    let telefoneNaoPertenceAoContatoSPI = 0
    let aceitesVendeuSPI = 0
    let agendamentoSPI = 0
    let resistenteEmOuvirPropostaSPI = 0
    let naoQuerCompromissoMensalSPI = 0
    let utilizaPoucoCelularSPI = 0
    let mensalidadeAltaSPI = 0
    let naoTitularSPI = 0
    let menorDe18AnosSPI = 0
    let clienteAbordadoRecentementeSPI = 0
    let clienteComMenosDe3MesesNaBaseSPI = 0
    let clientePjSPI = 0
    let falecimentoDoAssinanteSPI = 0
    let possuiFidelidadeComConcorrenciaSPI = 0
    let naoQuerReceberLigacoesDaVivoSPI = 0
    let insegurancaComExcedenteNaFaturaSPI = 0
    let restricaoDeCreditoInternaSPI = 0
    let planosOfertadosNaoAtendemSPI = 0
    let clienteSatisfeitoComOPlanoSPI = 0
    let jaFoiControleSPI = 0
    let clienteMigradoEmOutroCanalSPI = 0
    let recebeuOfertaDaConcorrenciaSPI = 0
    let naoQuerFazerMigracaoPorTelefoneSPI = 0
    let naoDesejaPassarPorAnaliseDeCreditoSPI = 0
    let querOfertaDeAparelhoSPI = 0
    let naoQuerFazerAtivacaoPorTelefoneSPI = 0
    let naoAceitouFazerARecargaSPI = 0
    let jaFoiPosPagoSPI = 0
    let temUmPosClaroSPI = 0
    let temUmPosTimSPI = 0
    let temUmPosOutrasSPI = 0
    let jaPossuiPosVivoSPI = 0
    let clienteJaMigradoSPI = 0
    let restricaoDeCreditoExternaSPI = 0
    let clienteNaoElegivelOfertaSPI = 0
    let cpfInvalidoSPI = 0
    let dadosDaContaSPI = 0
    let erroAoEmitirOsSPI = 0
    let erroDivergenciaDadosGeraisSPI = 0
    let erroPidSPI = 0
    let insercaoDeEnderecoSPI = 0
    let semOfertaSPI = 0



    sp1.forEach(e => {
        if (String(e[8]).includes('TimeOut') || String(e[8]).includes('atende')) {
            naoAtendeSP1++
        } else if (String(e[8]).includes('Ocupado')) {
            ocupadoSP1++
        } else if (String(e[8]) == 'AMD') {
            amdSP1++
        } else if (String(e[8]).includes('Drop')) {
            dropSP1++
        } else if (String(e[8]) == 'Falha da operadora') {
            falhaDaOperadoraSP1++
        }

        if (String(e[10]).includes('LIGAÃ‡AO INTERROMPIDA') || String(e[10]).includes('LIGACAO INTERROMPIDA')) {
            ligacaoInterrompidaSP1++
        } else if (String(e[10]) == 'LINHA MUDA') {
            linhaMudaSP1++
        } else if (String(e[10]) == 'MENSAGEM OPERADORA') {
            mensagemOperadoraSP1++
        } else if (String(e[10]).includes('SEM COBERTURA DISPONIBILI')) {
            semCoberturaSP1++
        } else if (String(e[10]) == 'NÃƒO UTILIZARÃ O PRODUTO' || String(e[10]) == 'NAO UTILIZARA O PRODUTO') {
            naoUtilizaraOProdutoSP1++
        } else if (String(e[10]) == 'CLIENTE INSATISFEITO COM A VIVO') {
            insatisfeitoComAVivoSP1++
        } else if (String(e[10]) == 'ACHA CARO SEM CONDICOES FINANCEIRAS') {
            semCondicoesFinanceirasSP1++
        } else if (String(e[10]) == 'POSSUI CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONCORRENCIA') {
            possuiConcorrenciaSP1++
        } else if (String(e[10]) == 'PORTABILIDADE EM PROCESSO') {
            portabilidadeEmProcessoSP1++
        } else if (String(e[10]) == 'TELEFONE NAO PERTENCE AO CONTATO') {
            telefoneNaoPertenceAoContatoSP1++
        } else if (String(e[10]) == 'VENDA') {
            aceitesVendeuSP1++
            aceitesMovel++
        } else if (String(e[10]).includes('AGENDAMENTO')) {
            agendamentoSP1++
        } else if (String(e[10]) == 'RESISTENTE A OUVIR PROPOSTA') {
            resistenteEmOuvirPropostaSP1++
        } else if (String(e[10]) == 'NAO QUER COMPROMISSO MENSAL') {
            naoQuerCompromissoMensalSP1++
        } else if (String(e[10]) == 'UTILIZA POUCO O CELULAR') {
            utilizaPoucoCelularSP1++
        } else if (String(e[10]) == 'MENSALIDADE ALTA') {
            mensalidadeAltaSP1++
        } else if (String(e[10]) == 'NÃƒO Ã‰ O TITULAR' || String(e[10]) == 'NAO E O TITULAR') {
            naoTitularSP1++
        } else if (String(e[10]) == 'MENOR DE 18 ANOS') {
            menorDe18AnosSP1++
        } else if (String(e[10]) == 'CLIENTE ABORDADO RECENTEMENTE') {
            clienteAbordadoRecentementeSP1++
        } else if (String(e[10]) == 'CLIENTE COM MENOS DE 3 MESES NA BASE') {
            clienteComMenosDe3MesesNaBaseSP1++
        } else if (String(e[10]) == 'CLIENTE PJ') {
            clientePjSP1++
        } else if (String(e[10]) == 'FALECIMENTO DO ASSINANTE') {
            falecimentoDoAssinanteSP1++
        } else if (String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA') {
            possuiFidelidadeComConcorrenciaSP1++
        } else if (String(e[10]) == 'NAO QUER MAIS RECEBER LIGACOES DA VIVO') {
            naoQuerReceberLigacoesDaVivoSP1++
        } else if (String(e[10]) == 'INSEGURANCA COM EXCEDENTE DE FATURA') {
            insegurancaComExcedenteNaFaturaSP1++
        } else if (String(e[10]) == 'RESTRICAO INTERNA') {
            restricaoDeCreditoInternaSP1++
        } else if (String(e[10]) == ' OS PLANOS OFERTADOS NAO ATENDEM ' || String(e[10]) == 'OS PLANOS OFERTADOS NAO ATENDEM') {
            planosOfertadosNaoAtendemSP1++
        } else if (String(e[10]) == ' CLIENTE SATISFEITO COM O PLANO ' ||String(e[10]) == 'CLIENTE SATISFEITO COM O PLANO') {
            clienteSatisfeitoComOPlanoSP1++
        } else if (String(e[10]) == ' JA FOI CONTROLE E NAO QUER VOLTAR ' || String(e[10]) == 'JA FOI CONTROLE E NAO QUER VOLTAR') {
            jaFoiControleSP1++
        } else if (String(e[10]) == ' CLIENTE MIGRADO EM OUTRO CANAL ' || String(e[10]) == 'CLIENTE MIGRADO EM OUTRO CANAL') {
            clienteMigradoEmOutroCanalSP1++
        } else if (String(e[10]) == ' RECEBEU OFERTA DA CONCORRENCIA ' || String(e[10]) == 'RECEBEU OFERTA DA CONCORRENCIA') {
            recebeuOfertaDaConcorrenciaSP1++
        } else if (String(e[10]) == ' NAO QUER FAZER MIGRACAO POR TELEFONE ' || String(e[10]) == 'NAO QUER FAZER MIGRACAO POR TELEFONE') {
            naoQuerFazerMigracaoPorTelefoneSP1++
        } else if (String(e[10]) == ' NAO DESEJA PASSAR POR ANALISE DE CREDITO  ' || String(e[10]) == ' NÃƒO DESEJA PASSAR POR ANALISE DE CREDITO  ' || String(e[10]) == 'NAO DESEJA PASSAR POR ANALISE DE CREDITO') {
            naoDesejaPassarPorAnaliseDeCreditoSP1++
        } else if (String(e[10]) == ' QUER OFERTA DE APARELHO ' || String(e[10]) == 'QUER OFERTA DE APARELHO') {
            querOfertaDeAparelhoSP1++
        } else if (String(e[10]) == ' NAO QUER FAZER ATIVACAO POR TELEFONE ' || String(e[10]) == ' NÃƒO QUER FAZER ATIVAÃ‡ÃƒO POR TELEFONE ' || String(e[10]) == 'NAO QUER FAZER ATIVACAO POR TELEFONE') {
            naoQuerFazerAtivacaoPorTelefoneSP1++
        } else if (String(e[10]) == ' NAO ACEITOU FAZER A RECARGA ' || String(e[10]) == ' NÃƒO ACEITOU FAZER A RECARGA ' || String(e[10]) == 'NAO ACEITOU FAZER A RECARGA') {
            naoAceitouFazerARecargaSP1++
        } else if (String(e[10]) == ' JA FOI POS PAGO E NAO QUER VOLTAR ' || String(e[10]) == 'JA FOI POS PAGO E NAO QUER VOLTAR') {
            jaFoiPosPagoSP1++
        } else if (String(e[10]) == ' TEM UM POS PAGO CLARO E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGOÂ  CLARO E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO CLARO E NAO DESEJA PORTAR') {
            temUmPosClaroSP1++
        } else if (String(e[10]) == ' TEM UM POS PAGO TIM E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGO TIM E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO TIM E NAO DESEJA PORTAR') {
            temUmPosTimSP1++
        } else if (String(e[10]) == ' TEM UM POS PAGO OUTRAS OPERADORA E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGO OUTRAS OPERADORA E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO OUTRAS OPERADORAS E NAO DESEJA PORTAR') {
            temUmPosOutrasSP1++
        } else if (String(e[10]) == ' JA POSSUI LINHA POS PAGO DA VIVO ' || String(e[10]) == 'JA POSSUI LINHA POS PAGO DA VIVO') {
            jaPossuiPosVivoSP1++
        } else if (String(e[10]) == ' CLIENTE JA MIGRADO ' || String(e[10]) == ' CLIENTE JÃ MIGRADO ' || String(e[10]) == 'CLIENTE JA MIGRADO') {
            clienteJaMigradoSP1++
        } else if (String(e[10]) == ' RESTRICAO DE CREDITO (EXTERNA) ' || String(e[10]) == ' RESTRIÃ‡ÃƒO DE CRÃ‰DITO (EXTERNA) ' || String(e[10]) == 'RESTRICAO EXTERNA') {
            restricaoDeCreditoExternaSP1++
        } else if (String(e[10]) == ' CLIENTE NAO ELEGIVEL A OFERTA ' || String(e[10]) == ' CLIENTE NÃƒO ELEGÃVEL A OFERTA ' || String(e[10]) == 'CLIENTE NAO ELEGIVEL A OFERTA') {
            clienteNaoElegivelOfertaSP1++
        } else if (String(e[10]) == 'CPF INVALIDO' || String(e[10]) == 'CPF INVÃLIDO' || String(e[10]) == 'CPF INVALIDO') {
            cpfInvalidoSP1++
        } else if (String(e[10]) == ' DADOS DA CONTA ' || String(e[10]) == 'DADOS DA CONTA') {
            dadosDaContaSP1++
        } else if (String(e[10]) == ' ERRO AO EMITIR A OS  ' || String(e[10]) == 'ERRO AO EMITIR A OS') {
            erroAoEmitirOsSP1++
        } else if (String(e[10]) == ' ERRO DIVERGENCIA DADOS GERAIS ' || String(e[10]) == 'ERRO DIVERGENCIA DADOS GERAIS') {
            erroDivergenciaDadosGeraisSP1++
        } else if (String(e[10]) == ' ERRO PID (DADOS DIVERGENTES EX. NOME DA MAE, DATA DE NASC) ' || String(e[10]) == ' ERRO PID (DADOS DIVERGENTES EX. NOME DA MÃƒE, DATA DE NASC) ' || String(e[10]) == 'ERRO PID') {
            erroPidSP1++
        } else if (String(e[10]) == ' INSERCAO DE ENDERECO ' || String(e[10]) == 'INSERCAO DE ENDERECO') {
            insercaoDeEnderecoSP1++
        } else if (String(e[10]) == ' SEM OFERTA ' || String(e[10]) == 'SEM OFERTA') {
            semOfertaSP1++
        }
    })

    spi.forEach(e => {
        if (String(e[8]).includes('TimeOut') || String(e[8]).includes('atende')) {
            naoAtendeSPI++
        } else if (String(e[8]).includes('Ocupado')) {
            ocupadoSPI++
        } else if (String(e[8]) == 'AMD') {
            amdSPI++
        } else if (String(e[8]).includes('Drop')) {
            dropSPI++
        } else if (String(e[8]) == 'Falha da operadora') {
            falhaDaOperadoraSPI++
        }

        if (String(e[10]).includes('LIGAÃ‡AO INTERROMPIDA') || String(e[10]).includes('LIGACAO INTERROMPIDA')) {
            ligacaoInterrompidaSPI++
        } else if (String(e[10]) == 'LINHA MUDA') {
            linhaMudaSPI++
        } else if (String(e[10]) == 'MENSAGEM OPERADORA') {
            mensagemOperadoraSPI++
        } else if (String(e[10]).includes('SEM COBERTURA DISPONIBILI')) {
            semCoberturaSPI++
        } else if (String(e[10]) == 'NÃƒO UTILIZARÃ O PRODUTO' || String(e[10]) == 'NAO UTILIZARA O PRODUTO') {
            naoUtilizaraOProdutoSPI++
        } else if (String(e[10]) == 'CLIENTE INSATISFEITO COM A VIVO') {
            insatisfeitoComAVivoSPI++
        } else if (String(e[10]) == 'ACHA CARO SEM CONDICOES FINANCEIRAS') {
            semCondicoesFinanceirasSPI++
        } else if (String(e[10]) == 'POSSUI CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONCORRENCIA') {
            possuiConcorrenciaSPI++
        } else if (String(e[10]) == 'PORTABILIDADE EM PROCESSO') {
            portabilidadeEmProcessoSPI++
        } else if (String(e[10]) == 'TELEFONE NAO PERTENCE AO CONTATO') {
            telefoneNaoPertenceAoContatoSPI++
        } else if (String(e[10]) == 'VENDA') {
            aceitesVendeuSPI++
            aceitesMovel++
        } else if (String(e[10]).includes('AGENDAMENTO')) {
            agendamentoSPI++
        } else if (String(e[10]) == 'RESISTENTE A OUVIR PROPOSTA') {
            resistenteEmOuvirPropostaSPI++
        } else if (String(e[10]) == 'NAO QUER COMPROMISSO MENSAL') {
            naoQuerCompromissoMensalSPI++
        } else if (String(e[10]) == 'UTILIZA POUCO O CELULAR') {
            utilizaPoucoCelularSPI++
        } else if (String(e[10]) == 'MENSALIDADE ALTA') {
            mensalidadeAltaSPI++
        } else if (String(e[10]) == 'NAO E O TITULAR' || String(e[10]) == 'NÃƒO Ã‰ O TITULAR') {
            naoTitularSPI++
        } else if (String(e[10]) == 'MENOR DE 18 ANOS') {
            menorDe18AnosSPI++
        } else if (String(e[10]) == 'CLIENTE ABORDADO RECENTEMENTE') {
            clienteAbordadoRecentementeSPI++
        } else if (String(e[10]) == 'CLIENTE COM MENOS DE 3 MESES NA BASE') {
            clienteComMenosDe3MesesNaBaseSPI++
        } else if (String(e[10]) == 'CLIENTE PJ') {
            clientePjSPI++
        } else if (String(e[10]) == 'FALECIMENTO DO ASSINANTE') {
            falecimentoDoAssinanteSPI++
        } else if (String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA') {
            possuiFidelidadeComConcorrenciaSPI++
        } else if (String(e[10]) == 'NAO QUER MAIS RECEBER LIGACOES DA VIVO') {
            naoQuerReceberLigacoesDaVivoSPI++
        } else if (String(e[10]) == 'INSEGURANCA COM EXCEDENTE DE FATURA') {
            insegurancaComExcedenteNaFaturaSPI++
        } else if (String(e[10]) == 'RESTRICAO INTERNA') {
            restricaoDeCreditoInternaSPI++
        } else if (String(e[10]) == ' OS PLANOS OFERTADOS NAO ATENDEM ' || String(e[10]) == 'OS PLANOS OFERTADOS NAO ATENDEM') {
            planosOfertadosNaoAtendemSPI++
        } else if (String(e[10]) == ' CLIENTE SATISFEITO COM O PLANO ' ||String(e[10]) == 'CLIENTE SATISFEITO COM O PLANO') {
            clienteSatisfeitoComOPlanoSPI++
        } else if (String(e[10]) == ' JA FOI CONTROLE E NAO QUER VOLTAR ' || String(e[10]) == 'JA FOI CONTROLE E NAO QUER VOLTAR') {
            jaFoiControleSPI++
        } else if (String(e[10]) == ' CLIENTE MIGRADO EM OUTRO CANAL ' || String(e[10]) == 'CLIENTE MIGRADO EM OUTRO CANAL') {
            clienteMigradoEmOutroCanalSPI++
        } else if (String(e[10]) == ' RECEBEU OFERTA DA CONCORRENCIA ' || String(e[10]) == 'RECEBEU OFERTA DA CONCORRENCIA') {
            recebeuOfertaDaConcorrenciaSPI++
        } else if (String(e[10]) == ' NAO QUER FAZER MIGRACAO POR TELEFONE ' || String(e[10]) == 'NAO QUER FAZER MIGRACAO POR TELEFONE') {
            naoQuerFazerMigracaoPorTelefoneSPI++
        } else if (String(e[10]) == ' NAO DESEJA PASSAR POR ANALISE DE CREDITO  ' || String(e[10]) == ' NÃƒO DESEJA PASSAR POR ANALISE DE CREDITO  ' || String(e[10]) == 'NAO DESEJA PASSAR POR ANALISE DE CREDITO') {
            naoDesejaPassarPorAnaliseDeCreditoSPI++
        } else if (String(e[10]) == ' QUER OFERTA DE APARELHO ' || String(e[10]) == 'QUER OFERTA DE APARELHO') {
            querOfertaDeAparelhoSPI++
        } else if (String(e[10]) == ' NAO QUER FAZER ATIVACAO POR TELEFONE ' || String(e[10]) == ' NÃƒO QUER FAZER ATIVAÃ‡ÃƒO POR TELEFONE ' || String(e[10]) == 'NAO QUER FAZER ATIVACAO POR TELEFONE') {
            naoQuerFazerAtivacaoPorTelefoneSPI++
        } else if (String(e[10]) == ' NAO ACEITOU FAZER A RECARGA ' || String(e[10]) == ' NÃƒO ACEITOU FAZER A RECARGA ' || String(e[10]) == 'NAO ACEITOU FAZER A RECARGA') {
            naoAceitouFazerARecargaSPI++
        } else if (String(e[10]) == ' JA FOI POS PAGO E NAO QUER VOLTAR ' || String(e[10]) == 'JA FOI POS PAGO E NAO QUER VOLTAR') {
            jaFoiPosPagoSPI++
        } else if (String(e[10]) == ' TEM UM POS PAGO CLARO E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGOÂ  CLARO E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO CLARO E NAO DESEJA PORTAR') {
            temUmPosClaroSPI++
        } else if (String(e[10]) == ' TEM UM POS PAGO TIM E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGO TIM E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO TIM E NAO DESEJA PORTAR') {
            temUmPosTimSPI++
        } else if (String(e[10]) == ' TEM UM POS PAGO OUTRAS OPERADORA E NAO DESEJA PORTAR  ' || String(e[10]) == ' TEM UM PÃ“S PAGO OUTRAS OPERADORA E NÃƒO DESEJA PORTAR  ' || String(e[10]) == 'TEM UM POS PAGO OUTRAS OPERADORAS E NAO DESEJA PORTAR') {
            temUmPosOutrasSPI++
        } else if (String(e[10]) == ' JA POSSUI LINHA POS PAGO DA VIVO ' || String(e[10]) == 'JA POSSUI LINHA POS PAGO DA VIVO') {
            jaPossuiPosVivoSPI++
        } else if (String(e[10]) == ' CLIENTE JA MIGRADO ' || String(e[10]) == ' CLIENTE JÃ MIGRADO ' || String(e[10]) == 'CLIENTE JA MIGRADO') {
            clienteJaMigradoSPI++
        } else if (String(e[10]) == ' RESTRICAO DE CREDITO (EXTERNA) ' || String(e[10]) == ' RESTRIÃ‡ÃƒO DE CRÃ‰DITO (EXTERNA) ' || String(e[10]) == 'RESTRICAO EXTERNA') {
            restricaoDeCreditoExternaSPI++
        } else if (String(e[10]) == ' CLIENTE NAO ELEGIVEL A OFERTA ' || String(e[10]) == ' CLIENTE NÃƒO ELEGÃVEL A OFERTA ' || String(e[10]) == 'CLIENTE NAO ELEGIVEL A OFERTA') {
            clienteNaoElegivelOfertaSPI++
        } else if (String(e[10]) == 'CPF INVÃLIDO' || String(e[10]) == 'CPF INVALIDO') {
            cpfInvalidoSPI++
        } else if (String(e[10]) == ' DADOS DA CONTA ' || String(e[10]) == 'DADOS DA CONTA') {
            dadosDaContaSPI++
        } else if (String(e[10]) == ' ERRO AO EMITIR A OS  ' || String(e[10]) == 'ERRO AO EMITIR A OS') {
            erroAoEmitirOsSPI++
        } else if (String(e[10]) == ' ERRO DIVERGENCIA DADOS GERAIS ' || String(e[10]) == 'ERRO DIVERGENCIA DADOS GERAIS') {
            erroDivergenciaDadosGeraisSPI++
        } else if (String(e[10]) == ' ERRO PID (DADOS DIVERGENTES EX. NOME DA MAE, DATA DE NASC) ' || String(e[10]) == ' ERRO PID (DADOS DIVERGENTES EX. NOME DA MÃƒE, DATA DE NASC) ' || String(e[10]) == 'ERRO PID') {
            erroPidSPI++
        } else if (String(e[10]) == ' INSERCAO DE ENDERECO ' || String(e[10]) == 'INSERCAO DE ENDERECO') {
            insercaoDeEnderecoSPI++
        } else if (String(e[10]) == ' SEM OFERTA ' || String(e[10]) == 'SEM OFERTA') {
            semOfertaSPI++
        }
    })

    dataMovelExport.push({
        ligacoesAbandonadas: dropSP1,
        _1: '',
        _2: '',
        _3: '',
        _4: '',
        secretariaEletronicaFax: amdSP1,
        mensagemOperadora: mensagemOperadoraSP1,
        congestionamentoNaRede: falhaDaOperadoraSP1,
        linhaMuda: linhaMudaSP1,
        naoAtende: naoAtendeSP1,
        ligacaoInterrompida: ligacaoInterrompidaSP1,
        ocupado: ocupadoSP1,
        telefoneNaoPertenceAoContato: telefoneNaoPertenceAoContatoSP1,
        _5: '',
        _6: '',
        agendamento: agendamentoSP1,
        _7: '',
        aceitesVendeu: aceitesVendeuSP1,
        _8: '',
        _9: '',
        resistenteEmOuvirProposta: resistenteEmOuvirPropostaSP1,
        naoQuerCompromissoMensal: naoQuerCompromissoMensalSP1,
        osPlanosOfertadosNaoAtendem: planosOfertadosNaoAtendemSP1,
        utilizaPoucoCelular: utilizaPoucoCelularSP1,
        semCondicoesFinanceiras: semCondicoesFinanceirasSP1,
        clienteSatisfeitoComOPlano: clienteSatisfeitoComOPlanoSP1,
        insatisfeitoComAVivo: insatisfeitoComAVivoSP1,
        jaFoiControleENaoQuerVoltar: jaFoiControleSP1,
        clienteMigradoEmOutroCanal: clienteMigradoEmOutroCanalSP1,
        recebeuOfertaDaConcorrencia: recebeuOfertaDaConcorrenciaSP1,
        naoQuerFazerMigracaoPorTelefone: naoQuerFazerMigracaoPorTelefoneSP1,
        mensalidadeCara: mensalidadeAltaSP1,
        naoDesejaPassarPorAnaliseDeCredito: naoDesejaPassarPorAnaliseDeCreditoSP1,
        possuiFidelidadeComConcorrencia: possuiFidelidadeComConcorrenciaSP1,
        querOfertaDeAparelho: querOfertaDeAparelhoSP1,
        possuiConcorrencia: possuiConcorrenciaSP1,
        portabilidadeEmProcesso: portabilidadeEmProcessoSP1,
        naoUtilizaraOProduto: naoUtilizaraOProdutoSP1,
        naoQuerReceberLigacoesDaVivo: naoQuerReceberLigacoesDaVivoSP1,
        naoQuerFazerAtivacaoPorTelefone: naoQuerFazerAtivacaoPorTelefoneSP1,
        naoAceitouFazerARecarga: naoAceitouFazerARecargaSP1,
        jaFoiPosPagoENaoQuerVoltar: jaFoiPosPagoSP1,
        temUmPosPagoClaroENaoDesejaPortar: temUmPosClaroSP1,
        temUmPosPagoTimENaoDesejaPortar: temUmPosTimSP1,
        temUmPosPagoOutrasOperadorasENaoDesejaPortar: temUmPosOutrasSP1,
        insegurancaComExcedenteNaFatura: insegurancaComExcedenteNaFaturaSP1,
        _26: '',
        _27: '',
        naoPossuiOsDadosDoTitular: naoTitularSP1,
        clienteMenorDeIdade: menorDe18AnosSP1,
        jaPossuiLinhaPosPagoDaVivo: jaPossuiPosVivoSP1,
        clienteAbordadoRecentemente: clienteAbordadoRecentementeSP1,
        clienteComMenosDe3MesesNaBase: clienteComMenosDe3MesesNaBaseSP1,
        clientePj: clientePjSP1,
        clienteJaMigrado: clienteJaMigradoSP1,
        semCobertura: semCoberturaSP1,
        falecimentoDoAssinante: falecimentoDoAssinanteSP1,
        restricaoDeCreditoExterna: restricaoDeCreditoExternaSP1,
        clienteNaoElegivelAOferta: clienteNaoElegivelOfertaSP1,
        cpfInvalido: cpfInvalidoSP1,
        dadosDaConta: dadosDaContaSP1,
        erroAoEmitirAOs: erroAoEmitirOsSP1,
        erroDivergenciaDadosGerais: erroDivergenciaDadosGeraisSP1,
        erroPid: erroPidSP1,
        insercaoDeEndereco: insercaoDeEnderecoSP1,
        restricaoDeCreditoInterna: restricaoDeCreditoInternaSP1,
        semOferta: semOfertaSP1
    })


    dataMovelExport.push({
        ligacoesAbandonadas: dropSPI,
        _1: '',
        _2: '',
        _3: '',
        _4: '',
        secretariaEletronicaFax: amdSPI,
        mensagemOperadora: mensagemOperadoraSPI,
        congestionamentoNaRede: falhaDaOperadoraSPI,
        linhaMuda: linhaMudaSPI,
        naoAtende: naoAtendeSPI,
        ligacaoInterrompida: ligacaoInterrompidaSPI,
        ocupado: ocupadoSPI,
        telefoneNaoPertenceAoContato: telefoneNaoPertenceAoContatoSPI,
        _5: '',
        _6: '',
        agendamento: agendamentoSPI,
        _7: '',
        aceitesVendeu: aceitesVendeuSPI,
        _8: '',
        _9: '',
        resistenteEmOuvirProposta: resistenteEmOuvirPropostaSPI,
        naoQuerCompromissoMensal: naoQuerCompromissoMensalSPI,
        osPlanosOfertadosNaoAtendem: planosOfertadosNaoAtendemSPI,
        utilizaPoucoCelular: utilizaPoucoCelularSPI,
        semCondicoesFinanceiras: semCondicoesFinanceirasSPI,
        clienteSatisfeitoComOPlano: clienteSatisfeitoComOPlanoSPI,
        insatisfeitoComAVivo: insatisfeitoComAVivoSPI,
        jaFoiControleENaoQuerVoltar: jaFoiControleSPI,
        clienteMigradoEmOutroCanal: clienteMigradoEmOutroCanalSPI,
        recebeuOfertaDaConcorrencia: recebeuOfertaDaConcorrenciaSPI,
        naoQuerFazerMigracaoPorTelefone: naoQuerFazerMigracaoPorTelefoneSPI,
        mensalidadeCara: mensalidadeAltaSPI,
        naoDesejaPassarPorAnaliseDeCredito: naoDesejaPassarPorAnaliseDeCreditoSPI,
        possuiFidelidadeComConcorrencia: possuiFidelidadeComConcorrenciaSPI,
        querOfertaDeAparelho: querOfertaDeAparelhoSPI,
        possuiConcorrencia: possuiConcorrenciaSPI,
        portabilidadeEmProcesso: portabilidadeEmProcessoSPI,
        naoUtilizaraOProduto: naoUtilizaraOProdutoSPI,
        naoQuerReceberLigacoesDaVivo: naoQuerReceberLigacoesDaVivoSPI,
        naoQuerFazerAtivacaoPorTelefone: naoQuerFazerAtivacaoPorTelefoneSPI,
        naoAceitouFazerARecarga: naoAceitouFazerARecargaSPI,
        jaFoiPosPagoENaoQuerVoltar: jaFoiPosPagoSPI,
        temUmPosPagoClaroENaoDesejaPortar: temUmPosClaroSPI,
        temUmPosPagoTimENaoDesejaPortar: temUmPosTimSPI,
        temUmPosPagoOutrasOperadorasENaoDesejaPortar: temUmPosOutrasSPI,
        insegurancaComExcedenteNaFatura: insegurancaComExcedenteNaFaturaSPI,
        _26: '',
        _27: '',
        naoPossuiOsDadosDoTitular: naoTitularSPI,
        clienteMenorDeIdade: menorDe18AnosSPI,
        jaPossuiLinhaPosPagoDaVivo: jaPossuiPosVivoSPI,
        clienteAbordadoRecentemente: clienteAbordadoRecentementeSPI,
        clienteComMenosDe3MesesNaBase: clienteComMenosDe3MesesNaBaseSPI,
        clientePj: clientePjSPI,
        clienteJaMigrado: clienteJaMigradoSPI,
        semCobertura: semCoberturaSPI,
        falecimentoDoAssinante: falecimentoDoAssinanteSPI,
        restricaoDeCreditoExterna: restricaoDeCreditoExternaSPI,
        clienteNaoElegivelAOferta: clienteNaoElegivelOfertaSPI,
        cpfInvalido: cpfInvalidoSPI,
        dadosDaConta: dadosDaContaSPI,
        erroAoEmitirAOs: erroAoEmitirOsSPI,
        erroDivergenciaDadosGerais: erroDivergenciaDadosGeraisSPI,
        erroPid: erroPidSPI,
        insercaoDeEndereco: insercaoDeEnderecoSPI,
        restricaoDeCreditoInterna: restricaoDeCreditoInternaSPI,
        semOferta: semOfertaSPI
    })

    pProcess.setAttribute('style', 'display: none')
    loader.setAttribute('style', 'display: none')

    // exportToCSV(dataExport, 'dataFixa.csv');
    manipulateFixaData(combinedFixaData)
}



function manipulateFixaData(data) {
    // console.log(data)

    let dividedArrays = divideArrayByIndex(data, 16);
    arrayDivididoFixa = Object.keys(dividedArrays).map(chave => dividedArrays[chave])

    Object.keys(dividedArrays).forEach(e => {
        let _11 = 0
        let _12 = 0
        let _13 = 0
        let _14 = 0
        let _15 = 0
        let _16 = 0
        let _17 = 0
        let _18 = 0
        let _19 = 0
        let nenhumDDD = 0

        let atendida11 = 0
        let atendida12 = 0
        let atendida13 = 0
        let atendida14 = 0
        let atendida15 = 0
        let atendida16 = 0
        let atendida17 = 0
        let atendida18 = 0
        let atendida19 = 0

        let aloEsforco11 = 0
        let aloEsforco12 = 0
        let aloEsforco13 = 0
        let aloEsforco14 = 0
        let aloEsforco15 = 0
        let aloEsforco16 = 0
        let aloEsforco17 = 0
        let aloEsforco18 = 0
        let aloEsforco19 = 0

        let aloUnico11 = []
        let aloUnico12 = []
        let aloUnico13 = []
        let aloUnico14 = []
        let aloUnico15 = []
        let aloUnico16 = []
        let aloUnico17 = []
        let aloUnico18 = []
        let aloUnico19 = []

        let aceite11 = 0
        let aceite12 = 0
        let aceite13 = 0
        let aceite14 = 0
        let aceite15 = 0
        let aceite16 = 0
        let aceite17 = 0
        let aceite18 = 0
        let aceite19 = 0

        let cpc11 = 0
        let cpc12 = 0
        let cpc13 = 0
        let cpc14 = 0
        let cpc15 = 0
        let cpc16 = 0
        let cpc17 = 0
        let cpc18 = 0
        let cpc19 = 0

        // console.log(dividedArrays[e])
        dividedArrays[e].forEach(eE => {
            // console.log(eE)
            if (eE[5] == 11) {
                _11++
                if (eE[8] == "AlÃ´") {
                    atendida11++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco11++
                        if (!aloUnico11.includes(eE[19])) {
                            aloUnico11.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc11++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite11++
                    }
                }
            } else if (eE[5] == 12) {
                _12++
                if (eE[8] == "AlÃ´") {
                    atendida12++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco12++
                        if (!aloUnico12.includes(eE[19])) {
                            aloUnico12.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc12++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite12++
                    }
                }
            } else if (eE[5] == 13) {
                _13++
                if (eE[8] == "AlÃ´") {
                    atendida13++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco13++
                        if (!aloUnico13.includes(eE[19])) {
                            aloUnico13.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc13++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite13++
                    }
                }
            } else if (eE[5] == 14) {
                _14++
                if (eE[8] == "AlÃ´") {
                    atendida14++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco14++
                        if (!aloUnico14.includes(eE[19])) {
                            aloUnico14.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc14++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite14++
                    }
                }
            } else if (eE[5] == 15) {
                _15++
                if (eE[8] == "AlÃ´") {
                    atendida15++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco15++
                        if (!aloUnico15.includes(eE[19])) {
                            aloUnico15.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc15++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite15++
                    }
                }
            } else if (eE[5] == 16) {
                _16++
                if (eE[8] == "AlÃ´") {
                    atendida16++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco16++
                        if (!aloUnico16.includes(eE[19])) {
                            aloUnico16.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc16++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite16++
                    }
                }
            } else if (eE[5] == 17) {
                _17++
                if (eE[8] == "AlÃ´") {
                    atendida17++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco17++
                        if (!aloUnico17.includes(eE[19])) {
                            aloUnico17.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc17++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite17++
                    }
                }
            } else if (eE[5] == 18) {
                _18++
                if (eE[8] == "AlÃ´") {
                    atendida18++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco18++
                        if (!aloUnico18.includes(eE[19])) {
                            aloUnico18.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc18++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite18++
                    }
                }
            } else if (eE[5] == 19) {
                _19++
                if (eE[8] == "AlÃ´") {
                    atendida19++
                    if (eE[10] != 'LINHA MUDA' && eE[10] != 'LIGAÃ‡AO INTERROMPIDA' && eE[10] != 'MENSAGEM OPERADORA' && eE[10] != 'TABULAÃ‡ÃƒO AUTOMÃTICA' && eE[10] != 'LIGAÃ‡ÃƒO INTERROMPIDA - SEM CLIENTE' && eE[10] != 'LOGOFF IMEDIATO' && eE[10] != 'REDISCAGEM' && eE[10] != 'OCUPADO') {
                        aloEsforco19++
                        if (!aloUnico19.includes(eE[19])) {
                            aloUnico19.push(eE[19])
                        }
                        if (eE[10] != 'TELEFONE NAO PERTENCE AO CONTATO') {
                            cpc19++
                        }
                    }
                    if (eE[10] == 'VENDA') {
                        aceite19++
                    }
                }
            } else {
                nenhumDDD++
            }
        })
        dataIdResultadoExport.push({
            iD: e,
            quantidade: dividedArrays[e].length,
            _11: _11,
            _12: _12,
            _13: _13,
            _14: _14,
            _15: _15,
            _16: _16,
            _17: _17,
            _18: _18,
            _19: _19,
            nenhumDDD: nenhumDDD
        })
        dataAloExport.push({
            iD: e,
            aloEsforco11: aloEsforco11,
            aloEsforco12: aloEsforco12,
            aloEsforco13: aloEsforco13,
            aloEsforco14: aloEsforco14,
            aloEsforco15: aloEsforco15,
            aloEsforco16: aloEsforco16,
            aloEsforco17: aloEsforco17,
            aloEsforco18: aloEsforco18,
            aloEsforco19: aloEsforco19
        })
        dataAtendidasExport.push({
            iD: e,
            atendida11: atendida11,
            atendida12: atendida12,
            atendida13: atendida13,
            atendida14: atendida14,
            atendida15: atendida15,
            atendida16: atendida16,
            atendida17: atendida17,
            atendida18: atendida18,
            atendida19: atendida19,
        })
        dataAloUnicoExport.push({
            iD: e,
            aloUnico11: aloUnico11.length,
            aloUnico12: aloUnico12.length,
            aloUnico13: aloUnico13.length,
            aloUnico14: aloUnico14.length,
            aloUnico15: aloUnico15.length,
            aloUnico16: aloUnico16.length,
            aloUnico17: aloUnico17.length,
            aloUnico18: aloUnico18.length,
            aloUnico19: aloUnico19.length
        })
        dataAceiteExport.push({
            iD: e,
            aceite11: aceite11,
            aceite12: aceite12,
            aceite13: aceite13,
            aceite14: aceite14,
            aceite15: aceite15,
            aceite16: aceite16,
            aceite17: aceite17,
            aceite18: aceite18,
            aceite19: aceite19
        })
        dataCpcEsforcoExport.push({
            iD: e,
            cpcEsforco11: cpc11,
            cpcEsforco12: cpc12,
            cpcEsforco13: cpc13,
            cpcEsforco14: cpc14,
            cpcEsforco15: cpc15,
            cpcEsforco16: cpc16,
            cpcEsforco17: cpc17,
            cpcEsforco18: cpc18,
            cpcEsforco19: cpc19,
        })
    })


    arrayDivididoFixa.forEach(e => {
        let arrayDividido = divideArrayByIndex(e, 5)
        Object.keys(arrayDividido).map(chave => arrayDividido[chave]).forEach(e => {
            // Usando Set para armazenar valores únicos no índice 22
            let uniqueData = [];
            let seen = new Set();

            uniqueData = e.filter((item) => {
                let valueAtIndex22 = item[22]; // Pegando o valor no índice 22
                if (!seen.has(valueAtIndex22)) {
                    seen.add(valueAtIndex22); // Adiciona o valor ao Set se ainda não foi visto
                    return true; // Mantém o item no array filtrado
                }
                return false; // Remove o item duplicado
            });

            let cpcUnico = 0


            // console.log(uniqueData)
            uniqueData.forEach((eB, index) => {
                if (eB[10] != 'TELEFONE NAO PERTENCE AO CONTATO' && eB[10] != undefined) {
                    cpcUnico++
                }
                if (index + 1 == uniqueData.length) {
                    dataTrabalhadoExport.push({
                        idPlay: eB[16],
                        ddd: eB[5],
                        target: `${eB[16]}${eB[5]}`,
                        quantidade: uniqueData.length
                    })
                    dataCpcUnicoExport.push({
                        idPlay: eB[16],
                        target: `${eB[16]}${eB[5]}`,
                        cpc: cpcUnico
                    })
                }
            })
        })
    })

    // arrayDivididoFixa.forEach(e => {
    //     e.forEach(eB => {
    //         dataIdFixaExport.push({
    //             idPlay: eB[16],
    //             movimento: eB[1],
    //             ddd: eB[5],
    //             telefone: eB[6],
    //             isdnClass: eB[8],
    //             classificacao: eB[10],
    //             mailing: eB[2],
    //             codCliente: eB[19]
    //         })
    //     })
    // })


    const sp1 = data.filter(arr => [11, 12, 13].includes(arr[5]));
    const spi = data.filter(arr => [14, 15, 16, 17, 18, 19].includes(arr[5]));

    // SP1
    let naoAtendeSP1 = 0
    let ocupadoSP1 = 0
    let amdSP1 = 0
    let dropSP1 = 0
    let falhaDaOperadoraSP1 = 0

    let ligacaoInterrompidaSP1 = 0
    let linhaMudaSP1 = 0
    let mensagemOperadoraSP1 = 0
    let semCoberturaSP1 = 0
    let naoUtilizaraOProdutoSP1 = 0
    let insatisfeitoComAVivoSP1 = 0
    let semCondicoesFinanceirasSP1 = 0
    let possuiConcorrenciaSP1 = 0
    let portabilidadeEmProcessoSP1 = 0
    let telefoneNaoPertenceAoContatoSP1 = 0
    let aceitesVendeuSP1 = 0
    let agendamentoSP1 = 0
    let resistenteEmOuvirPropostaSP1 = 0
    let naoQuerCompromissoMensalSP1 = 0
    let utilizaPoucoCelularSP1 = 0
    let mensalidadeAltaSP1 = 0
    let naoTitularSP1 = 0
    let menorDe18AnosSP1 = 0
    let clienteAbordadoRecentementeSP1 = 0
    let clienteComMenosDe3MesesNaBaseSP1 = 0
    let clientePjSP1 = 0
    let falecimentoDoAssinanteSP1 = 0
    let jaPosuiProdutoOsPendenteSP1 = 0
    let naoVeBeneficiosNaOfertaSP1 = 0
    let terminalInvalidoSP1 = 0
    let clienteFidelizadoNaConcorrenciaSP1 = 0
    let possuiContratoDeFidelidadeComAConcorrenciaSP1 = 0
    let recebeuOfertaDaConcorrenciaSP1 = 0
    let seRecusaAFalarSP1 = 0
    let clienteIlegivelACampanhaSP1 = 0
    let cpfInvalidoSP1 = 0
    let creditoNegadoSP1 = 0


    // SPI
    let naoAtendeSPI = 0
    let ocupadoSPI = 0
    let amdSPI = 0
    let dropSPI = 0
    let falhaDaOperadoraSPI = 0

    let ligacaoInterrompidaSPI = 0
    let linhaMudaSPI = 0
    let mensagemOperadoraSPI = 0
    let semCoberturaSPI = 0
    let naoUtilizaraOProdutoSPI = 0
    let insatisfeitoComAVivoSPI = 0
    let semCondicoesFinanceirasSPI = 0
    let possuiConcorrenciaSPI = 0
    let portabilidadeEmProcessoSPI = 0
    let telefoneNaoPertenceAoContatoSPI = 0
    let aceitesVendeuSPI = 0
    let agendamentoSPI = 0
    let resistenteEmOuvirPropostaSPI = 0
    let naoQuerCompromissoMensalSPI = 0
    let utilizaPoucoCelularSPI = 0
    let mensalidadeAltaSPI = 0
    let naoTitularSPI = 0
    let menorDe18AnosSPI = 0
    let clienteAbordadoRecentementeSPI = 0
    let clienteComMenosDe3MesesNaBaseSPI = 0
    let clientePjSPI = 0
    let falecimentoDoAssinanteSPI = 0
    let jaPosuiProdutoOsPendenteSPI = 0
    let naoVeBeneficiosNaOfertaSPI = 0
    let terminalInvalidoSPI = 0
    let clienteFidelizadoNaConcorrenciaSPI = 0
    let possuiContratoDeFidelidadeComAConcorrenciaSPI = 0
    let recebeuOfertaDaConcorrenciaSPI = 0
    let seRecusaAFalarSPI = 0
    let clienteIlegivelACampanhaSPI = 0
    let cpfInvalidoSPI = 0
    let creditoNegadoSPI = 0


    sp1.forEach(e => {
        if (String(e[8]).includes('TimeOut') || String(e[8]).includes('atende')) {
            naoAtendeSP1++
        } else if (String(e[8]).includes('Ocupado')) {
            ocupadoSP1++
        } else if (String(e[8]) == 'AMD') {
            amdSP1++
        } else if (String(e[8]).includes('Drop')) {
            dropSP1++
        } else if (String(e[8]) == 'Falha da operadora') {
            falhaDaOperadoraSP1++
        }

        if (String(e[10]).includes('INTERROMPIDA')) {
            ligacaoInterrompidaSP1++
        } else if (String(e[10]) == 'LINHA MUDA') {
            linhaMudaSP1++
        } else if (String(e[10]) == 'MENSAGEM OPERADORA') {
            mensagemOperadoraSP1++
        } else if (String(e[10]).includes('SEM COBERTURA DISPONIBILI')) {
            semCoberturaSP1++
        } else if (String(e[10]) == 'NÃƒO UTILIZARÃ O PRODUTO' || String(e[10]) == 'NAO UTILIZARA O PRODUTO') {
            naoUtilizaraOProdutoSP1++
        } else if (String(e[10]) == 'CLIENTE INSATISFEITO COM A VIVO') {
            insatisfeitoComAVivoSP1++
        } else if (String(e[10]) == 'ACHA CARO SEM CONDICOES FINANCEIRAS') {
            semCondicoesFinanceirasSP1++
        } else if (String(e[10]) == 'POSSUI CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONCORRENCIA') {
            possuiConcorrenciaSP1++
        } else if (String(e[10]) == 'PORTABILIDADE EM PROCESSO') {
            portabilidadeEmProcessoSP1++
        } else if (String(e[10]) == 'TELEFONE NAO PERTENCE AO CONTATO') {
            telefoneNaoPertenceAoContatoSP1++
        } else if (String(e[10]) == 'VENDA') {
            aceitesVendeuSP1++
            aceitesFixa++
        } else if (String(e[10]).includes('AGENDAMENTO')) {
            agendamentoSP1++
        } else if (String(e[10]) == 'RESISTENTE A OUVIR PROPOSTA') {
            resistenteEmOuvirPropostaSP1++
        } else if (String(e[10]) == 'NAO QUER COMPROMISSO MENSAL') {
            naoQuerCompromissoMensalSP1++
        } else if (String(e[10]) == 'UTILIZA POUCO O CELULAR') {
            utilizaPoucoCelularSP1++
        } else if (String(e[10]) == 'MENSALIDADE ALTA') {
            mensalidadeAltaSP1++
        } else if (String(e[10]) == 'NÃƒO Ã‰ O TITULAR' || String(e[10]) == 'NAO E O TITULAR') {
            naoTitularSP1++
        } else if (String(e[10]) == 'MENOR DE 18 ANOS') {
            menorDe18AnosSP1++
        } else if (String(e[10]) == 'CLIENTE ABORDADO RECENTEMENTE') {
            clienteAbordadoRecentementeSP1++
        } else if (String(e[10]) == 'CLIENTE COM MENOS DE 3 MESES NA BASE') {
            clienteComMenosDe3MesesNaBaseSP1++
        } else if (String(e[10]) == 'CLIENTE PJ') {
            clientePjSP1++
        } else if (String(e[10]) == 'FALECIMENTO DO ASSINANTE') {
            falecimentoDoAssinanteSP1++
        } else if (String(e[10]) == 'JA POSSUI PRODUTO TEM OS PENDENTE') {
            jaPosuiProdutoOsPendenteSP1++
        } else if (String(e[10]) == 'NAO VE BENEFICIOS NA OFERTA') {
            naoVeBeneficiosNaOfertaSP1++
        } else if (String(e[10]) == ' TERMINAL INVALIDO' || String(e[10]) == ' TERMINAL INVÃLIDO ' || String(e[10]) == 'TERMINAL INVALIDO') {
            terminalInvalidoSP1++
        } else if (String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRENCIA' || String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRÃŠNCIA' || String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRENCIA') {
            clienteFidelizadoNaConcorrenciaSP1++
        } else if (String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA') {
            possuiContratoDeFidelidadeComAConcorrenciaSP1++
        } else if (String(e[10]) == ' RECEBEU OFERTA DA CONCORRENCIA ' || String(e[10]) == 'RECEBEU OFERTA DA CONCORRENCIA') {
            recebeuOfertaDaConcorrenciaSP1++
        } else if (String(e[10]) == ' SE RECUSA A FALAR ' || String(e[10]) == 'SE RECUSA A FALAR') {
            seRecusaAFalarSP1++
        } else if (String(e[10]) == ' CLIENTE ILEGIVEL A CAMPANHA   ' || String(e[10]) == ' CLIENTE ILEGÃVEL A CAMPANHA   ' || String(e[10]) == 'CLIENTE ILEGIVEL A CAMPANHA') {
            clienteIlegivelACampanhaSP1++
        } else if (String(e[10]) == 'CPF INVÃLIDO' || String(e[10]) == 'CPF INVALIDO') {
            cpfInvalidoSP1++
        } else if (String(e[10]) == 'CRÃ‰DITO NEGADO' || String(e[10]) == 'CREDITO NEGADO') {
            creditoNegadoSP1++
        }
    })

    spi.forEach(e => {
        if (String(e[8]).includes('TimeOut') || String(e[8]).includes('atende')) {
            naoAtendeSPI++
        } else if (String(e[8]).includes('Ocupado')) {
            ocupadoSPI++
        } else if (String(e[8]) == 'AMD') {
            amdSPI++
        } else if (String(e[8]).includes('Drop')) {
            dropSPI++
        } else if (String(e[8]) == 'Falha da operadora') {
            falhaDaOperadoraSPI++
        }

        if (String(e[10]).includes('INTERROMPIDA')) {
            ligacaoInterrompidaSPI++
        } else if (String(e[10]) == 'LINHA MUDA') {
            linhaMudaSPI++
        } else if (String(e[10]) == 'MENSAGEM OPERADORA') {
            mensagemOperadoraSPI++
        } else if (String(e[10]).includes('SEM COBERTURA DISPONIBILI')) {
            semCoberturaSPI++
        } else if (String(e[10]) == 'NÃƒO UTILIZARÃ O PRODUTO' || String(e[10]) == 'NAO UTILIZARA O PRODUTO') {
            naoUtilizaraOProdutoSPI++
        } else if (String(e[10]) == 'CLIENTE INSATISFEITO COM A VIVO') {
            insatisfeitoComAVivoSPI++
        } else if (String(e[10]) == 'ACHA CARO SEM CONDICOES FINANCEIRAS') {
            semCondicoesFinanceirasSPI++
        } else if (String(e[10]) == 'POSSUI CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONCORRENCIA') {
            possuiConcorrenciaSPI++
        } else if (String(e[10]) == 'PORTABILIDADE EM PROCESSO') {
            portabilidadeEmProcessoSPI++
        } else if (String(e[10]) == 'TELEFONE NAO PERTENCE AO CONTATO') {
            telefoneNaoPertenceAoContatoSPI++
        } else if (String(e[10]) == 'VENDA') {
            aceitesVendeuSPI++
            aceitesFixa++
        } else if (String(e[10]).includes('AGENDAMENTO')) {
            agendamentoSPI++
        } else if (String(e[10]) == 'RESISTENTE A OUVIR PROPOSTA') {
            resistenteEmOuvirPropostaSPI++
        } else if (String(e[10]) == 'NAO QUER COMPROMISSO MENSAL') {
            naoQuerCompromissoMensalSPI++
        } else if (String(e[10]) == 'UTILIZA POUCO O CELULAR') {
            utilizaPoucoCelularSPI++
        } else if (String(e[10]) == 'MENSALIDADE ALTA') {
            mensalidadeAltaSPI++
        } else if (String(e[10]) == 'NÃƒO Ã‰ O TITULAR' || String(e[10]) == 'NAO E O TITULAR') {
            naoTitularSPI++
        } else if (String(e[10]) == 'MENOR DE 18 ANOS') {
            menorDe18AnosSPI++
        } else if (String(e[10]) == 'CLIENTE ABORDADO RECENTEMENTE') {
            clienteAbordadoRecentementeSPI++
        } else if (String(e[10]) == 'CLIENTE COM MENOS DE 3 MESES NA BASE') {
            clienteComMenosDe3MesesNaBaseSPI++
        } else if (String(e[10]) == 'CLIENTE PJ') {
            clientePjSPI++
        } else if (String(e[10]) == 'FALECIMENTO DO ASSINANTE') {
            falecimentoDoAssinanteSPI++
        } else if (String(e[10]) == 'JA POSSUI PRODUTO TEM OS PENDENTE') {
            jaPosuiProdutoOsPendenteSPI++
        } else if (String(e[10]) == 'NAO VE BENEFICIOS NA OFERTA') {
            naoVeBeneficiosNaOfertaSPI++
        } else if (String(e[10]) == ' TERMINAL INVALIDO' || String(e[10]) == ' TERMINAL INVÃLIDO ' || String(e[10]) == 'TERMINAL INVALIDO') {
            terminalInvalidoSPI++
        } else if (String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRENCIA' || String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRÃŠNCIA' || String(e[10]) == 'CLIENTE FIDELIZADO NA CONCORRENCIA') {
            clienteFidelizadoNaConcorrenciaSPI++
        } else if (String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRÃŠNCIA' || String(e[10]) == 'POSSUI CONTRATO DE FIDELIDADE COM A CONCORRENCIA') {
            possuiContratoDeFidelidadeComAConcorrenciaSPI++
        } else if (String(e[10]) == ' RECEBEU OFERTA DA CONCORRENCIA ' || String(e[10]) == 'RECEBEU OFERTA DA CONCORRENCIA') {
            recebeuOfertaDaConcorrenciaSPI++
        } else if (String(e[10]) == ' SE RECUSA A FALAR ' || String(e[10]) == 'SE RECUSA A FALAR') {
            seRecusaAFalarSPI++
        } else if (String(e[10]) == ' CLIENTE ILEGIVEL A CAMPANHA   ' || String(e[10]) == ' CLIENTE ILEGÃVEL A CAMPANHA   ' || String(e[10]) == 'CLIENTE ILEGIVEL A CAMPANHA') {
            clienteIlegivelACampanhaSPI++
        } else if (String(e[10]) == 'CPF INVÃLIDO' || String(e[10]) == 'CPF INVALIDO') {
            cpfInvalidoSPI++
        } else if (String(e[10]) == 'CRÃ‰DITO NEGADO' || String(e[10]) == 'CREDITO NEGADO') {
            creditoNegadoSPI++
        }
    })

    dataFixaExport.push({
        ligacoesAbandonadas: dropSP1,
        _1: '',
        _2: '',
        _3: '',
        _4: '',
        congestionamentoNaRede: falhaDaOperadoraSP1,
        ligacaoInterrompida: ligacaoInterrompidaSP1,
        linhaMuda: linhaMudaSP1,
        _5: '',
        mensagemOperadora: mensagemOperadoraSP1,
        naoAtende: naoAtendeSP1,
        ocupado: ocupadoSP1,
        secretariaEletronicaFax: amdSP1,
        terminalInvalido: terminalInvalidoSP1,
        _7: '',
        _8: '',
        agendamento: agendamentoSP1,
        _9: '',
        aceitesVendeu: aceitesVendeuSP1,
        _10: '',
        _11: '',
        semCondicoesFinanceiras: semCondicoesFinanceirasSP1,
        clienteFidelizadoNaConcorrencia: clienteFidelizadoNaConcorrenciaSP1,
        insatisfeitoComAVivo: insatisfeitoComAVivoSP1,
        jaPosuiProdutoOsPendente: jaPosuiProdutoOsPendenteSP1,
        naoUtilizaraOProduto: naoUtilizaraOProdutoSP1,
        naoVeBeneficiosNaOferta: naoVeBeneficiosNaOfertaSP1,
        portabilidadeEmProcesso: portabilidadeEmProcessoSP1,
        possuiConcorrencia: possuiConcorrenciaSP1,
        possuiContratoDeFidelidadeComAConcorrencia: possuiContratoDeFidelidadeComAConcorrenciaSP1,
        recebeuOfertaDaConcorrencia: recebeuOfertaDaConcorrenciaSP1,
        seRecusaAFalar: seRecusaAFalarSP1,
        _16: '',
        _17: '',
        clienteAbordadoRecentemente: clienteAbordadoRecentementeSP1,
        clienteComMenosDe3MesesNaBase: clienteComMenosDe3MesesNaBaseSP1,
        clienteIlegivelACampanha: clienteIlegivelACampanhaSP1,
        clientePj: clientePjSP1,
        cpfInvalido: cpfInvalidoSP1,
        creditoNegado: creditoNegadoSP1,
        falecimentoDoAssinante: falecimentoDoAssinanteSP1,
        clienteMenorDeIdade: menorDe18AnosSP1,
        semCobertura: semCoberturaSP1,
        telefoneNaoPertenceAoContato: telefoneNaoPertenceAoContatoSP1,
    })


    dataFixaExport.push({
        ligacoesAbandonadas: dropSPI,
        _1: '',
        _2: '',
        _3: '',
        _4: '',
        congestionamentoNaRede: falhaDaOperadoraSPI,
        ligacaoInterrompida: ligacaoInterrompidaSPI,
        linhaMuda: linhaMudaSPI,
        _5: '',
        mensagemOperadora: mensagemOperadoraSPI,
        naoAtende: naoAtendeSPI,
        ocupado: ocupadoSPI,
        secretariaEletronicaFax: amdSPI,
        terminalInvalido: terminalInvalidoSPI,
        _7: '',
        _8: '',
        agendamento: agendamentoSPI,
        _9: '',
        aceitesVendeu: aceitesVendeuSPI,
        _10: '',
        _11: '',
        semCondicoesFinanceiras: semCondicoesFinanceirasSPI,
        clienteFidelizadoNaConcorrencia: clienteFidelizadoNaConcorrenciaSPI,
        insatisfeitoComAVivo: insatisfeitoComAVivoSPI,
        jaPosuiProdutoOsPendente: jaPosuiProdutoOsPendenteSPI,
        naoUtilizaraOProduto: naoUtilizaraOProdutoSPI,
        naoVeBeneficiosNaOferta: naoVeBeneficiosNaOfertaSPI,
        portabilidadeEmProcesso: portabilidadeEmProcessoSPI,
        possuiConcorrencia: possuiConcorrenciaSPI,
        possuiContratoDeFidelidadeComAConcorrencia: possuiContratoDeFidelidadeComAConcorrenciaSPI,
        recebeuOfertaDaConcorrencia: recebeuOfertaDaConcorrenciaSPI,
        seRecusaAFalar: seRecusaAFalarSPI,
        _16: '',
        _17: '',
        clienteAbordadoRecentemente: clienteAbordadoRecentementeSPI,
        clienteComMenosDe3MesesNaBase: clienteComMenosDe3MesesNaBaseSPI,
        clienteIlegivelACampanha: clienteIlegivelACampanhaSPI,
        clientePj: clientePjSPI,
        cpfInvalido: cpfInvalidoSPI,
        creditoNegado: creditoNegadoSPI,
        falecimentoDoAssinante: falecimentoDoAssinanteSPI,
        clienteMenorDeIdade: menorDe18AnosSPI,
        semCobertura: semCoberturaSPI,
        telefoneNaoPertenceAoContato: telefoneNaoPertenceAoContatoSPI,
    })

    pProcess.setAttribute('style', 'display: none')
    loader.setAttribute('style', 'display: none')

    manipulateMovelCallData(combinedMovelCallData)
}



function manipulateMovelCallData(data) {
    let mediaMovel = 0
    let mediaMovelVenda = 0
    let totalCallMovelVenda = 0
    let totalCallMovel = 0
    let qntCallMovel = 0
    let qntCallMovelVenda = 0

    data.forEach(e => {
        if (!isNaN(e[10])) {
            totalCallMovel += e[10]
            qntCallMovel++
        }

        if (!isNaN(e[10]) && e[5] == 'Venda' || e[5] == 'VENDA' || e[5] == 'venda') {
            totalCallMovelVenda += e[10]
            qntCallMovelVenda++
        }
    })

    mediaMovel = totalCallMovel / qntCallMovel
    mediaMovelVenda = totalCallMovelVenda / qntCallMovelVenda

    dataCallExport.push({
        tipo: 'Movel',
        TMO: mediaMovel,
        TMV: mediaMovelVenda,
        aceites: aceitesMovel
    })

    manipulateFixaCallData(combinedFixaCallData)
}



function manipulateFixaCallData(data) {
    let mediaFixa = 0
    let mediaFixaVenda = 0
    let totalCallFixaVenda = 0
    let totalCallFixa = 0
    let qntCallFixa = 0
    let qntCallFixaVenda = 0

    data.forEach(e => {
        if (!isNaN(e[10])) {
            totalCallFixa += e[10]
            qntCallFixa++
        }

        if (!isNaN(e[10]) && e[5] == 'Venda' || e[5] == 'VENDA' || e[5] == 'venda') {
            totalCallFixaVenda += e[10]
            qntCallFixaVenda++
        }
    })

    mediaFixa = totalCallFixa / qntCallFixa
    mediaFixaVenda = totalCallFixaVenda / qntCallFixaVenda

    dataCallExport.push({
        tipo: 'Fixa',
        TMO: mediaFixa,
        TMV: mediaFixaVenda,
        aceites: aceitesFixa
    })

    exportToCSV(dataMovelExport, dataFixaExport, dataCallExport, dataIdResultadoExport, dataIdMailingExport, dataTrabalhadoExport, dataAtendidasExport, dataAloExport, dataAloUnicoExport, dataAceiteExport, dataCpcEsforcoExport, dataCpcUnicoExport, 'dataGerencial.xlsx');
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




function exportToCSV(dataMovel, dataFixa, dataCall, dataResultado, dataMailing, dataTrabalhado, dataAtendidas, dataAlo, dataAloUnico, dataAceite, dataCpcEsforco, dataCpcUnico, filename) {
    // Cria uma nova worksheet a partir dos dados filtrados
    const worksheet1 = XLSX.utils.json_to_sheet(dataMovel);
    const worksheet2 = XLSX.utils.json_to_sheet(dataFixa);
    const worksheet3 = XLSX.utils.json_to_sheet(dataCall);
    const worksheet4 = XLSX.utils.json_to_sheet(dataMailing);
    const worksheet5 = XLSX.utils.json_to_sheet(dataResultado);
    const worksheet6 = XLSX.utils.json_to_sheet(dataTrabalhado);
    const worksheet7 = XLSX.utils.json_to_sheet(dataAtendidas);
    const worksheet8 = XLSX.utils.json_to_sheet(dataAloUnico);
    const worksheet9 = XLSX.utils.json_to_sheet(dataAlo);
    const worksheet10 = XLSX.utils.json_to_sheet(dataCpcUnico);
    const worksheet11 = XLSX.utils.json_to_sheet(dataCpcEsforco);
    const worksheet12 = XLSX.utils.json_to_sheet(dataAceite);

    // Cria um novo workbook e adiciona a worksheet a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Movel');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Fixa');
    XLSX.utils.book_append_sheet(workbook, worksheet3, 'Ligacoes');
    XLSX.utils.book_append_sheet(workbook, worksheet4, 'Mailing');
    XLSX.utils.book_append_sheet(workbook, worksheet5, 'Discagem');
    XLSX.utils.book_append_sheet(workbook, worksheet6, 'Trabalhado');
    XLSX.utils.book_append_sheet(workbook, worksheet7, 'Atendidas');
    XLSX.utils.book_append_sheet(workbook, worksheet8, 'AloUnico');
    XLSX.utils.book_append_sheet(workbook, worksheet9, 'AloEsforco');
    XLSX.utils.book_append_sheet(workbook, worksheet10, 'cpcUnico');
    XLSX.utils.book_append_sheet(workbook, worksheet11, 'cpcEsforco');
    XLSX.utils.book_append_sheet(workbook, worksheet12, 'Aceite');

    // Exporta o workbook como um arquivo XLSX
    XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });
}