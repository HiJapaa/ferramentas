const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

const inputInput = document.getElementById('fileInputInput');
const inputTabulacao = document.getElementById('fileTabulacaoInput');
const inputBko = document.getElementById('fileBkoInput');
const inputTabulacaoAceites = document.getElementById('fileTabulacaoAceitesInput');

const labelInput = document.getElementById('labelInputFileInput')
const labelTabulacao = document.getElementById('labelTabulacaoFileInput')
const labelBko = document.getElementById('labelBkoFileInput')
const labelTabulacaoAceites = document.getElementById('labelTabulacaoAceitesFileInput')

let dataMovelExport = []
let dataFixaExport = []
let dataAceitesExport = []


let filesInputProcessed = 0
let filesTabulacaoProcessed = 0
let filesBkoProcessed = 0
let filesTabulacaoAceitesProcessed = 0


let combinedInputData = []
let combinedTabulacaoData = []
let combinedBkoData = []
let combinedTabulacaoAceitesData = []



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

inputTabulacaoAceites.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelTabulacaoAceites.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelTabulacaoAceites.textContent = `${event.target.files.length} arquivo`
    }
})

inputBko.addEventListener('change', (event) => {
    if (event.target.files.length > 1) {
        labelBko.textContent = `${event.target.files.length} arquivos`
    } else if (event.target.files.length == 1) {
        labelBko.textContent = `${event.target.files.length} arquivo`
    }
})



