;(function ($, window, document, undefined) {
  'use strict';

  function initIsotope() {
    if ($('.events-wrapper').length) {
      $('.events-wrapper').each(function () {
        var self = $(this);
        self.isotope({
          itemSelector: '.event-post-box',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: '.event-post-box',
            gutterWidth: 30
          }
        });
      });
    }
  }


  $(window).on('load resize orientationchange', function () {
    $('img').on('load', function () {
      $('img[data-lazy-src]').foxlazy();
      initIsotope();
    });
  });

  function popupVideoEvent() {
    if($('.event-post-box .video-content')) {
      $('.play').each(function () {
        $(this).magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: true,
          fixedBgPos: true
        });
      });
    }
  }


  $(window).on('load', function() {
    popupVideoEvent();
  });

})(jQuery, window, document);