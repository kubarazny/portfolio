// (function() {
//     var $portfolioItems = $('#portfolioGallery').find('div');
//     var $portfolioButtons = $('#portfolioButtons');
//     var tagged = {};
//
//     $portfolioItems.each(function() {
//         var div = this;
//         var tags = $(this).data('tags');
//
//         if( tags ) {
//             tags.split(',').forEach(function(tagName) {
//                 console.log(tagged[tagName]);
//                 if ( tagged[tagName] === undefined ) {
//                     tagged[tagName] = [];
//                 }
//                 tagged[tagName].push(div);
//             })
//         }
//     });
//
//     $('<button/>', {
//         text: 'Wyświetl wszystko',
//         class: 'active',
//         click: function() {
//             $(this)
//                 .addClass('active')
//                 .siblings()
//                 .removeClass('active');
//             $portfolioItems.show();
//         }
//     }).appendTo($portfolioButtons);
//
//     $.each(tagged, function(tagName) {
//         $('<button/>', {
//             text: tagName + ' (' + tagged[tagName].length + ')',
//             click: function() {
//                 $(this)
//                     .addClass('active')
//                     .siblings()
//                     .removeClass('active');
//                 $portfolioItems
//                     .hide()
//                     .filter(tagged[tagName])
//                     .show();
//             }
//         }).appendTo($portfolioButtons);
//     });
//
//     $portfolioButtons.find('button').each(function() {
//         $(this).addClass('portfolio__button');
//     });
//
// }());


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
            console.log(input.value);
        }
    });

});
