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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// URL do seu endpoint do Cloudinary
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dirywq3hx/image/upload";
const cloudinaryPreset = "imagens-eventos"; // Altere para o preset que você criou no Cloudinary

const form = document.getElementById('form-evento');

// Verifica se o usuário está logado
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert('Você precisa estar logado para postar um evento.');
    window.location.href = '../pages/login.html';
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value.trim();
    const imagemInput = document.getElementById('imagem');
    const file = imagemInput.files[0];

    if (!titulo || !descricao || !data || !local || !file) {
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
        const imagemUrl = dataCloudinary.secure_url; // URL da imagem no Cloudinary

        // Salvar o evento no Firestore com a URL da imagem
        const docRef = await addDoc(collection(db, 'postagens'), {
          titulo,
          descricao,
          data,
          local,
          criadorUid: user.uid,
          criadoEm: serverTimestamp(),
          imagemUrl: imagemUrl // Adiciona a URL da imagem no Firestore
        });
        
        alert('Evento publicado com sucesso!');

        // Exibir o evento na página, incluindo a imagem
        const evento = {
          titulo,
          descricao,
          data,
          local,
          imagemUrl
        };

        const eventoContainer = document.getElementById('evento-publicado');
        eventoContainer.innerHTML = `
          <h3>${evento.titulo}</h3>
          <p>${evento.descricao}</p>
          <p>Data: ${evento.data}</p>
          <p>Local: ${evento.local}</p>
          <img src="${evento.imagemUrl}" alt="Imagem do evento">
        `;

        form.reset(); // Limpar o formulário
      } else {
        alert('Erro ao fazer upload da imagem no Cloudinary');
      }

    } catch (error) {
      console.error("Erro ao postar evento:", error);
      alert('Erro ao postar evento.');
    }
  });
});



