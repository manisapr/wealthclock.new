
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
		enableAllSteps: true,
		titleTemplate: "#title#",
		enableCancelButton: false,
		cssClass: "tabcontrol"
	});

	$('.prev_btn').on('click', function () {
		wizStep.steps('previous');
	});
	$('.next_btn').on('click', function () {
		wizStep.steps('next');
	})
	$(".datepicker").datepicker();
	
	
	
	var initialValue = 0; // initial slider value
	var sliderTooltip = function(event, ui) {
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
    slide: function(event, ui) {
        $(".tooltipbox").val(ui.value.toLocaleString('en', { maximumSignificantDigits: 21 }));        
    }
});
	
	
	
	
	$(".tooltipbox").on('change', function () {	   
    var value = this.value;
	$(this).val(parseInt(value).toLocaleString('en', {maximumSignificantDigits : 21}));
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
    $( "#tags" ).autocomplete({
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
    
(function($) {
      fakewaffle.responsiveTabs(['xs', 'sm']);
  })(jQuery);
  
$('#popoverData').popover();
$('#popoverOption').popover({ trigger: "hover" });