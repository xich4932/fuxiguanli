function load_table(){
    let table = document.getElementById("table_body")
    //table.innerHTML;
    let str = ''
    let count = 0;
    window_time = ["6:00-8:00", "8:00-10:00", "10:00-12:00", "12:00-14:00", "14:00-16:00", "16:00-18:00", "18:00-20:00", "20:00-22:00", "22:00-24:00"]
    for(r = 0; r < 9; r++){
        str += '<th scope="row">'+window_time[r]+'</th>'
        for(i = 0; i < 7; i++){
            str += '<td><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="check'+count+'"><label class="form-check-label" for="window'+count+'"></label></div></td>'
            count ++
        }
        str += '</tr>'
    }
    //let arr = [1,2,3,4]
    //test.apply(this ,arr)
    ////console.log(arr.join())
    table.innerHTML += str
}

let rec_week = []
function checking(){
    for(let f = 0; f < 7; f++){
        let temp_arr = []
        for(let i = f; i <63; i+=7 ){
            if(document.getElementById('check' + String(i)).checked == true){
                //console.log(i)
               // week += i.toString()
                //week += "&"
                temp_arr.push(parseInt(i / 7))
            }
        }
        rec_week.push(temp_arr)
    }

    //window.location.href = "class.html" + week.slice(0,-1)
    ////console.log(rec_week)
    localStorage.setItem('arr',JSON.stringify(rec_week));
    document.getElementById("table_next").style.visibility = "visible"
    document.getElementById("table_itself").style.visiblity = "hidden"
    document.getElementById("table_itself").style.height = "auto"
}

let total = 1;
//test 
/*
week.push([0])
week.push([1,2])
week.push([2,3])
week.push([4])
week.push([5])
week.push([])
week.push([])
*

 */
let giant_table = []

function add_course(){
    add = document.getElementById("course");
    str = '<tr><th scope="row">'+ (total+1)+'</th><td><input class="form-control" type="text" placeholder="input course name" aria-label="default input example" id="course_'+total+'"></td><td><input type="date" id="final_'+total+'"></td><td><input type="number" id="num_'+total+'"></td></tr>'
    total += 1
    $('#add_course_table tr:last').after(str);
}
   
function printing(){
    //console.log(document.getElementById('final_date1').value)
    //console.log(document.getElementById('num_course1').value)
    //console.log(document.getElementById('course_1').value)

}


//the day before final is reserved, thus function need to find the actual day of before_final
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
        let max_day = 0;
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
    return year + month + day
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
    for(let e = 0; e < week.length; e++){
        let temp_arr = []
        for(let t = 0; t < week[e].length; t++){
            ////console.log(week[e][t])
            let taker = ret_window(week[e][t])
            ////console.log(taker)
            temp_arr.push(taker)
        }
        week[e] = temp_arr
        //week[e].push(temp_arr)
        temp_arr = []
    }

}
//return true when there is no same str
function check_reserved(tocheck){
    reserve_day.map(x =>  {
        if(!x.localeCompare(tocheck))
        return false
    })
    return true
}
//return true
//loop continues running
function check_break(){
    let count_remain = 0;
    for(let d =0; d < num_arr.length; d++){
        if(num_arr[d]){
            count_remain ++
        }
    }
    if(!count_remain) return false
    //if(count_remain > 0) return false
    //if(count_remain > 0) return true
    if(count_fail + count_remain < total) return true
    else if(count_remain > 0) return true
    return false
}


let final_arr=[]; // final dates //20210604 0 4 4 6 6
let before_final = [] //the days before final
let course_arr = []; //course name
let num_arr = [] //number of topic of final for review
let start_day = []//start day of
//let time_end = []//
let exclude_final = [] // exclude from review days
let exclude_str = "" //for RRULE
let icsFile = null;
let event_str = ""
let until = []
let start1 = ""
let start2 = ""
let window_str = ""
let special_id = [] //record UID of calendar task,
let count_fail = 0 //when fail = number of course, function stops
let reserve_day = [] //record timewindow that has been used
//let final = []
let store_all = []



/*
function exdate_working(){
    let temp_size = total / 2
    for(let t =0; t < total; t+=2){
        let str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        time_start.push(str)
        //console.log("im in func")
    }
}
 */
/*
function time_to_start(){
   // //console.log(final_arr.join())
    for(let t =0; t < total; t+=2){
        let str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        time_start.push(str)
        //console.log("im in func")
    }
    ////console.log(time_start.join())
}

function time_to_end(){
    ////console.log(final_arr.join())
    for(let t =1; t <= total; t+=2){
        let str = ""
        str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "235959"
        time_end.push(str)
        //console.log("im in fund")
    }
}
 */

