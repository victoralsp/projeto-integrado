import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDcqw47MmWmF2B7NtsAJ5FFu4VS4B5tAS4",
  authDomain: "login-cadastro-72828.firebaseapp.com",
  projectId: "login-cadastro-72828",
  storageBucket: "login-cadastro-72828.firebasestorage.app",
  messagingSenderId: "364332563538",
  appId: "1:364332563538:web:fc78156ad3f08a001bb38b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

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

const username = document.getElementById('name');
const email = document.getElementById('email');
const logoutBtn = document.getElementById('logoutBtn');
const eventosContainer = document.getElementById('eventos-do-usuario');

onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      // Dados do usuário
      const userDocRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(userDocRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        username.textContent = userData.displayName;
        email.textContent = userData.email;
      } else {
        alert('Usuário não encontrado!');
      }

      // Eventos do usuário
      const postagensDoUsuario = query(collection(db, 'postagens'), where('criadorUid', '==', user.uid));
      const querySnapshot = await getDocs(postagensDoUsuario);

      if (querySnapshot.empty) {
        eventosContainer.innerHTML = `<p>Você ainda não publicou nenhum evento.</p>`;
        return;
      }

      querySnapshot.forEach((doc) => {
        const evento = doc.data();
        const eventoHTML = `
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
        `;
        eventosContainer.innerHTML += eventoHTML;
      });

    } catch (error) {
      console.error("Erro ao carregar perfil e eventos:", error);
      alert("Erro ao carregar dados do perfil.");
    }
  } else {
    window.location.href = '../index.html';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      window.location.href = '../pages/login.html';
    })
    .catch((error) => {
      console.error("Erro ao deslogar: ", error);
      alert("Falha ao deslogar sua conta.");
    });
});
