var host='http://api.kuaikangda.com/api/';
// var articalTypeId;
var pageIndex;

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

var pageIndex=0
$(document).ready(function(){
	// articalTypeId=decodeURIComponent((new RegExp('[?|&]' + 'id' + '=' + '([^&;]+?)(&|#|;|$)')
	// 	.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))

	getArticalsList(pageIndex)
	
})

/*
"result": [
    {
      "id": 1,
      "userId": 3,
      "productId": 1,
      "postType": 0,
      "postTime": 1474374834,
      "isHot": 0,
      "isTop": 0,
      "views": 0,
      "likes": 1,
      "comments": 0,
      "title": "",
      "content": "世界如此险恶，你要内心强大。",
      "images": "",
      "attributes": {
          "pumpUsedDays": 0,
      },
      "nickName": "智慧人生",
      "avatar": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/avatar/2016/7/e1388771f61f",
      "isLiked": -1,
      "isFollowed": -1,
      "userTags": "名医,官方",
      "diagnoDate": 0,
      "diabeteType": 4, 糖尿病类型 1-I型 2-II型 3-妊娠糖尿病 4-非糖尿病
      "productInfo": {
        "id": 1,
        "productName": "进口丹纳ⅡS胰岛素泵",
        "productDesc": "进口韩国丹纳ⅡS 胰岛素泵",
        "thumb": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/product/2016/8/d4b36a0048dc",
        "isStage": 1,
        "productAmount": 33000,
        "ratios": "10,20,30,40,50,100",
        "stages": "12,18",
        "payCount": 0,
        "attributes": {
          "isShowMP": true,
          "sourcePrice": "39800"
        }
      }
    }
  ]
*/
function getArticalsList(pageIndex){
	// console.log(pageIndex)
	$.ajax({
        type:'POST',
        url:host+'community/list',
        data:{
            userId:0,
            listType:0,
            postType:1,
            pageIndex:pageIndex,
            pageSize:10
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            console.log(info)
            if (info.result&&info.result.length!=0) {
	            data={list:info.result};
                for (var i = 0; i < info.result.length; i++) {
                    var diagnoDate=info.result[i].diagnoDate;
                    var years=(Math.floor(new Date().getTime()/1000)-diagnoDate)/31536000;
                    // console.log(years)
                    info.result[i].diagnoDate=Math.floor(years)+'年'+(Math.floor(years%12))+'月';

                    var images=info.result[i].images;
                    if (images=="") {
                        info.result[i].images=new Array();
                    }else{
                        var imagesArr=images.split(',');
                        info.result[i].images=imagesArr;
                    }
                    
                    if (!info.result[i].productInfo.attributes) {
                        info.result[i].productInfo.attributes={
                            sourcePrice:info.result[i].productInfo.productAmount
                        }
                    }

                    if (info.result[i].productInfo.stages) {
                        var amount=info.result[i].productInfo.productAmount
                        var stages=info.result[i].productInfo.stages.split(",")
                        var maxMonths=stages[stages.length-1]
                        info.result[i].productInfo.yuegong="最高月供：¥"+Math.floor(amount*0.9/maxMonths)+"&nbsp;x&nbsp;"+maxMonths
                    }
                    
                    
                }
	            console.log(data);
	            html=template('tpl',data);
	            // console.log(html)
	            $('#containerList').append(html)
            }else{//jiazai wanbi
            	document.getElementById('btnLoadMore').innerHTML="加载完毕！"
            }
            
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}

function loadMore(){
	pageIndex++;
	getArticalsList(pageIndex)
}


// function getDate(datetime){
//     return new Date(datetime);
// }




