function ex1(){
	$.ealert('Lorem ipsum dolor sit amet.');
}
function ex2(){
	$.ealert('Lorem ipsum dolor sit amet.',{
		beforeopen:function(){
			alert('Before Open');
		},
		onopen:function(){
			alert('Open');
		},
		onaccept:function(){
			alert('Accept');
		},
		onclose:function(){
			alert('Close');
		}
	});
}
function ex3(){
	$.ealert('Lorem ipsum dolor sit amet.',{
		beforeopen:function(){
			alert('Error: Before open validation');
			return false;
		}
	});
}
function ex4(){
	$.ealert('<input type="checkbox" name="radio_test"> Close.',{
		onaccept:function(){
			if(!$('input[name=radio_test]').is(':checked')){
				alert('Error: close validation');
				return false;
			}
		}
	});
}
function ex5(){
	$.ealert('Lorem ipsum dolor sit amet.',{
		background:'#fff',
		button_text: 'Ok i accept it',
		closeonesc:false,
		closeonbk:false,
		button_aling:'right',
		width:400,
		opacity:0.9
	});
}
function ex6(){
	$.ealert('Lorem ipsum dolor sit amet.',{
		css:'myCustomAlert',
		closeonbk:false
	});
}

