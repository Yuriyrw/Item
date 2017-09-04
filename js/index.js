

var a_main=document.getElementById('a_main')
var a_services=document.getElementById('a_services')
var a_portfolio=document.getElementById('a_portfolio')
var a_sugarcontrol=document.getElementById('a_sugarcontrol')
var a_clientele=document.getElementById('a_clientele')
var a_aboutus=document.getElementById('a_aboutus')
a_main.onclick=function(e){
  //do something for myself
  e.preventDefault();
  
  $.scrollTo('#main-slider',500);
}
a_services.onclick=function(e){
  $.scrollTo('#services',500);
}

a_portfolio.onclick=function(e){
  //do something for myself
  e.preventDefault();
 
  $.scrollTo('#portfolio',500);
}

a_sugarcontrol.onclick=function(e){
  //do something for myself
  e.preventDefault();
 
  $.scrollTo('#sugarcontrol',500);
}

a_clientele.onclick=function(e){
  //do something for myself
  e.preventDefault();

  $.scrollTo('#clientele',500);
}
a_aboutus.onclick=function(e){
  //do something for myself
  e.preventDefault();
  
  $.scrollTo('#aboutus',500);
}

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
            console.log(info.result.categories)
            var categories=info.result.categories;
            var headerUl=document.getElementById('headerUl');
            var pumpTypeList=document.getElementById('pumpTypeList');
            for (var i = 0; i < categories.length; i++) {
                var headerLi=document.createElement('li');
                var headerA=document.createElement('a');
                headerA.innerHTML=categories[i].title;
                headerA.id='headerPumpType'+i;
                headerLi.appendChild(headerA);
                headerUl.appendChild(headerLi);

                
                if (i>=3) {
                    var pumpTypeLi=document.createElement('li');
                    pumpTypeLi.class='col-lg-2 col-md-2 col-sm-3 col-xs-4';
                    var pumpTypeA=document.createElement('a');
                    pumpTypeA.innerHTML=categories[i].title;
                    headerLi.appendChild(headerA);

                    pumpTypeA.id="pumpType"+i;
                    pumpTypeLi.appendChild(pumpTypeA);
                    pumpTypeList.appendChild(pumpTypeLi);
                }

                // if (i<3) {
                //     var element=document.getElementById('pumpType'+i);
                //     element.href="IPumpArticalList.html?id="+categories[i].id
                // }else {
                //     var element=document.getElementById('pumpType'+i);
                //     element.innerHTML=categories[i].title;
                //     element.href="IPumpArticalList.html?id="+categories[i].id
                // }
                var headerElement=document.getElementById('headerPumpType'+i);
                headerElement.href="IPumpArticalList.html?id="+categories[i].id+"&pumpType="+categories[i].title;
                
                var element=document.getElementById('pumpType'+i);
                element.href="IPumpArticalList.html?id="+categories[i].id+"&pumpType="+categories[i].title;
                if (i>=3) {
                    element.innerHTML=categories[i].title;
                }
            }
            
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}

function controlVideos(){
    video1=document.getElementById('video1'),
    video2=document.getElementById('video2'),
    video3=document.getElementById('video3'),

    video1.onplay=function(){
        video2.pause();
        video3.pause();
    }

    video2.onplay=function(){
        video3.pause();
        video1.pause();
    }

    video3.onplay=function(){
        video1.pause();
        video2.pause();
    }
}
controlVideos();


function vidplay1() {
   var video1 = document.getElementById("video1");
   var playBtn1 = document.getElementById("playBtn1");
   if (video1.paused) {
      video1.play();
      playBtn1.style.background="none"
   } else {
      video1.pause();
      playBtn1.style.background="url(images/playnormal.png)no-repeat center"

   }
};
function vidplay2() {
   var video2 = document.getElementById("video2");
   var playBtn2 = document.getElementById("playBtn2");
   if (video2.paused) {
      video2.play();
      playBtn2.style.background="none"
   } else {
      video2.pause();
      playBtn2.style.background="url(images/playnormal.png)no-repeat center"

   }
};
function vidplay3() {
   var video3 = document.getElementById("video3");
   var playBtn3 = document.getElementById("playBtn3");
   if (video3.paused) {
      video3.play();
      playBtn3.style.background="none"
   } else {
      video3.pause();
      playBtn3.style.background="url(images/playnormal.png)no-repeat center"

   }
};


function pumpClick(index){
    switch(index){
        case '01':
            console.log("01")
        break;

        case '02':
            console.log("02")
        break;

        default:
            console.log('other')
        break;
    }
}


$(function(){
     $('#services .secondPte .xsPumplist').slice(4,10).hide();
     var bFlag = false;
     $('#services .secondPte div h5').click(function(){
        if( !bFlag ){
                $('#services .secondPte .xsPumplist').slice(4,10).slideDown(500);
                $('#services .secondPte div h5').html('隐藏部分胰岛素泵 >>');
            }else{
                $('#services .secondPte .xsPumplist').slice(4,10).slideUp(500);
                $('#services .secondPte div h5').html('点击查看全部 >>');
            }
            bFlag = !bFlag;
     })
})

$(function(){
     $('#portfolio .secondPte .xsPumplist').slice(4,10).hide();
     var bFlag = false;
     $('#portfolio .secondPte div h5').click(function(){
        if( !bFlag ){
                $('#portfolio .secondPte .xsPumplist').slice(4,10).slideDown(500);
                $('#portfolio .secondPte div h5').html('隐藏部分耗材 >>');
            }else{
                $('#portfolio .secondPte .xsPumplist').slice(4,10).slideUp(500);
                $('#portfolio .secondPte div h5').html('查看全部耗材 >>');
            }
            bFlag = !bFlag;
     })
})


$('#carousel-example-generic,#main-slider').mouseover(function(){
  $('.carousel-control').css({
    opacity: '10'
  });
})
$('.carousel-inner').mouseout(function(){
  $('.carousel-control').css({
    opacity: '0'
  });
})


