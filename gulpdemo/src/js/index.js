// var p = $('.content');
// console.log(p);
// p.html("<p>这是第一个 jQuery demo </p>")
// p.css("color",'red');

// --------------关于 jQuery 动画效果

// $('.main .content').css({
// 	width: '50px',
// 	height: '50px',
// 	position: 'absolute',
// 	backgroundColor: '#cd1123'
// });

// --- click
// $('body').click(function(){
// 	alert(1);
// });

// --- on
// $('body').on('click', function(){
// 	alert(1);
// });

// --- bind
// $('body').bind('click', function(event){
	
// 	var content = $('.main .content');
// 	// 元素相对于父级元素 offsetParent 的距离
// 	var ox = content.offset().left;
// 	var oy = content.offset().top;

// 	// 元素相对于父级元素 offsetParent 的距离 ， 不包括自己的 margin ，与 offset 相差一个自身的 margin
// 	var px = content.position().left;
// 	var py = content.position().top;

// 	// 元素的滚动距离，即滚动条距离
// 	var dx = document.body.scrollLeft;
// 	var dy = document.body.scrollTop;

// 	// 页面的大小， clientWidth 和 clientHeight 只对页面 body 有效，对元素无效
// 	// 包括需滚动才能看到的内容，指整个页面的大小，不包括滚动条的宽度。

// 	var dc = document.body.clientHeight;
// 	var dh = document.body.clientHeight;

// 	// 页面的大小， offsetWidth 和 offsetHeight 只对页面 body 有效，对元素无效
// 	// 包括需滚动才能看到的内容，指整个页面的大小，不包括滚动条的宽度。

// 	var dc = document.body.offsetWidth;
// 	var dh = document.body.offsetHeight;

// 	// 页面的大小， scrollWidth 和 scrollHeight 只对页面 body 有效，对元素无效
// 	// 包括需滚动才能看到的内容，指整个页面的大小，不包括滚动条的宽度。

// 	var dc = document.body.scrollWidth;
// 	var dh = document.body.scrollHeight;

// 	// 元素的宽度 outerHeight 和 outerWidth
// 	var ow = content.outerWidth();
// 	var oh = content.outerHeight();

//	// 或者是直接获得宽度和高度
// 	var w = content.Width();
// 	var h = content.Height();

// 	// 真实元素相对于页面的绝对距离等于当前距离 + 父级元素的距离 + 页面滚动的距离

// 	var tl = content.offset().left + content.offsetParent().offset().left + document.body.scrollLeft;
// 	var tt = content.offset().top + content.offsetParent().offset().top + document.body.scrollTop;

// 	// 鼠标点击位置相对于屏幕的位置，并不是相对于页面的位置，包括了浏览器的导航栏和菜单栏和地址栏
// 	var x = event.screenX;
// 	var y = event.screenY;

// 	// 鼠标点击位置相对于页面的位置
// 	var px = event.pageX;
// 	var py = event.pageY;

// 	// 如果想要使用 animate 于一个 div 之上，需要 div 的 position 为 absolute 
// 	$('.main .content').animate({
// 		'left': px+'px',
// 		'top': py+'px'},
// 		2000);
// });

// ------------------- 下拉菜单 一
// var html = '<ul class="subnav">'+
// 				'<li>子导航栏</li>'+
// 				'<li>子导航栏</li>'+
// 				'<li>子导航栏</li>'+
// 				'<li>子导航栏</li>'+
// 			'</ul>';

// $('body').append(html);
// $('.subnav').hide();

// $('nav ul li').bind('mouseover', function(){
// 	var x = $(this).position().left;
// 	var y = $(this).position().top + $(this).outerHeight();
// 	console.log(x);
// 	console.log(y);
// 	$('.subnav').css({
// 		'left':x,
// 		'top':y,
// 		'position':'absolute'
// 	});
// 	$('.subnav').show();
// });

// $('nav ul li').bind('mouseout', function(){
// 	$('.subnav').hide();
// });

// $('.subnav').bind('mouseover', function(){
// 	$(this).show();
// });

// $('.subnav').bind('mouseout', function(){
// 	$(this).hide();
// });

// ---------------- 下拉菜单 二
// var Nav = function(){

// };

