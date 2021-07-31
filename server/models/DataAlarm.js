const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let now = new Date();
function formatted_date()
{
   var result="";
   var d = new Date();
   var e = d.getHours()
   
   result += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()+ 
             " "+ e +":"+d.getMinutes()
   return result;
}

const AlarmData = new Schema({
    type: { type: String, require: true},
    warnMsg:{ type: String, require: true},
    warnTime:{type:String,
        default:formatted_date(now)}
});

module.exports = mongoose.model('Alarm_Report', AlarmData);