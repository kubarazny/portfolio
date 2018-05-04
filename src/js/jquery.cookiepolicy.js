/*!
 * jQuery Cookie Policy Plugin
 */
(function($) {
$.fn.cookiepolicy = function(options) {
    new jQuery.cookiepolicy($(this), options);
	return this;
};

$.cookiepolicy = function(options) {
	options = $.extend({
		cookie: 'cookiepolicyinfo',
		info: 'Korzystanie z witryny oznacza zgodę na wykorzystywanie plików cookie.',
		close: 'Zamknij'
	}, options || {});
	
    if($.cookie(options.cookie) !== 'true') {
        var wrapper = $('<div/>').addClass('cookiepolicy').appendTo('body');
        $('<span/>').html(options.info).appendTo(wrapper);
        $('<a/>').addClass('button').html(options.close).appendTo(wrapper)
            .on('click', function(e) {
                e.preventDefault();
                $.cookie(options.cookie, true);
                $(this).parents('.cookiepolicy').remove();
            });
    }
};
})(jQuery);