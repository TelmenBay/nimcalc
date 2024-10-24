// page.jsx
'use client';
import React, { useState } from 'react';

const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

let nnnMemoR = {};

function nnnCalc(piles, adj_matrix, setLogs) {
  nnnMemoR = {};
  let maxNimValue = 0;
  let logs = [];
  for (let i = 0; i < piles.length; i++) {
    logs.push(`Calculating nim value starting with pile ${alpha[i]}`);
    maxNimValue = Math.max(maxNimValue, nnnCalcR(piles, adj_matrix, i, logs));
  }
  setLogs(logs);
  return maxNimValue;
}

function nnnCalcR(piles, adj_matrix, lastPile, logs) {
  let key = alpha[lastPile] + JSON.stringify(piles);
  
  if (nnnMemoR.hasOwnProperty(key)) {
    logs.push(`Using memoized value for key ${key}: ${nnnMemoR[key]}`);
    return nnnMemoR[key];
  }
  
  logs.push(`Processing configuration for key ${key}`);
  
  let end_game = true;
  for (let neighbor_pile = 0; neighbor_pile < piles.length; neighbor_pile++) {
    if (adj_matrix[lastPile][neighbor_pile] === 1 && piles[neighbor_pile] > 0) {
      end_game = false;
      break;
    }
  }
  
  if (end_game) {
    nnnMemoR[key] = 0;
    logs.push(`Game over for key ${key}, storing mex value 0`);
    return 0;
  }
  
  let optionsValSet = new Set();
  for (let neighbor_pile = 0; neighbor_pile < piles.length; neighbor_pile++) {
    if (adj_matrix[lastPile][neighbor_pile] === 1 && piles[neighbor_pile] > 0) {
      for (let stones_to_remove = 1; stones_to_remove <= piles[neighbor_pile]; stones_to_remove++) {
        let new_piles = [...piles];
        new_piles[neighbor_pile] -= stones_to_remove;
        logs.push(`Removing ${stones_to_remove} stones from pile ${alpha[neighbor_pile]}, new configuration: ${JSON.stringify(new_piles)}`);
        optionsValSet.add(nnnCalcR(new_piles, adj_matrix, neighbor_pile, logs));
      }
    }
  }
  
  let mex_value = calcMex(optionsValSet);
  logs.push(`Mex value for key ${key} is ${mex_value}`);
  nnnMemoR[key] = mex_value;
  
  return mex_value;
}

function calcMex(optionsValSet) {
  let mex = 0;
  while (optionsValSet.has(mex)) {
    mex++;
  }
  return mex;
}

const Page = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [nimValue, setNimValue] = useState(null);
  const [logs, setLogs] = useState([]);

  const configurations = [
    { piles: [3, 2, 4, 2], adjM: [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]] },
    { piles: [2, 1, 1], adjM: [[1, 1, 0], [1, 1, 1], [0, 1, 1]] },
    { piles: [1, 1], adjM: [[1, 1], [1, 1]] },
    { piles: [2, 1, 1, 1], adjM: [[1, 1, 1, 0], [1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 1]] }
  ];

  const handleSelect = (event) => {
    setSelectedOption(parseInt(event.target.value, 10));
  };

  const handleCalculate = () => {
    const { piles, adjM } = configurations[selectedOption];
    const result = nnnCalc(piles, adjM, setLogs);
    setNimValue(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nim Game Calculation</h1>
      <label htmlFor="configSelect">Choose a configuration: </label>
      <select id="configSelect" value={selectedOption} onChange={handleSelect}>
        <option value={0}>Option 1: Piles [3, 2, 4, 2]</option>
        <option value={1}>Option 2: Piles [2, 1, 1]</option>
        <option value={2}>Option 3: Piles [1, 1]</option>
        <option value={3}>Option 4: Piles [2, 1, 1, 1]</option>
      </select>

      <button style={{ marginLeft: '10px' }} onClick={handleCalculate}>Calculate</button>

      {nimValue !== null && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          width: '300px',
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Calculated Nim Value</h2>
          <p>{nimValue}</p>
        </div>
      )}

      {logs.length > 0 && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f1f1f1',
          whiteSpace: 'pre-wrap',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <h3>Calculation Steps</h3>
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
