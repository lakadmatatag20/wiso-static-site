;(function ($, window, document, undefined) {
    'use strict';
// for sound bg
  $('.wiso-sound-btn').on('click',function(){

    var $button = $(this);
    if ($button.hasClass('play')) {
      $button.next('audio').trigger('pause');
      $button.removeClass('play');
    } else {
      $button.next('audio').trigger('play');
      $button.addClass('play');
    }

  });
  $(window).ready(function () {
    if($('.full_screen_slider.disable_scroll').length) {
      $('html, body').addClass('overflow-hidden');
    }
  });

    function playSound() {
        if ($('.wiso-sound-btn').length && $('.wiso-sound-btn').hasClass('play')) {
            $('.wiso-sound-btn').next('audio').trigger('play');
        }
    }

    $(window).on('load', function () {
        setTimeout(playSound, 500);
    });


})(jQuery, window, document);