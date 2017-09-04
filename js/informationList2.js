var pageIndex=2
var articlesCount=20;
$(document).ready(function(){
	articalTypeId=decodeURIComponent((new RegExp('[?|&]' + 'id' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))
	var articalTypeTitle=decodeURIComponent((new RegExp('[?|&]' + 'pumpType' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))
	document.getElementById('title').innerHTML=articalTypeTitle
    pageIndex=pageIndex-1
    // Total pages
    if (articlesCount%10==0) {
        countPage=Math.floor(articlesCount/10)-1;
    }else{
        countPage=Math.floor(articlesCount/10);
    }
    changePage()
})
function changePage(){
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
}
var totalArticalesSpan=document.getElementById("totalItems")
var currentAndTotalPages=document.getElementById("currentAndTotalPages")
function prev(){
    if (pageIndex==0) {
        return;
    }else{
        // pageIndex--
        window.open("informationList"+(pageIndex)+".html")
        changePage()
    }
}
function next(){
    if (pageIndex==countPage) {
        return;
    }else{
        // pageIndex++
        window.open("informationList"+(pageIndex+2)+".html")
        changePage()
    }
}
function firstPage(){
    // pageIndex=0
    if (pageIndex!=0) {
        window.open("informationList"+(1)+".html")
        changePage()
    }
}
function lastPage(){
    // pageIndex=countPage
    if (pageIndex!=countPage) {
        window.open("informationList"+(countPage+1)+".html")
        changePage()
    }
}