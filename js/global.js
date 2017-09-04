var host='http://api.kuaikangda.com/api/';

function getToken(){
    // appKey
    var appKey='f4583c63def8';
    // appSecort
    var appSecort='3060d7c1ce2921da175270c483e9eb5a';
    // 时间戳
    var timeStamp=new Date().getTime();
    // 将要被加密的字符串
    var strToBeMD5=appKey+'|'+timeStamp+'|'+appSecort;
    // 已经加密好的字符串
    var md5_result=hex_md5(strToBeMD5);
    // 最终的token
    var token=appKey+'|'+timeStamp+'|'+md5_result;
    // console.log(token);
    // return token
    return token;
}

// Copyright 2014-2015 Twitter, Inc.
// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style')
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  )
  document.querySelector('head').appendChild(msViewportStyle)
}
// hederUL
$('.slideDown').mouseover(function(){
        $('.slideDown ul').addClass('dropdown-menuShow')
    })
    $('.slideDown').mouseout(function(){
        $('.slideDown ul').removeClass('dropdown-menuShow')
})
// header UL List
function getPumpTypeList(){
    $.ajax({
        type:'POST',
        url:host+'articles/featured',
        data:{
            pageIndex:'0',
            pageSize:'10'
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            // console.log(info.result.categories)
            var categories=info.result.categories;
            var headerUl=document.getElementById('headerUl');
            
            for (var i = 0; i < categories.length; i++) {
                var headerLi=document.createElement('li');
                var headerA=document.createElement('a');
                headerA.innerHTML=categories[i].title;
                headerA.id='headerPumpType'+i;
                headerLi.appendChild(headerA);

                headerUl.appendChild(headerLi);

                var headerElement=document.getElementById('headerPumpType'+i);
                headerElement.href="IPumpArticalList.html?id="+categories[i].id+"&pumpType="+categories[i].title;
            }
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}


// Change NAVBAR
$(document).ready(function () {
    $(window).scroll(function () {
        if ($('.navbar').offset().top > 50) {
            $('.navbar').addClass('nav-toggle');
            $('.header_top').hide(100);
            $('.tel').hide(200)
            $('.kkda_headerCne').css({
                background: '#fff'
            });
            $('#navbar').addClass('change') 
            $('#kkda_header .navbar_left li:last-child').addClass('change')
        } else {
            $('.navbar').removeClass('nav-toggle');
            $('.header_top').show(100);
            $('#navbar').removeClass('change')
            $('#kkda_header .navbar_left li:last-child').removeClass('change')
            $('.tel').show(100)
            $('.kkda_headerCne').css({
                background: '0'
            });

        }
    }),

    getQQs(),

    // controlVideos(),

    getPumpTypeList()

    $('.slideDown').mouseover(function(){
        $('#kkda_header .dropdown-menu').css({'opacity':'1','top':'100%','transform':'scale(1)'})
    })
    $('.slideDown').mouseout(function(){
        $('#kkda_header .dropdown-menu').css({'opacity':'','top':'180%','transform':'scale(0)'})
    }),

    // 左右切换的底部文字
    $('.figure_gento').hover(
        function () {
          var obj = $(this);
                $(obj).find('ul').addClass('ul-show');
        },
        function () {
          var obj = $(this);
            $(obj).find('ul').removeClass('ul-show');
        }
    ),
    // backtop
    $(function(){
            var h = $(window).height();
            $(window).scroll(function(){
                var iScroll = $(document).scrollTop();
                if( iScroll >= h-200 ){
                    $('.backtop').show();
                }else{
                    $('.backtop').hide();
                }
            });
            $('.backtop').click(function(){
                $('body,html').animate({'scrollTop':0});

            })
        })
})

// footer ewm
$('.quadIconA').mouseover(function(){
  $('#footer  .showEwm li.showAnd').css({'top':'60px','opacity':"1",'transform':'scale(1)'})
}).mouseout(function(){
  $('#footer  .showEwm li.showAnd').css({'top':'-15px','opacity':"0",'transform':'scale(0.5)'})
})
$('.quadIconI').mouseover(function(){
  $('#footer  .showEwm li.showIOS').css({'top':'60px','opacity':"1",'transform':'scale(1)'})
}).mouseout(function(){
  $('#footer  .showEwm li.showIOS').css({'top':'-15px','opacity':"0",'transform':'scale(0.5)'})
})
$('.quadIconW').mouseover(function(){
  $('#footer  .showEwm li.showweixin').css({'top':'60px','opacity':"1",'transform':'scale(1)'})
}).mouseout(function(){
  $('#footer  .showEwm li.showweixin').css({'top':'-15px','opacity':"0",'transform':'scale(0.5)'})
})



function getQQs(){
    $.ajax({
        type:'GET',
        url:host+'custom/customQQ',
        data:{
            pageIndex:'0',
            pageSize:'10'
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            // console.log(info)
            var data={list:info.result};
            // 全局的qqData，里面放的是所有客服的qq列表
            qqData=data.list;
            // console.log(qqData);
            // 调用该方法随机设置qq
            setQQhref();
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}

/*随机设置qq*/
function setQQhref(){
    // 获取随机的位置
    var index=Math.floor(Math.random()*qqData.length);
    // console.log(index+'-----'+qqData[index].qq)

    // 设置qq的href，这里利用随机角标index来随机获取qq
    document.getElementById("webqq").href="http://wpa.qq.com/msgrd?v=3&uin="+
        qqData[index].qq+"&site=qq&menu=yes"

    document.getElementById("footerQQ").href="http://wpa.qq.com/msgrd?v=3&uin="+
        qqData[index].qq+"&site=qq&menu=yes"
}

// qq点击之后随机切换qq
$('#webqq').click(function(){
    setQQhref();
})
$('#footerQQ').click(function(){
    setQQhref();
})

$('#webqq').mouseover(function(){
    $('.go-hover').css({'display':'block','right':'60px'})
}).mouseout(function(){
    $('.go-hover').css({'display':'none','right':'100px'})
})

$('.telephonebtn').mouseover(function(){
    $('.telephoneShow').css({'display':'block','right':'55px'})
}).mouseout(function(){
    $('.telephoneShow').css({'display':'none','right':'100px'})
})
$('.sideBaricon').mouseover(function(){
    $('.siewmShow').css({'display':'block','right':'66px'})
}).mouseout(function(){
    $('.siewmShow').css({'display':'none','right':'100px'})
})

$('.navbar-toggle').click(function(){
    $('.navbar-collapse').css({
        display: 'block',
        height:'100%',
        background:'#fff'
    });
})

$('.navbar-right li.hid').click(function(){
    $('.navbar-collapse').css({
        display: 'none'
    });
})

jQuery(window).load(function() {
    jQuery(".preloader").delay(600).fadeOut();
  });


$(".pumpDetail .bshow").mouseenter(function(){
    $(this).children("div:even").animate({
        "width":"100%",
    },300).css("background","#02b3bf");
    $(this).children("div:odd").animate({
        "height":"100%",
    },300).css("background","#02b3bf");
});

$(".pumpDetail .bshow").mouseleave(function(){
    $(this).children("div:even").animate({
        "width":"0%",
    },300).css("background","#02b3bf");
    $(this).children("div:odd").animate({
        "height":"0%",
    },300).css("background","#02b3bf");

});