// Nav.prototype = {
// 	changeContent: function(num){
// 		var html = '';
// 		switch(num){
// 			case 1:
// 				html = '<li>校园交易</li>'+
// 						'<li>失物招领</li>'+
// 						'<li>我是女生</li>';
// 				break;
// 			case 2:
// 				html = '<li>校园交易</li>'+
// 						'<li>失物招领</li>'+
// 						'<li>我是女生</li>';
// 				break;
// 			case 3:
// 				html = '<li>校园交易</li>'+
// 						'<li>失物招领</li>'+
// 						'<li>我是女生</li>';
// 				break;
// 		}
// 		$('.subnav').html(html);
// 	},
// 	bind: function(){
// 		var that = this;
// 		for(var i = 1; i < 4; i++ ) {
// 			$('nav ul li:eq('+i+')').on('mouseover', {num:i},function(event){
// 				var x = $(this).position().left;
// 				var y = $(this).position().top + $(this).outerHeight();
// 				that.changeContent(event.data.num);
// 				$('.subnav').css({
// 					'position':'absolute',
// 					'top':y,
// 					'left':x
// 				}).show();
// 			});
// 		}
// 		$('nav ul li').on('mouseout', function(){
// 			$('.subnav').hide();
// 		});
// 		$('.subnav').on('mouseover', function(){
// 			$(this).show();
// 		});
// 		$('.subnav').on('mouseout', function(){
// 			$(this).hide();
// 		});
// 	},
// 	init: function(){
// 		var html = '<ul class="subnav"></ul>';
// 		$('body').append(html);
// 		this.bind();
// 	}
// };

// var nav = new Nav();
// nav.init();

// --------------- 轮播图 上

// var Scoll = {
// 	num : parseInt($('.scoll div').length),
// 	reset: function(){
// 		var that = this;
// 		for(var i = 0; i < that.num; i++ ) {
// 			$('.scoll div:eq('+i+')').css({
// 				'top':'-'+(parseInt($('.scoll div img').outerHeight())*i)+'px',
// 				'left':'-'+(100*i)+'%'
// 				});
// 		}
// 	},
// 	fun: function(num){
// 		var that = Scoll;
// 			for(var i = 0; i < that.num; i++ ) {
// 				var left = parseInt($('.scoll div:eq('+i+')').css('left').split('%')[0]) + 100;
// 				if(left >= (that.num - 1)*100) {
// 					left = -100;
// 					$('.scoll div:eq('+i+')').css({left:left+'%'});
// 				}else{
// 					$('.scoll div:eq('+i+')').animate({left:left+'%'});
// 				}
// 			}
// 	},
// 	init: function(){
// 		this.reset();
// 		setInterval(this.fun, 3000);
// 	}
// };

// Scoll.init();

// --------------- 轮播图 下
var Scoll = {
	num : parseInt($('.scoll div').length),
	reset: function(){
		var that = this;
		for(var i = 0; i < that.num; i++ ) {
			$('.scoll div:eq('+i+')').css({
				'top':'-'+(parseInt($('.scoll div img').outerHeight())*i)+'px',
				'left':'-'+(100*i)+'%'
				});
		}
	},
	turn: function(num){
		var that = Scoll;
		var move = parseInt($('.scoll div:eq('+num+')').css('left').split('%')[0]);

		for(var i = 0; i < that.num; i++ ) {
			var left = parseInt($('.scoll div:eq('+i+')').css('left').split('%')[0]) - move;
				if(left >= (that.num - 1)*100) {
					left = -100;
					$('.scoll div:eq('+i+')').css({left:left+'%'});
				}else if(left <= -(that.num - 1)*100){
					left = +100;
					$('.scoll div:eq('+i+')').css({left:left+'%'});
				}else{
					$('.scoll div:eq('+i+')').animate({left:left+'%'});
				}
		}
		this.turnId = num;
		$('.pages div').removeClass();
		$('.pages div[pagenum='+this.turnId+']').addClass('focus');
	},
	autoturn: function(){
		var that = Scoll;
		that.turn((that.turnId + 1)%that.num);
	},
	turnto: function(num){
		var that = Scoll;
		clearInterval(that.setId);
		that.turn(num);
		that.setId = setInterval(that.autoturn, 3000);
	},
	makepages: function(){
		var html = '<div class="pages">';
		for (var i = 0; i < this.num; i++) {
			html += '<div pagenum="'+i+'"></div>';
		}
		html += '</div>';
		$('.scollcont').append(html);
		$('.pages').css('left',($('.scoll').width() - $('.pages').width()) / 2 + 'px');
		$('.pages div[pagenum=0]').addClass('focus');
	},
	bind: function(){
		var that = this;
		$('.btnleft').on('click', function(){
			that.turnto((that.turnId + that.num - 1)%that.num);
		});
		$('.btnright').on('click', function(){
			that.turnto((that.turnId + 1)%that.num);
		});
		$('.pages div').on('click', function(){
			that.turnto(parseInt($(this).attr('pagenum')));
		});
	},
	init: function(){
		this.reset();
		this.makepages();
		this.bind();
		this.turnId = 0;
		this.setId = setInterval(this.autoturn, 3000);
	}
};

Scoll.init();