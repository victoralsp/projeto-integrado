const btnDarkMode = document.getElementById('btnDarkMode')
const articleRegistrar = document.getElementById('article-registrar')
const inputsDarkMode = document.getElementsByClassName('inputs-dark-mode')
let color = true

btnDarkMode.addEventListener('click', () => {
    if (color) {
        articleRegistrar.style.backgroundColor = 'var(--cor-dark-bg)'
        articleRegistrar.style.color = 'var(--cor-branca)'
        for(let i = 0; i < inputsDarkMode.length; i++) {
            inputsDarkMode[i].style.backgroundColor = `var(--cor-bg-input-dark)`
            inputsDarkMode[i].style.color = `var(--cor-bg-input)`
        }
        btnDarkMode.innerHTML = '<i class="fa-solid fa-sun"></i>'
    } else {
        articleRegistrar.style.backgroundColor = 'var(--cor-branca)'
        articleRegistrar.style.color = 'var(--cor-principal)'
        for(let i = 0; i < inputsDarkMode.length; i++) {
            inputsDarkMode[i].style.backgroundColor = `var(--cor-bg-input)`
            inputsDarkMode[i].style.color = `var(--cor-bg-input-dark)`
        }
        btnDarkMode.innerHTML = '<i class="fa-solid fa-moon"></i>'
    }
    color = !color
})


