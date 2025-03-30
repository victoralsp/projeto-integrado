import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyDcqw47MmWmF2B7NtsAJ5FFu4VS4B5tAS4",
    authDomain: "login-cadastro-72828.firebaseapp.com",
    projectId: "login-cadastro-72828",
    storageBucket: "login-cadastro-72828.firebasestorage.app",
    messagingSenderId: "364332563538",
    appId: "1:364332563538:web:fc78156ad3f08a001bb38b"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const formLogin = document.getElementById('form-login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const dadosIncorretos = document.getElementById('erro-dados-incorretos')
let emailValue, passwordValue

formLogin.addEventListener('submit', (event) => {
    event.preventDefault()

    emailValue = email.value.trim()
    passwordValue = password.value.trim()

    if (!validarFormularioLogin(emailValue, passwordValue)) return

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }))
        window.location.href = '../pages/perfil.html'
    })
    .catch((error) => {
        const errorMessage = error.message
        console.log(`Erro no login: ${errorMessage}`)
        dadosIncorretos.style.display = 'block'
    })
})


function validarFormularioLogin(emailValue, passwordValue) {
    const erroEmailLogin = document.getElementById('error-email-login')
    const erroSenhaLogin = document.getElementById('error-senha-login')
    let isValid = true

    if (emailValue == '') {
        erroEmailLogin.style.display = 'block'
        isValid = false
    } else {
        erroEmailLogin.style.display = 'none'
    }

    if (passwordValue == '') {
        erroSenhaLogin.style.display = 'block'
        isValid = false
    } else {
        erroSenhaLogin.style.display = 'none'
    }
    if (passwordValue.length < 6) {
        erroSenhaLogin.style.display = 'block'
        erroSenhaLogin.textContent = 'Sua senha precisa ter no mínimo 6 caracteres.'
        isValid = false
    } else {
        erroSenhaLogin.style.display = 'none'
    }

    return isValid
}


// Visualizar senha
const iconeVisualizarSenha = document.getElementById('iconeVisualizarSenha')
const iconeEsconderSenha = document.getElementById('iconeEsconderSenha')

iconeVisualizarSenha.addEventListener('click', () => {
    if (password.type == 'password') {
        password.type = 'text'
        iconeEsconderSenha.classList.add('active')
        iconeVisualizarSenha.classList.add('active')
    } else {
        password.type = 'password'
        iconeEsconderSenha.classList.remove('active')
        iconeVisualizarSenha.classList.remove('active')
    }
})