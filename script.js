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
    table.innerHTML += str
};

function checking(){
    for( i = 0; i <63; i++ ){
        if(document.getElementById('check' + String(i)).checked == true){
            console.log(i)
        }
    }
}

var total = 1;

function add_course(){
    /*
    rows = document.getElementById("nums").value
    console.log(rows)
    
    total += 1
    str = ""
    for(var d = 0; d < rows; d++){
        str += '<tr><th scope="row">'+d+'</th><td><input class="form-control" type="text" placeholder="input course name" aria-label="default input example"></td><td><input type="date" id="final_date'+d+'"></td><td><input type="number" id="num_course"></td></tr>'
    }
    */
    add = document.getElementById("course");
    str = '<tr><th scope="row">'+ (total+1)+'</th><td><input class="form-control" type="text" placeholder="input course name" aria-label="default input example" id="course_'+total+'"></td><td><input type="date" id="final_'+total+'"></td><td><input type="number" id="num_'+total+'"></td></tr>'
    total += 1
    $('#add_course_table tr:last').after(str);
    //add.innerHTML = str;
   /*
    var tab = document.getElementById("course_table");
    var n = document.getElementById("final_date0").rowIndex + 1
    var tr = tab.insertRow(n)
    var td = tr.insertCell(0)
    td.innerHTML='new '+Math.random();
    */
}
   
function printing(){
    console.log(document.getElementById('final_date1').value)
    console.log(document.getElementById('num_course1').value)
    console.log(document.getElementById('course_1').value)

}

function exclude_from(var arr[]){
    
}

function create() {
    var final_arr=[];
    for(var i = 0; i < total; i++){
        final_arr.push(document.getElementById("final_"+String(i)).value)
        //console.log(document.getElementById("final_"+String(i)).value)
    }
    for(var i = 0; i < total; i++){
        //final_arr.push(document.getElementById("final_"+String(i)))
        console.log(final_arr[i])
    }
    
    
}

