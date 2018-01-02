## Turing Machine and Finite State Machine Simulator

hosted at http://pages.iu.edu/~madcanda/q350/tm_sim_tuple.html

1. Begin by initializing the machine.
    - Request more than the amount of tape length required. You have to start over if the head moves outside the tape. 
    - Enter the starting position of the read/write head on the tape. The head should be within the tape.
    - Optionally enter the intial contents of the tape. Enter a string the same length as the tape and use underscore for blank space. For example: initializing the tape of length 5 with red starting at position 3 should be __red. Leaving this field blank creates a blank tape.
2. Enter the tuples that define the machine, one in each line, in the following format - current_state,read,write/move,next_state. **States can only be numeric.** The difference between write and move is as follows:
    - /R or /r causes the tape head to move right. 
    - /L and /l causes the tape head to move left. 
    - All other characters are written to the tape. 
3. Enter a value for the initial state of the machine.
4. Click "Initialize Machine". 
5. If all values entered were valid, the machine will appear on the right pane. 
6. Enter a value for the number of steps to simulate the machine and click on "Step Machine". 
7. Updating/editing the tuples at any point will be reflected the next time the machine is stepped. 
8. Enter a new tape length and head starting position and click "Initialize Machine" to start over. 
9. NOTE: If you have the tuples format correct and still get an error message, check if there is an empty line at the end

**You can simulate a one-way finite state machine using this same system, by setting the third element of all tuples to /R or /L appropriately**
