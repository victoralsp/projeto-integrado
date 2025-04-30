import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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


const listaEventos = document.getElementById('lista-eventos')

async function carregarEventos() {
  try {
    const querySnapshot = await getDocs(collection(db, "postagens"))
    listaEventos.innerHTML = ''

    querySnapshot.forEach((doc) => {
      const evento = doc.data()

      listaEventos.innerHTML += 
      `
        <div class="evento">
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
    
    inputPesquisarEventos.addEventListener('input', () => {
      const filtroEventos = inputPesquisarEventos.value.toLowerCase();
    
      cardsEventos.forEach(cardEvento => {
        const text = cardEvento.textContent.toLowerCase();
        cardEvento.style.display = text.includes(filtroEventos) ? 'block' : 'none';
      });
    });
    


  } catch (error) {
    console.error("Erro ao carregar eventos:", error)
    listaEventos.innerHTML = "<p>Erro ao carregar eventos.</p>"
  }
}
carregarEventos()


