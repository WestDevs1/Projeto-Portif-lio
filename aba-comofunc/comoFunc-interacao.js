
function aplicarZoom(imagem) {
    
    imagem.addEventListener('mouseover', function() {
        imagem.style.transform = 'scale(1.3)'; // Aumenta a imagem em 30%
    });
    imagem.addEventListener('mouseout', function() {
        imagem.style.transform = 'scale(1)'; // Retorna ao tamanho normal
    });
}
const imagens = document.querySelectorAll('.flex-container .img');
imagens.forEach(imagem => {
    aplicarZoom(imagem); // Chama a função para aplicar o zoom
});
