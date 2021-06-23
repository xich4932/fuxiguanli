function load_table(){
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
    //console.log(arr.join())
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


var final_arr=[]; // final date
var course_arr = []; //course name
var num_arr = [] //number of topic of final for review
var time_start = []//start day of
var time_end = []//
var exclude_final = [] // exclude from review days
var exclude_str = "" //for RRULE
var icsFile = null;
var event_str = ""
var until = []
var window_start = ""
var window_end = ""
var window_str = ""

function create() {
    for(var i = 0; i < total; i++){
        final_arr.push(document.getElementById("final_"+String(i)).value)
        num_arr.push(document.getElementById("num_"+String(i)).value)
        course_arr.push(document.getElementById("course_"+String(i)).value)
    }
   //console.log(final_arr.join())
   //console.log(course_arr.join())
   //console.log(num_arr.join())
    total *= 2;
    for(var i = 0; i < total; i+=2){
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
    //total /= 2
    console.log(final_arr.join())
    //total *= 2
    final_rearrange()
    ret_window()
    review_windows()
    automator()
   createEvent()
   //makeIcsFile()
   var ready = document.getElementById("downbtn")
   ready.href = makeIcsFile()
   document.getElementById("downbtn").style.display = "block"
}
/*
function exdate_working(){
    var temp_size = total / 2
    for(var t =0; t < total; t+=2){
        var str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        time_start.push(str)
        console.log("im in func")
    }
}
 */
/*
function time_to_start(){
   // console.log(final_arr.join())
    for(var t =0; t < total; t+=2){
        var str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        time_start.push(str)
        console.log("im in func")
    }
    //console.log(time_start.join())
}

function time_to_end(){
    //console.log(final_arr.join())
    for(var t =1; t <= total; t+=2){
        var str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "235959"
        time_end.push(str)
        console.log("im in fund")
    }
}
 */

/*

 */
function final_rearrange(){
    for(var t =0; t < total ; t++){
        var temp_str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        if(t % 2){
            final_formatted.push(temp_str)
        }
        exclude_str += temp_str
        exclude_str +=    ','
    }
    console.log(str)
    console.log(final_formatted.join())
}

function ret_window(num){
    if(num / 7 == 0){
        window_start = "060000"
        window_end = "080000"
    }else if(num / 7 == 1){
        window_start = "080000"
        window_end = "100000"
    }else if(num / 7 == 2){
        window_start = "100000"
        window_end = "120000"
    }else if(num / 7 == 3){
        window_start = "120000"
        window_end = "140000"
    }else if(num / 7 == 4){
        window_start = "140000"
        window_end = "160000"
    }else if(num / 7 == 5){
        window_start = "160000"
        window_end = "180000"
    }else if(num / 7 == 6){
        window_start = "180000"
        window_end = "200000"
    }else if(num / 7 == 7){
        window_start = "200000"
        window_end = "220000"
    }else if(num / 7 == 8){
        window_start = "220000"
        window_end = "240000"
    }
}

function review_windows(){
    var today = new Date()
    for(var d = 0; d < total; d++){
        //window_str =
        time_start.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_start)
        time_end.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_end)
    }
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



function automator(){
    var today = new Date()
    var sizer = toal / 2;
    var temp_event
    console.log(today.getFullYear(), today.getMonth() +1, today.getDate())
    //document.getElementById("")
    time_start = String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + 'T000000'
    var weekday = translate_week((today.getDay() + 1) % 7 )
    for(var g = 0; g < sizer; g++){
        event_str += createEvent(course_arr[g], time_start[g], time_end[g] ,  until[g], translate_week(today.getDay()%7) )
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




function createEvent(event_name, start_time, end_time, get_until, r_week) {
    for(var i = 0; i < time_start.length; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" + 
       Math.random().toString(36).substring(2) +
       "\n" + 
       "TZID:Asia/Shanghai\n" + 
       "DTSTART;VALUE=DATE:" +
       //time_start[i] +
       "\n" +
       "DTEND;VALUE=DATE:" +
      // time_end[i] +
       "\n" +
       "SUMMARY:" +
      // course_arr[i] +
       "\n" +
       "DESCRIPTION:" +
       "review for "+ course_arr[i] +
       "\n" +
       "BEGIN:VALARM\n" +                                                                       
       "TRIGGER:-PT10M\n" +
       "ACTION:DISPLAY" +
       "RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + r_week + "EXDATE="+ exclude_str +
       "\n" +   
       "END:VEVENT\n";
    }
    return event_str
}

function makeIcsFile(date, summary, description) {
    //event_str =
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



