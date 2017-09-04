


$(document).ready(function(){
    var index=decodeURIComponent((new RegExp('[?|&]' + 'index' + '=' + '([^&;]+?)(&|#|;|$)')
        .exec(location.search)||[,""])[1].replace(/\+/g, '%20'))

    var image=document.getElementById('image')
    // console.log(typeof index)
    switch(index){
        case '01':
            image.src='images/PChaocaiDetails/danna.png'
        break;
        case '02':
            image.src='images/PChaocaiDetails/shungan.png'
        break;
        case '03':
            image.src='images/PChaocaiDetails/youbeng.png'
        break;
        case '04':
            image.src='images/PChaocaiDetails/tantou.png'
        break;
        case '05':
            image.src='images/PChaocaiDetails/dianchi.png'
        break;
        case '06':
            image.src='images/PChaocaiDetails/maishitong.png'
        break;
        case '07':
            image.src='images/PChaocaiDetails/meiguoli.png'
        break;
        case '08':
            image.src='images/PChaocaiDetails/haimianxiaodu.png'
        break;
    }
})






