import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"


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
const btnRedefinirSenha = document.getElementById('redefinir-senha')
const btnValue = document.getElementById('btnValue')
const spinner = document.getElementById('spinner')
let emailValue, passwordValue

function logarUsuario(emailValue, passwordValue) {
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }))
            window.location.href = '../pages/perfil.html'
        })
        .catch((error) => {
            const errorMessage = error.message
            console.log(`Erro no login: ${errorMessage}`)
            spinner.classList.remove('active')
            btnValue.classList.remove('active')
            dadosIncorretos.style.display = 'block'
        })
}

formLogin.addEventListener('submit', (event) => {
    event.preventDefault()

    emailValue = email.value.trim()
    passwordValue = password.value.trim()

    spinner.classList.add('active')
    btnValue.classList.add('active')

    if (!validarFormularioLogin(emailValue, passwordValue)) return
    logarUsuario(emailValue, passwordValue)
})

let redefinirSenha = () => {
    sendPasswordResetEmail(auth, emailValue)
        .then(() => {
            dadosIncorretos.style.display = 'none'
            alert('Foi enviado um link de redefinição de senha para o seu e-mail.')
        })
        .catch((error) => {
            console.log(error.code, error.message)
            alert('Tente logar antes de redefinir sua senha.')
        })
}

btnRedefinirSenha.addEventListener('click', redefinirSenha)

function validarFormularioLogin(emailValue, passwordValue) {
    const erroEmailLogin = document.getElementById('error-email-login')
    const erroSenhaLogin = document.getElementById('error-senha-login')
    let isValid = true

    if (emailValue == '') {
        erroEmailLogin.style.display = 'block'
        spinner.classList.remove('active')
        btnValue.classList.remove('active')
        isValid = false
    } else {
        erroEmailLogin.style.display = 'none'
    }

    if (passwordValue == '') {
        erroSenhaLogin.style.display = 'block'
        spinner.classList.remove('active')
        btnValue.classList.remove('active')
        isValid = false
    } else {
        erroSenhaLogin.style.display = 'none'
    }
    if (passwordValue.length < 6) {
        erroSenhaLogin.style.display = 'block'
        spinner.classList.remove('active')
        btnValue.classList.remove('active')
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