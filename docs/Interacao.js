document.getElementById("btnEntrar").addEventListener("click", function() {
    window.open("../aba-login/login.html", "_self");
});

document.getElementById("explorarBotao").addEventListener("click", function() {
    window.open("../aba-explorarBarb/explorarbarb.html", "_self");
});

document.getElementById("criarBotao").addEventListener("click", function() {
    window.open("../aba-criarPortifolio/criarPortifolio.html", "_self");
});

document.getElementById("comecarAgora").addEventListener("click", function() {
    window.open("../aba-criarPortifolio/criarPortifolio.html", "_self"); window.history.back();
});
