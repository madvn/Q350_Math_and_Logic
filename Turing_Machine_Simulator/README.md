## Simulating a Turing machine

A simple simulator that can step through manually entered tuple instructions (a,b) - "If head reads a, then do b" where b can be a move left/right instruction or a write instruction to the tape.

1. Begin by initializing the network.
  - Request more than the amount of tape length required. You have to start over if the head moves outside the tape.
  - Enter the starting position of the read/write head on the tape. The head should be within the tape.
  - Optionally enter the intial contents of the tape. Enter a string the same length as the tape and use underscore for blank space. For example: initializing the tape of length 5 with red starting at position 3 should be __red. Leaving this field blank creates a blank tape.
  - Click "Initialize Turing Machine"
2. Enter one instruction after the other and step through the computational steps by clicking "Step" each time
3. Enter a new tape length and head starting position and click "Initialize Turing Machine" to start over
