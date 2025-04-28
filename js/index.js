const iconMenu = document.getElementById('icon-menu')
const linksMenu = document.getElementById('header-links')
let menuAberto = false

iconMenu.addEventListener('click', ()=> {
    if(!menuAberto) {
        linksMenu.classList.add('active')
        iconMenu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    } else{
        linksMenu.classList.remove('active')
        iconMenu.innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
    menuAberto = !menuAberto
})



const categorias = document.getElementById('article-categorias');

// Função para mover o carrossel para a direita
function moveCarrosselRight() {
    const primeiro = categorias.firstElementChild;
    categorias.appendChild(primeiro);
    categorias.style.transition = 'none';
    categorias.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        categorias.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
}

// Função para mover o carrossel para a esquerda
function moveCarrosselLeft() {
    const ultimo = categorias.lastElementChild;
    categorias.prepend(ultimo);
    categorias.style.transition = 'none';
    categorias.style.transform = 'translateX(0)';
    
    setTimeout(() => {
        categorias.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
}

// Adicionando os eventos das setas
document.getElementById('seta-direita').addEventListener('click', () => {
    categorias.style.transform = 'translateX(-120px)';
    moveCarrosselRight();
});

document.getElementById('seta-esquerda').addEventListener('click', () => {
    categorias.style.transform = 'translateX(120px)';
    moveCarrosselLeft();
});
