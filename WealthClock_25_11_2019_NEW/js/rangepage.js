       
        $("#slider4").ionRangeSlider({
            min: 6,
            max: 20,
            from: 0,
            to: 1,
            type: 'single',
            //prefix: "+",
            prefix: "",
            grid: true,
            grid_num: 10
        });
        $("#slider5").ionRangeSlider({
            min: 6,
            max: 20,
            from: 0,
            to: 1,
            type: 'single',
            //prefix: "+",
            prefix: "",
            grid: true,
            grid_num: 10
        });
        $("#slider6").ionRangeSlider({
            min: 500,
            max: 100000,
            from: 0,
            to: 1,
            type: 'single',
            //prefix: "+",
            prefix: "",
            grid: true,
            grid_num: 10,            
            prettify_enabled: true,
            prettify: function (num) {
                return num.toFixed(0);
            }
        });
        //$("#slider7").ionRangeSlider({
        //    min: 500,
        //    max: 100000,
        //    from: 500,
        //    to: 8000,
        //    type: 'single',
        //    //prefix: "+",
        //    prefix: "",
        //    grid: true,            
        //    prettify_enabled: true,
        //    prettify: function (num) {
        //        return num.toFixed(0);
        //    }
        //});


       