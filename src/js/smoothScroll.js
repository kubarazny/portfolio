var jump = function (e) {
    var target = 0;
    if (e) {
        e.preventDefault();
        target = $(this).attr("href");
    } else {
        target = location.hash;
    }

    $('html,body').animate({
        scrollTop: $(target).offset().top
    }, 2000, function () {
        location.hash = target;
    });

};

$('html, body').hide();

$(document).ready(function () {
    $('a[href^=#]').bind("click", jump);

    if (location.hash) {
        setTimeout(function () {
            $('html, body').scrollTop(0).show();
            jump();
        }, 0);
    } else {
        $('html, body').show();
    }
});
