(function ($) {
    "use strict";
    var Mfn_HB = (function ($) {
        function init() {
            menu.init();
            menu.onePage();
            bind();
        }
        var menu = {
            init: function () {
                var mobileInit = '';
                $('.mhb-menu ul.menu').each(function (index) {
                    if ($(this).parent().hasClass('tabletMobile')) {
                        mobileInit = 959;
                    } else {
                        mobileInit = 768;
                    }
                    $(this).mfnMenu({
                        addLast: false,
                        arrows: false,
                        responsive: true,
                        mobileInit: mobileInit
                    });
                });
            },
            toggle: function (button) {
                var menu = $(button).siblings('ul.menu');
                menu.stop(true, true).slideToggle(200);
            },
            onePage: function () {
                if (!$('body').hasClass('one-page')) {
                    return false;
                }
                $('.mhb-menu ul.menu').each(function (index) {
                    var menu = $(this);
                    $('a[href]', menu).each(function () {
                        var url = $(this).attr('href');
                        if (url && url.split('#')[1]) {
                            var hash = '#' + url.split('#')[1];
                            if (hash && $(hash).length) {
                                $(this).attr('data-hash', hash);
                                $(hash).attr('data-id', hash);
                            }
                        }
                    });
                    $('a[data-hash]', menu).on('click', function (e) {
                        e.preventDefault();
                        var currentView = $('.mhb-view').filter(':visible');
                        var hash = $(this).attr('data-hash');
                        hash = '[data-id="' + hash + '"]';
                        var headerH = currentView.height() || 0;
                        var adminBarH = $('#wpadminbar').height() || 0;
                        var offset = headerH + adminBarH;
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top - offset
                        }, 500);
                    });
                });
            }
        };

        // function retinaLogo() {
        //     if (window.devicePixelRatio > 1) {
        //         $('.mhb-logo img[data-retina]').each(function () {
        //             var height = 0;
        //             if (!$(this).data('retina')) {
        //                 return false;
        //             }
        //             if (!$(this).attr('height')) {
        //                 height = $(this).height() || 0;
        //             }
        //             $(this).attr('src', $(this).data('retina'));
        //             if (height) {
        //                 $(this).attr('height', height);
        //             }
        //         });
        //     }
        // }
        var sticky = {
            init: function () {
                var sticky_wrapper = $('.mhb-grid');
                var start_y = 0;
                var window_y = $(window).scrollTop();
                var current_view = $('.mhb-view').filter(':visible');
                if (window_y > start_y) {
                    if (!sticky_wrapper.hasClass('is-sticky')) {
                        sticky_wrapper.addClass('is-sticky');
                        this.placeholderHeight(current_view);
                    }
                } else {
                    if (sticky_wrapper.hasClass('is-sticky')) {
                        sticky_wrapper.removeClass('is-sticky');
                    }
                }
            },
            placeholderHeight: function (current_view) {
                if (current_view.hasClass('on-top')) {
                    $('.mhb-placeholder').height(0);
                    return false;
                }
                var current_view_H = current_view.height() || 0;
                $('.mhb-placeholder').height(current_view_H);
            }
        };
        var search = {
            toggle: function (search_wrapper) {
                $(search_wrapper).next('form').fadeToggle().find('.field').focus();
            }
        };

        function bind() {
            $('.mhb-menu').on('click', '.mobile-menu-toggle', function (e) {
                e.preventDefault();
                menu.toggle(this);
            });
            $('.mhb-extras').on('click', '.search-icon', function (e) {
                e.preventDefault();
                search.toggle(this);
            });
            $(window).scroll(function () {
                sticky.init();
            });
            $(window).load(function () {
                retinaLogo();
            });
        }
        return {
            init: init
        };
    })(jQuery);
    $(function () {
        Mfn_HB.init();
    });
})(jQuery);