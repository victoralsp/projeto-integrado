import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, serverTimestamp, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const auth = getAuth(app)
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

// validação de user autenticado (header) 
const navUserLogado = document.getElementById('header-nav-logado')
const navUserDeslogado = document.getElementById('header-nav')

onAuthStateChanged(auth, async (user) => {

  const userDocRef = doc(db, "users", user.uid);
  const docSnapshot = await getDoc(userDocRef);
  const userData = docSnapshot.data();

  if (!user) {
      navUserDeslogado.style.display = 'block';
      navUserLogado.style.display = 'none';
  } else {
      navUserDeslogado.style.display = 'none';
      navUserLogado.style.display = 'block';
      navUserLogado.innerHTML += `Olá, ${userData.displayName}`
  }
});


const listaEventos = document.getElementById('lista-eventos')

async function carregarEventos() {
  try {
    const querySnapshot = await getDocs(collection(db, "postagens"))
    listaEventos.innerHTML = ''

    querySnapshot.forEach((doc) => {
      const evento = doc.data()
      listaEventos.innerHTML += 
      `
        <div class="evento"  data-aos="zoom-in" data-aos-duration="700" data-aos-once="true">
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
      `
    });

    const inputPesquisarEventos = document.getElementById('input-pesquisar-eventos');
    const cardsEventos = document.querySelectorAll('.evento');
    const mensagemNenhumEvento = document.getElementById('mensagem-nenhum-evento'); 
    
    inputPesquisarEventos.addEventListener('input', () => {
      const filtroEventos = inputPesquisarEventos.value.toLowerCase();
      let algumVisivel = false;
    
      cardsEventos.forEach(cardEvento => {
        const text = cardEvento.textContent.toLowerCase();
        const deveMostrar = text.includes(filtroEventos);
        cardEvento.style.display = deveMostrar ? 'block' : 'none';
    
        if (deveMostrar) {
          algumVisivel = true;
        }
      });
    
      mensagemNenhumEvento.style.display = algumVisivel ? 'none' : 'block';
    });
    


  } catch (error) {
    console.error("Erro ao carregar eventos:", error)
    listaEventos.innerHTML = "<p>Erro ao carregar eventos.</p>"
  }
}
carregarEventos()


