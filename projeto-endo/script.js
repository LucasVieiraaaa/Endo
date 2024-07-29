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
