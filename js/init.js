(function( $ ){
  'use strict';

  //
  // Preloader
  jQuery(window).load(function() {
    jQuery(".preloader").delay(600).fadeOut();
  });

  $(document).ready(function(){
    //
    // Sticky Header
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $('body').addClass("sticky-nav");
      }
      else {
        $('body').removeClass("sticky-nav");
      }
    });
    $(window).scroll();



    //
    // ScrollSpy
    $("body").scrollspy({
      target  : '.navbar',
      offset  : 65
    });




    //
    // Contact
    var contact         = $('.contact-form'),
      successMessage    = $('.contact-success'),
      errorMessage      = $('.contact-error');

  });

var screenshots = $('.screenshots');
  screenshots.owlCarousel({
    loop            : false,
    margin          : 15,
    responsiveClass : true,
    nav             : true,
    navText       : [],
    responsive:{
      0:{
        items   : 1,
        margin  : 0
      },
      736:{
        items   : 2
      },
      1000:{
        items   : 3
      },
      1600:{
        items   : 4
      }
    }
  });
})(window.jQuery);