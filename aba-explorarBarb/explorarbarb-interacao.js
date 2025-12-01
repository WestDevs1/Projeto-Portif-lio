document.getElementById("btn1").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro.html";
});

document.getElementById("btn2").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro2.html";
});

document.getElementById("btn3").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro3.html";
});


const filtroCidade = document.querySelectorAll("select")[0];
const filtroCorte = document.querySelectorAll("select")[1];
const filtroPreco = document.querySelectorAll("select")[2];
const botaoLimpar = document.querySelector(".explorarbarbeiros__limpar-filtros");


const cards = document.querySelectorAll(".barbeiro__card");



function aplicarFiltros() {
    const cidadeSelecionada = filtroCidade.value;
    const corteSelecionado = filtroCorte.value;
    const precoSelecionado = filtroPreco.value;

    cards.forEach(card => {
        let mostrar = true;

        
        const loja = card.querySelector(".barbearia__loja").innerText; 
        const tags = [...card.querySelectorAll(".barbeiro__tags span")].map(tag => tag.innerText);
        const preco = extrairPrecoDaRegiao(loja); 

      
        if (cidadeSelecionada !== "Todas") {
            if (!loja.includes(cidadeSelecionada)) {
                mostrar = false;
            }
        }

    
        if (corteSelecionado !== "Todos") {
            if (!tags.includes(corteSelecionado)) {
                mostrar = false;
            }
        }

    
        if (precoSelecionado !== "Todos") {
            if (precoSelecionado === "Até RS30" && preco > 30) mostrar = false;
            if (precoSelecionado === "RS30-RS60" && (preco < 30 || preco > 60)) mostrar = false;
            if (precoSelecionado === "Acima de RS60" && preco < 60) mostrar = false;
        }

   
        card.style.display = mostrar ? "block" : "none";
    });
}


function extrairPrecoDaRegiao(lojaTexto) {
  
    if (lojaTexto.includes("Imbiribeira")) return 40;
    if (lojaTexto.includes("Iputinga")) return 50;
    if (lojaTexto.includes("Camaragibe")) return 35;

    return 50; 
}

filtroCidade.addEventListener("change", aplicarFiltros);
filtroCorte.addEventListener("change", aplicarFiltros);
filtroPreco.addEventListener("change", aplicarFiltros);


botaoLimpar.addEventListener("click", () => {
    filtroCidade.value = "Todas";
    filtroCorte.value = "Todos";
    filtroPreco.value = "Todos";

    aplicarFiltros();
});


aplicarFiltros();
