import React from 'react';

export function tempAlert(message, duration) {
    console.log(duration);
    var el = document.createElement('div');
    el.setAttribute(
        'style',
        'position:absolute;top:80%;left:50%;background-color:white;',


    );
    el.innerHTML = message;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
}
