const loader = document.getElementById('loader')
const fileInput = document.getElementById('fileInput')
const fileLabel = document.getElementById('labelFileInput')
const exportBtn = document.getElementById('exportBtn')
const pProcessando = document.getElementById('p')

fileInput.addEventListener('change', (arquivo) => {
    var file = arquivo.target.files[0]
    fileLabel.textContent = file.name

    loader.setAttribute('style', 'display: block')
    pProcessando.classList.remove('hide')

    var reader = new FileReader();
    reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, { type: 'array' });

        var sheetName01 = workbook.SheetNames[0];
        var sheetName02 = workbook.SheetNames[1];
        var sheetName03 = workbook.SheetNames[2];
        var sheetName04 = workbook.SheetNames[3];
        var sheetName05 = workbook.SheetNames[4];
        var sheetName06 = workbook.SheetNames[5];

        var sheet01 = workbook.Sheets[sheetName01];
        var sheet02 = workbook.Sheets[sheetName02];
        var sheet03 = workbook.Sheets[sheetName03];
        var sheet04 = workbook.Sheets[sheetName04];
        var sheet05 = workbook.Sheets[sheetName05];
        var sheet06 = workbook.Sheets[sheetName06];

        let jsonData01 = XLSX.utils.sheet_to_json(sheet01, { defval: 0 });
        let jsonData02 = XLSX.utils.sheet_to_json(sheet02, { defval: 0 });
        let jsonData03 = XLSX.utils.sheet_to_json(sheet03, { defval: 0 });
        let jsonData04 = XLSX.utils.sheet_to_json(sheet04, { defval: 0 });
        let jsonData05 = XLSX.utils.sheet_to_json(sheet05, { defval: 0 });
        let jsonData06 = XLSX.utils.sheet_to_json(sheet06, { defval: 0 });

        processarAbaUm(jsonData01)
        processarAbaDois(jsonData02)
        processarAbaTres(jsonData03)
        processarAbaQuatro(jsonData04)
        processarAbaCinco(jsonData05)
        processarAbaSeis(jsonData06)

        createFile(_1Um, _1Dois, _1Tres, _1Quatro, _1Cinco, _1Seis, "1")
        createFile(_2Um, _2Dois, _2Tres, _2Quatro, _2Cinco, _2Seis, "2")
        createFile(_3Um, _3Dois, _3Tres, _3Quatro, _3Cinco, _3Seis, "3")
        createFile(_4Um, _4Dois, _4Tres, _4Quatro, _4Cinco, _4Seis, "4")
        createFile(_5Um, _5Dois, _5Tres, _5Quatro, _5Cinco, _5Seis, "5")
        createFile(_6Um, _6Dois, _6Tres, _6Quatro, _6Cinco, _6Seis, "6")
        createFile(_7Um, _7Dois, _7Tres, _7Quatro, _7Cinco, _7Seis, "7")
        createFile(_8Um, _8Dois, _8Tres, _8Quatro, _8Cinco, _8Seis, "8")
        createFile(_9Um, _9Dois, _9Tres, _9Quatro, _9Cinco, _9Seis, "9")
        createFile(_10Um, _10Dois, _10Tres, _10Quatro, _10Cinco, _10Seis, "10")
        createFile(_11Um, _11Dois, _11Tres, _11Quatro, _11Cinco, _11Seis, "11")
        createFile(_12Um, _12Dois, _12Tres, _12Quatro, _12Cinco, _12Seis, "12")
        createFile(_13Um, _13Dois, _13Tres, _13Quatro, _13Cinco, _13Seis, "13")
        createFile(_14Um, _14Dois, _14Tres, _14Quatro, _14Cinco, _14Seis, "14")
        createFile(_15Um, _15Dois, _15Tres, _15Quatro, _15Cinco, _15Seis, "15")
        createFile(_16Um, _16Dois, _16Tres, _16Quatro, _16Cinco, _16Seis, "16")
        createFile(_17Um, _17Dois, _17Tres, _17Quatro, _17Cinco, _17Seis, "17")
        createFile(_18Um, _18Dois, _18Tres, _18Quatro, _18Cinco, _18Seis, "18")
        createFile(_19Um, _19Dois, _19Tres, _19Quatro, _19Cinco, _19Seis, "19")
        createFile(_20Um, _20Dois, _20Tres, _20Quatro, _20Cinco, _20Seis, "20")
        createFile(_21Um, _21Dois, _21Tres, _21Quatro, _21Cinco, _21Seis, "21")
        createFile(_22Um, _22Dois, _22Tres, _22Quatro, _22Cinco, _22Seis, "22")
        createFile(_23Um, _23Dois, _23Tres, _23Quatro, _23Cinco, _23Seis, "23")
        createFile(_24Um, _24Dois, _24Tres, _24Quatro, _24Cinco, _24Seis, "24")
        createFile(_25Um, _25Dois, _25Tres, _25Quatro, _25Cinco, _25Seis, "25")
        createFile(_26Um, _26Dois, _26Tres, _26Quatro, _26Cinco, _26Seis, "26")
        createFile(_27Um, _27Dois, _27Tres, _27Quatro, _27Cinco, _27Seis, "27")
        createFile(_28Um, _28Dois, _28Tres, _28Quatro, _28Cinco, _28Seis, "28")
        createFile(_29Um, _29Dois, _29Tres, _29Quatro, _29Cinco, _29Seis, "29")
        createFile(_30Um, _30Dois, _30Tres, _30Quatro, _30Cinco, _30Seis, "30")
        createFile(_31Um, _31Dois, _31Tres, _31Quatro, _31Cinco, _31Seis, "31")
        createFile(_32Um, _32Dois, _32Tres, _32Quatro, _32Cinco, _32Seis, "32")
        createFile(_33Um, _33Dois, _33Tres, _33Quatro, _33Cinco, _33Seis, "33")
        createFile(_34Um, _34Dois, _34Tres, _34Quatro, _34Cinco, _34Seis, "34")
        createFile(_35Um, _35Dois, _35Tres, _35Quatro, _35Cinco, _35Seis, "35")
        createFile(_36Um, _36Dois, _36Tres, _36Quatro, _36Cinco, _36Seis, "36")
        createFile(_37Um, _37Dois, _37Tres, _37Quatro, _37Cinco, _37Seis, "37")
        createFile(_38Um, _38Dois, _38Tres, _38Quatro, _38Cinco, _38Seis, "38")
        createFile(_39Um, _39Dois, _39Tres, _39Quatro, _39Cinco, _39Seis, "39")
        createFile(_40Um, _40Dois, _40Tres, _40Quatro, _40Cinco, _40Seis, "40")
        createFile(_41Um, _41Dois, _41Tres, _41Quatro, _41Cinco, _41Seis, "41")
        createFile(_42Um, _42Dois, _42Tres, _42Quatro, _42Cinco, _42Seis, "42")
        createFile(_43Um, _43Dois, _43Tres, _43Quatro, _43Cinco, _43Seis, "43")
        createFile(_44Um, _44Dois, _44Tres, _44Quatro, _44Cinco, _44Seis, "44")
        createFile(_45Um, _45Dois, _45Tres, _45Quatro, _45Cinco, _45Seis, "45")
        createFile(_46Um, _46Dois, _46Tres, _46Quatro, _46Cinco, _46Seis, "46")
        createFile(_47Um, _47Dois, _47Tres, _47Quatro, _47Cinco, _47Seis, "47")
        createFile(_48Um, _48Dois, _48Tres, _48Quatro, _48Cinco, _48Seis, "48")
        createFile(_49Um, _49Dois, _49Tres, _49Quatro, _49Cinco, _49Seis, "49")
        createFile(_50Um, _50Dois, _50Tres, _50Quatro, _50Cinco, _50Seis, "50")
        createFile(_51Um, _51Dois, _51Tres, _51Quatro, _51Cinco, _51Seis, "51")
        createFile(_52Um, _52Dois, _52Tres, _52Quatro, _52Cinco, _52Seis, "52")
        createFile(_53Um, _53Dois, _53Tres, _53Quatro, _53Cinco, _53Seis, "53")
        createFile(_54Um, _54Dois, _54Tres, _54Quatro, _54Cinco, _54Seis, "54")
        createFile(_55Um, _55Dois, _55Tres, _55Quatro, _55Cinco, _55Seis, "55")
        createFile(_56Um, _56Dois, _56Tres, _56Quatro, _56Cinco, _56Seis, "56")
        createFile(_57Um, _57Dois, _57Tres, _57Quatro, _57Cinco, _57Seis, "57")

        loader.setAttribute('style', 'display: none')
        pProcessando.classList.add('hide')

        console.log(jsonData01)
        console.log(jsonData02)
        console.log(jsonData03)
        console.log(jsonData04)
        console.log(jsonData05)
        console.log(jsonData06)
    };

    reader.readAsArrayBuffer(file);
})


