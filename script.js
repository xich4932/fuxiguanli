window.onload = function(){
    var table = document.getElementById("table_body")
    //table.innerHTML;
    str = ''
    count = 0;
    window_time = ["6:00-8:00", "8:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-24:00"]
    for(r = 0; r < 9; r++){
        str += '<th scope="row">'+window_time[r]+'</th>'
        for(i = 0; i < 7; i++){
            str += '<td><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="check'+count+'"><label class="form-check-label" for="window'+count+'"></label></div></td>'
            count ++
        }
        str += '</tr>'
    }
    //var arr = [1,2,3,4]
    //test.apply(this ,arr)
    console.log(arr.join())
    table.innerHTML += str
};

var week = []
function checking(){
    for(var f = 0; f < 7; f++){
        var temp_arr = []
        for( i = f; i <63; i+=7 ){
            if(document.getElementById('check' + String(i)).checked == true){
                console.log(i)
                temp_arr.push(i)
            }
        }
        week.push(temp_arr)
    }
    console.log(week)
}

var total = 1;

function add_course(){
    add = document.getElementById("course");
    str = '<tr><th scope="row">'+ (total+1)+'</th><td><input class="form-control" type="text" placeholder="input course name" aria-label="default input example" id="course_'+total+'"></td><td><input type="date" id="final_'+total+'"></td><td><input type="number" id="num_'+total+'"></td></tr>'
    total += 1
    $('#add_course_table tr:last').after(str);
}
   
function printing(){
    console.log(document.getElementById('final_date1').value)
    console.log(document.getElementById('num_course1').value)
    console.log(document.getElementById('course_1').value)

}

function calLastDay(month, year){
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 | month == 12 ){
        return 31;
    }else if(month == 4 || month == 6 || month == 9 || month == 11){
        return 30;
    }else{
        if(year % 4) return 28;
        if(!(year % 4) && year % 100) return 29;
        if(year % 100 && !(year % 400)) return 28
        else return 29
    }
}


var final_arr=[];
var course_arr = [];
var num_arr = []
var time_start = []
var time_end = []

function create() {
    for(var i = 0; i < total; i++){
        final_arr.push(document.getElementById("final_"+String(i)).value)
        num_arr.push(document.getElementById("num_"+String(i)).value)
        course_arr.push(document.getElementById("course_"+String(i)).value)
    }
   //console.log(final_arr.join())
   //console.log(course_arr.join())
   //console.log(num_arr.join())
    for(var i = 0; i < total*2; i+=2){
        var day_before = final_arr[i].substring(0, 8)
        var day = final_arr[i].substring(8,10) - 1
        if(parseInt(final_arr[i].substring(8,10)) == 1){
            var temp_day_before = day_before
            var day_before = final_arr[i].substring(5,7) - 1
            day = calLastDay(parseInt(final_arr[i].substring(5,7))-1 ,parseInt(final_arr[i].substring(0,4)))
            if(day_before < 10){
                day_before = temp_day_before.substring(0, 5) + '0' + String(day_before) + '-'
            }  
        }else{
            if(day < 10){
                day = '0' + String(day)
            }else{
                day = final_arr[i].substring(8,10) - 1
            }
        }
        final_arr.splice(i, 0, day_before + day)
        //console.log(final_arr.join())
    }
    console.log(final_arr.join())
    total *= 2
    automator()
   time_to_start()
   time_to_end()
   createEvent()
   //makeIcsFile()
   var ready = document.getElementById("downbtn")
   ready.href = makeIcsFile()
   document.getElementById("downbtn").style.display = "block"
}

function exdate_working(){
    var temp_size = total / 2
    for(var r = 0; r < temp_size; r ++){
        
    }
}

function time_to_start(){
    console.log(final_arr.join())
    for(var t =0; t < total; t+=2){
        var str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        time_start.push(str)
        console.log("im in func")
    }
    console.log(time_start.join())
}

function time_to_end(){
    console.log(final_arr.join())
    for(var t =1; t <= total; t+=2){
        var str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "235959"
        time_end.push(str)
        console.log("im in fund")
    }
    console.log(time_end.join())
}
//var week = []
function calNextDay(month, year, day){
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 | month == 12 ){
        if(day + 1 > 31) return 1;
      //  else return day + 1;
    }else if(month == 4 || month == 6 || month == 9 || month == 11){
        if(day + 1 > 30) return 1;
     //   else return day + 1;
    }else{
        if(year % 4){
            if(day + 1 > 28) return 1;
          //  else return day + 1;
        } //return 28;
        if(!(year % 4) && year % 100){
            if(day + 1 > 29) return 1;
          //  else return day + 1;
        } //return 29; //leap month
        if(year % 100 && !(year % 400)){
            if(day + 1 > 28) return 1;
          //  else return day + 1;
        } //return 28
        else{
            if(day + 1 > 29) return 1;
          //  else return day + 1;
        } //return 29 //leap month
    }
    return day + 1
}

var scheduler = []
//week[]
function automator(){
    var today = new Date()
    var sizer = toal / 2;
    console.log(today.getFullYear(), today.getMonth() +1, today.getDate())
    //document.getElementById("")
    var weekday = (today.getDay() + 1) % 7
    for(var g = 0; g < sizer; g++){
        
    }
}

function translate_week(temp_week){
    switch (temp_week){
        case 0:
            return "SU"
            break;
        case 1:
            return "MO"
            break;
        case 2:
            return "TU"
            break;
        case 3:
            return "WE"
            break;
        case 0:
            return "TH"
            break;
        case 1:
            return "FR"
            break;
        case 2:
            return "SA"
            break;
        default:
            return "MO"
            break;          
    }

}

var icsFile = null;
var event_str = ""
var fre_week = ""


function createEvent() { 
    console.log(time_start.join())
    console.log("time_statr", time_start.length)
    console.log("total ", total)
    for(var i = 0; i < time_start.length; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" + 
       Math.random().toString(36).substring(2) +
       "\n" + 
       "TZID:Asia/Shanghai\n" + 
       "DTSTART;VALUE=DATE:" +
       time_start[i] +
       "\n" +
       "DTEND;VALUE=DATE:" +
       time_end[i] +
       "\n" +
       "SUMMARY:" +
       course_arr[i] +
       "\n" +
       "DESCRIPTION:" +
       "review for "+ course_arr[i] +
       "\n" +
       "BEGIN:VALARM\n" +                                                                       
       "TRIGGER:-PT10M\n" +
       "ACTION:DISPLAY" +
       "RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + fre_week
       "\n" +   
       "END:VEVENT\n";
    }
    console.log("running")
    console.log("str: ", event_str)
}

function makeIcsFile(date, summary, description) {
    console.log("eventstr: ", event_str)
    var test =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n";
      console.log(event_str)
      test += event_str;

      test += "END:VCALENDAR";
    console.log(test)
    var data = new File([test], { type: "text/plain" });
  
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }
    
    icsFile = window.URL.createObjectURL(data);
  
    return icsFile;
}



