


$(document).ready(function(){
	var index=decodeURIComponent((new RegExp('[?|&]' + 'index' + '=' + '([^&;]+?)(&|#|;|$)')
		.exec(location.search)||[,""])[1].replace(/\+/g, '%20'))

	var image=document.getElementById('image')
	// console.log(typeof index)
	switch(index){
		case '01':
			image.src='images/PCpumpDetail/dnIIS.png'
		break;
		case '02':
			image.src='images/PCpumpDetail/youbeng.png'
		break;
		case '03':
			image.src='images/PCpumpDetail/dnR.png'
		break;
		case '04':
			image.src='images/PCpumpDetail/mwt.png'
		break;
		case '05':
			image.src='images/PCpumpDetail/mgl712.png'
		break;
		case '06':
			image.src='images/PCpumpDetail/mgl722.png'
		break;
		case '07':
			image.src='images/PCpumpDetail/fny4d.png'
		break;
		case '08':
			image.src='images/PCpumpDetail/mglyb.png'
		break;
		case '09':
			image.src='images/PCpumpDetail/fny2d.png'
		break;
	}
})






