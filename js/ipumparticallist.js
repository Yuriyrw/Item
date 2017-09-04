
var host='http://api.kuaikangda.com/api/';
var articalTypeId;
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
	articalTypeId=decodeURIComponent((new RegExp('[?|&]' + 'id' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))
	var articalTypeTitle=decodeURIComponent((new RegExp('[?|&]' + 'pumpType' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))

	document.getElementById('title').innerHTML=articalTypeTitle

	getArticalsList(pageIndex)
	
})




/*
{
    "apiState": {
        "stateCode": 0,
        "stateMessage": "Success"
    },
    "result": {
        "list": [
            {
                "id": 24,
                "categoryId": 1,
                "articleType": 0,
                "likes": 0,
                "views": 2678,
                "comments": 3,
                "onlineStatus": 1,
                "isSpecial": 0,
                "title": "胰岛素泵可显著预防严重低血糖的发生",
                "subTitle": "",
                "thumb": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/pump/9f/c0/9fc0518fa294a2fda504325f258bfc8d.jpg",
                "description": "",
                "addTime": 1478514879,
                "addTimeString": "2016-11-07 18:34:39",
                "categoryName": "泵的知识"
            },
            ...
        ],
        "count": 24
    }
}

*/

var totalArticalesSpan=document.getElementById("totalItems")
var currentAndTotalPages=document.getElementById("currentAndTotalPages")


function getArticalsList(pageIndex){
	// console.log(pageIndex)
	$.ajax({
        type:'POST',
        url:host+'articles/list',
        data:{
            categoryId:articalTypeId,
            pageIndex:pageIndex,
            pageSize:10
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
        	console.log(info)
            // The number of total articles
        	articlesCount=info.result.count;
            // Total pages
            if (articlesCount%10==0) {
                countPage=Math.floor(articlesCount/10)-1;
            }else{
                countPage=Math.floor(articlesCount/10);
            }

            totalArticalesSpan.innerHTML="共"+articlesCount+"条"
            currentAndTotalPages.innerHTML=""+(pageIndex+1)+"/"+(countPage+1)
            

            if (pageIndex==0) {
                document.getElementById('prev').style.border='1px solid #D9D9D9';
                document.getElementById('prev').style.color='#D9D9D9';
                document.getElementById('prev').style.cursor='not-allowed';
                document.getElementById('firstPage').style.border="1px solid #D9D9D9";
                document.getElementById('firstPage').style.color="#D9D9D9";
                document.getElementById('firstPage').style.cursor='not-allowed';

            }else{
                document.getElementById('prev').style.border='1px solid #009DE2';
                document.getElementById('prev').style.color='#009DE2';
                document.getElementById('prev').style.cursor='pointer';
                document.getElementById('firstPage').style.border="1px solid #009DE2";
                document.getElementById('firstPage').style.color="#009DE2";
                document.getElementById('firstPage').style.cursor='pointer';

            }
            if (pageIndex==countPage) {
                document.getElementById('next').style.border='1px solid #D9D9D9';
                document.getElementById('next').style.color='#D9D9D9';
                document.getElementById('next').style.cursor='not-allowed';
                document.getElementById('lastPage').style.border="1px solid #D9D9D9";
                document.getElementById('lastPage').style.color="#D9D9D9";
                document.getElementById('lastPage').style.cursor='not-allowed';
            }else{
                document.getElementById('next').style.border='1px solid #009DE2';
                document.getElementById('next').style.color='#009DE2';
                document.getElementById('next').style.cursor='pointer';
                document.getElementById('lastPage').style.border="1px solid #009DE2";
                document.getElementById('lastPage').style.color="#009DE2";
                document.getElementById('lastPage').style.cursor='pointer';
            }
            if (info.result.list&&info.result.list.length!=0) {
            	// articles=articles.concat(info.result.list)
	            data={list:info.result.list}
	            // console.log(data.list)
	            html=template('tpl',data);
	            // console.log(html)
	            // $('#containerList').append(html)
                document.getElementById('containerList').innerHTML=html;
            }else{//jiazai wanbi
            	// document.getElementById('btnLoadMore').innerHTML="加载完毕！"
            }
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}

function prev(){
    if (pageIndex==0) {
        return;
    }else{
        pageIndex--;
        getArticalsList(pageIndex)
    }
	
}

function next(){
    if (pageIndex==countPage) {
        return;
    }else{
        pageIndex++;
        getArticalsList(pageIndex);
    }
}

function firstPage(){
    pageIndex=0
    getArticalsList(pageIndex)
}

function lastPage(){
    pageIndex=countPage
    getArticalsList(pageIndex)
}








