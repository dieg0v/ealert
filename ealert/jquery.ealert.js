/*

ealert jQuery alert plugin v1.0

Distributed under the MIT license:
http://www.opensource.org/licenses/mit-license.php

Copyright (c) Diego Vilariño:
http://www.dieg0v.com/ - http://www.sond3.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software
and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions: The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function ($) {
    $.extend({
        ealert: function ( content , options) {

			var defaults = {
				content: '',
				width: 300,
				button_text: 'Accept',
				background: '#000',
				opacity: 0.75,
				closeonbk: true,
				closeonesc: true,
				beforeopen:false,
				onopen:false,
				onaccept:false,
				onclose:false,
				button_aling:'center',
				css: false
			};

			defaults.content = content || defaults.content;

			var opts = $.extend(defaults, options);
			var open = true;

			if($.isFunction(defaults.beforeopen)){
				if(defaults.beforeopen.call(this)===false){
					open = false;
				}
			}

			if(open){

				var css='';
				if(defaults.css!==false){
					css= ' class="'+defaults.css+'"';
				}

				var content_modal = $('<div>'+defaults.content+'</div>');
				var content_btns = $('<p style="margin:0;pading:0;text-align: '+defaults.button_aling+';"></p>');
				var btn = $('<input type="button" class="btn" value="'+defaults.button_text+'">');
				var modal = $('<div'+css+'></div>').appendTo("body");
				var bk = $('<div></div>').appendTo("body");

				bk.css('position','fixed');
				bk.css('top','0');
				bk.css('left','0');
				bk.css('width',$(document).width());
				bk.css('height',$(document).height());
				bk.css('z-index','99998');
				bk.css('background',defaults.background);
				bk.css('filter','alpha(opacity='+defaults.opacity+')');
				bk.css('opacity',''+defaults.opacity+'');
				bk.css('-moz-opacity',''+defaults.opacity+'');

				modal.css('position','absolute');
				modal.css('height','auto');
				modal.css('display','none');
				modal.css('z-index','99999');
				modal.css('-webkit-box-sizing','border-box');
				modal.css('-moz-box-sizing','border-box');
				modal.css('-ms-box-sizing','border-box');
				modal.css('box-sizing','border-box');


				if(defaults.css===false){
					modal.css('width',defaults.width+'px');
				}
				modal.css('margin','0 0 0 -'+parseInt(modal.width()/2)+'px');

				if(defaults.css===false){

					modal.css('padding','20px');
					modal.css('background','#f5f5f5');
					modal.css('color','#333');
					modal.css('border-radius','1px');
					modal.css('box-shadow','0px 0px 20px rgba( 0, 0, 0, 0.5 )');
					modal.css('font-size','14px');
					modal.css('font-family','sans-serif');
					modal.css('color','#333');

					content_modal.css('margin-bottom','20px');
					content_modal.css('text-align','center');

					btn.css('border','0px');
					btn.css('padding','7px 7px');
					btn.css('margin','5px 0px');
					btn.css('border-radius','1px');

					btn.css('cursor','pointer');
					btn.css('color','#fff');
					btn.css('background','#555');
					btn.css('font-size','12px');
					btn.hover(function() {
						$(this).css('background','#999');
					},function() {
						$(this).css('background','#555');
					});
				}

				modal.append(content_modal);
				modal.append(content_btns);
				content_btns.append(btn);

				$(window).bind('resize', onResizeModal);
				$(window).bind('scroll', onScrollModal);

				onScrollModal();

				modal.fadeIn('fast', function() {
					if($.isFunction(defaults.onopen)){
						defaults.onopen.call(this);
					}
				});

				btn.bind('click', function() {
					remove();
				});

				if(defaults.closeonbk){
					bk.bind('click', function(event) {
						remove();
					});
				}

			}

			function onResizeModal(){
				bk.css('width',$(document).width());
				bk.css('height',$(document).height());
				centerModal();
			}

			function onScrollModal() {
				centerModal();
			}

			function centerModal(){
				var top = $(window).scrollTop() + (($(window).innerHeight()/2) - (modal.outerHeight(true)/2));
				var left = ($(window).innerWidth()/2 ) - (( modal.outerWidth(true) - (modal.outerWidth()/2) ));
				modal.css('top',  top ) ;
				modal.css('left',  left) ;
			}

			$(document).bind('keyup', onKeyUp);

			function onKeyUp(event) {
				if( event.keyCode === 13 ) {
					remove();
				}
				if(defaults.closeonesc){
					if( event.keyCode === 27 ) {
						remove();
					}
				}
			}

			function remove(){

				var res = true;
				if($.isFunction(defaults.onaccept)){
					res = defaults.onaccept.call(this);
				}

				if(res!==false){

					btn.unbind('click');
					$(document).unbind('keyup',onKeyUp);
					$(window).unbind('resize', onResizeModal);
					$(window).unbind('scroll', onScrollModal);
					btn.remove();
					modal.remove();
					bk.fadeOut('fast', function() {
						bk.remove();
						if($.isFunction(defaults.onclose)){
							defaults.onclose.call(this);
						}
					});

				}

			}

        }
    });
})(jQuery);

