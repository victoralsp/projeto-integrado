import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"
 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"

import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"

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

 const username = document.getElementById('name')
 const email = document.getElementById('email')
 const logoutBtn = document.getElementById('logoutBtn')

 onAuthStateChanged(auth, (user) => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid)
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data()
                    username.textContent = userData.displayName
                    email.textContent = userData.email
                } else {
                    alert('Usúario não encontrado!')
                }
        })
        .catch((error) => {
            console.error("Erro ao procurar os dados do usúario:", error)
            alert("Falha ao encontrar dados do usúario")
        }) 
    } else {
        window.location.href = '../index.html'
    }
 })

 logoutBtn.addEventListener('click', ()=> {
    signOut(auth)
    .then(() => {
        window.location.href = '../pages/login.html'
    })
    .catch((error) => {
        console.error("Erro ao deslogar: ", error)
        alert ("Falha ao deslogar sua conta.")
    })
 })
 
