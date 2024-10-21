let pFDV = document.getElementById('FDVDrop')
let dFDV = document.getElementById('FDVOptions')
let pMP = document.getElementById('MapaParqueDrop')
let dMP = document.getElementById('MapaParqueOptions')
let pPB = document.getElementById('ParqueBasicaDrop')
let dPB = document.getElementById('ParqueBasicaOptions')
let pDP = document.getElementById('DivisorDrop')
let dDP = document.getElementById('DivisorOptions')
let pEA = document.getElementById('EmpresAquiDrop')
let dEA = document.getElementById('EmpresAquiOptions')
let pRM = document.getElementById('MailingDrop')
let dRM = document.getElementById('MailingOptions')
let pGF = document.getElementById('GerencialDrop')
let dGF = document.getElementById('GerencialOptions')
let pQL = document.getElementById('QuartilDrop')
let dQL = document.getElementById('QuartilOptions')
let pTB = document.getElementById('TabulacaoDrop')
let dTB = document.getElementById('TabulacaoOptions')
let pFV = document.getElementById('FichaVendasDrop')
let dFV = document.getElementById('FichaVendasOptions')

let as = document.querySelectorAll('a')

ScrollReveal().reveal('.delay', {delay: 500});

as.forEach(e => {
    if(!e.href) {
        e.classList.add('active')
    } else if(e.href || e.href.length === 7) {
        e.classList.add('desactive')
    }
})

pFDV.addEventListener('click', () => {
    dFDV.classList.toggle('hide')
})

pMP.addEventListener('click', () => {
    dMP.classList.toggle('hide')
})

pPB.addEventListener('click', () => {
    dPB.classList.toggle('hide')
})

pDP.addEventListener('click', () => {
    dDP.classList.toggle('hide')
})

pEA.addEventListener('click', () => {
    dEA.classList.toggle('hide')
})

pRM.addEventListener('click', () => {
    dRM.classList.toggle('hide')
})

pGF.addEventListener('click', () => {
    dGF.classList.toggle('hide')
})

pQL.addEventListener('click', () => {
    dQL.classList.toggle('hide')
})

pTB.addEventListener('click', () => {
    dTB.classList.toggle('hide')
})

pFV.addEventListener('click', () => {
    dFV.classList.toggle('hide')
})