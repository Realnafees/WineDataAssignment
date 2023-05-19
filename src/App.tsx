import React, { useMemo } from "react";
import "./App.css";
import WineData from "./WineData/Wine-Data.json";
import { getMean, getMedian, getMode } from "./utility";

interface WineDataType {
  Alcohol: number;
  "Malic Acid": number;
  Ash: number | string;
  "Alcalinity of ash": number;
  Magnesium: number;
  "Total phenols": number;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: string;
  "Color intensity": number | string;
  Hue: number;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number;
  Gamma?: number
}


const getClassWiseData = () => {
  const classData = {} as any;
  WineData.forEach((item: WineDataType) => {
    let classDataValue = classData[`class ${item.Alcohol}`];
    let { Ash, Hue, Magnesium } = item;
    Ash = Number(Ash)
    item.Gamma = Number(((Ash * Hue) / Magnesium).toFixed(3));
    item.Flavanoids = Number(item.Flavanoids);
    if (classDataValue) {
      classData[`class ${item.Alcohol}`].push(item);
    } else {
      classData[`class ${item.Alcohol}`] = [];
      classData[`class ${item.Alcohol}`].push(item);
    }
  });
  return classData;
}


function App() {
  const classWiseData = useMemo(getClassWiseData, []);

  return (
    <div className="App">
      <table className="flavanoids-table">
        <tr>
          <td className="headt">Measure </td>
          {Object.keys(classWiseData).map((item) => {
            return <td className="headt">{item}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Flavanoids Mean</td>
          {Object.keys(classWiseData).map((item, index: number) => {

            // We can make a custom hook to store prev value to get rid of
            //  calculating mean/mode/median again in case of rerendering
            let mean = getMean(classWiseData[item], "Flavanoids");
            return <td key={index}>{mean}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Flavanoids Median</td>
          {Object.keys(classWiseData).map((item, index) => {
            let median = getMedian(classWiseData[item], "Flavanoids");
            return <td key={index}>{median}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Flavanoids Mode</td>
          {Object.keys(classWiseData).map((item, index) => {
            let mode = getMode(classWiseData[item], 'Flavanoids')
            return <td key={index}>{mode}</td>
          })}
        </tr>
      </table>
      <table>
        <div className="tableHeader">Gamma</div>
        <tr>
          <td className="headt">Measure </td>
          {Object.keys(classWiseData).map((item) => {
            return <td className="headt">{item}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Gamma Mean</td>
          {Object.keys(classWiseData).map((item, index) => {
            let mean = getMean(classWiseData[item], "Gamma");
            return <td key={index}>{mean}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Gamma Median</td>
          {Object.keys(classWiseData).map((item, index) => {
            let median = getMedian(classWiseData[item], "Gamma");
            return <td key={index}>{median}</td>;
          })}
        </tr>
        <tr>
          <td className="headt">Gamma Mode</td>
          {Object.keys(classWiseData).map((item, index) => {
            let mode = getMode(classWiseData[item], 'Gamma')
            return <td key={index}>{mode}</td>
          })}
        </tr>
      </table>
    </div>
  );
}

export default App;
