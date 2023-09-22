import logo from './logo.svg';
import './App.css';
import windData from './Wine-Data.json';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

function App() {
  let data = windData;
  data = data.map((e) => {
    return {
      classId: e.Alcohol,
      gamma: calculateGamma(e),
      flavanoids: e.Flavanoids,
    };
  });
  let uniqueClsses = [...new Set(data.map((e) => e.classId))];
  let uniqueHTML = uniqueClsses.map(e=>{
    return (<th>{'Class '+e}</th>)
  })
  let result=[],resultObject ={};
  for(let i=0;i<uniqueClsses.length;i++) {
     let classSpecificData = data.filter((e) => e.classId == uniqueClsses[i]);
     let classSpecificDataGammas = classSpecificData
       .map((e) => e.gamma);
     let classSpecificDataFlavanaoids = classSpecificData
       .map((e) => e.flavanoids);
    resultObject = {
      classId: uniqueClsses[i],
      gammaMean:calculateMean(classSpecificDataGammas),
      gammaMedian:calculateMedian(classSpecificDataGammas),
      gammaMode:calculateMode(classSpecificDataGammas),
      flavanoidsMean:calculateMean(classSpecificDataFlavanaoids),
      flavanoidsMedian:calculateMedian(classSpecificDataFlavanaoids),
      flavanoidsMode:calculateMode(classSpecificDataFlavanaoids),
    };
    result.push(resultObject);
    
  }
  
  let meanObject = {propName:'Gamma Mean'};
  let medianObject = {propName:'Gamma Median'};
  let modeObject = {propName:'Gamma Mode'};
  let flavanoidsMean = {propName:'Flavanoids Mean'};
  let flavanoidsMedian = {propName:'Flavanoids Median'};
  let flavanoidsMode = {propName:'Flavanoids Mode'};
  for(let i=0;i<result.length;i++){
    let str = 'c'+result[i].classId;
    meanObject[str] = result[i].gammaMean;
    medianObject[str] = result[i].gammaMedian;
    modeObject[str] = result[i].gammaMode;

    flavanoidsMean[str] = result[i].flavanoidsMean;
    flavanoidsMedian[str] = result[i].flavanoidsMedian;
    flavanoidsMode[str] = result[i].flavanoidsMode;
  }
  let flavanoidsArray =[];
  flavanoidsArray.push(flavanoidsMean);
  flavanoidsArray.push(flavanoidsMedian);
  flavanoidsArray.push(flavanoidsMode);
  flavanoidsArray = flavanoidsArray.map((e,i)=>{
    return (
      <tr key={i}>
        <td>{e.propName}</td>
        {getHtmlData(e)}
      </tr>
    );
  });
  let gammaArray = [];
  gammaArray.push(meanObject);
  gammaArray.push(medianObject);
  gammaArray.push(modeObject);
  gammaArray = gammaArray.map((e,i)=>{
    return (
      <tr key={i}>
        <td>{e.propName}</td>
        {getHtmlData(e)}
      </tr>
    );
  });
  

  function getHtmlData(e){
    let str  = '';
    for(let i=0;i<uniqueClsses.length;i++){
      str +='<td>'+ e['c'+uniqueClsses[i]]+'</td>'
    }
    return str;
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
    return parseFloat(sum / arrSize).toFixed(3);
  }
  
  function calculateMedian(array) {
    //defined ? aarray type of
    //sort array
    array.sort((a, b) => parseFloat(a) - parseFloat(b));
    //n is the size of array
    let n = array.length;
    return parseFloat(n % 2 === 0
      ? (array[parseInt((n - 1) / 2)] + array[parseInt((n + 1) / 2)]) / 2
      : array[parseInt(n / 2)]).toFixed(3);
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

    return parseFloat(mode).toFixed(3);
  }

  return (
    <div className="App">
      <table border={1}>
        <thead>
          <tr>
            <th>Class Id</th>
            {uniqueHTML}
          </tr>
        </thead>
        <tbody>
          {flavanoidsArray}
        </tbody>
      </table>
      <table border={1}>
      <thead>
          <tr>
            <th>Class Id</th>
            {uniqueHTML}
          </tr>
        </thead>
        <tbody>
          {gammaArray}
        </tbody>
      </table>
    </div>
  );
}

export default App;
