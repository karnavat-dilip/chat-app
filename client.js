const socket = io()
const textarea = document.querySelector('#textarea')
const message_area = document.querySelector('.message_area')
console.log();
let Name;

do {
    Name = prompt("please Enter your name: ")
} while (!Name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendmessage(e.target.value)
        textarea.value = ""
        console.log(textarea.value);
    }
})

// console.log(typeof span);
// console.log(span.innerHTML, i);
// messageclass.appendChild(span)
// function icon(e) {
//     console.log(e.pageX + "px");
//     const dropdown = document.getElementById('dropdown')
//     console.log(e.pointerId, this);
//     dropdown.classList.add('show')
//     dropdown.style.left = e.pageX + "px";
//     dropdown.style.position = "absolute"
//     dropdown.style.top = e.pageY + "px";
// }
console.log(document.getElementsByClassName('spanclass'));

window.onclick = function (event) {

    if (!event.target.matches('.spanclass')) {
        var navbar = document.getElementsByClassName("navbar");
        console.log(navbar.length);
        var i;
        for (i = 0; i < navbar.length; i++) {
            var opennavbar = navbar[i];
            if (opennavbar.classList.contains('show')) {
                opennavbar.classList.remove('show')
            }
        }
    }
}

function sendmessage(msg) {
    let message = {
        user: Name,
        msg: msg.trim()
    }

    Appendmessage(message, 'outgoing')

    scrollToBottom()

    if (message.msg) {
        socket.emit('msg', message)
    }
}
function Appendmessage(message, type) {
    maindiv = document.createElement('div')
    maindiv.classList.add(type, 'message')

    let markup = `
    <h4>${message.user}</h4>
    <p>${message.msg}</p>
    `
    // maindiv.addEventListener('mouseenter', (e) => {
    //     var span = document.createElement('span')
    //     var i = document.createElement('i')
    //     i.innerHTML = '&#xf142;'
    //     i.classList.add('fa')
    //     span.setAttribute('id', 'iconid')
    //     i.classList.add('spanclass')
    //     i.onclick = icon
    //     // console.log(i.setAttribute('id','iconid'));
    //     // console.log(i,span);
    //     span.appendChild(i)
    //     maindiv.appendChild(span)
    // })
    // maindiv.addEventListener('mouseleave',()=>{
    //     document.getElementById('iconid').remove()
    // })
    // console.log(document.getElementById('iconid'));
    // console.log(typeof maindiv.appendChild(span));
    // console.log(typeof maindiv.appendChild(span));
    if (message.msg) {
        message_area.appendChild(maindiv)
        maindiv.innerHTML = markup
    }
}

socket.on('msg', (msg) => {
    Appendmessage(msg, 'incoming')
    console.log(msg);
    scrollToBottom()
})

var div = document.createElement('div')
var i = document.createElement('i')
i.classList.add('fa', 'arrowicon')
i.setAttribute('id', 'arrowid')
i.innerHTML = '&#xf107;'
div.appendChild(i)
message_area.appendChild(div)
div.addEventListener('click', () => {
    message_area.scrollTop = message_area.scrollHeight
})
var lastscrolltop = 0;
var scrolldown = document.getElementById('arrowid');
message_area.addEventListener('scroll', () => {

    if (Math.abs(message_area.scrollHeight - message_area.clientHeight - message_area.scrollTop) < 1) {
        scrolldown.style.opacity = '0'
    } else {
        scrolldown.style.opacity = '1'
    }
})


function scrollToBottom() {
    message_area.scrollTop = message_area.scrollHeight
}