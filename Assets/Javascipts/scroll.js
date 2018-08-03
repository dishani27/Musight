$(".link").click(function() {
    $('html, body').animate(
        { scrollTop: ($($(this).attr('href')).offset().top) - 100 },
         600, 'linear');
});
