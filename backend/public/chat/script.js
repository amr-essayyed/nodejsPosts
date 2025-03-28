const socket = io();
const btnPost = document.getElementById('btn-post');

let route = location.pathname;



btnPost.onclick = async function(){
    const chatLine = document.getElementById('chat-line').value;
    console.log(chatLine);
    const chatLineEncoded =  JSON.stringify({chatLine}) 
    console.log(chatLineEncoded);
    const res = await fetch(
        route,
        {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: chatLineEncoded
        }
    )

    if(res.status === 201){
        // window.location.pathname = '/chat';
        // location.reload(true);
        console.log("halo: ", location.pathname);
        location.reload(true);
        setTimeout(()=>{
            scrollToBottom(document.querySelector('.chat'));
        },500);
        // window.location.href = window.location.href;
    }
}

socket.on('chatLineSent', loadChatLine);

function loadChatLine(chatLine){
    const chat = document.querySelector('.chat');
    chat.innerHTML += `<div class="chat-line your-line">${chatLine.message}</div>`
    scrollToBottom(chat);
}

function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
}