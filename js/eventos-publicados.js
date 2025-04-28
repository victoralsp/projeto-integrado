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

      listaEventos.innerHTML += `
        <div class="evento">
          <h3>${evento.titulo}</h3>
          <p>${evento.descricao}</p>
          ${evento.imagemUrl ? `<img src="${evento.imagemUrl}" alt="Imagem do evento">` : ''}
          <p><strong>Data:</strong> ${evento.data}</p>
          <p><strong>Local:</strong> ${evento.local}</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error)
    listaEventos.innerHTML = "<p>Erro ao carregar eventos.</p>"
  }
}
carregarEventos()