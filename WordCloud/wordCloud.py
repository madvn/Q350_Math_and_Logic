###########################################################################
# Python file that creates simple wordCloud from data
# Author: Madhavun Candadai
# Date created: 08/22/2017
###########################################################################

import numpy as np

dataFileName = 'sampleData.dat'
wordCloudFileName = 'wordCloud.html'
fontScalingFactor = 40
cloudOrderFactor = 0.3 # in [0,1] where 0=no control on order and 1=ordered vertically

# Open html file and write basic header content
htmlFile = open(wordCloudFileName,'w')
htmlFile.write('<!DOCTYPE html>\n')
htmlFile.write('<html>\n')
htmlFile.write('<head>\n')
htmlFile.write('<meta charset="UTF-8">\n')
htmlFile.write('<title>WordCloud</title>\n')
htmlFile.write('</head>\n')

# Read data into two lists - one for words and one for frequency
wordList = []
FreqList = []
for line in open(dataFileName):
    wordList.append(line.split(' ')[0])
    FreqList.append(line.split(' ')[1][:-1])
FreqList = np.asarray(map(float,FreqList)) # converting string to float numbers
#print wordList,FreqList

maxFreq = np.max(FreqList)
minFreq = np.min(FreqList)

# Body of html file
htmlFile.write('<body style="text-align:center">\n')
htmlFile.write('<p>\n')
# for each word...
for ind,word in enumerate(wordList):
    # compute fontSize
    normalizedFontSize = ((FreqList[ind]-minFreq)/(maxFreq-minFreq))+1
    fontSize = normalizedFontSize*fontScalingFactor

    # create span tag and set font-size
    htmlFile.write('<span style="font-size:')
    htmlFile.write(str(fontSize))
    htmlFile.write('pt;')

    # set random color
    htmlFile.write('color:rgb(')
    htmlFile.write(str(np.random.randint(255))+ ',') #red
    htmlFile.write(str(np.random.randint(255))+ ',') #green
    htmlFile.write(str(np.random.randint(255))+ ')') #blue
    htmlFile.write('">')

    # write the word
    htmlFile.write(word)

    #close span tag
    htmlFile.write('</span>\n')

    # randomly enter new line
    if np.random.rand() < cloudOrderFactor:
        htmlFile.write('</p>\n<p>\n')

htmlFile.write('</p>\n')
htmlFile.write('</body>\n')

# Write closing content for htlm file
htmlFile.write('</html>\n')
htmlFile.close()