let _1Um = []
let _2Um = []
let _3Um = []
let _4Um = []
let _5Um = []
let _6Um = []
let _7Um = []
let _8Um = []
let _9Um = []
let _10Um = []
let _11Um = []
let _12Um = []
let _13Um = []
let _14Um = []
let _15Um = []
let _16Um = []
let _17Um = []
let _18Um = []
let _19Um = []
let _20Um = []
let _21Um = []
let _22Um = []
let _23Um = []
let _24Um = []
let _25Um = []
let _26Um = []
let _27Um = []
let _28Um = []
let _29Um = []
let _30Um = []
let _31Um = []
let _32Um = []
let _33Um = []
let _34Um = []
let _35Um = []
let _36Um = []
let _37Um = []
let _38Um = []
let _39Um = []
let _40Um = []
let _41Um = []
let _42Um = []
let _43Um = []
let _44Um = []
let _45Um = []
let _46Um = []
let _47Um = []
let _48Um = []
let _49Um = []
let _50Um = []
let _51Um = []
let _52Um = []
let _53Um = []
let _54Um = []
let _55Um = []
let _56Um = []
let _57Um = []

let _1Dois = []
let _2Dois = []
let _3Dois = []
let _4Dois = []
let _5Dois = []
let _6Dois = []
let _7Dois = []
let _8Dois = []
let _9Dois = []
let _10Dois = []
let _11Dois = []
let _12Dois = []
let _13Dois = []
let _14Dois = []
let _15Dois = []
let _16Dois = []
let _17Dois = []
let _18Dois = []
let _19Dois = []
let _20Dois = []
let _21Dois = []
let _22Dois = []
let _23Dois = []
let _24Dois = []
let _25Dois = []
let _26Dois = []
let _27Dois = []
let _28Dois = []
let _29Dois = []
let _30Dois = []
let _31Dois = []
let _32Dois = []
let _33Dois = []
let _34Dois = []
let _35Dois = []
let _36Dois = []
let _37Dois = []
let _38Dois = []
let _39Dois = []
let _40Dois = []
let _41Dois = []
let _42Dois = []
let _43Dois = []
let _44Dois = []
let _45Dois = []
let _46Dois = []
let _47Dois = []
let _48Dois = []
let _49Dois = []
let _50Dois = []
let _51Dois = []
let _52Dois = []
let _53Dois = []
let _54Dois = []
let _55Dois = []
let _56Dois = []
let _57Dois = []

