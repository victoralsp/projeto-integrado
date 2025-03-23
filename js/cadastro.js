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

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const formRegistro = document.getElementById('form-registro')
const submitButton = document.getElementById('btn-registrar')

formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    if (!validarFormulario()) return

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: username
            }).then(() => {
                console.log("Redirecionando para a página perfil.html")
                window.location.href = "../pages/perfil.html"
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

function validarFormulario() {
    const nome = document.getElementById('username').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('password').value
    const confirmarSenha = document.getElementById('confirmar-password').value
    const erroNome = document.getElementById('error-nome')
    const erroEmail = document.getElementById('error-email')
    const erroSenha = document.getElementById('error-senha')
    const erroConfirmarSenha = document.getElementById('error-confirmar-senha')
    const iconeNome = document.querySelector('#input-nome .icones-input')
    const iconeEmail = document.querySelector('#input-email .icones-input')
    const iconeSenha = document.querySelector('#input-senha .icones-input')
    const teste = document.querySelector('#input-confirmar-senha .icones-input-confirmar')
    let isValid = true

    // Validação do nome
    if (nome == '') {
        erroNome.style.display = 'block'
        iconeNome.style.transform = 'translateY(-15px)'
        isValid = false
    } else {
        erroNome.style.display = 'none'
        iconeNome.style.transform = ''
    }

    // Validação do email
    if (email == '') {
        iconeEmail.style.transform = 'translateY(-15px)'
        erroEmail.style.display = 'block'
        isValid = false;
    } else {
        iconeEmail.style.transform = ''
        erroEmail.style.display = 'none'
    }

    // Validação da senha
    if (senha == '' || senha.length < 6) {
        erroSenha.style.display = 'block'
        iconeSenha.style.transform = 'translateY(-15px)'
        isValid = false
    } else {
        erroSenha.style.display = 'none'
        iconeSenha.style.transform = ''
    }

    if (senha != confirmarSenha) {
        erroConfirmarSenha.style.display = 'block'
        teste.style.transform = 'translateY(-15px)'
        isValid = false;
    } else {
        erroConfirmarSenha.style.display = 'none'
        teste.style.transform = ''
    }

    return isValid;
}




// Função para alternar visibilidade da senha
function togglePasswordVisibility(input, iconeMostrar, iconeEsconder) {
    if (input.type === 'password') {
        input.type = 'text';
        iconeEsconder.classList.add('active');
        iconeMostrar.classList.add('active');
    } else {
        input.type = 'password';
        iconeEsconder.classList.remove('active');
        iconeMostrar.classList.remove('active');
    }
}

// Selecionando os elementos para "Senha"
const iconeVisualizarSenha = document.getElementById('iconeVisualizarSenha');
const iconeEsconderSenha = document.getElementById('iconeEsconderSenha');
const senha = document.getElementById('password');

// Evento para alternar visibilidade da senha
iconeVisualizarSenha.addEventListener('click', () => {
    togglePasswordVisibility(senha, iconeVisualizarSenha, iconeEsconderSenha);
});

// Selecionando os elementos para "Confirmar Senha"
const iconeVisualizarConfirmarSenha = document.getElementById('iconeVisualizarConfirmarSenha');
const iconeEsconderConfirmarSenha = document.getElementById('iconeEsconderConfirmarSenha');
const confirmarSenha = document.getElementById('confirmar-password');

// Evento para alternar visibilidade da senha de confirmação
iconeVisualizarConfirmarSenha.addEventListener('click', () => {
    togglePasswordVisibility(confirmarSenha, iconeVisualizarConfirmarSenha, iconeEsconderConfirmarSenha);
});
