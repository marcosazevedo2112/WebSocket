const socket = io();

let button = document.querySelector('#button');
let mensagem = document.querySelector('#m')
let caixa = document.querySelector('#messages')
let username = "";

function verificaUsuario(){
    if(localStorage.getItem('username') == null){
        username = prompt('Digite seu nome: ');
        localStorage.setItem('username', username);
    }else{
        username = localStorage.getItem('username');
    }
}
verificaUsuario();

button.addEventListener("click", function (e) {
  e.preventDefault();
  if(mensagem.value != ""){
    let datetime = new Date().toLocaleString();
    socket.emit('message', {data: mensagem.value, user: username, date: datetime});
    mensagem.value = "";
  }
  return false;
})

socket.on('message', (msg) => {
  let li = document.createElement("li");
  if(msg.user == username){
    li.classList.add("msg");
    li.innerHTML = "<p>"+ "<b>" + msg.user + " (Você)</b> " + "<small>" + msg.date + "</small>" + "<br>" + msg.data + "</p>";
  }else{
    li.innerHTML = "<p>"+ "<b>" + msg.user + "</b> " + "<small>" + msg.date + "</small>" + "<br>" + msg.data + "</p>";
  }
  caixa.appendChild(li);
  
  if(msg.user == username){
    document.querySelector("#container").scrollTo(0,caixa.lastChild.offsetTop);
  }
});