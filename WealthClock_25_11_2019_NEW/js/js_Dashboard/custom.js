//Number.prototype.formatMoney = function(c, d, t){
//var n = this, 
//    c = isNaN(c = Math.abs(c)) ? 2 : c, 
//    d = d == undefined ? "." : d, 
//    t = t == undefined ? "," : t, 
//    s = n < 0 ? "-" : "", 
//    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
//    j = (j = i.length) > 3 ? j % 3 : 0;
//   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
// };

$(document).ready(function () {

    var maxHeight = 0;

    $(".eq-height").each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });

    $(".eq-height").height(maxHeight);

    $('.strapicon, .nav-overlay, .nav-cross').on('click', function () {
        $('body').toggleClass('sidebar-active');
    });
    var wizStep = $("#wizard").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "none",
        enableFinishButton: false,
        enablePagination: false,
        enableAllSteps: false,
        titleTemplate: "#title#",
        enableCancelButton: false,
        cssClass: "tabcontrol"
    });
    $(".datepicker").datepicker();

    //$('.prev_btn').on('click', function () {
    //	wizStep.steps('previous');
    //});
    //$('.next_btn').on('click', function () {
    //	wizStep.steps('next');
    //})
    var start = new Date();
    start.setFullYear(start.getFullYear() - 70);
    var end = new Date();
    end.setFullYear(end.getFullYear() - 18);

    $(".datepicker_custom").datepicker();




    var initialValue = 0; // initial slider value
    var sliderTooltip = function (event, ui) {
        var curValue = ui.value || initialValue; // current value (when sliding) or initial value (at start)
        var tooltip = '<div class="tooltip">' + curValue + '</div>';

        $('.ui-slider-handle').html(tooltip); //attach tooltip to the slider handle
    }
    var initialValueBig = 2000; // initial slider value
    //	var sliderTooltipBig = function(event, ui) {
    //    var curValue = ui.value || initialValueBig; // current value (when sliding) or initial value (at start)
    //		curValue=(curValue).formatMoney(0, '', ',');
    //    var tooltip = '<div class="tooltip">' + curValue + '</div>';
    //
    //    $('.tooltipbox').html(tooltip); //attach tooltip to the slider handle
    //}

    $(".slider").slider({
        value: initialValue,
        min: 0,
        max: 100,
        step: 1,
        create: sliderTooltip,
        slide: sliderTooltip
    });
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    $(".slider-range").slider({
        value: initialValueBig,
        step: 1,
        min: 2000,
        max: 17000,
        slide: function (event, ui) {
            $(".tooltipbox").val(ui.value.toLocaleString('en', { maximumSignificantDigits: 21 }));
        }
    });




    $(".tooltipbox").on('change', function () {
        var value = this.value;
        $(this).val(parseInt(value).toLocaleString('en', { maximumSignificantDigits: 21 }));
        $(".slider-range").slider("value", parseInt(value));
    });
    var availableTags = [
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
      "2034",
      "2035",
      "2036",
      "2037",
      "2038"
    ];
    $("#tags").autocomplete({
        source: availableTags
    });
});



//Footer fixed	
$(window).bind("load", function () {
    var footerHeight = 0,
		footerTop = 0,
		$footer = $(".footer");
    positionFooter();

    function positionFooter() {
        footerHeight = $footer.height();
        footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
        if (($(document.body).height() + footerHeight) < $(window).height()) {
            $footer.css({
                position: "fixed",
                bottom: "0px",
                left: "0",
                right: "0"
            })
        } else {
            $footer.css({
                position: "relative",
                display: "block"
            })
        }
    }
    $(window)
		.scroll(positionFooter)
		.resize(positionFooter)

});

//onclick flip option
$(document).ready(function () {
    $('.flip-btn').on('click', function () {
        $(this).toggleClass('open');
    });
});


//radio show-hide
$(function () {
    $("input[name='radio']").click(function () {
        if ($("#radio01").is(":checked")) {
            $("#box").show();
        } else {
            $("#box").hide();
        }
    });
    $("input[name='radio']").click(function () {
        if ($("#radio02").is(":checked")) {
            $("#box2").show();
        } else {
            $("#box2").hide();
        }
    });
});

(function ($) {
    fakewaffle.responsiveTabs(['xs', 'sm']);
})(jQuery);

$('#popoverData').popover();
$('#popoverOption').popover({ trigger: "hover" });

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});


$(document).ready(function () {
    debugger;
    //Horizontal Tab
    $('#parentHorizontalTab_3').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) {// Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            // var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });

    $('#ChildVerticalTab_1').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

    $('#ChildVerticalTab_2').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

    $('#ChildVerticalTab_3').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

    $('#ChildVerticalTab_4').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

    $('#ChildVerticalTab_5').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

    $('#ChildVerticalTab_6').easyResponsiveTabs({
        type: 'default',
        width: 'auto',
        fit: true,
        tabidentify: 'ver_1', // The tab groups identifier
        activetab_bg: '#e31e24', // background color for active tabs in this group
        inactive_bg: '#ffffff', // background color for inactive tabs in this group
        active_border_color: '#c1c1c1', // border color for active tabs heads in this group
        active_content_border_color: '#5AB1D0' // border color for active tabs contect in this group so that it matches the tab head border
    });

});
$(document).ready(function () {
    //Horizontal Tab
    $('#parentHorizontalTab_105').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function (event) {// Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            // var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });



});
$('.how-slider').slick({
    dots: true,
    arrow: true,
    prevArrow: '<button class="slick-prev" aria-label="Next" type="button"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
    nextArrow: '<button class="slick-next" aria-label="Next" type="button"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    autoplay: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
});
$('.in-ovr-all').slick({
    dots: true,
    arrow: false,

    autoplay: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
});


//$(document).ready(function () {
//    (function ($) {
//        $(window).load(function () {
//            $(".mx_hight").mCustomScrollbar({
//                scrollButtons: {
//                    enable: true
                   
//                }
//            }, 'slow');
//        });
//    })(jQuery);
//});


/**Sampa 12-04 Home */
$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });
});

$(".do-nicescrol").niceScroll('quick-outr');  