//Animação do Carrosel
$(document).ready(function () {
    $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
        var $current = $(e.relatedTarget);
        var $prev = $(e.relatedTarget).prev();

        $prev.removeClass('fade-in').addClass('fade-out');

        $current.addClass('fade-in');
    });

    $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
        var $current = $(e.relatedTarget);
        $current.removeClass('fade-in');
        $current.prev().removeClass('fade-out');
    });
});
//Animação do summary
function openSummary(event) {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
        if (detail.contains(event.target)) {
            detail.setAttribute('open', 'true');
        } else {
            detail.removeAttribute('open');
        }
    });
}


//Animação quando sai do summary
document.addEventListener('mouseover', function(event) {
    const details = document.querySelectorAll('details');
    let insideAnyDetails = false;
    details.forEach(detail => {
        if (detail.contains(event.target)) {
            insideAnyDetails = true;
        }
    });
    if (!insideAnyDetails) {
        details.forEach(detail => detail.removeAttribute('open'));
    }
});

const detailsElement = document.querySelector('details');
detailsElement.addEventListener('toggle', function (event) {
    const header = document.getElementById('main-header');
    if (detailsElement.open) {
        header.style.height = 'auto';
    } else {
        header.style.height = 'initial';
    }
});


//Animação Header Encolher
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.classList.add("shrink");
        } else if (window.scrollY < lastScrollY) {
            header.classList.remove("shrink");
        }
        lastScrollY = window.scrollY;
    });
});

//Animação fade-in quando a tela é carregada
document.addEventListener("DOMContentLoaded", function() {
    document.body.classList.add("fade-in");
});

//Versão do Sistema
let version = "0.17v";
document.getElementById('systemVersion').textContent = version;

//Redes-Sociais
let linkedin = 'Linkedin';
let instagram = 'Instagram';
let whatsapp = 'Whatsapp';
let email = 'Email';


document.getElementById('Linkedin').textContent = linkedin;
document.getElementById('Instagram').textContent = instagram;
document.getElementById('Whatsapp').textContent = whatsapp;
document.getElementById('Email').textContent = email;