## Simulating a Turing machine

Hosted at http://pages.iu.edu/~madcanda/q350/tm_sim_tuple.html

1. Begin by initializing the network.
   - Request more than the amount of tape length required. You have to start over if the head moves outside the tape.
   - Enter the starting position of the read/write head on the tape. The head should be within the tape.
   - Optionally enter the intial contents of the tape. Enter a string the same length as the tape and use underscore for blank space. For example: initializing the tape of length 5 with red starting at position 3 should be __red. Leaving this field blank creates a blank tape.
   - Click "Initialize Machine"
2. Enter the tuples that define the machine, one in each line, in the following format - current_state,read,write/move,next_state. States can only be numeric. The difference between write and move is as follows:
    - /R or /r cause the tape head to move right
    - /L and /l cause the tape head to move left
    - All other characters are written to the tape
3. If all values entered were valid, the machine will appear on the right pane.
4. Enter a value for the number of steps to simulate the machine and click on step
5. Enter a new tape length and head starting position and click "Initialize Turing Machine" to start over
