const socket = io()
console.log("🚀 ~ ", "Connected!")

let user;

window.onload = () => {
    Swal.fire({
        title: 'Indentificate',
        text: 'Ingrese su email',
        input: "text",
        inputValidator: (value) => {
            return (!value || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) && "Necesitas ingresar un email para continuar"
        },
        confirmButtonText: 'OK'
      }).then((result) => {
        user = result.value
        socket.emit('auth', user)
      })
}

const chatbox = document.getElementById("chatbox")
const log = document.getElementById("log")

chatbox.addEventListener('keyup', e =>{
    if(e.key === "Enter"){
        console.log(chatbox.value)
        socket.emit('message',{user: user, message:chatbox.value})
    }
})

socket.on('messageLogs', data => {
    
    let messages = ""

    data.forEach(msg => {
        messages+= `${msg.user} dice ${msg.message}<br/>`
    });

    log.innerHTML=messages

})