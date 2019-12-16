/*  javascript */
/* PLEASE NOTE: The rotation code is based on x-y co-ordinates handle with care :) */

$(document).ready(function(){
	$(".openLt li").hover(function(){
		var ind = $(this).index();
		$('.hvr').removeClass('hvr');
		$('.investedValue').eq(0).find('li').eq(ind).addClass('hvr');
		$('.investedValue').eq(1).find('li').eq(ind).addClass('hvr');
	},function(){
		$('.hvr').removeClass('hvr');
	});
	
	if( $('.displayboxWrapper').length != 0 ){
		var amt=$('.frmAmount').val();
		var per=$('.frmPercent').val();
		$('.result').text(amt+' at '+per+'% expected rate of Interest');
	}
	
	$('.ui-loader').remove();
	
	$('.onloadLytBoxOverlay, .onloadLytBoxImg').click(function(){
		$('.onloadLytBoxOverlay, .onloadLytBoxImg').hide();
	});
	
	$(".onloadLytBoxOverlay").css('height','1450px');
	setInterval(function(){
		if($('#rotateFlag1').text()=='false' && $('#rotateFlag2').text()=='false' && $('#rotateFlag3').text()=='false' && $('#rotateFlag4').text()=='true' ){
			if($('body').hasClass('hideInput')){
				getCordinatesL1('none');
				$('body').removeClass('hideInput')
			}
		}
	},50);
})

var yrArr = [3,5,10,15,20];
var frmAmount, frmPercent;
function calculate(amt, int){
	percent=int;
	for(var i=0; i<yrArr.length; i++){
		percnt = ((int/100)/12);
		yr = yrArr[i];
		amtInvested = Math.round(amt*(yr*12));
		amtGet = Math.round(-(FV(percnt, yr*12, amt, 0)));
		//$('#amtInvestedID input').eq(i).val(amtInvested);
		//$('#amtGetID input').eq(i).val(amtGet);
		$('#amtInvestedID label').eq(i).text(amtInvested);
		$('#amtGetID label').eq(i).text(amtGet);
	}
	$('#rotateFlag5').text('Amt:'+amt+' | '+percent+'%');
	frmAmount = amt;
	frmPercent= percent;
	//$('.result').text(amt+' at '+percent+'% expected rate of Interest');
}
function FV(rate, periods, payment, value, type) {
	//console.log('>>>>>>'+rate+'-'+periods+'-'+payment+'-'+value+'-'+type+'-');
	var type = (typeof type === 'undefined') ? 0 : type;
	rate = eval(rate);
	var result;
	if (rate === 0) {
		result = value + payment * periods;
	}
	else {
		var term = Math.pow(1 + rate, periods);
		if (type === 1) {
			result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
		} else {
			result = value * term + payment * (term - 1) / rate;
		}
	}
	return -result;
}

var oldRotateVal=0;
var rotateFlag=true;
var oldX= oldY=0;
var ie = $.browser.msie;
var ieRotatorHTML;

document.onload = function(){
    document.ontouchmove = function(e){ e.preventDefault(); }
};

