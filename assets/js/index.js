$(function () {
    // Initialize Slider
    var screenWidth = screen.width;
    const totalBanner = $('.banner li').length;
    var currentSliderIndex = 0;
    
    // Set Slider frame width
    $('header ul.banner').width(screenWidth * totalBanner);

    $('header .slider-box .btn-prev').click(function(e){
        e.preventDefault();
        if(currentSliderIndex > 0) {
            currentSliderIndex--;
        } else {
            currentSliderIndex = (totalBanner - 1);
        }
        $('header ul.banner').css('transform', 'translate3d('+ (currentSliderIndex * -screenWidth) +'px, 0px, 0px)' );
    });
    
    $('header .slider-box .btn-next').click(function(e){
        e.preventDefault();
        if(currentSliderIndex < (totalBanner - 1)) {
            currentSliderIndex++;
        } else {
            currentSliderIndex = 0;
        }
        $('header ul.banner').css('transform', 'translate3d('+ (currentSliderIndex * -screenWidth) +'px, 0px, 0px)' );
    });

    $(window).on('resize', function(){
        screenWidth = screen.width;
        $('header ul.banner').width(screenWidth * totalBanner);
        $('header ul.banner').css('transform', 'translate3d('+ (currentSliderIndex * -screenWidth) +'px, 0px, 0px)' );
    });

    $('header .menu-btn').click(function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            $('header ul.menu').fadeIn();
        } else {
            $('header ul.menu').fadeOut();
        }
    });
});