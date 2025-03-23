function validarFormulario() {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const erroNome = document.getElementById('error-nome')
    const erroEmail = document.getElementById('error-email')
    const erroSenha = document.getElementById('error-senha')
    const iconeNome = document.querySelector('#input-nome .icones-input');
    const iconeEmail = document.querySelector('#input-email .icones-input');
    const iconeSenha = document.querySelector('#input-senha .icones-input');
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
            isValid = false
        } else {
            iconeEmail.style.transform = ''
            erroEmail.style.display = 'none'
        }
        // Validação da senha 
        if (senha == '' || senha < 6) {
            erroSenha.style.display = 'block'
            iconeSenha.style.transform = 'translateY(-15px)'
            isValid = false
        } else {
            erroSenha.style.display = 'none'
            iconeSenha.style.transform = ''
        }
        // Envia o formulário caso esteja tudo preenchido corretamente
        return isValid;
}

// Visualizar senha 
const iconeVisualizarSenha = document.getElementById('iconeVisualizarSenha')
const iconeEsconderSenha = document.getElementById('iconeEsconderSenha')
const senha = document.getElementById('senha')

iconeVisualizarSenha.addEventListener('click', ()=> {
    if(senha.type == 'password') {
        senha.type= 'text'
        iconeEsconderSenha.classList.add('active')
        iconeVisualizarSenha.classList.add('active')
    } else {
        senha.type= 'password'        
        iconeEsconderSenha.classList.remove('active')
        iconeVisualizarSenha.classList.remove('active')
    }
})