let _1Tres = []
let _2Tres = []
let _3Tres = []
let _4Tres = []
let _5Tres = []
let _6Tres = []
let _7Tres = []
let _8Tres = []
let _9Tres = []
let _10Tres = []
let _11Tres = []
let _12Tres = []
let _13Tres = []
let _14Tres = []
let _15Tres = []
let _16Tres = []
let _17Tres = []
let _18Tres = []
let _19Tres = []
let _20Tres = []
let _21Tres = []
let _22Tres = []
let _23Tres = []
let _24Tres = []
let _25Tres = []
let _26Tres = []
let _27Tres = []
let _28Tres = []
let _29Tres = []
let _30Tres = []
let _31Tres = []
let _32Tres = []
let _33Tres = []
let _34Tres = []
let _35Tres = []
let _36Tres = []
let _37Tres = []
let _38Tres = []
let _39Tres = []
let _40Tres = []
let _41Tres = []
let _42Tres = []
let _43Tres = []
let _44Tres = []
let _45Tres = []
let _46Tres = []
let _47Tres = []
let _48Tres = []
let _49Tres = []
let _50Tres = []
let _51Tres = []
let _52Tres = []
let _53Tres = []
let _54Tres = []
let _55Tres = []
let _56Tres = []
let _57Tres = []

let _1Quatro = []
let _2Quatro = []
let _3Quatro = []
let _4Quatro = []
let _5Quatro = []
let _6Quatro = []
let _7Quatro = []
let _8Quatro = []
let _9Quatro = []
let _10Quatro = []
let _11Quatro = []
let _12Quatro = []
let _13Quatro = []
let _14Quatro = []
let _15Quatro = []
let _16Quatro = []
let _17Quatro = []
let _18Quatro = []
let _19Quatro = []
let _20Quatro = []
let _21Quatro = []
let _22Quatro = []
let _23Quatro = []
let _24Quatro = []
let _25Quatro = []
let _26Quatro = []
let _27Quatro = []
let _28Quatro = []
let _29Quatro = []
let _30Quatro = []
let _31Quatro = []
let _32Quatro = []
let _33Quatro = []
let _34Quatro = []
let _35Quatro = []
let _36Quatro = []
let _37Quatro = []
let _38Quatro = []
let _39Quatro = []
let _40Quatro = []
let _41Quatro = []
let _42Quatro = []
let _43Quatro = []
let _44Quatro = []
let _45Quatro = []
let _46Quatro = []
let _47Quatro = []
let _48Quatro = []
let _49Quatro = []
let _50Quatro = []
let _51Quatro = []
let _52Quatro = []
let _53Quatro = []
let _54Quatro = []
let _55Quatro = []
let _56Quatro = []
let _57Quatro = []

let _1Cinco = []
let _2Cinco = []
let _3Cinco = []
let _4Cinco = []
let _5Cinco = []
let _6Cinco = []
let _7Cinco = []
let _8Cinco = []
let _9Cinco = []
let _10Cinco = []
let _11Cinco = []
let _12Cinco = []
let _13Cinco = []
let _14Cinco = []
let _15Cinco = []
let _16Cinco = []
let _17Cinco = []
let _18Cinco = []
let _19Cinco = []
let _20Cinco = []
let _21Cinco = []
let _22Cinco = []
let _23Cinco = []
let _24Cinco = []
let _25Cinco = []
let _26Cinco = []
let _27Cinco = []
let _28Cinco = []
let _29Cinco = []
let _30Cinco = []
let _31Cinco = []
let _32Cinco = []
let _33Cinco = []
let _34Cinco = []
let _35Cinco = []
let _36Cinco = []
let _37Cinco = []
let _38Cinco = []
let _39Cinco = []
let _40Cinco = []
let _41Cinco = []
let _42Cinco = []
let _43Cinco = []
let _44Cinco = []
let _45Cinco = []
let _46Cinco = []
let _47Cinco = []
let _48Cinco = []
let _49Cinco = []
let _50Cinco = []
let _51Cinco = []
let _52Cinco = []
let _53Cinco = []
let _54Cinco = []
let _55Cinco = []
let _56Cinco = []
let _57Cinco = []

