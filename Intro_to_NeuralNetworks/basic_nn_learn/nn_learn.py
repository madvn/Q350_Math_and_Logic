'''
Short script to show weight updates and learning in neural networks
Try the following cases -
Case 1:
w = np.array([-0.1,0.4])
learning_rate = 0.1
Case 2:
w = np.array([-0.1,0.0.5])
learning_rate = 0.1
Case 3:
w = np.array([-0.1,0.5])
learning_rate = 0.2
Which of these work and which of these don't? and why?

Madhavun Candadai
Nov 8, 2017
'''

import numpy as np

inputs = np.array([[-1.,-1.],[-1.,1.],[1.,-1.],[1.,1.]])
desired = np.array([-1.,1.,1.,1.])
w = np.array([-0.1,0.4])
threshold = 0.
learn_rate = 0.1
num_iterations = 20

for i in range(num_iterations):
    # get input and desired output for this iteration
    row_num = int(i%len(inputs))
    if int(i%len(inputs)) == 0:
        print('\nInputs|desired|weights|net|output|out_error')
    this_inputs = inputs[row_num]
    this_desired = desired[row_num]

    # computing weighted sum of input and output
    net = np.round(np.sum(this_inputs*w),decimals=2)
    #print(net)
    if net >= threshold:
        output = 1.
    else:
        output = -1.

    # updating weights
    out_error = (desired[row_num]-output)/2.
    print(this_inputs,desired[row_num],w,net,output,out_error)
    w += learn_rate* out_error * this_inputs