document.getElementById('processBtn').addEventListener('click', function () {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const filesInput = inputInput.files;
    const filesTabulacao = inputTabulacao.files;
    const filesBko = inputBko.files;
    const filesTabulacaoAceites = inputTabulacaoAceites.files;

    if (filesInput.length === 0 || filesTabulacao.length === 0 || filesTabulacaoAceites.length === 0 || filesBko.length === 0) {
        alert('Por favor, selecione pelo menos um arquivo em cada campo.');
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
                            Array.from(filesTabulacaoAceites).forEach(file => {
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
                                    combinedTabulacaoAceitesData = combinedTabulacaoAceitesData.concat(csvData);
                                    filesTabulacaoAceitesProcessed++;

                                    // Se todos os arquivos foram processados, faça a manipulação dos dados
                                    if (filesTabulacaoAceitesProcessed === filesTabulacaoAceites.length) {
                                        Array.from(filesBko).forEach(file => {
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
                                                combinedBkoData = combinedBkoData.concat(csvData);
                                                filesBkoProcessed++;
            
                                                // Se todos os arquivos foram processados, faça a manipulação dos dados
                                                if (filesBkoProcessed === filesBko.length) {
                                                    manipulateBkoData(combinedBkoData)
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
})


function manipulateBkoData(data) {
    console.log(data)

    manipulateTabulacaoData(combinedTabulacaoData)
}



function manipulateTabulacaoData(data) {
    console.log(data)

    manipulateTabulacaoAceitesData(combinedTabulacaoAceitesData)
}

function manipulateTabulacaoAceitesData(data) {
    console.log(data)

    let aceitesMovel = 0
    let aceitesFixa = 0

    data.forEach(e => {
        if(e[10] == 'VENDA') {
            if(e[1] == 'FIXA_A' || e[1] == 'FIXA_B' || e[1] == 'FIXA_A+') {
                aceitesFixa++
            } else if(e[1] == 'MIGRACAO_CAMP PARTE I' || e[1] == 'MIGRACAO_CAMP PARTE II') {
                aceitesMovel++
            }
        }
    })

    dataAceitesExport.push({
        aceitesMovel: aceitesMovel,
        aceitesFixa: aceitesFixa
    })

    manipulateInputData(combinedInputData)
}



function manipulateInputData(data) {
    console.log(data)

    data.forEach(e => {
        let indexTabulacao = combinedTabulacaoData.findIndex(element => `${element[5]}${element[6]}` == e[6] && element[10] == 'VENDA')

        let indexBko = combinedBkoData.findIndex(element => element[8] == e[6])

        let campanha = ''
        let dataCompletaTabulacao = ''
        let regiao = ''
        let mailing = ''
        let adicional = ''
        let cod = ''
        let oferta = ''


        if (indexTabulacao != -1) {
            campanha = combinedTabulacaoData[indexTabulacao][1]
            mailing = combinedTabulacaoData[indexTabulacao][16]
            oferta = combinedTabulacaoData[indexTabulacao][27]
            if (combinedTabulacaoData[indexTabulacao][1] == 'FIXA_A' || combinedTabulacaoData[indexTabulacao][1] == 'FIXA_A+' || combinedTabulacaoData[indexTabulacao][1] == 'FIXA_B') {
                campanha = 'FIXA FTTH'
            } else {
                adicional = `${combinedTabulacaoData[indexTabulacao][30]} + 5`
                campanha = 'MIGRAÇÃO PRE CTRL'
            }


            if (String(combinedTabulacaoData[indexTabulacao][3]).length == 5) {
                let dataFuncao = numeroInteiroParaData(combinedTabulacaoData[indexTabulacao][3])

                dataCompletaTabulacao = `${dataFuncao.getUTCMonth() + 1}/${dataFuncao.getUTCDate()}/${dataFuncao.getUTCFullYear()}`
            } else {
                dataCompletaTabulacao = combinedTabulacaoData[indexTabulacao][3]
            }
        }

        if (String(e[6]).slice(0, 2) == '11' || String(e[6]).slice(0, 2) == '12' || String(e[6]).slice(0, 2) == '13') {
            regiao = 'SP1'
        } else if (String(e[6]).slice(0, 2) == '14' || String(e[6]).slice(0, 2) == '15' || String(e[6]).slice(0, 2) == '16' || String(e[6]).slice(0, 2) == '17' || String(e[6]).slice(0, 2) == '18' || String(e[6]).slice(0, 2) == '19') {
            regiao = 'SPI'
        }

        if (String(e[15]).includes('MOVEL') || e[15] == 'Dados da venda') {
            adicional = adicional
        } else {
            adicional = ''
        }

        if (e[24] == 'Fatura Digital ') {
            cod = 'SIM'
        } else {
            cod = 'NÃO'
        }

        let status = ''
        let subStatus = ''
        let trocaTitularidade = ''
        let oitenta = ''

        if(e[46] == 'Instalado' || e[46] == 'Agendado') {
            status = 'Emitido'
        } else {
            status = 'Restrição'
        }

        if(indexBko != -1) {
            if(status == 'Restrição') {
                subStatus = combinedBkoData[indexBko][10]
            }
            trocaTitularidade = combinedBkoData[indexBko][11]
            oitenta = combinedBkoData[indexBko][13]
        }

        // Modificado para o arquivo do modulo 89
        dataMovelExport.push({
            Campanha: campanha,
            DataVenda: dataCompletaTabulacao,
            DataEmissao: e[33],
            Eps: 'Ms Connect',
            Regional: regiao,
            Terminal: e[6],
            CPFCliente: String(e[3]).replace(/[^0-9]/g, ''),
            Matricula: oitenta,
            Oferta: oferta,
            Status: status,
            SubStatus: subStatus,
            TrocaTitularidade: trocaTitularidade,
            Mailing: mailing,
            Perfil: '',
            Site: 'MS',
            PlataformaEmissao: 'NEXT',
            HomeOffice: 'NÃO',
            Cod: cod,
            EmailFatura: e[22],
            PacoteAdicional: adicional
        })

        dataFixaExport.push({
            Campanha: campanha,
            DataVenda: dataCompletaTabulacao,
            DataEmissao: e[33],
            Eps: "Ms Connect",
            Regional: regiao,
            Terminal: e[6],
            Matricula: oitenta,
            Oferta: oferta,
            Status: status,
            SubStatus: subStatus,
            TrocaTitularidade: trocaTitularidade,
            Mailing: mailing,
            Perfil: '',
            ProtocoloVenda: e[30],
            Site: 'MS',
            Plataforma: 'NEXT',
            HomeOffice: 'NÃO',
            Cod: cod,
            EmailFatura: e[22],
        })
    })

    exportToCSV(dataMovelExport, dataFixaExport, dataAceitesExport, 'dataFichaVendas.xlsx');

    loader.setAttribute('style', 'display: none')
    pProcess.setAttribute('style', 'display: none')
}



function numeroInteiroParaData(numero) {
    var dataBase = new Date(1900, 0, -1); // Data base do Excel (1º de janeiro de 1900)
    var data = new Date(dataBase.getTime() + numero * 24 * 60 * 60 * 1000);
    return data;
}



function exportToCSV(dataMovel, dataFixa, dataAceites, filename) {
    // Cria uma nova worksheet a partir dos dados filtrados
    const worksheet1 = XLSX.utils.json_to_sheet(dataMovel);
    const worksheet2 = XLSX.utils.json_to_sheet(dataFixa);
    const worksheet3 = XLSX.utils.json_to_sheet(dataAceites);

    // Cria um novo workbook e adiciona a worksheet a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Movel');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Fixa');
    XLSX.utils.book_append_sheet(workbook, worksheet3, 'Aceites');

    // Exporta o workbook como um arquivo XLSX
    XLSX.writeFile(workbook, filename, { bookType: 'xlsx' });
}