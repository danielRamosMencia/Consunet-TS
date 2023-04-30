//Este evento advierte al usuario de que el trabajo no guardado se perderá.
//Sólo lo implementa en "Views/main.html"
window.addEventListener('beforeunload', event => {
    event.preventDefault();
    event.returnValue = '';
})

