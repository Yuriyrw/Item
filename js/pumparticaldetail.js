
$(document).ready(function(){
	articalId=decodeURIComponent((new RegExp('[?|&]' + 'articalId' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))

	getArtical()
})
/*

{
    "apiState": {
        "stateCode": 0,
        "stateMessage": "Success"
    },
    "result": {
        "id": 2,
        "isLiked": -1,
        "categoryId": 1,
        "articleType": 0,
        "likes": 0,
        "views": 1127,
        "comments": 0,
        "onlineStatus": 1,
        "isSpecial": 0,
        "title": "哪些糖尿病患者适合用胰岛素泵？",
        "subTitle": "",
        "thumb": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/pump/2016/8/92d9456a9f01",
        "description": "",
        "addTime": 1469590586,
        "addTimeString": "2016-07-27 11:36:26",
        //artilceType 为0时
        "content": "...",
        //artilceType 为1时
        "suitPerson": "糖友、血糖高",
        "nutrition": "营养价值很高哦",
        "mainMaterial": "瘦肉、木耳、葫芦卜",
        "assistMaterial": "郫县豆瓣、白糖",
        "makeWay": "1、瘦肉切丝",
        "tips": "小贴士",
    }
}
*/
function getArtical(){
	$.ajax({
        type:'POST',
        url:host+'articles/info',
        data:{
            articleId:articalId,
            userId:0
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            console.log(info)
            var result=info.result;
            if (result.articleType==1) {
              // yin shi
              document.getElementById('thumb').src=result.thumb
              
              document.getElementById('caidanBox').style.display="block"
              document.getElementById('title').innerHTML=result.title;
              document.getElementById('suitPerson').innerHTML=result.suitPerson;
              document.getElementById('nutrition').innerHTML=result.nutrition;
              document.getElementById('mainMaterial').innerHTML=result.mainMaterial;
              document.getElementById('assistMaterial').innerHTML=result.assistMaterial;
              var makeWayElement=document.getElementById('makeWay')
              var makeWay=result.makeWay.split("\n")
              for (var i = 0; i < makeWay.length; i++) {
                var p=document.createElement("p")
                p.innerHTML=makeWay[i]
                makeWayElement.appendChild(p)
              }

              document.getElementById('tips').innerHTML=result.tips;
            }else{
              document.getElementById('caidanBox').style.display="none"
              document.getElementById('thumb').style.display="none"
              document.getElementById('title').innerHTML=result.title;
              document.getElementById('content').innerHTML=result.content;
            }
            getCommentsList();
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}
/*

"result": [
    {
      "id": 2,
      "userId": 3,
      "postId": 1,
      "likes": 0,
      "commentTime": 1474375835,
      "content": "世界如此险恶，你要内心强大。",
      "nickName": "智慧人生",
      "phoneNumber": "xxxx",
      "avatar": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/avatar/2016/7/e1388771f61f",
      "isLiked": -1,
      "replys": []
    },
    {
      "id": 1,
      "userId": 3,
      "postId": 1,
      "likes": 0,
      "commentTime": 1474375834,
      "content": "世界如此险恶，你要内心强大。",
      "nickName": "智慧人生",
      "phoneNumber": "xxxx",
      "avatar": "http://...",
      "isLiked": -1,
      "replys": [
        {
          "id": 1,
          "userId": 3,
          "replyTime": 1474375836,
          "content": "世界如此险恶，你要内心强大。",
          "nickName": "智慧人生",
          "phoneNumber": "xxxx",
          "avatar": "http://...",
          "replyTo": 0,
          "replyToNickName":''
        },
        {
          "id": 2,
          "userId": 3,
          "replyTime": 1474376834,
          "content": "世界如此险恶，你要内心强大。",
          "nickName": "智慧人生",
          "phoneNumber": "xxxx",
          "avatar": "http://...",
          "replyTo": 0,
          "replyToNickName":''
        }
      ]
    }
  ]*/
function getCommentsList(){
	$.ajax({
        type:'POST',
        url:host+'community/listComments',
        data:{
            userId:0,
            postId:articalId,
            commentType:10
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            console.log(info)
            var firstLevelComments=info.result;
            var commentDiv=document.getElementById('commentDiv');
            if (firstLevelComments&&firstLevelComments.length>0) {

              commentDiv.style.display='block'
              document.getElementById('commentsCount').innerHTML='评论('+firstLevelComments.length+")";
              for (var i = 0; i < firstLevelComments.length; i++) {
                if (firstLevelComments[i].nickName=="") {
                    firstLevelComments[i].nickName="匿名用户";
                }
                if (firstLevelComments[i].avatar=="") {
                  firstLevelComments[i].avatar="images/default_avatar.jpg"
                }
                var itemDiv=document.createElement('div');
                var date=new Date(firstLevelComments[i].commentTime*1000)
                var commentItemHtml="<ul class='clearfix' style='padding:10px 0 20px;'>"+
                                    "<li class='commentNickname col-xs-2'><img src='"+firstLevelComments[i].avatar+"'></li>"+
                                    "<li class='col-xs-6'>"+
                                        "<ul class='clearfix' style='padding:0 0 0 5px;'>"+
                                          "<li class='commentnicheng'>"+firstLevelComments[i].nickName+"</li>"+
                                          "<li class='commentContents'>"+firstLevelComments[i].content+"</li>"+
                                        "</ul>"+
                                    "</li>"+
                                    "<li class='col-xs-4 pumpReplaytime' >"+date.getFullYear()+"/"+(date.getMonth() + 1)+
                                    "/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+ "</li>"+
                                "</ul>"+
                                "<div class='col-xs-offset-1 replayBox'>"+
                                "</div>";
                itemDiv.innerHTML=commentItemHtml;
                commentDiv.appendChild(itemDiv)

                var replayToNickName=firstLevelComments[i].nickName;
                var replys=firstLevelComments[i].replys;
                var replayListDiv=itemDiv.lastChild;
                for (var j = 0; j < replys.length; j++) {
                  var replyItemDiv=document.createElement('div');
                  if (replys[j].nickName=="") {
                    replys[j].nickName="匿名用户";
                  }
                  if (replys[j].replyToNickName=="") {
                    replys[j].replyToNickName=replayToNickName;
                  }
                  var replyItemHtml="<span class='Nicknamereplay'>"+replys[j].nickName+"</span>回复<span class='replayNickname'>"+replys[j].replyToNickName+"</span>"+
                                    "<p class=''>"+replys[j].content+"</p>";
                  replyItemDiv.innerHTML=replyItemHtml;
                  replayListDiv.appendChild(replyItemDiv);
                }
              }
            }else{
              document.getElementById('commentDiv').style.display='none'
            }
        },
        err:function(err,errmsg){
            console.log('Request fail')
        },
    })
}



