document.getElementById("btn1").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro.html";
});

document.getElementById("btn2").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro2.html";
});

document.getElementById("btn3").addEventListener("click", () => {
    window.location.href = "../aba-perfil-barbeiro/perfil-barbeiro3.html";
});

// ================================
// 1. PEGANDO OS ELEMENTOS DO HTML
// ================================
const filtroCidade = document.querySelectorAll("select")[0];
const filtroCorte = document.querySelectorAll("select")[1];
const filtroPreco = document.querySelectorAll("select")[2];
const botaoLimpar = document.querySelector(".explorarbarbeiros__limpar-filtros");

// Todos os cards de barbeiro
const cards = document.querySelectorAll(".barbeiro__card");


// ========================================
// 2. FUNÇÃO PARA APLICAR OS FILTROS
// ========================================
function aplicarFiltros() {
    const cidadeSelecionada = filtroCidade.value;
    const corteSelecionado = filtroCorte.value;
    const precoSelecionado = filtroPreco.value;

    cards.forEach(card => {
        let mostrar = true;

        // --- PEGAR AS INFORMAÇÕES DO CARD ---
        const loja = card.querySelector(".barbearia__loja").innerText; 
        const tags = [...card.querySelectorAll(".barbeiro__tags span")].map(tag => tag.innerText);
        const preco = extrairPrecoDaRegiao(loja); 

        // ========================================
        // FILTRO 1 → CIDADE
        // ========================================
        if (cidadeSelecionada !== "Todas") {
            if (!loja.includes(cidadeSelecionada)) {
                mostrar = false;
            }
        }

        // ========================================
        // FILTRO 2 → TIPO DE CORTE
        // ========================================
        if (corteSelecionado !== "Todos") {
            if (!tags.includes(corteSelecionado)) {
                mostrar = false;
            }
        }

        // ========================================
        // FILTRO 3 → PREÇO (SIMULAÇÃO)
        // ========================================
        if (precoSelecionado !== "Todos") {
            if (precoSelecionado === "Até RS30" && preco > 30) mostrar = false;
            if (precoSelecionado === "RS30-RS60" && (preco < 30 || preco > 60)) mostrar = false;
            if (precoSelecionado === "Acima de RS60" && preco < 60) mostrar = false;
        }

        // Mostrar ou esconder o card
        card.style.display = mostrar ? "block" : "none";
    });
}


// ========================================
// 3. FUNÇÃO OPCIONAL PARA DEFINIR PREÇO
// (pois no seu HTML ainda não há preço real)
// ========================================
function extrairPrecoDaRegiao(lojaTexto) {
    // Exemplo: você pode trocar depois por valor real
    // Baseado na cidade só para simular

    if (lojaTexto.includes("Imbiribeira")) return 40;
    if (lojaTexto.includes("Iputinga")) return 50;
    if (lojaTexto.includes("Camaragibe")) return 35;

    return 50; // preço padrão
}


// ========================================
// 4. EVENTOS DOS FILTROS
// ========================================
filtroCidade.addEventListener("change", aplicarFiltros);
filtroCorte.addEventListener("change", aplicarFiltros);
filtroPreco.addEventListener("change", aplicarFiltros);


// ========================================
// 5. BOTÃO DE LIMPAR
// ========================================
botaoLimpar.addEventListener("click", () => {
    filtroCidade.value = "Todas";
    filtroCorte.value = "Todos";
    filtroPreco.value = "Todos";

    aplicarFiltros();
});


// Inicializa mostrando tudo
aplicarFiltros();
