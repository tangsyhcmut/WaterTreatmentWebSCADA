const dataSchema = require("./models/DataSchema")
let now = new Date();
function formatted_date(time)
{
   var result="";
   var d = new Date();
   var e = d.getHours()
   
   result += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+ 
             " "+ e +":"+d.getMinutes()
   return result;
}
let localtime = formatted_date(now)
module.exports.formatted_date = formatted_date;

module.exports.generateFaultAlarm = function (data,id) {
	if(data) {	
				warnObj = {
					type: "Fault",
					warnMsg: id +' is fault!!!'
				}
				const data_alarm= new dataSchema.AlarmData(warnObj);
				data_alarm.save();	
	}
}
module.exports.generateAnalogAlarm = function (data,message) {
	if(data) {	
				warnObj = {
					type: "Fault",
					warnMsg: message
		
	}
				const data_alarm= DataAlarm(warnObj);
				data_alarm.save();
}
}