// webpresent.js
// 2011 Richard Tuin
// webpresent.js may be freely distributed, altered, used and abused under the who-needs-a license
(function($) {
    $(document).ready(function() {
        $(this).bind('contextmenu', function() { return false; });
        $('section:first-child').addClass('current');
        var zIndex = 500;
        $('section:not(.current)').each(function() {
            var el = $(this);
            el.addClass('next').css('zIndex', zIndex--);
        });
        $('.item').addClass('hidden');
        
        $('textarea.code').each(function() {
            var config = {readOnly: true};

            // Set the syntax highlighting by using a language-* class, i.e. language-php
            $($(this).attr('class').split(/\s+/)).each(function() {
                if (this.indexOf('language-') === 0) {
                    config.mode = this.substr(9).toLowerCase();
                }
            });
            
            CodeMirror.fromTextArea(this, config);
        });
    });
    $(document).keydown(function (event) {
        switch (event.keyCode) {
            case 39: // next
            case 34: // next
                next();
                break;
            case 37: // previous
            case 33: // previous
                previous();
                break;
        }
    });
    $(document).mousedown(function(event) {
        switch(event.which) {
            case 1:
                next();
                break;
            case 3:
            {
                previous();
                break;
            }
        }
    });
    function next() {
        var current = $('section.current');
        var items = current.find('.item.hidden');
        if (items.length) {
            items.first().removeClass('hidden');
            return;
        }

        if (!current.next('section').length) return;
        current.next('section').removeClass('next').addClass('current');
        current.addClass('previous').removeClass('current');
    }

    function previous() {
        var current = $('section.current');

        var items = current.find('.item:not(.hidden)');
        if (items.length) {
            items.last().addClass('hidden');
            return;
        }

        if (!current.prev('section').length) return;
        current.prev('section').removeClass('previous').addClass('current');
        current.addClass('next').removeClass('current');
    }
})(jQuery);