$(document).ready(function(){
	if(ie==true && Math.round($.browser.version) == 7  ||  ie==true && Math.round($.browser.version) == 8){
		$("body").addClass('ie');
		ieRotatorHTML = $(".ieRotator").html();
		//browserRotatorDiv(0);
	}
	browserRotatorDiv(0);
	calculate(20000,15);
	generateHiddenDivs();

	
	if(navigator.userAgent.match(/iPad/i)){
		
		
		$('.rotator').bind("vmousedown", function(){
			mousedown_func();
		});
		$('.rotator').bind('vmouseout',function(){
			mouseout_func();
		});
		$('.rotator').bind("vmousemove",function(e){
			ePageX=e.pageX;
			ePageY=e.pageY;
			mousemove_func(e);
		});
		$(document).bind('vmouseup',function(e){
			ePageX=e.pageX;
			ePageY=e.pageY;
			mouseup_func();
		});
		
		$('.wheelContainer').bind('touchstart',function(touchEvent){//alert('touchstart');
				touchEvent.preventDefault();
		});
		$('.wheelContainer').bind('touchmove',function(touchEvent){//alert('vmouseup');
				touchEvent.preventDefault();
		});
	
	}
	else{
		
		$('.rotator').bind('mousedown',function(){
			mousedown_func();
		})
	
		$('.rotator').bind('mouseout',function(){
			mouseout_func();
		});
		
		$('.GHD').bind('hover',function() {
			mouseout_func();
		});
		
		$('.rotator').bind('mousemove',function(e){
			ePageX=e.pageX;
			ePageY=e.pageY;
			mousemove_func(e);
		})
		$(document).bind('mouseup',function(e){
			ePageX=e.pageX;
			ePageY=e.pageY;
			mouseup_func();
		});
	}
	
	
});
var documentRotatorFlag=false;
function mousedown_func(){
	clearInterval(timer);
	$('#rotateFlag1').text('true');
	$('#rotateFlag3').text('false');
	documentRotatorFlag=true;
	oldRotateVal = oldRotateValBrowerBased();
	
	$('.displayPer').stop().removeClass('hid');
	$('body').addClass('active');
	$('body').addClass('hideInput');
}
function mouseout_func(e){
	$('.displayPer').stop().removeClass('hid');
	if($('#rotateFlag1').text()=='true' && $('#rotateFlag2').text()=='true' && $('#rotateFlag3').text()=='true'){
		oldRotateVal = oldRotateValBrowerBased();
		for(var i=0; i<Math.round(oldRotateVal/360)+1; i++){
			if(oldRotateVal>360){
				oldRotateVal= Math.round(oldRotateVal-360);
			}
		}
		browserRotatorDiv(oldRotateVal);
		oldRotateVal = oldRotateValBrowerBased();
		documentRotatorFlag=false;
		getCordinatesL1('none');
	}
	$('#rotateFlag1').text('false');
	$('#rotateFlag2').text('false');
	$('#rotateFlag3').text('false');
	$('#rotateFlag4').text('true');
}
function mousemove_func(e){
	if($('#rotateFlag7').text() == 'false'){
		return false;
	}
	$('#rotateFlag2').text('true');
	
	var w = parseInt($('.rotator').width())/2;
	var x = (e.pageX - $('.rotator').offset().left);
	var y = (e.pageY - $('.rotator').offset().top);
	var angle=(Math.atan((x - w)/(y-w)) * 180/Math.PI);
	var newangle=(0-angle);
	
	for(var i=0; i<Math.round(newangle/360)+1; i++){
		if(newangle>360 || newangle<0){
			newangle=0;
			$('.rotator').removeAttr('style');
			w = parseInt($('.rotator').width())/2;
			x = (e.pageX - $('.rotator').offset().left);
			y = (e.pageY - $('.rotator').offset().top);
			angle=(Math.atan((x - w)/(y-w)) * 180/Math.PI);
			newangle=(0-angle);
		}
	}
	if (x>=w && y>=w){
		 newangle = (180-angle);
	}
	else if (x<=w && y>=w){
		 newangle=((0-angle)+180);
	}
	else if (x<w && y<w){
		newangle=(360-angle);
	}
	newangle = newangle-(oldRotateVal);
	$('#iPadConsole').text('w:'+w+ ' | x:'+x+ ' | y:'+y+ ' | newangle:'+newangle);
	$('#rotateFlag8').text(newangle);
	
	$('.rotator').data('angle',Math.round(newangle));
	
	if(documentRotatorFlag==true){
		
	$('body').addClass('hideInput');
		$('body').addClass('active');
		$('.displayPer').stop().addClass('hid');
		
		browserRotatorDiv(newangle);
		
		rotateVal = oldRotateValBrowerBased();
		if(rotateVal<0){
			rotateVal= 360-(-(  oldRotateValBrowerBased()  ));
		}
		$('#rotateFlag6').html( Math.round(rotateVal) );
		$('.rotatefield.inputfield').html( Math.round(rotateVal) );
		
		getCordinatesL1('none');
		var x = (e.pageX - $('.rotator').offset().left);
		var y = (e.pageY - $('.rotator').offset().top);
		
		if(oldX != x || oldY != y){
			oldX=x;
			oldY=y;
			$('#rotateFlag3').text('true');
		}
		else{
			$('#rotateFlag3').text('false');
		}
		$('#rotateFlag4').text('false');
	}
}
function mouseup_func(e){
	if($('#rotateFlag1').text()=='true' && $('#rotateFlag2').text()=='true' && $('#rotateFlag3').text()=='false'){
		//alert('----this is a click');//this code is working fine :);
		mouseclick_func(e);
		return false;
	}
	if(documentRotatorFlag==true){
		//do some thing
	}
	mouseup_funcDetails('none');
	
	setTimeout(function(){
		$('body').removeClass('hideInput');
	},1);
		
	setTimeout(function(){
		if (!ie){
			clearInterval(timer);
			oldRotateVal = oldRotateValBrowerBased();
			getCordinatesL1('none');
			timer=setInterval(function(){
				if( $('.rotatefield').text() > 360 ){ 
					txt = $('.rotatefield').text()-360; 
					$('.rotatefield, #rotateFlag6').text(txt);
				}
				$('body').removeClass('hideInput');
				getCordinatesL1('none');
				timerCnt++;
				if(timerCnt > 10){ timerCnt=0; clearInterval(timer); }

			},5);
		}
	},1);
}
function mouseup_funcDetails(param){
	//console.log('-------------------------------------------------');
	$('#rotateFlag1').text('false');
	$('#rotateFlag3').text('false');
	$('#rotateFlag4').text('true');
	
	$('body').removeClass('active');
	oldRotateVal = oldRotateValBrowerBased();
	documentRotatorFlag=false;
	$('.displayPer').stop().removeClass('hid');
	getCordinatesL1(param);
}
var ePageX=0;
var ePageY=0;
function mouseclick_func(e){
	$('#rotateFlag7').text('false');
	$('#rotateFlag2').text('true');
	
	newangle = Math.round(-oldRotateVal);
	$('.rotator').data('angle',(newangle));
	
	if(documentRotatorFlag==true){
		$('.displayPer').stop().addClass('hid');
		
		browserRotatorDiv(newangle);

		rotateVal = oldRotateValBrowerBased();
		if(rotateVal<0){
			rotateVal= 360-(-(  oldRotateValBrowerBased()  ));
		}
		
		//$('#rotateFlag6').html( Math.round(rotateVal) );
		$('.rotatefield.inputfield').html( Math.round(rotateVal) );
		//getCordinatesL1('none');
	}
	mouseup_funcDetails('adjust');
	setTimeout(function(){
		mouseout_func(e);
		setTimeout(function(){
			$('#rotateFlag7').text('true');
		},100)
	},5)

}


