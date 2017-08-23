The code here creates very basic word clouds from word frequency data provided in files

This folder contains 3 files
1. sampleData.dat - a file that has a list of words along with their frequencies
2. wordCloud.py - a python script that reads sampleData.dat and write a html with the wordCloud
3. wordCloud.html - the HTML file for the wordCloud

*wordCloud.py*
This file first writes out all header content for the HTML file
Then, it computes the font-size for each word according to its frequency
and writes that word out with a random RGB color value
Finally, the closing HTML tags are written out

There are 2 parameters - 
1. fontScalingFactor: the font size for the least frequent is fontScalingFactor and that of the most frequent word is 2*fontScalingFactor
2. cloudOrderFactor: this is in the range [0,1] and controls the line breaks between the strings of words; with 0 giving the browser control on line breaks and 1 putting every word in its own line. Try 0.3-0.8 depending on the number of words you have.
