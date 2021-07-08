export let now = (e)=>{
	let date = new Date()
	let now1 = {
    	time: '',
    	fullDate: ''
    }
	let time = ''
	if(date.getHours() < 10){
		time = '0' + date.getHours()
	}
	else{
		time = date.getHours()
	};
	if(date.getMinutes() < 10){
		time += ':' + '0' + date.getMinutes()
	}
	else{
		time += ':' + date.getMinutes()
	}
	now1.time = time
	if(date.getDate() < 10){
		now1.fullDate = '0' + date.getDate() + '.'
	}
	else{
		now1.fullDate = date.getDate() + '.'
	}
	if(date.getMonth() < 10){
		now1.fullDate +=  '0' + date.getMonth() + '.'
	}
	else{
		now1.fullDate += date.getMonth() + '.'
	}
	now1.fullDate += date.getFullYear()
	return now1
}