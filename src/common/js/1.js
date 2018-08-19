
/*轮播*/
$(function () {
  function revealOnScroll() {
    var scrolled = $(window).scrollTop();

    $(".i_pic>.col-sm-4").each(function() {
      var current = $(this),
        w_height = $(window).outerHeight(),
        offsetTop = current.offset().top;
      if (scrolled + w_height > + 50+ offsetTop) {
        current.addClass("animated fadeInDown");
      } else {
        current.removeClass("animated fadeInDown");
      }
    });
  }
  $(window).on("scroll", revealOnScroll);
})