let _1Seis = []
let _2Seis = []
let _3Seis = []
let _4Seis = []
let _5Seis = []
let _6Seis = []
let _7Seis = []
let _8Seis = []
let _9Seis = []
let _10Seis = []
let _11Seis = []
let _12Seis = []
let _13Seis = []
let _14Seis = []
let _15Seis = []
let _16Seis = []
let _17Seis = []
let _18Seis = []
let _19Seis = []
let _20Seis = []
let _21Seis = []
let _22Seis = []
let _23Seis = []
let _24Seis = []
let _25Seis = []
let _26Seis = []
let _27Seis = []
let _28Seis = []
let _29Seis = []
let _30Seis = []
let _31Seis = []
let _32Seis = []
let _33Seis = []
let _34Seis = []
let _35Seis = []
let _36Seis = []
let _37Seis = []
let _38Seis = []
let _39Seis = []
let _40Seis = []
let _41Seis = []
let _42Seis = []
let _43Seis = []
let _44Seis = []
let _45Seis = []
let _46Seis = []
let _47Seis = []
let _48Seis = []
let _49Seis = []
let _50Seis = []
let _51Seis = []
let _52Seis = []
let _53Seis = []
let _54Seis = []
let _55Seis = []
let _56Seis = []
let _57Seis = []

