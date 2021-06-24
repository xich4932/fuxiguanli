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

function running(str1, str2){
    while(temp_start.localeCompare(before_final[idx]) ) {
        console.log(temp_start)
        console.log(weekday)
        console.log(week[weekday])

        temp_start = cal_next_day(parseInt(temp_start.substring(6)), parseInt(temp_start.substring(4, 6)), parseInt(temp_start.substring(0, 4)))
    }
}

running("20210624", "20210701")