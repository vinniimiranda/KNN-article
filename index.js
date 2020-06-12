import * as tf from '@tensorflow/tfjs'

async function KNN() {
  const myMainArray = [
    '5.1,3.5,1.4,0.2',
    '4.9,3,1.4,0.2',
    '4.7,3.2,1.3,0.2',
    '4.6,3.1,1.5,0.2',
    '5,3.6,1.4,0.2',
    '5.4,3.9,1.7,0.4',
    '4.6,3.4,1.4,0.3',
    '5,3.4,1.5,0.2',
    '4.4,2.9,1.4,0.2',
    '4.9,3.1,1.5,0.1',
    '5.4,3.7,1.5,0.2',
    '4.8,3.4,1.6,0.2',
    '4.8,3,1.4,0.1',
    '4.3,3,1.1,0.1',
    '5.8,4,1.2,0.2',
    '5.7,4.4,1.5,0.4',
    '5.4,3.9,1.3,0.4',
    '5.1,3.5,1.4,0.3',
    '5.7,3.8,1.7,0.3',
    '5.1,3.8,1.5,0.3',
    '5.4,3.4,1.7,0.2',
    '5.1,3.7,1.5,0.4',
    '4.6,3.6,1,0.2',
    '5.1,3.3,1.7,0.5',
    '4.8,3.4,1.9,0.2',
    '5,3,1.6,0.2',
    '5,3.4,1.6,0.4',
    '5.2,3.5,1.5,0.2',
    '5.2,3.4,1.4,0.2',
    '4.7,3.2,1.6,0.2',
    '4.8,3.1,1.6,0.2',
    '5.4,3.4,1.5,0.4',
    '5.2,4.1,1.5,0.1',
    '5.5,4.2,1.4,0.2',
    '4.9,3.1,1.5,0.1',
    '5,3.2,1.2,0.2',
    '5.5,3.5,1.3,0.2',
    '4.9,3.1,1.5,0.1',
    '4.4,3,1.3,0.2',
    '5.1,3.4,1.5,0.2',
    '5,3.5,1.3,0.3',
    '4.5,2.3,1.3,0.3',
    '4.4,3.2,1.3,0.2',
    '5,3.5,1.6,0.6',
    '5.1,3.8,1.9,0.4',
    '4.8,3,1.4,0.3',
    '5.1,3.8,1.6,0.2',
    '4.6,3.2,1.4,0.2',
    '5.3,3.7,1.5,0.2',
    '5,3.3,1.4,0.2',
    '7,3.2,4.7,1.4',
    '6.4,3.2,4.5,1.5',
    '6.9,3.1,4.9,1.5',
    '5.5,2.3,4,1.3',
    '6.5,2.8,4.6,1.5',
    '5.7,2.8,4.5,1.3',
    '6.3,3.3,4.7,1.6',
    '4.9,2.4,3.3,1',
    '6.6,2.9,4.6,1.3',
    '5.2,2.7,3.9,1.4',
    '5,2,3.5,1',
    '5.9,3,4.2,1.5',
    '6,2.2,4,1',
    '6.1,2.9,4.7,1.4',
    '5.6,2.9,3.6,1.3',
    '6.7,3.1,4.4,1.4',
    '5.6,3,4.5,1.5',
    '5.8,2.7,4.1,1',
    '6.2,2.2,4.5,1.5',
    '5.6,2.5,3.9,1.1',
    '5.9,3.2,4.8,1.8',
    '6.1,2.8,4,1.3',
    '6.3,2.5,4.9,1.5',
    '6.1,2.8,4.7,1.2',
    '6.4,2.9,4.3,1.3',
    '6.6,3,4.4,1.4',
    '6.8,2.8,4.8,1.4',
    '6.7,3,5,1.7',
    '6,2.9,4.5,1.5',
    '5.7,2.6,3.5,1',
    '5.5,2.4,3.8,1.1',
    '5.5,2.4,3.7,1',
    '5.8,2.7,3.9,1.2',
    '6,2.7,5.1,1.6',
    '5.4,3,4.5,1.5',
    '6,3.4,4.5,1.6',
    '6.7,3.1,4.7,1.5',
    '6.3,2.3,4.4,1.3',
    '5.6,3,4.1,1.3',
    '5.5,2.5,4,1.3',
    '5.5,2.6,4.4,1.2',
    '6.1,3,4.6,1.4',
    '5.8,2.6,4,1.2',
    '5,2.3,3.3,1',
    '5.6,2.7,4.2,1.3',
    '5.7,3,4.2,1.2',
    '5.7,2.9,4.2,1.3',
    '6.2,2.9,4.3,1.3',
    '5.1,2.5,3,1.1',
    '5.7,2.8,4.1,1.3',
    '6.3,3.3,6,2.5',
    '5.8,2.7,5.1,1.9',
    '7.1,3,5.9,2.1',
    '6.3,2.9,5.6,1.8',
    '6.5,3,5.8,2.2',
    '7.6,3,6.6,2.1',
    '4.9,2.5,4.5,1.7',
    '7.3,2.9,6.3,1.8',
    '6.7,2.5,5.8,1.8',
    '7.2,3.6,6.1,2.5',
    '6.5,3.2,5.1,2',
    '6.4,2.7,5.3,1.9',
    '6.8,3,5.5,2.1',
    '5.7,2.5,5,2',
    '5.8,2.8,5.1,2.4',
    '6.4,3.2,5.3,2.3',
    '6.5,3,5.5,1.8',
    '7.7,3.8,6.7,2.2',
    '7.7,2.6,6.9,2.3',
    '6,2.2,5,1.5',
    '6.9,3.2,5.7,2.3',
    '5.6,2.8,4.9,2',
    '7.7,2.8,6.7,2',
    '6.3,2.7,4.9,1.8',
    '6.7,3.3,5.7,2.1',
    '7.2,3.2,6,1.8',
    '6.2,2.8,4.8,1.8',
    '6.1,3,4.9,1.8',
    '6.4,2.8,5.6,2.1',
    '7.2,3,5.8,1.6',
    '7.4,2.8,6.1,1.9',
    '7.9,3.8,6.4,2',
    '6.4,2.8,5.6,2.2',
    '6.3,2.8,5.1,1.5',
    '6.1,2.6,5.6,1.4',
    '7.7,3,6.1,2.3',
    '6.3,3.4,5.6,2.4',
    '6.4,3.1,5.5,1.8',
    '6,3,4.8,1.8',
    '6.9,3.1,5.4,2.1',
    '6.7,3.1,5.6,2.4',
    '6.9,3.1,5.1,2.3',
    '5.8,2.7,5.1,1.9',
    '6.8,3.2,5.9,2.3',
    '6.7,3.3,5.7,2.5',
    '6.7,3,5.2,2.3',
    '6.3,2.5,5,1.9',
    '6.5,3,5.2,2',
    '6.2,3.4,5.4,2.3',
    '5.9,3,5.1,1.8'
  ]

  const myUnknown = tf.tensor1d('6,3.4,4.5,1.6'.split(','), 'float32')

  const myHeadingsArray = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']

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

  const myLabelsArray = [
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'setosa',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'versicolor',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica',
    'virginica'
  ]

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

  console.log('For the unknown: ' + myUnknown)
  console.log('The K-Nearest-Neighbors: \n' + myTemp)
  console.log('Best Label: ' + myUniqueLables[findIndexOfGreatest(myCount)])
}

KNN()
