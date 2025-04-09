;(function ($, window, document, undefined) {
    'use strict';

    if ($('.banner-slider-wrap.horizontal').length) {
        if ($(window).width() > 767) {
            $('.banner-slider-wrap.horizontal').each(function () {
                var items = $(this).find('.images-wrap');
                items.each(function () {
                    var id = $(this).attr('id');
                    var scene = document.getElementById(id);
                    var parallaxInstance = new Parallax(scene, {
                        relativeInput: false,
                        clipRelativeInput: false,
                        calibrationThreshold: 100,
                        calibrationDelay: 500,
                        supportDelay: 500,
                        calibrateX: true,
                        calibrateY: false,
                        invertX: true,
                        invertY: true,
                        limitX: false,
                        limitY: false,
                        scalarX: 5.0,
                        scalarY: 5.0,
                        frictionX: 0.1,
                        frictionY: 0.1,
                        originX: 0.5,
                        originY: 0.5,
                        hoverOnly: true
                    });
                });
            });
        }
    }

    function bannerSliderHeight() {
        if ($('.banner-slider-wrap .container').length) {
            var contentH = $('.banner-slider-wrap .container').outerHeight();
            var winH = $(window).height();
            var bannerH = winH > (contentH + 200) ? winH : (contentH + 200);
            $('.banner-slider-wrap .slider-banner').css('height', bannerH);
        }
    }

    $(window).on('load resize', function () {
        bannerSliderHeight();
    });

    window.addEventListener("orientationchange", function () {
        bannerSliderHeight();
    });
})(jQuery, window, document);