var timer, timerCnt=0;
var perArr1 = [15,12,8,4];
var perArr2 = [20,15,12,9];
function getCordinatesL1(param){
	var val = $('.rotatefield.inputfield').text();
	if(val>=261 && val<333){
		getCordinatesL2(2000, 261, 333, param);
	}
	else if(val>=189 && val<261){
		getCordinatesL2(3000, 189, 261, param);
	}
	else if(val>=116 && val<189){
		getCordinatesL2(5000, 116, 189, param);
	}
	else if(val>=44 && val<116){
		getCordinatesL2(10000, 44, 116, param);
	}
	else if(val>=0 && val<44 || val>=333 && val<360){
		getCordinatesL2(20000, 44, 333, param);
	}
}
var ieInterval;
function getCordinatesL2(investedAmt, cor1, cor2, aniParam){
	var val = $('.rotatefield.inputfield').text();
	var perArrVal=0;
	var percent=0;
	var rotateWheelAngle=0;
	var valDistance=0;
	if(investedAmt != 20000){
		var calcu = (cor2-cor1)/4; 
		for(var i=0; i<4; i++){
			var v1= cor1+(calcu*i);
			var v2= cor1+(calcu*(i+1));
			if(val>=v1 && val<v2){
				perArrVal=i;
				rotateWheelAngle=v1+((v2-v1)/2);
			}
		}
	}
	else if(investedAmt == 20000){
		if(val>=333 && val<351 ){perArrVal=0;rotateWheelAngle=342}
		if(val>=351 && val<360 || val>=0 && val<9){perArrVal=1;rotateWheelAngle=0}
		if(val>=9 && val<27 ){perArrVal=2;rotateWheelAngle=18}
		if(val>=27 && val<44 ){perArrVal=3;rotateWheelAngle=35}
	}
	
	if(investedAmt==5000 || investedAmt==10000){
		percent = perArr1[perArrVal];
	}
	else{
		percent = perArr2[perArrVal];
	}
	
	if( $('#rotateFlag4').text() == 'true' ){
		//browserRotatorDiv(val);
		browserRotatorDiv(rotateWheelAngle, aniParam);
		$('.rotatefield.inputfield').html( Math.round(rotateWheelAngle) );
		oldRotateVal=rotateWheelAngle;
		$('#rotateFlag4').text('false');
		$('body').removeClass('active');
	}
	
	calculate(investedAmt,percent);
	$('.displayPer').text(percent+'%');
};
function generateHiddenDivs(){
	var ths = $('.wheelContent');
	var thsW = thsH = 550;
	var hDivs='';
	var p=6;
	var cnt=[0,0,3,6,12,20,30,50,76,104,134,184,254,304,354,400,500,600,700];
	for(var i=0; i<15; i++){
		h=20;
		w=(thsW-(p*i))-cnt[i];
		t=(h*i);
		l=(thsW+((p*i)/2))+(cnt[i]/2);
		if(i==13){h=10;}
		if(i==14){h=10;t=t-10;}
		hDivs+='<div class="GHD" style="width:'+w+'px; height:'+h+'px; top:'+t+'px; left:'+l+'px"></div>';
		
		h=20;
		t=((h*i)*-1)-10;
		if(i==13){h=10;t=t-(-10);}
		if(i==14){h=10;t=t-(-20);}
		hDivs+='<div class="GHD" style="width:'+w+'px; height:'+h+'px; top:'+t+'px; left:'+l+'px"></div>';
	}
	ths.append(hDivs);
}
var browserRotatorDivAni=0;
var browserRotatorDivTimer;
function browserRotatorDiv(param, aniParam){
	if(aniParam == 'adjust'){
		//$('body').removeClass('active');
		browserRotatorDivAni=0;
		clearInterval(browserRotatorDivTimer);
		var inptOldVal = $('#rotateFlag6').html();
		var paramNew1=0;
		var operator='';
		//console.log('---------------------------------------------------------------------------------');
		if(inptOldVal>=0 && inptOldVal<90 && param>=270 && param<359){
			operator = 'tBothDecre';
			paramNew1 = inptOldVal - (-(359-param));
		}
		else if(inptOldVal>=270 && inptOldVal<359 && param>=0 && param<90){
			operator = 'tBothIncre';
			paramNew1 = param - (-(359-inptOldVal));
		}
		else if(inptOldVal<param){//++
			operator = 'incre';
			paramNew1 = param - inptOldVal;
			if(paramNew1 > 180){
				operator = 'bBothIncre';
				paramNew1 = (360-param) - (-(inptOldVal));
			}
		}
		else if(inptOldVal>param){//--
			operator = 'decre';
			paramNew1 = inptOldVal - param;
			if(paramNew1 > 180){
				operator = 'bBothDecre';
				paramNew1 = (360-inptOldVal) - (-(param));
			}
		}
		//var paramNew1 = Math.abs($('.rotatefield.inputfield').text() - param);
		browserRotatorDivTimer = setInterval(function(){
			$('body').addClass('hideInput');
			var paramNew2=0;
			if(operator=='bBothDecre'){
				paramNew2 = (inptOldVal-(-(browserRotatorDivAni)));
			}
			else if(operator=='bBothIncre'){
				paramNew2 = (inptOldVal-((browserRotatorDivAni)));
			}
			else if(operator=='tBothDecre'){
				paramNew2 = (inptOldVal-((browserRotatorDivAni)));
			}
			else if(operator=='tBothIncre'){
				paramNew2 = (inptOldVal-(-(browserRotatorDivAni)));
			}
			else if(operator=='incre'){
				paramNew2 = (param-paramNew1)-(-(browserRotatorDivAni));
			}
			else if(operator=='decre'){
				paramNew2 = (param)-(-(paramNew1-browserRotatorDivAni));
			}
			//console.log('param1= '+param+ '  |  operator= '+operator+ '  |  browserRotatorDivAni1= '+browserRotatorDivAni+ '  |  paramNew1= '+paramNew1+ '  |  paramNew2= '+paramNew2+ '  |  inputfieldVal::= '+$('#rotateFlag6').text());
			browserRotatorDivCode(paramNew2);
			if(browserRotatorDivAni > Math.abs(paramNew1)-2){
							clearInterval(browserRotatorDivTimer); 
							$('#rotateFlag6').html(param);
							browserRotatorDivCode(param);
							setTimeout(function(){
								$('.rotatefield.inputfield').html( Math.round(param) );
								//oldRotateVal=rotateWheelAngle;
								$('#rotateFlag4').text('false');
								$('body').removeClass('active');
							},2);
							setTimeout(function(){
								$('body').removeClass('hideInput');
							},100);
							setTimeout(function(){
								$('body').removeClass('hideInput');
								$('html, body').animate({scrollTop:305},500);
							},500);
			}
			browserRotatorDivAni+=2;
		},1);
	}
	else{
		browserRotatorDivCode(param);
	}
}
function browserRotatorDivCode(param){
	if(ie==true && Math.round($.browser.version) == 7  ||  ie==true && Math.round($.browser.version) == 8){
		ieRotatorHTML='<SPAN style="POSITION: relative; WIDTH: 720px; DISPLAY: inline-block; HEIGHT: 720px" id=null><rvml:group style="POSITION: absolute; WIDTH: 720px; HEIGHT: 720px; rotation: '+param+'deg" class=rvml coordsize = "720,720"><rvml:image style="POSITION: absolute; WIDTH: 720px; HEIGHT: 720px; TOP: 0px; LEFT: 0px" class=rvml src = "images/money-wheel.png" coordsize = "21600,21600"></rvml:image></rvml:group></SPAN>';
		$(".ieRotator").html(ieRotatorHTML);
		$('#ieConsole').text( $(".ieRotator").html() );
	}
	else{
		$('.rotator-line').stop().animate({rotate:param},0);
	}
}
function oldRotateValBrowerBased(){
	if( navigator.userAgent.match(/iPad/i) ){returnVal = ($('.rotator-line').css('rotate')).split('deg')[0];}
	else{returnVal = Math.round($('.rotator').data('angle'));}
	if( isNaN(returnVal) ){ returnVal = 0; }
	return returnVal;
}


