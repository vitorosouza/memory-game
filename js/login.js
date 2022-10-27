const input = document.querySelector('.login__input'); 
const button = document.querySelector('.login__button'); 
const form = document.querySelector('.login--form');

//Logica para tirar o estado de disabled e para validar que quando apague tudo do input, o botão fique disabled
const validatedInput = ({ target }) => { 
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return
  }
  
  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();
  
  //Quando enviar o formulário, vai salvar o input
  // e mudar de página.
  localStorage.setItem('player', input.value);
  window.location = 'pages/game.html'

}


input.addEventListener('input', validatedInput);
form.addEventListener('submit', handleSubmit);
