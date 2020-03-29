$(document).ready(function () {
    var Shuffle = window.Shuffle;

    var myShuffle = new Shuffle(document.querySelector('.portfolio__items'), {
        itemSelector: '.portfolio__item',
        sizer: '.my-sizer-element',
        buffer: 1
    });

    window.jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
    });

});
