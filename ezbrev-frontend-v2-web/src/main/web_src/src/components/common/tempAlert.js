export function tempAlert(message, duration) {
    let el = document.createElement('div');
    el.setAttribute(
        'style',
        'position:absolute;top:70%;left:7%;background-color:#eeeeee;color:grey;font-size:150%'
    );
    el.innerHTML = message;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
}
