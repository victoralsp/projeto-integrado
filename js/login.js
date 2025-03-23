import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyDcqw47MmWmF2B7NtsAJ5FFu4VS4B5tAS4",
    authDomain: "login-cadastro-72828.firebaseapp.com",
    projectId: "login-cadastro-72828",
    storageBucket: "login-cadastro-72828.firebasestorage.app",
    messagingSenderId: "364332563538",
    appId: "1:364332563538:web:fc78156ad3f08a001bb38b"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const loginButton = document.getElementById('login')

loginButton.addEventListener('click', (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }))
        window.location.href = '../pages/perfil.html'
    })
    .catch((error) => {
        const errorMessage = error.message
        alert(`Erro no login: ${errorMessage}`)
    })
})


// Visualizar senha
const iconeVisualizarSenha = document.getElementById('iconeVisualizarSenha')
const iconeEsconderSenha = document.getElementById('iconeEsconderSenha')
const senha = document.getElementById('password')

iconeVisualizarSenha.addEventListener('click', () => {
    if (senha.type == 'password') {
        senha.type = 'text'
        iconeEsconderSenha.classList.add('active')
        iconeVisualizarSenha.classList.add('active')
    } else {
        senha.type = 'password'
        iconeEsconderSenha.classList.remove('active')
        iconeVisualizarSenha.classList.remove('active')
    }
})