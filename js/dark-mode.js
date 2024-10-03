const articleRegistrar = document.getElementById('article-registrar')
const btnRegistrar = document.getElementById('btn-registrar')
const btnDarkMode = document.getElementById('btnDarkMode')
const subtituloLogin = document.getElementById('subtitulo-login')
const paragrafoLogin = document.getElementById('paragrafo-login')
const iconesInput = document.querySelectorAll('.icones-input')
let color = true

btnDarkMode.addEventListener('click', () => {
    if (color) {
        articleRegistrar.style.backgroundColor = 'var(--cor-dark-bg)'
        articleRegistrar.style.color = 'var(--cor-branca)'
        btnRegistrar.style.backgroundColor = 'var(--cor-branca)'
        btnRegistrar.style.color = 'var(--cor-principal)'
        subtituloLogin.style.color = 'var(--cor-branca)'
        paragrafoLogin.style.color = 'var(--cor-branca)'
        btnDarkMode.innerHTML = '<i class="fa-solid fa-sun"></i>'
    } else {
        articleRegistrar.style.backgroundColor = 'var(--cor-branca)'
        articleRegistrar.style.color = 'var(--cor-principal)'
        btnRegistrar.style.backgroundColor = 'var(--cor-principal)'
        btnRegistrar.style.color = 'var(--cor-branca)'
        subtituloLogin.style.color = 'var(--cor-principal)'
        paragrafoLogin.style.color = 'var(--cor-principal)'
        btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
    }
    color = !color
})