/*

 */
function final_rearrange(){
    for(let t =0; t < total ; t++){
        let temp_str = String(final_arr[t].substring(0,4)) + String(final_arr[t].substring(5,7)) + String(final_arr[t].substring(8)) + 'T' + "000000"
        if(t % 2){
            final_arr.push(temp_str)
        }
        exclude_str += temp_str
        exclude_str +=    ','
    }
    ////console.log(str)
    ////console.log(final_formatted.join())
}

/*
function review_windows(){
    let today = new Date()
    for(let d = 0; d < total; d++){
        //window_str =
        time_start.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_start)
        time_end.push(String(today.getFullYear()) + String(today.getMonth()+1) + String(today.getDate()) + "T" + window_end)
    }
}
*/

/*
the final day and the days before final is reserved
*/
//let week = []
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


let big_str = ""
function automator(){
    for(let d =0; d < store_all.length; d++){
        big_str += store_all[d]
    }
    big_str += final_str
    return
}




//return day in code
/*
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
 */


//writing ICS rule

function createEvent_review(id, event_name, start_day, start_time, end_time) {
    let event_str = ""
    //for(let i = 0; i < time_start.length; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" +
           Math.random().toString(36).substring(2) +
       "\n" + 

       "DTSTART;" + "TZID=Asia/Shanghai:" +
       start_day.toString() + "T" + start_time.toString() +
       "\n" +
       "DTEND;" + "TZID=Asia/Shanghai:" +
       start_day.toString() + "T" + end_time.toString() +
       "\n" +
           "TZID:Asia/Shanghai\n" +
       "SUMMARY:" +
        "review for " + event_name +
       "\n" +
       "DESCRIPTION:" + "review for "+ event_name +
       "\n" +
       "BEGIN:VALARM\n" +                                                                       
       "TRIGGER:-PT10M\n" +
       "ACTION:DISPLAY\n" +
           "DESCRIPTION:Reminder\n" +
           "END:VALARM\n" +
          // "\n" +
       //"RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + r_week + //"EXDATE="+ exclude_str +
       //"\n" +
       "END:VEVENT\n";
   // }
    return event_str 
}

let final_str = ""
function createEvent_final() {
    event_str = ""
    for(let i = 0; i < total; i++){
       event_str += "BEGIN:VEVENT\n" +
       "UID:" + 
       Math.random().toString(36).substring(2) +
       "\n" + 

       "DTSTART;" + "TZID=Asia/Shanghai:" +
       final_arr[i] + "T000000" +
       "\n" +
       "DTEND;" + "TZID=Asia/Shanghai:" +
           final_arr[i] + "T235959" +
      // time_end[i] +
       "\n" +
       "TZID:Asia/Shanghai\n" +
       "SUMMARY:" +
       "final for "+ course_arr[i] +
       "\n" +
       "DESCRIPTION:" +
       "final for "+ course_arr[i] +
       "\n" +
       "BEGIN:VALARM\n" +                                                                       
       "TRIGGER:-PT10M\n" +
       "ACTION:DISPLAY" +
           "DESCRIPTION:Reminder\n" +
       //"RRULE: FREQ=WEEKLY; WKST=SUN; BYDAY= " + r_week + "EXDATE="+ exclude_str +

           "END:VALARM\n" +
           "END:VEVENT\n";
       final_str += event_str;
        event_str  = "";
    }
    //console.log("in fun",  final_str)
    return final_str
}



function makeIcsFile(date, summary, description) {
    //event_str =
    ////console.log("eventstr: ", event_str)
    let test =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Test Cal//EN\n" +
      "VERSION:2.0\n" +
        "BEGIN:VTIMEZONE\n"+
        "TZID:Asia/Shanghai\n" +
    "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Shanghai\n"+
        "X-LIC-LOCATION:Asia/Shanghai\n" +
    "BEGIN:STANDARD\n" +
    "TZNAME:CST\n" +
    "TZOFFSETFROM:+0800\n" +
    "TZOFFSETTO:+0800\n" +
    "DTSTART:19700101T000000\n" +
    "END:STANDARD\n" +
    "END:VTIMEZONE\n";
     // //console.log(event_str)
      test += big_str;

      test += "END:VCALENDAR";
      //console.log("test cal\n", test)
    /////console.log(test)
    let data = new File([test], { type: "text/plain" });
  
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }
    
    icsFile = window.URL.createObjectURL(data);
  
    return icsFile;
}
let week = []
function print_week(){
    for(let d = 0; d< week.leng; d++){
        for(let f = 0; f < week[d].length; f++){
            //console.log(week[d][f])
        }
    }
}



