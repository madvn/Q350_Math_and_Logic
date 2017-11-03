'''
Q350 - Math and Logic for Cognitive Science
Introduction to Neural Networks

Madhavun Candadai
November, 2017
To simply test run this code, go to https://drive.google.com/file/d/0BwFn4NSMbbQXR3YyZzZ5ejNkcU0/view?usp=sharing
'''

# Import required packages
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

# The parts of the networks that are learned
W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))

# The input to the network - contains a batch of several images
input_images = tf.placeholder(tf.float32,shape=[None,784])

# The weighted sum of inputs and bias
net = tf.matmul(input_images,W) + b

# Predicting the probability of belonging to each class (again, for the batch of several images)
predicted_class_probs = tf.nn.softmax(net)

# Predicting class based on max probability
predicted_labels = tf.argmax(predicted_class_probs,1)

from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

# Displaying a few samples
for _ in range(3):
    sample_x, _ = mnist.train.next_batch(1)
    plt.figure()
    plt.imshow(np.reshape(sample_x,[28,28]))
    plt.show()

correct_class_probs = tf.placeholder(tf.float32, [None, 10])
correct_labels = tf.argmax(correct_class_probs,1)

# Accuracy of prediction
accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted_labels, correct_labels), tf.float32))

# Loss function to minimize
cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(labels=correct_class_probs, logits=predicted_class_probs))

# One step of weight updates based on computing error gradient
train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

sess = tf.InteractiveSession()
tf.global_variables_initializer().run()

num_training_steps = 5000
cost = []

# Run "num_training_steps" steps of training
for step_num in range(num_training_steps):
  batch_xs, batch_ys = mnist.train.next_batch(100) # 100 images and corresponding correct labels
  _,c = sess.run([train_step,cross_entropy], feed_dict={input_images:batch_xs,correct_class_probs:batch_ys}) # running train_step
  cost.append(c)

# Plotting
plt.figure()
plt.plot(cost)
plt.xlabel('Training step #')
plt.ylabel('Cross_entropy')
plt.show()

# Check performance after training
print('Accuracy on 10,000 test images = ',sess.run(accuracy,feed_dict={input_images:mnist.test.images,correct_class_probs:mnist.test.labels})*100,"%")
