const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')

const labelCall = document.getElementById('labelCallFileInput')
const labelDisc = document.getElementById('labelDiscFileInput')

let csvData = []
let callData = []

document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);

document.getElementById('fileCallInput').addEventListener('change', handleCall, false);

const mailing = []

function handleCall(event) {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const file = event.target.files[0];
    labelCall.textContent = file.name

    if (!file) {
        alert("Please select a CSV file first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the CSV is the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Split the data based on column C
        const splitFiles = {};

        json.forEach(row => {
            const key = row['ID_Cliente']; // Replace 'ColumnC' with the actual name of column C
            if (!splitFiles[key]) {
                splitFiles[key] = [];
            }
            splitFiles[key].push(row);
        });

        const splitFileContents = [];

        Object.keys(splitFiles).forEach(key => {
            const newWorksheet = XLSX.utils.json_to_sheet(splitFiles[key]);
            const newWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
            const csvContent = XLSX.write(newWorkbook, { bookType: 'csv', type: 'string' });

            // Store the content in the array
            splitFileContents.push({ fileName: `${key}.csv`, content: csvContent });
        });

        // console.log(splitFileContents);

        splitFileContents.forEach(file => {
            // console.log(`Processing file: ${file.fileName}`);
            const rows = XLSX.utils.sheet_to_json(XLSX.read(file.content, { type: 'string' }).Sheets.Sheet1);

            // console.log(rows);

            rows.forEach(e => {
                ttt = parseInt(e.Tempo_total * 86400)

                callData.push({
                    n: e.NÃºmero,
                    t: ttt
                })
            })

            // console.log(callData)

            // Add any other manipulation here
        });

        pProcess.setAttribute('style', 'display: none')
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsArrayBuffer(file);
}

function handleFileSelect(event) {
    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    const file = event.target.files[0];
    labelDisc.textContent = file.name

    if (!file) {
        alert("Please select a CSV file first.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the CSV is the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        // Split the data based on column C
        const splitFiles = {};

        json.forEach(row => {
            const key = row['ID_Cliente']; // Replace 'ColumnC' with the actual name of column C
            if (!splitFiles[key]) {
                splitFiles[key] = [];
            }
            splitFiles[key].push(row);
        });

        const splitFileContents = [];

        Object.keys(splitFiles).forEach(key => {
            const newWorksheet = XLSX.utils.json_to_sheet(splitFiles[key]);
            const newWorkbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
            const csvContent = XLSX.write(newWorkbook, { bookType: 'csv', type: 'string' });

            // Store the content in the array
            splitFileContents.push({ fileName: `${key}`, content: csvContent });
        });

        // console.log(splitFileContents);

        splitFileContents.forEach(file => {
            // console.log(`Processing file: ${file.fileName}`);
            const rows = XLSX.utils.sheet_to_json(XLSX.read(file.content, { type: 'string' }).Sheets.Sheet1);

            // console.log(rows);

            let tipo = ''
            let dataSemBarra

            rows.forEach(e => {
                // console.log(e)

                let data
                let dia
                let mes
                let ano
                let dataCompleta

                if (String(e.Data).includes('/')) {
                    dia = String(e.Data).substring(0, 2)
                    mes = String(e.Data).substring(3, 5)
                    ano = String(e.Data).substring(6, 10)
                    dataCompleta = `${ano}-${mes}-${dia}`
                    dataSemBarra = `${ano}${mes}${dia}`
                } else {
                    let numero = e.Data + 1
                    data = numeroInteiroParaData(numero)

                    dia = data.getUTCDate() - 1
                    mes = data.getUTCMonth() + 1
                    ano = data.getUTCFullYear()

                    if (String(dia).length == 1) {
                        dia = `0${dia}`
                    }

                    if (String(mes).length == 1) {
                        mes = `0${mes}`
                    }

                    dataCompleta = `${ano}-${dia}-${mes}`
                    dataSemBarra = `${ano}${dia}${mes}`
                }

                let totalSeconds = e.Hora * 24 * 3600

                let horas = Math.floor(totalSeconds / 3600)
                let minutos = Math.floor((totalSeconds % 3600) / 60)
                let segundos = Math.floor(totalSeconds % 60)
                let horario = `${horas}:${minutos}:${segundos}`

                let dataEHora = `${dataCompleta} ${horario}`

                let ddd = e.DDD
                let telefone = e.Telefone

                let telefoneCompleto = `${ddd}${telefone}`

                let audiencia = ''
                let tipoAudiencia = 0
                if (e.Campanha == 'MIGRACAO_CAMP PARTE I' || e.Campanha == 'MIGRACAO_CAMP PARTE II') {
                    audiencia = telefoneCompleto
                    tipoAudiencia = 3
                } else {
                    audiencia = e.Field_2
                    tipoAudiencia = 4
                }

                if (tipoAudiencia == 3) {
                    tipo = 'MOV'
                } else if (tipoAudiencia == 4) {
                    tipo = 'FIX'
                }

                csvData.push({
                    ID_CAMPANHA: e.ID_Cliente,
                    ID_AUDIENCIA: audiencia,
                    ID_TIPO_AUDIENCIA: tipoAudiencia,
                    ID_RETORNO: e.ISDN_Code,
                    DT_TABULACAO: dataEHora,
                    NR_TLFN: telefoneCompleto,
                    NOVO_CPF: '0',
                    CPF_OPERADOR: '0',
                    NR_TLFN_ADD1: '0',
                    NR_TLFN_ADD2: '0',
                    NR_TLFN_ADD3: '0',
                    EMAIL_ADD1: '0',
                    NR_DURACAO_CHAMADA: '0',
                    QD_CHAMADAS: 1,
                    ID_OFERTA: '0',
                    QT_TERMINAIS: '0'
                })
            })

            csvData.forEach(e => {
                let index = callData.findIndex(element => element.n == e.NR_TLFN)
                if (index != -1) {
                    e.NR_DURACAO_CHAMADA = String(callData[index].t)
                }
            })

            let secondsNow = Date.now()
            let dataHoje = new Date(secondsNow)


            let horasHoje = dataHoje.getHours()
            let minutosHoje = dataHoje.getMinutes()
            let segundosHoje = dataHoje.getSeconds()

            if(String(horasHoje).length == 1) {
                horasHoje = `0${horasHoje}`
            }

            if(String(minutosHoje).length == 1) {
                minutosHoje = `0${minutosHoje}`
            }

            if(String(segundosHoje).length == 1) {
                segundosHoje = `0${segundosHoje}`
            }

            let horarioHoje = `${horasHoje}${minutosHoje}${segundosHoje}`

            // console.log(csvData)
            downloadManipulatedCsv(csvData, `${file.fileName}_RET_${tipo}_MS_${dataSemBarra}${horarioHoje}.csv`)
            csvData = []
        });

        pProcess.setAttribute('style', 'display: none')
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsArrayBuffer(file);
}



function numeroInteiroParaData(numero) {
    var dataBase = new Date(1900, 0, -1); // Data base do Excel (1º de janeiro de 1900)
    var data = new Date(dataBase.getTime() + (numero * 24 * 60 * 60 * 1000));
    return data;
}



function downloadManipulatedCsv(data, name) {
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    const csvContent = XLSX.write(newWorkbook, { bookType: 'csv', type: 'string' });

    downloadCSV(csvContent, name);
}



function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}