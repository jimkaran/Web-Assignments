$(document).ready(function(){
    let data = [
        { date:"2021/01/17" , duration:"3:41" },
        { date:"2021/01/21" , duration:"4:01" },
        { date:"2021/02/01" , duration:"2:52" },
        { date:"2021/02/17" , duration:"3:08" },
        { date:"2021/03/02" , duration:"2:51" }]; 


    let highScores = $('#highScores')
    let header = $('<thead><tr><th>Date</th><th>Duration<br></th></tr></thead>')
    highScores.append(header)

		for(var i in data){
            let tr = $('<tr>')
            let td1 = $('<td>')
            let td2 = $('<td>')
            td1.text(data[i].date)
            td2.text(data[i].duration)
            tr.append(td1)
            tr.append(td2)
            highScores.append(tr)
		}
	
})