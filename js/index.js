function ajax(tag,success) {
	$.ajax({
		url: 'http://m.toutiao.com/list/',
		dataType: 'jsonp',
		data: {
			'tag': tag,
			'ac':'wap',
			'count':20,
			'format':'json_raw',
			'as':'A1A528494D3D94A',
			'cp':'589DEDE9144ACE1',
			//'min_behot_time':0,
		},
		success: success
	});
}
function clearActive(){
	$('#nav li').each(function(index,item){
		$(item).removeClass('active');
	});
}
function show(count){
	//console.log(str);
	$('#new').html('为您推荐了'+count+'篇文章').css({
		'display': 'block'
	});
	setTimeout(function() {
		$('#new').css({
			'display':'none'
		});
	}, 2000);

}
$(function () {
	var baseURL = 'http://m.toutiao.com/list/?tag=__all__&ac=wap&count=20&format=json_raw&as=A1A528494D3D94A&cp=589DEDE9144ACE1&min_behot_time=0';
	var arrNav=['推荐','阳光宽频','热点','社会','娱乐','军事','科技','汽车'];
	var arr= ['__all__','video','news_hot','news_society','news_entertainment','news_military','news_tech','news_car'];

	var len=0;
	var active=0;
	var clientWidth = $('body')[0].offsetWidth;
	var navWidth=0;
	var oWidth;
	var swipeW=0;
	var s='';
	var olds = '';
	var $list=$('.list-con');


	// 弹窗
	$('#close').on('tap',function(){
		$('#mask').css({
			'display': 'none'
		});
	});
	// 信息
	$('#msg-box').on('tap',function(){
		$('#mask').css({
			'display': 'block'
		});
	});

	// 刷新
	$('#ref').on('tap',function(){
		ajax(arr[active],fnSuccess);
	});
	// 红包
	$('#hotBag').on('tap',function(){
		$('#mask2').css({
			'display': 'block'
		});
	});
	// 弹窗
	$('#close2').on('tap',function(){
		$('#mask2').css({
			'display': 'none'
		});
	});


	// add添加弹窗
	$('#add').on('tap',function(){
		$('#pindao').css({
			'transform': 'translate3d(0,0,0)'
		});
	});

	$('#back').on('tap',function(){
		$('#pindao').css({
			'transform': 'translate3d(100%,0,0)'
		});
	});

	$('#p1').on('tap','#p1 li',function(){
		$(this).appendTo('#p2');
		console.log(this);
	});
	$('#p2').on('tap','#p2 li',function(){
		$(this).appendTo('#p1');
	});

	// search
	$('#sear').on('tap',function(){
		$('#search').css({
			'transform': 'translate3d(0,0,0)'
		});
	});

	$('#back1').on('tap',function(){
		$('#search').css({
			'transform': 'translate3d(100%,0,0)'
		});
	});






	$list.on('swipeDown',function (ev) {
		if(this.scrollTop==0){
			ajax(arr[active],fnSuccess);
		}
	}).on('swipeLeft',function(ev){
		if(active+1==len){
			return ;
		}

		active++;

		ajax(arr[active],fnSuccess);

		clearActive();
		$('#nav li').eq(active).addClass('active');
		swi(active);
	}).on('swipeRight',function(ev){
		if(active==0){
			return ;
		}
		active--;
		ajax(arr[active],fnSuccess);
		clearActive();
		swi(active);
	});

	$('#nav').on('swipeLeft',function(ev){
		swipeW-=50;
		if(swipeW<-navWidth+clientWidth){
			swipeW=-navWidth+clientWidth-40;
		}
		$('#nav').css({
			'transform': 'translate3d('+swipeW+'px,0,0)'
		});
	}).on('swipeRight',function(){
		swipeW+=50;
		if(swipeW>0){
			swipeW=0;
		};
		$('#nav').css({
			'transform': 'translate3d('+swipeW+'px,0,0)'
		});
	});
	$.each($('#nav li'),function(index,item){
		function getInfo(){
			active=index;
			clearActive();
			var oLi=$('#nav li')[active];
			$('#nav li').eq(active).addClass('active');

			oWidth = clientWidth/2-oLi.offsetLeft-oLi.offsetWidth/2;
			if(clientWidth-navWidth-oLi.offsetWidth/2>oWidth){
				oWidth=clientWidth-navWidth-oLi.offsetWidth/2-10;
			}
			if(oLi.offsetLeft<clientWidth/2){
				oWidth=0;
			}
			$('#nav').css({
				'transform': 'translate3d('+oWidth+'px,0,0)'
			});

			ajax(arr[index],fnSuccess);
		}
		$(item).on('tap',getInfo);
	});
	function swi(active){
		$('#nav li').eq(active).addClass('active');
		var oLi=$('#nav li')[active];
		oWidth = clientWidth/2-oLi.offsetLeft-oLi.offsetWidth/2;
		if(clientWidth-navWidth-oLi.offsetWidth/2>oWidth){
			oWidth=clientWidth-navWidth-oLi.offsetWidth/2-10;
		}
		if(oLi.offsetLeft<clientWidth/2){
			oWidth=0;
		}
		$('#nav').css({
			'transform': 'translate3d('+oWidth+'px,0,0)'
		});
	}
	function getLi(str) {
		var s ='';
		if(str.image_list.length){
			s=`
				<a href="${str.display_url}">
					<h3>${str.title}</h3>
					<ul class="t4 clearfix">
							<li>
								<div><img src="${str.image_list[0].url}"></div>
							</li>
							<li>
								<div><img src="${str.image_list[1].url}"></div>
							</li>
							<li>
								<div><img src="${str.image_list[2].url}"></div>
							</li>
					</ul>
					<div class="item-info">
						<span class="hot">热</span>
						<span> ${str.source}</span>
						<span>评论 ${str.comment_count}</span>
						<span></span>
					</div>
				</a>`;
		}else if(str.image_url||str.large_image_url){
			s=`
				<a class="clearfix" href="${str.display_url}">
					<div class="t1l fl">
						<h3>${str.title}</h3>
						<div class="item-info">
							<span class="hot">热</span>
							<span> ${str.source}</span>
							<span>评论 ${str.comment_count}</span>
							<span></span>
						</div>
					</div>
					<div class="t1r fr">
						<img src="${str.image_url||str.large_image_url}" alt="" />
					</div>
				</a>
				`;
		}else{
			s=`
				<a class="clearfix" href="${str.display_url}">
					<h3>${str.title}</h3>
					<div class="item-info">
						<span class="hot">热</span>
						<span> ${str.source}</span>
						<span>评论 ${str.comment_count}</span>
						<span></span>
					</div>
				</a>
			`;
		}
		if(str.video_style){
			s=`
				<a  href="javascript:;">
					<div class="videoT">
						<h3>${str.title}</h3>
						<img src="${str.image_url||str.large_image_url}" alt="" />
					</div>
					<div class="item-info">
						<span> ${str.source}</span>
						<span>评论 ${str.comment_count}</span>
						<span></span>
					</div>
				</a>
			`;
		}
		return s;
	}
	function fnSuccess(str) {
		s = '';
		var sli = '';
		show(str.return_count);

		$.each(str.data,function (index,item) {
			sli = getLi(item);
				s+=`
					<div class="item-box">
						${sli}
					</div>
				`;
		});
		olds = s+olds;
		$list.html(olds);
		$list[0].scrollTop=0;
	}
	function init(index){
		navWidth = 0;
		var len = $('#nav li').length;
		$.each($('#nav li'),function(index,item){
			if(index+1==len){
				navWidth=item.offsetLeft+item.offsetWidth+ 10;
			}
		});
		$('#nav').css({'width':navWidth});
		clearActive();
		$('#nav li').eq(index).addClass('active');
		ajax(arr[index],fnSuccess);
	}
	init(0);

});
