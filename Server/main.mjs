import { iniciarValidaciones } from "./validaciones.mjs";

iniciarValidaciones();

// MOSTRAR Y OCULTAR MENÚ
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close');

// MOSTRAR MENÚ
// validar si existe
if(navToggle){
        navToggle.addEventListener('click', () => {
                navMenu.classList.add('show-menu');
        });
};

// OCULTAR MENÚ
// validar si existe
if(navClose){
        navClose.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
        });
}

// ---------------------QUITAR MENÚ AL HACER CLICK A UN ELEMENTO----------------------
const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
        // Cuando clickeamos en cada nav link, removemos el show-menu
        navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));



// -------------------MODO OSCURO------------------

const darkMode = document.getElementById('dark-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bi-brightness-high'

// tema seleccionado anteriormente
const selectedTheme =localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => darkMode.classList.contains(iconTheme) ? 'bi-moon' : 'bi-brightness-high';

if(selectedTheme){
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        darkMode.classList[selectedIcon === 'bi-moon' ? 'add' : 'remove'](iconTheme);
}

darkMode.addEventListener('click', () => {
        // Agregamos o eliminamos el dark / icon theme
        document.body.classList.toggle(darkTheme);
        darkMode.classList.toggle(iconTheme);

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
});

// --------------- CAMBIAR ENTRE LA SECCIÓN DE ESTUDIOS Y TRABAJO---------------
const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]');

        tabs.forEach(tab => tab.addEventListener('click', (e) => {
                const target = document.querySelector(tab.dataset.target);
                tabContents.forEach(content => content.classList.remove('experience-active'));
                target.classList.add('experience-active');
                tabs.forEach(tab1=>{
                        tab1.classList.remove('experience-active');
                })
                tab.classList.add('experience-active');
        }));

// --------------- AGREGAR SOMBRA AL SCROLL---------------

function scrollHeader(){
        const nav = document.getElementById('header');

        if(window.scrollY > 100){
                nav.classList.add('scroll-header');
        }else{
                nav.classList.remove('scroll-header');
        }
}
window.addEventListener('scroll', scrollHeader);


// ---------------------SCROLL ANIMATION----------------------

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
         //reset: true
    });
    
    sr.reveal('.home-data, .about-img, .section-title, .section-subtitle',{}); 
    sr.reveal('.home-img, .about-subtitle, .about-text, .skills-subtitle',{delay: 400}); 
    sr.reveal('.home-social-icon, .home-scroll, .button, .about-data',{ interval: 200}); 
    sr.reveal('.skills-data, .work-img, .contact-content, .proyecto, .experience-tabs, .experience-sections, .skill-box',{interval: 200});