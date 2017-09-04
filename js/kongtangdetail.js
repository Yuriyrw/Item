
$(document).ready(function(){
	articalId=decodeURIComponent((new RegExp('[?|&]' + 'articalId' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))
  console.log(articalId)
	getArtical()
})
/*
"result": {
    "id": 1,
    "userId": 3,
    "productId": 1,
    "postType": 0,
    "status":2
    "postTime": 1474374834,
    "isHot": 0,
    "isTop": 0,
    "views": 0,
    "likes": 6,
    "comments": 0,
    "title": "",
    "content": "世界如此险恶，你要内心强大。",
    "images": "",
    "attributes": {},
    "nickName": "智慧人生",
    "avatar": "http://tangrenjie.oss-cn-beijing.aliyuncs.com/avatar/2016/7/e1388771f61f",
    "isLiked": -1,
    "isFollowed": -1,
    "productInfo": {
      "id": 1,
      "productName": "进口丹纳ⅡS胰岛素泵",
      "productDesc": "进口韩国丹纳ⅡS 胰岛素泵",
      "announcement": "国庆大放价，前30名购买者再送进口耗材20套",
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
    },
     "postCount": 1
  }
}

*/
function getArtical(){
	$.ajax({
        type:'POST',
        url:host+'community/postInfo',
        data:{
            postId:articalId,
            userId:0
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
          console.log(info);
          // document.getElementById('content').innerHTML=info.result.content;
          var contentAll=document.getElementById('content')
              var content=info.result.content.split("\n")
              for (var i = 0; i < content.length; i++) {
                var p=document.createElement("p")
                p.innerHTML=content[i]
                contentAll.appendChild(p)
              }
          var data={list:info.result.images.split(',')};
          if(info.result.images!=""){
              html=template('tpl',data);
                // console.log(html)
              $('#contentImages').append(html)
          }
          if (!info.result.productInfo.attributes) {
              info.result.productInfo.attributes={
                  sourcePrice:info.result.productInfo.productAmount
              }
          }
          if (info.result.productInfo.stages) {
              var amount=info.result.productInfo.productAmount
              var stages=info.result.productInfo.stages.split(",")
              var maxMonths=stages[stages.length-1]
              info.result.productInfo.yuegong="最高月供：¥"+Math.floor(amount*0.9/maxMonths)+"&nbsp;x&nbsp;"+maxMonths
          }
          var data1={info:info.result.productInfo};
          html1=template('tpl1',data1);
            // console.log(html)
          $('#xiangguan').append(html1)
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
            commentType:1,
            pageSize:1000
        },
        dataType:'json',
        headers:{'appToken':getToken()},
        success:function(info) {
            console.log(info)
            // 
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
                /*<ul>
                    <li><img src=""></li>
                    <li>
                        <ul>
                            <li>NickName</li>
                            <li>Content</li>
                        </ul>
                    </li>
                    <li>Time</li>
                </ul>
                <div>
                    
                </div>*/
                var itemDiv=document.createElement('div');
                var date=new Date(firstLevelComments[i].commentTime*1000)
                var commentItemHtml="<ul class='clearfix' style='padding:10px 0 0;border-bottom:1px dashed #FAFAFA;margin:0;'>"+
                                        "<li class='commentNickname col-xs-2'><img src='"+firstLevelComments[i].avatar+"'></li>"+
                                        "<li class='col-xs-6'>"+
                                            "<ul class='clearfix' style='padding:0 0 0 5px;'>"+
                                              "<li class='commentnicheng'>"+firstLevelComments[i].nickName+"</li>"+
                                            "</ul>"+
                                        "</li>"+
                                        "<li class='col-xs-4' style='text-align:right;'>"+date.getFullYear()+"/"+(date.getMonth() + 1)+
                                        "/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+ "</li>"+
                                    "</ul>"+
                                    "<li class='commentContents col-md-offset-1'>"+firstLevelComments[i].content+"</li>"+
                                    "<div class=''>"+
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
                  var replyItemHtml="<span class='kongtangDetailreplay'>"+replys[j].nickName+"</span>回复<span class='sayer'>"+replys[j].replyToNickName+"</span>"+
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



