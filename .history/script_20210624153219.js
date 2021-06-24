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
                temp_arr.push(parseInt(i/ 7))
            }
        }
        week.push(temp_arr)
    }
    console.log(week)
    document.getElementById("table_next").style.display = "block"
    document.getElementById("table_itself").style.display = "none"
    //document.getElementById("table_itself").style.height = 0
}

var total = 1;
//test 
/*
week.push([0])
week.push([1,2])
week.push([2,3])
week.push([4])
week.push([5])
week.push([])
week.push([])
*/
var giant_table = []

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


//the day before final is reserved, thus function need to find the actual day of before_fianl
function cal_day(day, month, year){
    if(day != 1){
        day -= 1
        if(day < 10){
            //return String(year)+String(month)+'0'+String(day)
            return year.toString() + month.toString() + '0' + day.toString()
        }else{
            //return String(year)+String(month)+String(day)
            return year.toString() + month.toString()  + day.toString()
        }
    }else if(!(month == 1 && day == 1)){
        //month - 1 which is end with 31 
        if(month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11){
            month = (month - 1)%12
            if(month < 10){
                return String(year) + '0' + String(month) + "31"
            }else{
                return String(year) + String(month) + "31"
            }
            
        }else if(month == 3){//month - 1 is Feb, we need to check whether is leap year
            month = 2;
            if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
                day = 29
            }else{
                day = 28
            }
            return String(year) + String(month) + String(day)
        }else{
            //month - 1 which is end with 30
            month = (month - 1)%12
            if(month < 10){
                return String(year) + '0' + String(month) + "30"
            }else{
                return String(year) + String(month) + "30"
            }
        }
    }else{
        //when is the first day of year, year - 1
        year -= 1
        return String(year) + "1231"
    }
}
/*
cal_day(21,2,1999)
cal_day(1,3,2020)
cal_day(1,3,2021)
cal_day(1,10,2021)
*/

function cal_next_day(day, month, year){
    if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){ // month end in 30 days
        if(month == 12 && day == 31){//next day is new year
            return (year+1).toString() + "0101"
        }
        if(day + 1 <= 31){
            if(day + 1 < 10){
                day = "0" + (day + 1).toString()
            }else{
                day = (day + 1).toString()
            }
        }else{
            day = "01"
            month +=1
        }
        if(month < 10){
            month = "0" + month.toString()
        }else{
            month = month.toString()
        }
    }
    else if(month == 2){
        var max_day = 0;
        month = "03"
        if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
            //day = 29
            max_day = 29
        }else{
            max_day = 28
        }
        if(day + 1 > max_day){
            
            day = "01"
        }else{
            day = (day + 1).toString()
            if(day < 9){
                day = "0" + (day + 1).toString()
            }else{
                day = (day + 1).toString()
            }
        }
    }else{
        //month end in 30 days
        if(day + 1 <= 30){
            if(day + 1 < 10){
                day = "0" + (day + 1).toString()
            }else{
                day = (day + 1).toString()
            }
        }else{
            month += 1
            day = "01"
        }
        if(month  < 10){
            month = "0" + month.toString()
        }else{
            month = month.toString()
        }
        
    }
    return String(year)+String(month)+String(day)
}

/*
 *  store the time of windows 
 *
 */
function ret_window(num){
    if(num == 0){
        start1 = "060000"
        start2 = "080000"
    }else if(num == 1){
        start1 = "080000"
        start2 = "100000"
    }else if(num == 2){
        start1 = "100000"
        start2 = "120000"
    }else if(num == 3){
        start1 = "120000"
        start2 = "140000"
    }else if(num == 4){
        start1 = "140000"
        start2 = "160000"
    }else if(num == 5){
        start1 = "160000"
        start2 = "180000"
    }else if(num == 6){
        start1 = "180000"
        start2 = "200000"
    }else if(num == 7){
        start1 = "200000"
        start2 = "220000"
    }else if(num == 8){
        start1 = "220000"
        start2 = "240000"
    }
    return start1.toString() + start2.toString()
}

function week_handle(){
    for(var e = 0; e < week.length; e++){
        var temep_arr = []
        for(var t = 0; e < week[e].length; t++){
            console.log(week[e][t])
            var taker = ret_window(week[e][t])
            console.log(taker)
            temp_arr.push(taker)
        }
        week[e] = temp_arr
        //week[e].push(temp_arr)
        temp_arr = []
    }
    console.log(week)
}


var final_arr=[]; // final dates
var before_final = [] //the days before final
var course_arr = []; //course name
var num_arr = [] //number of topic of final for review
var start_day = []//start day of
//var time_end = []//
var exclude_final = [] // exclude from review days
var exclude_str = "" //for RRULE
var icsFile = null;
var event_str = ""
var until = []
var start1 = ""
var start2 = ""
var window_str = ""
var special_id = [] //record UID of calendar task, 
var count_fail = 0 //when fail = number of course, function stops
var remain_day = [] //record timewindow that has been used
//var final = []

