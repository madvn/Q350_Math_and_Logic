//****************************************************************************
//The logic for the Turing Machine Simulation is defined below
// Author - Madhavun Candadai
// email- madvncv@gmail.com
// Created - December, 2017
//****************************************************************************

var tape_len = 20 // default value
var head_pos = 17 // holds current head position on tape
var tape_value = "_" // holds value at current head position
var head = "<b style=\"font-size:50px\">&#8659<b>" //ascii for tape head arrow
var current_state = " "
var tuples = []
var ERROR_LOC_INIT = 0
var ERROR_LOC_TM = 1
var ERROR_LOC_TUPLE = 2
var INITED_FLAG = 0
var TUPLE_PARSE_FLAG = 0
var STEP_ERROR_FLAG = 0
var HEAD_OVERFLOW_ERROR = 1
var NO_MATCHING_TUPLE = 2
var NO_STEP_ERROR = 0
var init_state_regEx = new RegExp("^[0-9]+$")

// To show error messages
function show_tm_err(location,message){
    if(location == ERROR_LOC_INIT){
        // show at init_tm block
        document.getElementById("error_mess_init").innerHTML = message
        document.getElementById("error_mess_init").style.display = "block"
    }
    if(location == ERROR_LOC_TM){
        document.getElementById("error_mess_tm").innerHTML = message
        document.getElementById("error_mess_tm").style.display = "block"
    }
    if(location == ERROR_LOC_TUPLE){
        document.getElementById("error_mess_tuples").innerHTML = message
        document.getElementById("error_mess_tuples").style.display = "block"
    }
}

function hide_all_errors(){
    document.getElementById("error_mess_init").style.display = "none"
    document.getElementById("error_mess_tm").style.display = "none"
    document.getElementById("error_mess_tuples").style.display = "none"
}

// function called to erase tm and reset the whole page - probably better to refresh page
function reset_tm(){
    hide_all_errors()
    for (i = 0; i < tape_len; i++) {
        document.getElementById("tm_head").innerHTML = ""
        document.getElementById("tm_tape").innerHTML = ""
    }
    document.getElementById("num_steps_in").style.display = "none"
    document.getElementById("current_state").style.display = "none"
}

// function called to initialize Turing Machine - includes checks for different conditions
function init_tm(){
    reset_tm()
    tape_len = document.getElementById("tape_len_in").value
    head_pos = document.getElementById("head_pos_in").value - 1 // -1 because of 0 indexing
    init_val = document.getElementById("init_tape_value").value

    // preparing initial values with blanks if nothing was entered
    if(init_val.length == 0){
        init_val = ""
        for(i=0;i<tape_len; i++){
            init_val += "_"
        }
    }

    // parse string tuples into a matrix
    parse_tuples()

    // read entered initial tape value
    if(init_val.length == tape_len){
        init_val = init_val.split("")
    }

    // checking conditions to initialize - initial values equal to tape_len?
    if(init_val.length != tape_len){
        show_tm_err(ERROR_LOC_INIT,"Error: Initial tape value not equal to tape length")
    }

    // checking conditions to initialize - initial head position within tape?
    else if (head_pos > tape_len || head_pos < 0){
        show_tm_err(ERROR_LOC_INIT,"Error: Head position entered is outside the tape.")
    }

    // checking conditions to initialize - initial state valid?
    else if (!init_state_regEx.test(document.getElementById("init_state").value)){
        show_tm_err(ERROR_LOC_INIT,"ERROR: Initial state invalid. States should be numeric")
    }

    else if(TUPLE_PARSE_FLAG == 0){
        show_tm_err(ERROR_LOC_TUPLE,"ERROR:Tuple format not compatible")
    }
    // all conditions checked - now initialize
    else{
        // initialize blank Turing Machine
        for (i = 0; i < tape_len; i++) {
            if (i==head_pos){
                // insert tape head
                document.getElementById("tm_head").innerHTML += "<td class=\"tm\" id=\"head_pos"+i+"\">"+head+"</td>"
            }
            else{
                document.getElementById("tm_head").innerHTML += "<td class=\"tm\" id=\"head_pos"+i+"\"></td>"
            }
            document.getElementById("tm_tape").innerHTML += "<td class=\"tm_tape\" id=\"tape_pos_"+i+"\">"+init_val[i]+"</td>"
        }
        document.getElementById("current_state").style.display = "block"
        document.getElementById("num_steps_in").style.display = "block"
        // update display of current_state
        current_state = document.getElementById("init_state").value
        document.getElementById("current_state").innerHTML = "Current State: "+current_state
        INITED_FLAG = 1
    }
}

