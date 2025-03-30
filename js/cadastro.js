import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"

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
const db = getFirestore(app)

const formRegistro = document.getElementById('form-registro')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmarSenha = document.getElementById('confirmar-password')
let usernameValue, emailValue, passwordValue, confirmarSenhaValue


formRegistro.addEventListener('submit', function(event) {
    event.preventDefault()

    usernameValue = username.value.trim()
    emailValue = email.value.trim()
    passwordValue = password.value.trim()
    confirmarSenhaValue = confirmarSenha.value.trim()

    if (!validarFormulario(usernameValue, emailValue, passwordValue, confirmarSenhaValue)) return

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: usernameValue
            }).then(() => {
                window.location.href = "../pages/perfil.html"
            })
        })
        .catch((error) => {
            const errorMessage = error.message
            console.log(errorMessage)
        })
})

function validarFormulario(usernameValue, emailValue, passwordValue, confirmarSenhaValue) {
    const erroNome = document.getElementById('error-nome')
    const erroEmail = document.getElementById('error-email')
    const erroSenha = document.getElementById('error-senha')
    const erroConfirmarSenha = document.getElementById('error-confirmar-senha')
    const iconeNome = document.querySelector('#input-nome .icones-input')
    const iconeEmail = document.querySelector('#input-email .icones-input')
    const iconeSenha = document.querySelector('#input-senha .icones-input')
    const iconeConfirmarSenha = document.querySelector('#input-confirmar-senha .icones-input-confirmar')
    let isValid = true

    if (usernameValue == '') {
        erroNome.style.display = 'block'
        iconeNome.style.transform = 'translateY(-15px)'
        isValid = false
    } else {
        erroNome.style.display = 'none'
        iconeNome.style.transform = ''
    }

    if (emailValue == '') {
        iconeEmail.style.transform = 'translateY(-15px)'
        erroEmail.style.display = 'block'
        isValid = false
    } else {
        iconeEmail.style.transform = ''
        erroEmail.style.display = 'none'
    }

    if (passwordValue == '' || passwordValue.length < 6) {
        erroSenha.style.display = 'block'
        iconeSenha.style.transform = 'translateY(-15px)'
        isValid = false
    } else {
        erroSenha.style.display = 'none'
        iconeSenha.style.transform = ''
    }

    if (passwordValue != confirmarSenhaValue) {
        erroConfirmarSenha.style.display = 'block'
        iconeConfirmarSenha.style.transform = 'translateY(-15px)'
        isValid = false
    } else {
        erroConfirmarSenha.style.display = 'none'
        iconeConfirmarSenha.style.transform = ''
    }

    return isValid
}

function togglePasswordVisibility(input, iconeMostrar, iconeEsconder) {
    if (input.type === 'password') {
        input.type = 'text'
        iconeEsconder.classList.add('active')
        iconeMostrar.classList.add('active')
    } else {
        input.type = 'password'
        iconeEsconder.classList.remove('active')
        iconeMostrar.classList.remove('active')
    }
}

const iconeVisualizarSenha = document.getElementById('iconeVisualizarSenha')
const iconeEsconderSenha = document.getElementById('iconeEsconderSenha')

iconeVisualizarSenha.addEventListener('click', () => {
    togglePasswordVisibility(password, iconeVisualizarSenha, iconeEsconderSenha)
})

const iconeVisualizarConfirmarSenha = document.getElementById('iconeVisualizarConfirmarSenha')
const iconeEsconderConfirmarSenha = document.getElementById('iconeEsconderConfirmarSenha')

iconeVisualizarConfirmarSenha.addEventListener('click', () => {
    togglePasswordVisibility(confirmarSenha, iconeVisualizarConfirmarSenha, iconeEsconderConfirmarSenha)
})