function processarAbaUm(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Um.push(e)
        } else if (e.N == '2') {
            _2Um.push(e)
        } else if (e.N == '3') {
            _3Um.push(e)
        } else if (e.N == '4') {
            _4Um.push(e)
        } else if (e.N == '5') {
            _5Um.push(e)
        } else if (e.N == '6') {
            _6Um.push(e)
        } else if (e.N == '7') {
            _7Um.push(e)
        } else if (e.N == '8') {
            _8Um.push(e)
        } else if (e.N == '9') {
            _9Um.push(e)
        } else if (e.N == '10') {
            _10Um.push(e)
        } else if (e.N == '11') {
            _11Um.push(e)
        } else if (e.N == '12') {
            _12Um.push(e)
        } else if (e.N == '13') {
            _13Um.push(e)
        } else if (e.N == '14') {
            _14Um.push(e)
        } else if (e.N == '15') {
            _15Um.push(e)
        } else if (e.N == '16') {
            _16Um.push(e)
        } else if (e.N == '17') {
            _17Um.push(e)
        } else if (e.N == '18') {
            _18Um.push(e)
        } else if (e.N == '19') {
            _19Um.push(e)
        } else if (e.N == '20') {
            _20Um.push(e)
        } else if (e.N == '21') {
            _21Um.push(e)
        } else if (e.N == '22') {
            _22Um.push(e)
        } else if (e.N == '23') {
            _23Um.push(e)
        } else if (e.N == '24') {
            _24Um.push(e)
        } else if (e.N == '25') {
            _25Um.push(e)
        } else if (e.N == '26') {
            _26Um.push(e)
        } else if (e.N == '27') {
            _27Um.push(e)
        } else if (e.N == '28') {
            _28Um.push(e)
        } else if (e.N == '29') {
            _29Um.push(e)
        } else if (e.N == '30') {
            _30Um.push(e)
        } else if (e.N == '31') {
            _31Um.push(e)
        } else if (e.N == '32') {
            _32Um.push(e)
        } else if (e.N == '33') {
            _33Um.push(e)
        } else if (e.N == '34') {
            _34Um.push(e)
        } else if (e.N == '35') {
            _35Um.push(e)
        } else if (e.N == '36') {
            _36Um.push(e)
        } else if (e.N == '37') {
            _37Um.push(e)
        } else if (e.N == '38') {
            _38Um.push(e)
        } else if (e.N == '39') {
            _39Um.push(e)
        } else if (e.N == '40') {
            _40Um.push(e)
        } else if (e.N == '41') {
            _41Um.push(e)
        } else if (e.N == '42') {
            _42Um.push(e)
        } else if (e.N == '43') {
            _43Um.push(e)
        } else if (e.N == '44') {
            _44Um.push(e)
        } else if (e.N == '45') {
            _45Um.push(e)
        } else if (e.N == '46') {
            _46Um.push(e)
        } else if (e.N == '47') {
            _47Um.push(e)
        } else if (e.N == '48') {
            _48Um.push(e)
        } else if (e.N == '49') {
            _49Um.push(e)
        } else if (e.N == '50') {
            _50Um.push(e)
        } else if (e.N == '51') {
            _51Um.push(e)
        } else if (e.N == '52') {
            _52Um.push(e)
        } else if (e.N == '53') {
            _53Um.push(e)
        } else if (e.N == '54') {
            _54Um.push(e)
        } else if (e.N == '55') {
            _55Um.push(e)
        } else if (e.N == '56') {
            _56Um.push(e)
        } else if (e.N == '57') {
            _57Um.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function processarAbaDois(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Dois.push(e)
        } else if (e.N == '2') {
            _2Dois.push(e)
        } else if (e.N == '3') {
            _3Dois.push(e)
        } else if (e.N == '4') {
            _4Dois.push(e)
        } else if (e.N == '5') {
            _5Dois.push(e)
        } else if (e.N == '6') {
            _6Dois.push(e)
        } else if (e.N == '7') {
            _7Dois.push(e)
        } else if (e.N == '8') {
            _8Dois.push(e)
        } else if (e.N == '9') {
            _9Dois.push(e)
        } else if (e.N == '10') {
            _10Dois.push(e)
        } else if (e.N == '11') {
            _11Dois.push(e)
        } else if (e.N == '12') {
            _12Dois.push(e)
        } else if (e.N == '13') {
            _13Dois.push(e)
        } else if (e.N == '14') {
            _14Dois.push(e)
        } else if (e.N == '15') {
            _15Dois.push(e)
        } else if (e.N == '16') {
            _16Dois.push(e)
        } else if (e.N == '17') {
            _17Dois.push(e)
        } else if (e.N == '18') {
            _18Dois.push(e)
        } else if (e.N == '19') {
            _19Dois.push(e)
        } else if (e.N == '20') {
            _20Dois.push(e)
        } else if (e.N == '21') {
            _21Dois.push(e)
        } else if (e.N == '22') {
            _22Dois.push(e)
        } else if (e.N == '23') {
            _23Dois.push(e)
        } else if (e.N == '24') {
            _24Dois.push(e)
        } else if (e.N == '25') {
            _25Dois.push(e)
        } else if (e.N == '26') {
            _26Dois.push(e)
        } else if (e.N == '27') {
            _27Dois.push(e)
        } else if (e.N == '28') {
            _28Dois.push(e)
        } else if (e.N == '29') {
            _29Dois.push(e)
        } else if (e.N == '30') {
            _30Dois.push(e)
        } else if (e.N == '31') {
            _31Dois.push(e)
        } else if (e.N == '32') {
            _32Dois.push(e)
        } else if (e.N == '33') {
            _33Dois.push(e)
        } else if (e.N == '34') {
            _34Dois.push(e)
        } else if (e.N == '35') {
            _35Dois.push(e)
        } else if (e.N == '36') {
            _36Dois.push(e)
        } else if (e.N == '37') {
            _37Dois.push(e)
        } else if (e.N == '38') {
            _38Dois.push(e)
        } else if (e.N == '39') {
            _39Dois.push(e)
        } else if (e.N == '40') {
            _40Dois.push(e)
        } else if (e.N == '41') {
            _41Dois.push(e)
        } else if (e.N == '42') {
            _42Dois.push(e)
        } else if (e.N == '43') {
            _43Dois.push(e)
        } else if (e.N == '44') {
            _44Dois.push(e)
        } else if (e.N == '45') {
            _45Dois.push(e)
        } else if (e.N == '46') {
            _46Dois.push(e)
        } else if (e.N == '47') {
            _47Dois.push(e)
        } else if (e.N == '48') {
            _48Dois.push(e)
        } else if (e.N == '49') {
            _49Dois.push(e)
        } else if (e.N == '50') {
            _50Dois.push(e)
        } else if (e.N == '51') {
            _51Dois.push(e)
        } else if (e.N == '52') {
            _52Dois.push(e)
        } else if (e.N == '53') {
            _53Dois.push(e)
        } else if (e.N == '54') {
            _54Dois.push(e)
        } else if (e.N == '55') {
            _55Dois.push(e)
        } else if (e.N == '56') {
            _56Dois.push(e)
        } else if (e.N == '57') {
            _57Dois.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function processarAbaTres(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Tres.push(e)
        } else if (e.N == '2') {
            _2Tres.push(e)
        } else if (e.N == '3') {
            _3Tres.push(e)
        } else if (e.N == '4') {
            _4Tres.push(e)
        } else if (e.N == '5') {
            _5Tres.push(e)
        } else if (e.N == '6') {
            _6Tres.push(e)
        } else if (e.N == '7') {
            _7Tres.push(e)
        } else if (e.N == '8') {
            _8Tres.push(e)
        } else if (e.N == '9') {
            _9Tres.push(e)
        } else if (e.N == '10') {
            _10Tres.push(e)
        } else if (e.N == '11') {
            _11Tres.push(e)
        } else if (e.N == '12') {
            _12Tres.push(e)
        } else if (e.N == '13') {
            _13Tres.push(e)
        } else if (e.N == '14') {
            _14Tres.push(e)
        } else if (e.N == '15') {
            _15Tres.push(e)
        } else if (e.N == '16') {
            _16Tres.push(e)
        } else if (e.N == '17') {
            _17Tres.push(e)
        } else if (e.N == '18') {
            _18Tres.push(e)
        } else if (e.N == '19') {
            _19Tres.push(e)
        } else if (e.N == '20') {
            _20Tres.push(e)
        } else if (e.N == '21') {
            _21Tres.push(e)
        } else if (e.N == '22') {
            _22Tres.push(e)
        } else if (e.N == '23') {
            _23Tres.push(e)
        } else if (e.N == '24') {
            _24Tres.push(e)
        } else if (e.N == '25') {
            _25Tres.push(e)
        } else if (e.N == '26') {
            _26Tres.push(e)
        } else if (e.N == '27') {
            _27Tres.push(e)
        } else if (e.N == '28') {
            _28Tres.push(e)
        } else if (e.N == '29') {
            _29Tres.push(e)
        } else if (e.N == '30') {
            _30Tres.push(e)
        } else if (e.N == '31') {
            _31Tres.push(e)
        } else if (e.N == '32') {
            _32Tres.push(e)
        } else if (e.N == '33') {
            _33Tres.push(e)
        } else if (e.N == '34') {
            _34Tres.push(e)
        } else if (e.N == '35') {
            _35Tres.push(e)
        } else if (e.N == '36') {
            _36Tres.push(e)
        } else if (e.N == '37') {
            _37Tres.push(e)
        } else if (e.N == '38') {
            _38Tres.push(e)
        } else if (e.N == '39') {
            _39Tres.push(e)
        } else if (e.N == '40') {
            _40Tres.push(e)
        } else if (e.N == '41') {
            _41Tres.push(e)
        } else if (e.N == '42') {
            _42Tres.push(e)
        } else if (e.N == '43') {
            _43Tres.push(e)
        } else if (e.N == '44') {
            _44Tres.push(e)
        } else if (e.N == '45') {
            _45Tres.push(e)
        } else if (e.N == '46') {
            _46Tres.push(e)
        } else if (e.N == '47') {
            _47Tres.push(e)
        } else if (e.N == '48') {
            _48Tres.push(e)
        } else if (e.N == '49') {
            _49Tres.push(e)
        } else if (e.N == '50') {
            _50Tres.push(e)
        } else if (e.N == '51') {
            _51Tres.push(e)
        } else if (e.N == '52') {
            _52Tres.push(e)
        } else if (e.N == '53') {
            _53Tres.push(e)
        } else if (e.N == '54') {
            _54Tres.push(e)
        } else if (e.N == '55') {
            _55Tres.push(e)
        } else if (e.N == '56') {
            _56Tres.push(e)
        } else if (e.N == '57') {
            _57Tres.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function processarAbaQuatro(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Quatro.push(e)
        } else if (e.N == '2') {
            _2Quatro.push(e)
        } else if (e.N == '3') {
            _3Quatro.push(e)
        } else if (e.N == '4') {
            _4Quatro.push(e)
        } else if (e.N == '5') {
            _5Quatro.push(e)
        } else if (e.N == '6') {
            _6Quatro.push(e)
        } else if (e.N == '7') {
            _7Quatro.push(e)
        } else if (e.N == '8') {
            _8Quatro.push(e)
        } else if (e.N == '9') {
            _9Quatro.push(e)
        } else if (e.N == '10') {
            _10Quatro.push(e)
        } else if (e.N == '11') {
            _11Quatro.push(e)
        } else if (e.N == '12') {
            _12Quatro.push(e)
        } else if (e.N == '13') {
            _13Quatro.push(e)
        } else if (e.N == '14') {
            _14Quatro.push(e)
        } else if (e.N == '15') {
            _15Quatro.push(e)
        } else if (e.N == '16') {
            _16Quatro.push(e)
        } else if (e.N == '17') {
            _17Quatro.push(e)
        } else if (e.N == '18') {
            _18Quatro.push(e)
        } else if (e.N == '19') {
            _19Quatro.push(e)
        } else if (e.N == '20') {
            _20Quatro.push(e)
        } else if (e.N == '21') {
            _21Quatro.push(e)
        } else if (e.N == '22') {
            _22Quatro.push(e)
        } else if (e.N == '23') {
            _23Quatro.push(e)
        } else if (e.N == '24') {
            _24Quatro.push(e)
        } else if (e.N == '25') {
            _25Quatro.push(e)
        } else if (e.N == '26') {
            _26Quatro.push(e)
        } else if (e.N == '27') {
            _27Quatro.push(e)
        } else if (e.N == '28') {
            _28Quatro.push(e)
        } else if (e.N == '29') {
            _29Quatro.push(e)
        } else if (e.N == '30') {
            _30Quatro.push(e)
        } else if (e.N == '31') {
            _31Quatro.push(e)
        } else if (e.N == '32') {
            _32Quatro.push(e)
        } else if (e.N == '33') {
            _33Quatro.push(e)
        } else if (e.N == '34') {
            _34Quatro.push(e)
        } else if (e.N == '35') {
            _35Quatro.push(e)
        } else if (e.N == '36') {
            _36Quatro.push(e)
        } else if (e.N == '37') {
            _37Quatro.push(e)
        } else if (e.N == '38') {
            _38Quatro.push(e)
        } else if (e.N == '39') {
            _39Quatro.push(e)
        } else if (e.N == '40') {
            _40Quatro.push(e)
        } else if (e.N == '41') {
            _41Quatro.push(e)
        } else if (e.N == '42') {
            _42Quatro.push(e)
        } else if (e.N == '43') {
            _43Quatro.push(e)
        } else if (e.N == '44') {
            _44Quatro.push(e)
        } else if (e.N == '45') {
            _45Quatro.push(e)
        } else if (e.N == '46') {
            _46Quatro.push(e)
        } else if (e.N == '47') {
            _47Quatro.push(e)
        } else if (e.N == '48') {
            _48Quatro.push(e)
        } else if (e.N == '49') {
            _49Quatro.push(e)
        } else if (e.N == '50') {
            _50Quatro.push(e)
        } else if (e.N == '51') {
            _51Quatro.push(e)
        } else if (e.N == '52') {
            _52Quatro.push(e)
        } else if (e.N == '53') {
            _53Quatro.push(e)
        } else if (e.N == '54') {
            _54Quatro.push(e)
        } else if (e.N == '55') {
            _55Quatro.push(e)
        } else if (e.N == '56') {
            _56Quatro.push(e)
        } else if (e.N == '57') {
            _57Quatro.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function processarAbaCinco(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Cinco.push(e)
        } else if (e.N == '2') {
            _2Cinco.push(e)
        } else if (e.N == '3') {
            _3Cinco.push(e)
        } else if (e.N == '4') {
            _4Cinco.push(e)
        } else if (e.N == '5') {
            _5Cinco.push(e)
        } else if (e.N == '6') {
            _6Cinco.push(e)
        } else if (e.N == '7') {
            _7Cinco.push(e)
        } else if (e.N == '8') {
            _8Cinco.push(e)
        } else if (e.N == '9') {
            _9Cinco.push(e)
        } else if (e.N == '10') {
            _10Cinco.push(e)
        } else if (e.N == '11') {
            _11Cinco.push(e)
        } else if (e.N == '12') {
            _12Cinco.push(e)
        } else if (e.N == '13') {
            _13Cinco.push(e)
        } else if (e.N == '14') {
            _14Cinco.push(e)
        } else if (e.N == '15') {
            _15Cinco.push(e)
        } else if (e.N == '16') {
            _16Cinco.push(e)
        } else if (e.N == '17') {
            _17Cinco.push(e)
        } else if (e.N == '18') {
            _18Cinco.push(e)
        } else if (e.N == '19') {
            _19Cinco.push(e)
        } else if (e.N == '20') {
            _20Cinco.push(e)
        } else if (e.N == '21') {
            _21Cinco.push(e)
        } else if (e.N == '22') {
            _22Cinco.push(e)
        } else if (e.N == '23') {
            _23Cinco.push(e)
        } else if (e.N == '24') {
            _24Cinco.push(e)
        } else if (e.N == '25') {
            _25Cinco.push(e)
        } else if (e.N == '26') {
            _26Cinco.push(e)
        } else if (e.N == '27') {
            _27Cinco.push(e)
        } else if (e.N == '28') {
            _28Cinco.push(e)
        } else if (e.N == '29') {
            _29Cinco.push(e)
        } else if (e.N == '30') {
            _30Cinco.push(e)
        } else if (e.N == '31') {
            _31Cinco.push(e)
        } else if (e.N == '32') {
            _32Cinco.push(e)
        } else if (e.N == '33') {
            _33Cinco.push(e)
        } else if (e.N == '34') {
            _34Cinco.push(e)
        } else if (e.N == '35') {
            _35Cinco.push(e)
        } else if (e.N == '36') {
            _36Cinco.push(e)
        } else if (e.N == '37') {
            _37Cinco.push(e)
        } else if (e.N == '38') {
            _38Cinco.push(e)
        } else if (e.N == '39') {
            _39Cinco.push(e)
        } else if (e.N == '40') {
            _40Cinco.push(e)
        } else if (e.N == '41') {
            _41Cinco.push(e)
        } else if (e.N == '42') {
            _42Cinco.push(e)
        } else if (e.N == '43') {
            _43Cinco.push(e)
        } else if (e.N == '44') {
            _44Cinco.push(e)
        } else if (e.N == '45') {
            _45Cinco.push(e)
        } else if (e.N == '46') {
            _46Cinco.push(e)
        } else if (e.N == '47') {
            _47Cinco.push(e)
        } else if (e.N == '48') {
            _48Cinco.push(e)
        } else if (e.N == '49') {
            _49Cinco.push(e)
        } else if (e.N == '50') {
            _50Cinco.push(e)
        } else if (e.N == '51') {
            _51Cinco.push(e)
        } else if (e.N == '52') {
            _52Cinco.push(e)
        } else if (e.N == '53') {
            _53Cinco.push(e)
        } else if (e.N == '54') {
            _54Cinco.push(e)
        } else if (e.N == '55') {
            _55Cinco.push(e)
        } else if (e.N == '56') {
            _56Cinco.push(e)
        } else if (e.N == '57') {
            _57Cinco.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function processarAbaSeis(content) {
    content.forEach(e => {
        if (e.N == '1') {
            _1Seis.push(e)
        } else if (e.N == '2') {
            _2Seis.push(e)
        } else if (e.N == '3') {
            _3Seis.push(e)
        } else if (e.N == '4') {
            _4Seis.push(e)
        } else if (e.N == '5') {
            _5Seis.push(e)
        } else if (e.N == '6') {
            _6Seis.push(e)
        } else if (e.N == '7') {
            _7Seis.push(e)
        } else if (e.N == '8') {
            _8Seis.push(e)
        } else if (e.N == '9') {
            _9Seis.push(e)
        } else if (e.N == '10') {
            _10Seis.push(e)
        } else if (e.N == '11') {
            _11Seis.push(e)
        } else if (e.N == '12') {
            _12Seis.push(e)
        } else if (e.N == '13') {
            _13Seis.push(e)
        } else if (e.N == '14') {
            _14Seis.push(e)
        } else if (e.N == '15') {
            _15Seis.push(e)
        } else if (e.N == '16') {
            _16Seis.push(e)
        } else if (e.N == '17') {
            _17Seis.push(e)
        } else if (e.N == '18') {
            _18Seis.push(e)
        } else if (e.N == '19') {
            _19Seis.push(e)
        } else if (e.N == '20') {
            _20Seis.push(e)
        } else if (e.N == '21') {
            _21Seis.push(e)
        } else if (e.N == '22') {
            _22Seis.push(e)
        } else if (e.N == '23') {
            _23Seis.push(e)
        } else if (e.N == '24') {
            _24Seis.push(e)
        } else if (e.N == '25') {
            _25Seis.push(e)
        } else if (e.N == '26') {
            _26Seis.push(e)
        } else if (e.N == '27') {
            _27Seis.push(e)
        } else if (e.N == '28') {
            _28Seis.push(e)
        } else if (e.N == '29') {
            _29Seis.push(e)
        } else if (e.N == '30') {
            _30Seis.push(e)
        } else if (e.N == '31') {
            _31Seis.push(e)
        } else if (e.N == '32') {
            _32Seis.push(e)
        } else if (e.N == '33') {
            _33Seis.push(e)
        } else if (e.N == '34') {
            _34Seis.push(e)
        } else if (e.N == '35') {
            _35Seis.push(e)
        } else if (e.N == '36') {
            _36Seis.push(e)
        } else if (e.N == '37') {
            _37Seis.push(e)
        } else if (e.N == '38') {
            _38Seis.push(e)
        } else if (e.N == '39') {
            _39Seis.push(e)
        } else if (e.N == '40') {
            _40Seis.push(e)
        } else if (e.N == '41') {
            _41Seis.push(e)
        } else if (e.N == '42') {
            _42Seis.push(e)
        } else if (e.N == '43') {
            _43Seis.push(e)
        } else if (e.N == '44') {
            _44Seis.push(e)
        } else if (e.N == '45') {
            _45Seis.push(e)
        } else if (e.N == '46') {
            _46Seis.push(e)
        } else if (e.N == '47') {
            _47Seis.push(e)
        } else if (e.N == '48') {
            _48Seis.push(e)
        } else if (e.N == '49') {
            _49Seis.push(e)
        } else if (e.N == '50') {
            _50Seis.push(e)
        } else if (e.N == '51') {
            _51Seis.push(e)
        } else if (e.N == '52') {
            _52Seis.push(e)
        } else if (e.N == '53') {
            _53Seis.push(e)
        } else if (e.N == '54') {
            _54Seis.push(e)
        } else if (e.N == '55') {
            _55Seis.push(e)
        } else if (e.N == '56') {
            _56Seis.push(e)
        } else if (e.N == '57') {
            _57Seis.push(e)
        }

        // Deletar propriedades
        delete e.N
    })
}

function createFile(data1, data2, data3, data4, data5, data6, name) {
    const wsNome1 = XLSX.utils.json_to_sheet(data1)
    const wsNome2 = XLSX.utils.json_to_sheet(data2)
    const wsNome3 = XLSX.utils.json_to_sheet(data3)
    const wsNome4 = XLSX.utils.json_to_sheet(data4)
    const wsNome5 = XLSX.utils.json_to_sheet(data5)
    const wsNome6 = XLSX.utils.json_to_sheet(data6)

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, wsNome1, "Mapa Parque");
    XLSX.utils.book_append_sheet(workbook, wsNome2, "Parque móvel");
    XLSX.utils.book_append_sheet(workbook, wsNome3, "Parque Básica");
    XLSX.utils.book_append_sheet(workbook, wsNome4, "Parque de avançada");
    XLSX.utils.book_append_sheet(workbook, wsNome5, "Parque TI");
    XLSX.utils.book_append_sheet(workbook, wsNome6, "Recomendações");

    const wbout = XLSX.writeFile(workbook, `${name}.xlsx`, { compression: true });
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