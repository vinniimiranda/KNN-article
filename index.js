import * as tf from '@tensorflow/tfjs'

async function KNN() {
  const myMainArray = ['1.0, 34', '9.8, 88', '5.0, 67', '6.0, 57', '7.0, 77', '2.3, 14', '12.1, 99', '15.1, 123']

  const myUnknown = tf.tensor1d(['3.5', '56'], 'float32')

  const myHeadingsArray = ['Size', 'Weight']

  const myDataArray = new Array(myHeadingsArray.length)
  for (let myA = 0; myA <= myMainArray.length - 1; myA++) {
    myDataArray[myA] = myMainArray[myA].split(',')
  }

  function findIndexOfGreatest(array) {
    var greatest
    var indexOfGreatest
    for (var i = 0; i < array.length; i++) {
      if (!greatest || array[i] > greatest) {
        greatest = array[i]
        indexOfGreatest = i
      }
    }
    return indexOfGreatest
  }

  const myDataArray2 = myDataArray.flat()

  const myData = tf.tensor(myDataArray2, [myMainArray.length, myHeadingsArray.length], 'float32') // should adjust to the amount of data

  ////////////////////////////////////////////////////////////////////////////////////////////////// issues end

  const myLabelsArray = ['small', 'big', 'medium', 'medium', 'medium', 'small', 'big', 'big']

  //myLabelsArray.length
  const myOriginalLoc = new Array(myLabelsArray.length)
  for (let x = 0; x <= myLabelsArray.length - 1; x++) {
    myOriginalLoc[x] = x
  }

  console.log('The Groups Length ' + myLabelsArray.length)
  console.log('The Unknown tensor is [' + (await myUnknown.data()) + ']')
  const myMainShape = new Array(2)
  myMainShape[0] = myLabelsArray.length
  myMainShape[1] = myHeadingsArray.length

  const mySqrt = tf.fill([myLabelsArray.length], 0.5, 'float32')

  const myDiff = tf.sub(myData, myUnknown)
  const mySquaredDiff = tf.mul(myDiff, myDiff)

  const axis = 1
  const mySquaredDiffAdded = mySquaredDiff.sum(axis)

  const myKNN = mySquaredDiffAdded.pow(mySqrt)
  const myKnnArray = await myKNN.data()

  let myJoinedArray = new Array(myLabelsArray.length)
  for (let y = 0; y <= myLabelsArray.length - 1; y++) {
    myJoinedArray[y] = new Array(3)
  }
  myJoinedArray = myJoinedArray.map(function (value, index) {
    return [myKnnArray[index], myLabelsArray[index], myOriginalLoc[index]]
  })

  myJoinedArray.sort(function (a, b) {
    return a[0] - b[0]
  })

  let myTemp = ''
  let myLabelAverage = ''
  let myLabelGroup = new Array(myLabelsArray.length)
  myLabelGroup[0] = new Array(2)
  let myGrouping = 0
  let myUniqueLables = Array.from(new Set(myLabelsArray))
  let myCount = new Array()
  for (let h = 0; h <= myUniqueLables.length - 1; h++) {
    myCount[h] = 0
  }
  for (let c = 0; c <= parseInt(3) - 1; c++) {
    myTemp += myMainArray[myJoinedArray[c][2]] + ' label = ' + myJoinedArray[c][1] + ' \n'

    for (let h = 0; h <= myUniqueLables.length - 1; h++) {
      if (myJoinedArray[c][1] == myUniqueLables[h]) {
        myCount[h] += 1
      }
    }
  }
  //   console.log(myTemp);
  console.log('For the unknown: ' + myUnknown)
  console.log('The K-Nearest-Neighbors: \n' + myTemp)
  console.log('Best Label: ' + myUniqueLables[findIndexOfGreatest(myCount)])

  //   document.getElementById('myDiv987').innerHTML +=  '<br>For the unknown: <font color=green>'+document.getElementById('myText01').value+
  //         '</font>  <br>The K-Nearest-Neighbors :<br> <font color=blue>'+myTemp+'</font> Best Label = <font color=blue>'+myUniqueLables[findIndexOfGreatest(myCount)] +'</font><br>'
}

KNN()
