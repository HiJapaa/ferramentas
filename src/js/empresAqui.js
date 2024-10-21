const pProcess = document.getElementById('pProcessando')
const loader = document.getElementById('loader')
const fileLabel = document.getElementById('labelFileInput')
let generalData = []
let arquivoModelo = []
let telefones = []
let occurrences = []
let mostOccurrences = []
const telChunkSize = 100000;
const prospectChunkSize = 250000;

fileInput.addEventListener('change', (arquivo) => {
    var file = arquivo.target.files[0]
    fileLabel.textContent = file.name

    loader.setAttribute('style', 'display: block')
    pProcess.setAttribute('style', 'display: block')

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var sheetName01 = workbook.SheetNames[0];

        var sheet01 = workbook.Sheets[sheetName01];

        let jsonData01 = XLSX.utils.sheet_to_json(sheet01, { defval: 0 });

        processar(jsonData01)

        createFileXlsx(generalData, arquivoModelo, telefones)

        const splitTelArrays = splitArray(telefones, telChunkSize);
        console.log(splitTelArrays)
        console.log(splitTelArrays.length)
        for (let i = 0; i < splitTelArrays.length; i++) {
            let count = i * 200
            setTimeout(() => {
                const element = splitTelArrays[i];
                createFileCsv(element, "telefones")
            }, count);
        }

        const splitProspectArrays = splitArray(arquivoModelo, prospectChunkSize)
        console.log(splitProspectArrays)
        console.log(splitProspectArrays.length)
        for (let i = 0; i < splitProspectArrays.length; i++) {
            let count = i * 200
            setTimeout(() => {
                const element = splitProspectArrays[i];
                createFileCsv(element, "prospectBi")
            }, count);
        }


        console.log(jsonData01)
        console.log(generalData)
        pProcess.setAttribute('style', 'display: none')
        loader.setAttribute('style', 'display: none')
    };

    reader.readAsArrayBuffer(file);
})



function processar(content) {
    content.forEach(e => {
        const cnpj = e.CNPJ.replace(/[^0-9]/g, '')
        const cep = e.CEP.replace(/[^0-9]/g, '')
        let numero = String(e.Número).replace(/[^0-9]/g, '')
        const digito = String(e.Telefone_1).substring(2, 3)
        const ddd = String(e.Telefone_1).substring(0, 2)

        if (numero == '') {
            numero = 0
        }

        if (digito != 9) {
            return
        }

        generalData.push({
            cnpjCopia: cnpj,
            cep: cep,
            numero: numero,
            telefone: e.Telefone_1,
            cnpj: e.CNPJ,
            razao: e.Razão,
            logradouro: e.Endereço,
            complemento: e.Complemento,
            bairro: e.Bairro,
            cidade: e.Cidade,
            uf: e.UF,
            email: e.Email,
            cnaePrincipal: e.CNAE_Principal,
            textoCnaePrincipal: e.Texto_CNAE_Principal,
            situacao: e.Situação_Cad,
            naturezaJuridica: e.Natureza_Jurídica,
            opcaoMei: e.Opção_pelo_MEI,
            porteEmpresa: e.Porte_Empresa,
            capital: e.Capital_Social_da_Empresa,
            faturamento: e.Faturamento_Estimado,
            quadroFuncionarios: e.Quadro_de_Funcionários,
            personalizar: digito,
            operadora: 0,
            flagBi: 0,
            ddd: ddd,
            supervisor: 0,
            oportunidade: 0,
            campanha: 0
        })

        let indexTelefone = telefones.findIndex(element => element.telefone == e.Telefone_1)
        if (indexTelefone == -1) {
            telefones.push({
                telefone: e.Telefone_1
            })
        }

        arquivoModelo.push({
            documento: cnpj,
            cep: cep,
            numero: numero,
            telefone: e.Telefone_1
        })
    })

    generalData.forEach(e => {
        let index = occurrences.findIndex(element => element.n == e.telefone)
        if (index != -1) {
            occurrences[index].q++
        } else {
            occurrences.push({
                n: e.telefone,
                q: 1
            })
        }
    })

    occurrences.forEach(e => {
        if (e.q > 5) {
            generalData = generalData.filter(el => el.telefone != e.n)
        }
    })
}



function splitArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}



function createFileCsv(data, name) {
    let newCSVContent = ''

    data.forEach(function (row) {
        newCSVContent += Object.values(row).join(',') + '\n';
    });

    // Criar um novo arquivo Blob
    const newCSVBlob = new Blob([newCSVContent], { type: 'text/csv' });

    // Criar um link de download para o novo arquivo
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(newCSVBlob);

    downloadLink.download = `${name}.csv`;

    // Adicionar o link ao corpo do documento
    document.body.appendChild(downloadLink);

    downloadLink.click();
}



function createFileXlsx(data1, data2, data3) {
    const wsNome1 = XLSX.utils.json_to_sheet(data1)
    const wsNome2 = XLSX.utils.json_to_sheet(data2)
    const wsNome3 = XLSX.utils.json_to_sheet(data3)

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, wsNome1, "Geral");
    XLSX.utils.book_append_sheet(workbook, wsNome2, "arquivoModelo");
    XLSX.utils.book_append_sheet(workbook, wsNome3, "Telefone");

    const wbout = XLSX.writeFile(workbook, "BaseGeral.xlsx", { compression: true });
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
}
