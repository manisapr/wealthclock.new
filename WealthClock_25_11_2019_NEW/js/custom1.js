

    



//Vertical Tab
$('#parentVerticalTab').easyResponsiveTabs({
    type: 'vertical', //Types: default, vertical, accordion
    width: 'auto', //auto or any width like 600px
    fit: true, // 100% fit in a container
    closed: 'accordion', // Start closed if in accordion view
    tabidentify: 'hor_1', // The tab groups identifier
    activate: function (event) { // Callback function if tab is switched
        var $tab = $(this);
        var $info = $('#nested-tabInfo2');

        $name.text($tab.text());
        $info.show();
    }
});
//var jq = $.noConflict();
//jq(document).ready(function(){
//    jq("button").click(function(){
//        jq("p").text("jQuery is still working!");
//    });
//});
$(".accordion").accordion();