function create() {
    for(var i = 0; i < total; i++){
        final_arr.push(document.getElementById("final_"+String(i)).value)
        num_arr.push(document.getElementById("num_"+String(i)).value)
        course_arr.push(document.getElementById("course_"+String(i)).value)
    }
   console.log(final_arr.join())
   console.log(course_arr.join())
   console.log(num_arr.join())
    console.log("week: ", week)
    //handle week array
    week_handle()

   //total = 2;
   var today = new Date();
   year = today.getFullYear()
   month = today.getMonth() + 1
   day = today.getDate()
   year_str = year.toString()
   month_str = month > 9? month.toString(): "0"+month.toString()
   day_str = day > 9? day.toString(): "0"+day.toString()
    start_day = cal_next_day(day_str, month_str, year_str)
    for(var i = 0; i < total; i++){
        console.log(final_arr[i].substring(0, 4))
        console.log(final_arr[i].substring(5, 7))
        console.log(final_arr[i].substring(8))
        console.log(cal_day((final_arr[i].substring(0, 4)),(final_arr[i].substring(5, 7)), (String(final_arr[i].substring(8)))))
        before_final.push(cal_day(final_arr[i].substring(8), final_arr[i].substring(5, 7), final_arr[i].substring(0, 4)))
        final_arr[i] = final_arr[i].substring(0, 4).toString() + final_arr[i].substring(5, 7).toString() + final_arr[i].substring(8).toString()
        special_id.push(Math.random().toString(36).substring(2))
    }
    //total /= 2
    console.log(final_arr.join())
    console.log(before_final.join())
    //start writing ics file
    day = today.getDay()
    day = (day + 1) % 7
    var idx = day;
    var starter = year.toString() +  month.toString() +  day.toString()
    var  temp_start = starter
    while(count_fail < total){
        temp_start  = starter
        while(temp_start != before_final[idx]){
            for(var ss = 0; ss < week[idx].length; ss++){
                var start_str = (week[idx][ss]).toString()
            }
            createEvent_review(special_id[idx], course_arr[idx], temp_start, idx)
        }
        
    }
    ret_window()
    review_windows()
    automator()
   var final_ics = createEvent_final()
   //makeIcsFile()
   var ready = document.getElementById("downbtn")
   ready.href = makeIcsFile()
   document.getElementById("downbtn").style.visibility = "visible"
}

function check_reserved(tocheck){
    remain_day.map(x =>  {
        if(x == tocheck)
        return true
    })
    return false
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
            final_arr.push(temp_str)
        }
        exclude_str += temp_str
        exclude_str +=    ','
    }
    //console.log(str)
    //console.log(final_formatted.join())
}

/*
function review_windows(){
    var today = new Date()
    for(var d = 0; d < total; d++){
        //window_str =
        time_start.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_start)
        time_end.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_end)
    }
}
*/

/*
the final day and the days before final is reserved
*/
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
    var sizer = total / 2;
    var temp_event
    console.log(today.getFullYear(), today.getMonth() +1, today.getDate())
    //document.getElementById("")
    time_start = String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + 'T000000'
    var weekday = translate_week((today.getDay() + 1) % 7 )
    for(var g = 0; g < sizer; g++){
        event_str += createEvent(course_arr[g], time_start[g], time_end[g] ,  until[g], translate_week(today.getDay()%7) )
    }
}


//return day in code
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


//writing ICS rule

function createEvent_review(id, event_name, start_time, end_time, window) {
    var event_str = ""
    for(var i = 0; i < time_start.length; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" + 
       id +
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
       //"RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + r_week + //"EXDATE="+ exclude_str +
       //"\n" +
       "END:VEVENT\n";
    }
    return event_str
}

var final_str = ""
function createEvent_final() {
    for(var i = 0; i < total; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" + 
       Math.random().toString(36).substring(2) +
       "\n" + 
       "TZID:Asia/Shanghai\n" + 
       "DTSTART;VALUE=DATE:" +
       //time_start[i] +
       final_arr[i] + "T000000"
       "\n" +
       "DTEND;VALUE=DATE:" +
       final_arr[i] + "T235959"
      // time_end[i] +
       "\n" +
       "SUMMARY:" +
       "final for "+ course_arr[i] +
       "\n" +
       "DESCRIPTION:" +
       "final for "+ course_arr[i] +
       "\n" +
       "BEGIN:VALARM\n" +                                                                       
       "TRIGGER:-PT10M\n" +
       "ACTION:DISPLAY" +
       //"RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + r_week + "EXDATE="+ exclude_str +
       "\n" +   
       "END:VEVENT\n";
    }
    return final_str
}



function makeIcsFile(date, summary, description) {
    //event_str =
    //console.log("eventstr: ", event_str)
    var test =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n";
     // console.log(event_str)
      test += event_str;

      test += "END:VCALENDAR";
    ///console.log(test)
    var data = new File([test], { type: "text/plain" });
  
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }
    
    icsFile = window.URL.createObjectURL(data);
  
    return icsFile;
}



