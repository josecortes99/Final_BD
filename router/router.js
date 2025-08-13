import { routes } from '../routes/routes.js'

window.addEventListener('hashchange', () => {
    if (window.location.hash == '') {
        window.location.hash = '#/customers'
    }
    let path = window.location.hash;
    routes[path]();
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash == '') {
        window.location.hash = '#/customers'
    }
    let path = window.location.hash;
    routes[path]();
});