// function that parses tuples and prepares it for processing
function parse_tuples(){
    TUPLE_PARSE_FLAG = 1
    // regular expression to check tuple format
    var regex = new RegExp("^[0-9]+,.*,.*,[0-9]+$");

    var tuples_str = document.getElementById("tuples_in").value
    tuples = tuples_str.split('\n')

    // make tuples a matrix after checking for format
    for (i=0; i<tuples.length; i++){
        if(!regex.test(tuples[i])){
            TUPLE_PARSE_FLAG = 0
        }
        tuples[i] = tuples[i].split(',')
    }
}


// function to step the turing machine with checks to make sure its a valid step
function step_tm(){
    // all conditions have been checked to proceed
    // tuples a matrix and now just have to process a step
    // read tape_value at head
    tape_value = document.getElementById("tape_pos_"+head_pos).innerHTML
    STEP_ERROR_FLAG = NO_STEP_ERROR
    var found_tuple_flag = 0
    // look for appropriate tuple
    for(i=0;i<tuples.length;i++){
        if(tuples[i][0] == current_state && tuples[i][1] == tape_value){
            // found appropriate tuple
            found_tuple_flag = 1
            //alert(tuple[i][2]+tuples[i][2] == "/r"+tuples[i][2] == "/R")
            //update state and write to tape or move tape head
            if(tuples[i][2] == "/l" || tuples[i][2] == "/L"){
                // clear head from current position
                document.getElementById("head_pos"+head_pos).innerHTML = ""
                // move tape head left
                if(head_pos-1 < 0){
                    //alert("Moved out")
                    STEP_ERROR_FLAG = HEAD_OVERFLOW_ERROR
                }
                else{
                    head_pos = head_pos - 1
                    document.getElementById("head_pos"+head_pos).innerHTML = head
                }
            }
            else if(tuples[i][2] == "/r" || tuples[i][2] == "/R"){
                // clear head from current position
                document.getElementById("head_pos"+head_pos).innerHTML = ""
                // move tape head right
                if(head_pos+1 > tape_len-1){
                    //alert("Moved out")
                    STEP_ERROR_FLAG = HEAD_OVERFLOW_ERROR
                }
                else{
                    head_pos = head_pos + 1
                    document.getElementById("head_pos"+head_pos).innerHTML = head
                }
            }
            else{
                // write to tape
                document.getElementById("tape_pos_"+head_pos).innerHTML = tuples[i][2]
            }

            //set new state and stop looking
            current_state = tuples[i][3]
            break
        }
    }
    if(found_tuple_flag == 0){
        STEP_ERROR_FLAG = NO_MATCHING_TUPLE
    }
}

// function to step through all steps of the machine
function run_tm(){
    if(!INITED_FLAG){
        show_tm_err(ERROR_LOC_TUPLE,"Initialize the machine correctly before running")
    }
    else{
        // parse string tuples into a matrix
        parse_tuples()

        // check to see if parsing was succesful
        if(TUPLE_PARSE_FLAG){
            // start simulating machine
            var sim_num_steps = document.getElementById("num_steps").value
            if(sim_num_steps > 0){
                // simulate machine for given number of steps
                for (i=0;i<sim_num_steps;i++){
                    // step turing machine
                    step_tm()

                    // catch errors
                    if (STEP_ERROR_FLAG == HEAD_OVERFLOW_ERROR){
                        show_tm_err(ERROR_LOC_TM,"ERROR: Head moved out of tape. Reinitialize with longer tape")
                        break;
                    }
                    if(STEP_ERROR_FLAG == NO_MATCHING_TUPLE){
                        show_tm_err(ERROR_LOC_TM,"ERROR: No matching tuple for current system state and tape value")
                        break;
                    }
                    // update display of current_state
                    document.getElementById("current_state").innerHTML = "Current State: "+current_state

                }
            }
            else{
                show_tm_err(ERROR_LOC_TM,"ERROR: Number of steps should be > 0")
            }
        }
        else{
            show_tm_err(ERROR_LOC_TUPLE,"ERROR:Tuple format not compatible")
        }
    }
}

//function to show or hide examples
function show_example(id,total){
    for(i = 1; i<=total; i++){
        if (i == id){
            document.getElementById("example"+i).style.display = "block";
        }
        else{
            document.getElementById("example"+i).style.display = "none";
        }
    }
}
