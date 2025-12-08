
document.addEventListener("DOMContentLoaded", () => {

    
    const safeAddClick = (id, href) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", () => window.location.href = href);
    };
    safeAddClick("btn1", "../aba-perfil-barbeiro/perfil-barbeiro.html");
    safeAddClick("btn2", "../aba-perfil-barbeiro/perfil-barbeiro2.html");
    safeAddClick("btn3", "../aba-perfil-barbeiro/perfil-barbeiro3.html");

    
    const selects = Array.from(document.querySelectorAll("select"));
    const filtroCidade = selects[0] || null;
    const filtroCorte = selects[1] || null;
    const filtroPreco = selects[2] || null;

    const botaoLimpar = document.querySelector(".explorarbarbeiros__limpar-filtros");
    let cards = Array.from(document.querySelectorAll(".barbeiro__card"));

    
    let avaliacaoMinima = 0;
    const estrelasContainer = document.querySelector("#filtro-avaliacao");
    const estrelas = estrelasContainer ? Array.from(estrelasContainer.querySelectorAll("span")) : [];

   
    if (!estrelasContainer) console.warn("Container #filtro-avaliacao não encontrado no DOM.");

    
    estrelas.forEach(estrela => {
        estrela.addEventListener("click", () => {
            const novoValor = parseInt(estrela.dataset.stars, 10) || 0;
            if (avaliacaoMinima === novoValor) avaliacaoMinima = 0;
            else avaliacaoMinima = novoValor;

            
            estrelas.forEach((e, idx) => {
                if (idx < avaliacaoMinima) e.classList.add("ativa");
                else e.classList.remove("ativa");
            });

            console.log("[Filtro Estrelas] minimo setado:", avaliacaoMinima);
            aplicarFiltros();
        });
    });


    function extrairAvaliacaoDoCard(card) {
        if (!card) return 0;

        
        const possiveisClasses = [".avaliacao", ".avalicao", ".barbeiro__imagem .avaliacao", ".barbeiro__imagem .avalicao"];
        for (const sel of possiveisClasses) {
            const el = card.querySelector(sel);
            if (el && el.innerText) {
                const txt = el.innerText.trim();
                
                const matchNum = txt.match(/([\d]+(\.[\d]+)?)/);
                if (matchNum) return parseFloat(matchNum[0]);
                
                const countStars = (txt.match(/★/g) || []).length;
                if (countStars) return countStars;
                
                const num = parseFloat(txt.replace(",", "."));
                if (!isNaN(num)) return num;
            }
        }

        
        const dataRating = card.getAttribute("data-rating");
        if (dataRating) {
            const n = parseFloat(dataRating);
            if (!isNaN(n)) return n;
        }

        
        const spans = Array.from(card.querySelectorAll("span"));
        for (const s of spans) {
            if (s.innerText && s.innerText.includes("★")) {
                const t = s.innerText.trim();
                const match = t.match(/([\d]+(\.[\d]+)?)/);
                if (match) return parseFloat(match[0]);
                const cs = (t.match(/★/g) || []).length;
                if (cs) return cs;
            }
        }

        
        return 0;
    }

   
    function extrairPrecoDaRegiao(lojaTexto) {
        if (!lojaTexto) return 50;
        if (lojaTexto.includes("Imbiribeira")) return 40;
        if (lojaTexto.includes("Iputinga")) return 50;
        if (lojaTexto.includes("Camaragibe")) return 35;
        return 50;
    }

   
    function aplicarFiltros() {
        
        cards = Array.from(document.querySelectorAll(".barbeiro__card"));

        const cidadeSelecionada = filtroCidade ? filtroCidade.value : "Todas";
        const corteSelecionado = filtroCorte ? filtroCorte.value : "Todos";
        const precoSelecionado = filtroPreco ? filtroPreco.value : "Todos";

        console.log("[APLICAR FILTROS] cidade:", cidadeSelecionada, "corte:", corteSelecionado, "preco:", precoSelecionado, "avaliacaoMinima:", avaliacaoMinima);

        cards.forEach(card => {
            let mostrar = true;

            const lojaEl = card.querySelector(".barbearia__loja");
            const loja = lojaEl ? lojaEl.innerText : "";

            const tags = Array.from(card.querySelectorAll(".barbeiro__tags span")).map(t => t.innerText.trim());
            const preco = extrairPrecoDaRegiao(loja);
            const avaliacao = extrairAvaliacaoDoCard(card);

            
            const nome = (card.querySelector("h3") && card.querySelector("h3").innerText) || "sem-nome";
            console.log(`Card -> ${nome} | avaliacao:${avaliacao} | preco:${preco} | loja:"${loja}" | tags: [${tags.join(", ")}]`);

            
            if (cidadeSelecionada && cidadeSelecionada !== "Todas") {
                if (!loja.includes(cidadeSelecionada)) mostrar = false;
            }

            
            if (corteSelecionado && corteSelecionado !== "Todos") {
                if (!tags.includes(corteSelecionado)) mostrar = false;
            }

            
            if (precoSelecionado && precoSelecionado !== "Todos") {
                if (precoSelecionado === "30" && preco > 30) mostrar = false;
                if (precoSelecionado === "40" && (preco < 30 || preco > 60)) mostrar = false;
                if (precoSelecionado === "60" && preco < 60) mostrar = false;
            }

            
            if (avaliacaoMinima > 0) {
                if (avaliacao < avaliacaoMinima) mostrar = false;
            }

            card.style.display = mostrar ? "block" : "none";
        });
    }

    if (filtroCidade) filtroCidade.addEventListener("change", aplicarFiltros);
    if (filtroCorte) filtroCorte.addEventListener("change", aplicarFiltros);
    if (filtroPreco) filtroPreco.addEventListener("change", aplicarFiltros);

    
    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", () => {
            if (filtroCidade) filtroCidade.value = "Todas";
            if (filtroCorte) filtroCorte.value = "Todos";
            if (filtroPreco) filtroPreco.value = "Todos";

            avaliacaoMinima = 0;
            estrelas.forEach(e => e.classList.remove("ativa"));

            aplicarFiltros();
        });
    } else {
        console.warn("Botão Limpar Filtros não encontrada: .explorarbarbeiros__limpar-filtros");
    }


    aplicarFiltros();

    const areaBarbeiros = document.querySelector(".explorarbarbeiros__barbeiros");
    if (areaBarbeiros) {
        const mo = new MutationObserver(() => {
            cards = Array.from(document.querySelectorAll(".barbeiro__card"));
            aplicarFiltros();
        });
        mo.observe(areaBarbeiros, { childList: true, subtree: true });
    }
});