function create() {
    week = JSON.parse(localStorage.getItem('arr'))
    console.log("here")
    //document.getElementById("addbtn").style.display = "none"
    ////console.log(week)
    for(let i = 0; i < total; i++){
        final_arr.push(document.getElementById("final_"+String(i)).value)
        num_arr.push(document.getElementById("num_"+String(i)).value)
        course_arr.push(document.getElementById("course_"+String(i)).value)
    }
    //console.log(final_arr.join())
    //console.log(course_arr.join())
    //console.log(num_arr.join())
    ////console.log("week: ", week.join())
    //handle week array
    week_handle()
    ////console.log("final_Arr", final_arr)
    //total = 2;
    const today = new Date();
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    let day = today.getDate()
    const year_str = year.toString()
    const month_str = month > 9? month.toString(): "0"+month.toString()
    const day_str = day > 9? day.toString(): "0"+day.toString()
    start_day = cal_next_day(day_str, month_str, year_str)
    for(let i = 0; i < total; i++){
        let str1 = final_arr[i].substring(8)
        let str2 = final_arr[i].substring(5,7)
        let str3 = final_arr[i].substring(0,4)
        before_final.push(cal_day(str1, str2, str3))
        final_arr[i] = str3.toString() + str2.toString() + str1.toString()
        special_id.push(Math.random().toString(36).substring(2))
    }
    print_week()
    dayw = today.getDay()
    dayw = (day + 1 ) % 7

   // var today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let starter = yyyy + mm + dd
    let  temp_start = starter
    //console.log("before loop:", temp_start)

    let round_add = 0 ;
    for(let e = 0; e < week.length; e++){
        for(let s = 0; s < week[e].length; s++){
            //console.log(week[e][s])
        }
    }

    let weekday = dayw; //track the weekday
    let idx = 0;//track the order of final
    console.log("before loop:" , start_day)
    console.log("final_Arr:",  final_arr)
    while(check_break()){
        console.log("here")
        temp_start  = starter
        //idx =  dayw
        //console.log("idx", idx)
        while( pass_day(temp_start, final_arr[idx])){
            if(num_arr[idx] <= 0 ) break
            for(let ss = 0; ss < week[weekday].length; ss++){
                //console.log(temp_start, before_final[idx])
                let start_str = week[weekday][ss].substring(0, 6)
                let end_str = week[weekday][ss].substring(6)
                if(check_reserved(temp_start.toString() + start_str.toString())){
                    let to_store = createEvent_review(special_id[idx], course_arr[idx], temp_start, start_str, end_str)
                    console.log(to_store)
                    reserve_day.push(temp_start.toString() + start_str.toString())
                    store_all.push(to_store)
                    num_arr[idx] --
                    round_add ++
                    break;
                }

            }
            temp_start = cal_next_day(parseInt(temp_start.substring(6)), parseInt(temp_start.substring(4 ,6)), parseInt(temp_start.substring(0,4)))
            weekday ++;
            if(weekday > 6) weekday = 0
            if(round_add > 0){
                round_add = 0;
            }else{
                count_fail ++;
                round_add  = 0;
            }
            console.log("while")
            //temp_start = cal_next_day(parseInt(temp_start.substring(6)), parseInt(temp_start.substring(4 ,6)), parseInt(temp_start.substring(0,4)))
            //weekday +=1;

        }

        idx ++
        if(num_arr[idx] <= 0) idx ++
        if(idx >= total) idx = 0
        //break;

    }
    createEvent_final()
    automator()
    console.log(final_str)
    console.log(big_str)
    localStorage.clear()
    //ret_window()
    //review_windows()


   // let final_ics = createEvent_final() + big_str

    //makeIcsFile()
    ////console.log(big_str)
    let ready = document.getElementById("downbtn")

    ready.href = makeIcsFile()
    document.getElementById("downbtn").style.visibility = "visible"
}

function pass_day(day, to_day){
    ////console.log(final_arr[id])
    //let to_day = final_arr[id]
    //console.log(to_day, day)
    if(parseInt(to_day.substring(0,4)) > parseInt(day.substring(0,4))){
        return true
    }else if(parseInt(to_day.substring(4,6)) > parseInt(day.substring(4,6))){
        return true
    }else if(parseInt(to_day.substring(6)) > parseInt(day.substring(6))){
        return true
    }
    return false
}




