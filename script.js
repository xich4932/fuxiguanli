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
    //document.querySelector("#final_date0").valueAsDate = new Date();
    table.innerHTML += str
};

function checking(){
    console.log("calling function")
    var a = 2;
    console.log('count' + a)
    var temp1 = document.getElementById('check12')
    var temp2 = document.getElementById('check23')
    for( i = 0; i <63; i++ ){
        if(document.getElementById('check' + String(i)).checked == true){
            console.log(i)
        }
    }
}

var total = 1;

function add_course(){
    add = document.getElementById("course");
    total += 1
    str = '<tr><th scope="row">'+ total+'</th><td><input class="form-control" type="text" placeholder="input course name" aria-label="default input example"></td><td><input type="date" id="final_date0"></td><td><input type="number" id="num_course"></td></tr>'
    $('#add_course_table tr:last').after(str);

}

function generator() {
    
}

