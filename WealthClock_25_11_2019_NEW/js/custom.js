(function ($) {
    fakewaffle.responsiveTabs(['xs', 'sm']);
    $('a.dropdown-toggle, .dropdown-menu a').on('touchstart', function (e) {
        e.stopPropagation();
    });

    $(".expert-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 1500,
        paginationSpeed: 400,
        singleItem: true,
        pagination: true,
        rewindNav: true,
        autoPlay: true,
        stopOnHover: true,
    });

    //$(".sld_wldt").owlCarousel({
    //    loop: true,
    //    navigation: false, // Show next and prev buttons
    //    slideSpeed: 1500,
    //    paginationSpeed: 400,
    //    singleItem: true,
    //    pagination: false,
    //    rewindNav: true,
    //    autoPlay: true,        
    //    stopOnHover: true,
    //    return:true
        
    //});

    $('.sld_wldt').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 7000,
        pauseOnHover: true,
    });

    //$(document).ready(function () {
    //    $('.sld_wldt').owlCarousel({
    //        loop: true,
    //        margin: 0,
    //        dots: false,
    //        nav: false,
    //        autoplay: true,
    //        autoplayHoverPause: true,
    //        autoplayTimeout: 4000,
    //        autoplaySpeed: false,
    //        responsive: {
    //            0: {
    //                items: 1
    //            },
    //            600: {
    //                items: 1
    //            },
    //            1000: {
    //                items: 1
    //            }
    //        }
    //    });
    //});

    $(document).ready(function () {
        var owl = $(".partner-slider");
        owl.owlCarousel({
            itemsCustom: [[0, 1], [450, 2], [600, 3], [700, 4], [1000, 5], [1200, 5], [1400, 5], [1600, 5]],
            navigation: true, // Show next and prev buttons
            slideSpeed: 1500,
            pagination: false,
            rewindNav: true,
            autoPlay: true,
            stopOnHover: true,
        });
    });



    $("#owl-demo,#owl-demo1").owlCarousel({
        navigation: true,
        slideSpeed: 1500,
        paginationSpeed: 400,
        singleItem: true,
        pagination: true,
        rewindNav: true,
        autoPlay: true,
        stopOnHover: true,
    });
    $("#owl-demo2").owlCarousel({
        navigation: false,
        slideSpeed: 1500,
        paginationSpeed: 400,
        singleItem: true,
        pagination: true,
        rewindNav: true,
        autoPlay: true,
        stopOnHover: true,
    });
    $(document).ready(function () {
        var owl = $("#owl-demo3");
        owl.owlCarousel({
            itemsCustom: [
                [0, 1],
                [450, 2],
                [600, 3],
                [700, 4],
                [1000, 5],
                [1200, 6],
                [1400, 7],
                [1600, 7]
            ],
            navigation: false,
            slideSpeed: 1500,
            pagination: false,
            rewindNav: true,
            autoPlay: true,
            stopOnHover: true,
        });
    });
    $(document).ready(function () {
        var owl = $("#owl-demo4");
        owl.owlCarousel({
            itemsCustom: [
                [0, 1],
                [450, 1],
                [600, 2],
                [700, 2],
                [1000, 3],
                [1200, 4],
                [1400, 4],
                [1600, 4]
            ],
            navigation: true,
            slideSpeed: 1500,
            pagination: true,
            rewindNav: true,
            autoPlay: true,
            stopOnHover: true,
        });
    });
    $("document").ready(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 0) {
                $('header').addClass("hdr_fix");
            } else {
                $('header').removeClass("hdr_fix");
            }
        });
        equalheight('.money-innr');
        equalheight('.retirement-txt p');
        equalheight('.news-rights-inn');
        equalheight('.investing-outr');
    });
    $(document).ready(function () {
        $('.flip-btn').on('click', function () {
            $(this).toggleClass('open');
        });
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });
    $('#return-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
    });
    $(document).ready(function () {
        $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            prevEffect: 'none',
            nextEffect: 'none',
            arrows: false,
            helpers: {
                media: {},
                buttons: {}
            }
        });
    });
})(jQuery);
$(document).ready(function () {
    $('a[href*=#]').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset
                }, 800);
                return false;
            }
        }
    });
});
!!window['addEventListener'] && new WOW().init();



//24.09.2018



// testi slider
$('.textimonial_slider_for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed:7000,
    pauseOnHover: true,
    asNavFor: '.textimonial_slider_nav'
});
$('.textimonial_slider_nav').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.textimonial_slider_for',
    dots: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed:7000,
    pauseOnHover: true,
    responsive: [
	{
	    breakpoint: 601,
	    settings: {
	        slidesToShow: 3
	    }
	},
		{
		    breakpoint: 485,
		    settings: {
		        slidesToShow: 1
		    }
		}
    ]
});

$(".accordion").accordion();
//$(document).keydown(function (event) {
//    if (event.keyCode == 123) {
//        return false;
//    }
//    else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//        return false;
//    }
//});

//$(document).on("contextmenu", function (e) {
//    e.preventDefault();
//});

//document.onkeydown = function (e) {
//    if (e.ctrlKey &&
//        (e.keyCode === 67 ||
//         e.keyCode === 86 ||
//         e.keyCode === 85 ||
//         e.keyCode === 117)) {
//        alert('not allowed');
//        return false;
//    } else {
//        return true;
//    }
//};
$("#feedTime li a").click(function () {
    $(this).parent().addClass('active').siblings().removeClass('active');

});