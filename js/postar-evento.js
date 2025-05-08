import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configuração do Firebase
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

// URL do seu endpoint do Cloudinary
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dirywq3hx/image/upload";
const cloudinaryPreset = "imagens-eventos"; 

const form = document.getElementById('form-evento');

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert('Você precisa estar logado para postar um evento.');
    window.location.href = '../pages/login.html';
    return;
  } else {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const titulo = document.getElementById('titulo').value.trim();
      const descricao = document.getElementById('descricao').value.trim();
      const data = document.getElementById('data').value;
      const local = document.getElementById('local').value.trim();
      const categoria = document.getElementById('categoria').value.trim();
      const horario = document.getElementById('horario').value;
      const imagemInput = document.getElementById('imagem');
      const file = imagemInput.files[0];
  
      if (!titulo || !descricao || !data || !local || !horario || !categoria || !file) {
        alert('Preencha todos os campos!');
        return;
      }
  
      try {
        // Enviar a imagem para o Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryPreset);
  
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: formData
        });
  
        const dataCloudinary = await response.json();
        
        if (dataCloudinary.secure_url) {
          const imagemUrl = dataCloudinary.secure_url;
  
          
          function formatarDataBrasileira(dataOriginal) {
            const dataObj = new Date(dataOriginal);
            const dia = String(dataObj.getDate()).padStart(2, '0');
            const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
            const ano = dataObj.getFullYear();
            return `${dia}/${mes}/${ano}`;
          }
          
          // Exemplo de uso:
          const dataFormatada = formatarDataBrasileira(data);
          
          // Depois salva no Firestore
          const docRef = await addDoc(collection(db, 'postagens'), {
            titulo,
            descricao,
            data: dataFormatada,
            local,
            categoria,
            horario,
            criadorUid: user.uid,
            criadoEm: serverTimestamp(),
            imagemUrl: imagemUrl 
          });
          
          
          alert('Evento publicado com sucesso!');
  
          // Exibir o evento na página, incluindo a imagem
          const evento = {
            titulo,
            descricao,
            data,
            local,
            categoria,
            horario,
            imagemUrl
          };
          
          form.reset(); 
        } else {
          alert('Erro ao fazer upload da imagem no Cloudinary');
        }
  
      } catch (error) {
        console.error("Erro ao postar evento:", error);
        alert('Erro ao postar evento.');
      }
    });
  }
});





