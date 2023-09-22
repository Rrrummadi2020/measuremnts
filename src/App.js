import logo from './logo.svg';
import './App.css';
import data from './Wine-Data.json';

function App() {
  console.log(data);
  let uniqueClsses = [...new Set(data.map((e) => e.Alcohol))];
  for(let i=0;i<uniqueClsses.length;i++) {
    console.log(uniqueClsses[i]);
  }

  function calculateGamma(point) {
    //as Gamma = (Ash * Hue) / Magnesium.
    return parseFloat(point.Magnesium)
      ? (
          (parseFloat(point.Ash) * parseFloat(point.Hue)) /
          parseFloat(point.Magnesium)
        ).toFixed(3)
      : 0;
  }

  function calculateMean(array) {
    console.log("aaaaaaaaaRAMAaaaaa");

    //check if array is defined and array type
    let arrSize = array.length;
    if (arrSize === 0) {
      return 0;
    }
    //sum divided by the number of elements
    let sum = array.reduce(
      (acc, curr) => parseFloat(acc) + parseFloat(curr),
      0
    );
    return sum / arrSize;
  }
  
  function calculateMedian(array) {
    //defined ? aarray type of
    //sort array
    array.sort((a, b) => parseFloat(a) - parseFloat(b));
    //n is the size of array
    let n = array.length;
    return n % 2 === 0
      ? (array[parseInt((n - 1) / 2)] + array[parseInt((n + 1) / 2)]) / 2
      : array[parseInt(n / 2)];
  }
 
  function calculateMode(array) {
    if (array.length === 0) {
      return null; // Handle the case where the array is empty.
    }

    // Create an object to store the frequency of each number.
    const frequencyMap = {};

    let mode = array[0];
    let maxFrequency = 1;

    for (const num of array) {
      if (frequencyMap[num] === undefined) {
        frequencyMap[num] = 1;
      } else {
        frequencyMap[num]++;
      }

      if (frequencyMap[num] > maxFrequency) {
        mode = num;
        maxFrequency = frequencyMap[num];
      }
    }

    return mode;
  }

  console.log(uniqueClsses);
  return (
    <div className="App">
      Hello Ganesh
    </div>
  );
}

export default App;
