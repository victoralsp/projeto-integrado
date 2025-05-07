import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, serverTimestamp, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDcqw47MmWmF2B7NtsAJ5FFu4VS4B5tAS4",
  authDomain: "login-cadastro-72828.firebaseapp.com",
  projectId: "login-cadastro-72828",
  storageBucket: "login-cadastro-72828.firebasestorage.app",
  messagingSenderId: "364332563538",
  appId: "1:364332563538:web:fc78156ad3f08a001bb38b"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


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

document.getElementById('seta-direita').addEventListener('click', () => {
    categorias.style.transform = 'translateX(-120px)';
    moveCarrosselRight();
});

document.getElementById('seta-esquerda').addEventListener('click', () => {
    categorias.style.transform = 'translateX(120px)';
    moveCarrosselLeft();
});


// Puxar 3 ultimos eventos publicados 
const ultimasPublicacoes = document.getElementById('ultimos-eventos-publicados');

async function carregarEventos() {
  try {
    const eventosQuery = query(
      collection(db, "postagens"),
      orderBy("criadoEm", "desc"),
      limit(3)
    );

    const querySnapshot = await getDocs(eventosQuery);
    ultimasPublicacoes.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const evento = doc.data();

      ultimasPublicacoes.innerHTML += 
      `
        <div class="evento"  data-aos="flip-left" data-aos-duration="1000">
          ${evento.imagemUrl ? `<img src="${evento.imagemUrl}" alt="Imagem do evento">` : ''}
          <div class="infos-evento">
            <p class="categoria">${evento.categoria}</p>
            <h2 class="titulo">${evento.titulo}</h2>
            <div class="data-e-horario">
              <p class="data"><span class="strong-text">Data:</span> ${evento.data}</p>
              <div class="barra"></div>
              <p class="horario"><span class="strong-text">Horário:</span> ${evento.horario}</p>
            </div>
            <p class="local"><span class="strong-text">Local:</span> ${evento.local}</p>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
    ultimasPublicacoes.innerHTML = "<p>Erro ao carregar eventos.</p>";
  }
}

carregarEventos();