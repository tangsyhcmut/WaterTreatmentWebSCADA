const mongoose =require('mongoose');
const Schema = mongoose.Schema;
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

const UserSchema =new Schema({
     username:{
         type: String, 
         required: true,
         unique: true
     },
     password:{
         type: String,
         required: true
     },
     createdAt:{
         type: String,
         default:formatted_date(now)
     }
})
 module.exports = mongoose.model('users', UserSchema)