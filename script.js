$(document).ready(function() {
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


document.addEventListener('click', function (event) {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
        if (!detail.contains(event.target)) {
            detail.removeAttribute('open');
        }
    });
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



let version = "0.13v";
document.getElementById('systemVersion').textContent = version;