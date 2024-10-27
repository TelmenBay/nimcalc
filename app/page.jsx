'use client'
import React, { useState } from 'react';

class NimCalcR {
  constructor() {
    this.alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
    this.nnnMemoR = new Map();
    this.steps = []; // To track the steps
  }

  // Comparator function to sort dictionary keys
  dictComparator(a, b) {
    return a.substring(1).localeCompare(b.substring(1));
  }

  // Main function to calculate nim values starting from all piles
  nnnCalc(piles, adjMatrix) {
    this.nnnMemoR.clear();
    this.steps = []; // Clear steps before each calculation
    let maxNimValue = 0;
    for (let i = 0; i < piles.length; i++) {
      maxNimValue = Math.max(maxNimValue, this.nnnCalcR(piles, adjMatrix, i));
    }
    return { maxNimValue, steps: this.steps }; // Return both max value and steps
  }

  // Function to calculate nim values for a specific game
  nnnCalcR(piles, adjMatrix, lastPile) {
    const key = this.alpha[lastPile] + JSON.stringify(piles);

    if (this.nnnMemoR.has(key)) {
      return this.nnnMemoR.get(key);
    }

    let endGame = true;
    for (let neighborPile = 0; neighborPile < piles.length; neighborPile++) {
      if (adjMatrix[lastPile][neighborPile] === 1 && piles[neighborPile] > 0) {
        endGame = false;
        break;
      }
    }

    if (endGame) {
      this.nnnMemoR.set(key, 0);
      this.steps.push(`${this.alpha[lastPile]}${JSON.stringify(piles)}=0`); // Log end game step
      return 0;
    }

    const optionsValSet = new Set();
    for (let neighborPile = 0; neighborPile < piles.length; neighborPile++) {
      if (adjMatrix[lastPile][neighborPile] === 1 && piles[neighborPile] > 0) {
        for (let stonesToRemove = 1; stonesToRemove <= piles[neighborPile]; stonesToRemove++) {
          const newPiles = [...piles];
          newPiles[neighborPile] -= stonesToRemove;
          const result = this.nnnCalcR(newPiles, adjMatrix, neighborPile);
          optionsValSet.add(result);
          this.steps.push(`${this.alpha[lastPile]}${JSON.stringify(newPiles)}=${result}`); // Log each move
        }
      }
    }

    const mexValue = this.calcMex(optionsValSet);
    this.nnnMemoR.set(key, mexValue);
    this.steps.push(`${this.alpha[lastPile]}${JSON.stringify(piles)}=${mexValue}`); // Log current step
    return mexValue;
  }

  // Function to calculate the mex value
  calcMex(optionsValSet) {
    let mex = 0;
    while (optionsValSet.has(mex)) {
      mex++;
    }
    return mex;
  }
}

const App = () => {
  const [piles, setPiles] = useState([0, 0, 0, 0]);
  const [selectedMatrix, setSelectedMatrix] = useState("Olivia Kelsey");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]); // State to hold steps

  // Define matrices
  const matrices = {
    "Olivia Kelsey": [
      [1, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 1]
    ],
    "Alexis Junior Cameron": [
      [1, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    "Tyshaun Israel": [
      [1, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 0, 1, 1]
    ],
    "Isabella Madison": [
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [0, 1, 1, 1],
      [0, 1, 1, 1]
    ]
  };

  // Handle pile input changes
  const handlePileChange = (index, value) => {
    const newPiles = [...piles];
    newPiles[index] = parseInt(value, 10) || 0;
    setPiles(newPiles);
  };

  // Calculate result using NimCalcR
  const handleCalculate = () => {
    const selectedMatrixValues = matrices[selectedMatrix];
    const nimCalcR = new NimCalcR();
    const { maxNimValue, steps } = nimCalcR.nnnCalc(piles, selectedMatrixValues);
    setResult(maxNimValue);
    setSteps(steps); // Set the steps for display
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCalculate();
  };

  return (
    <div>
      <h1>Nim Game Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Piles:</label>
          {piles.map((pile, index) => (
            <input
              key={index}
              type="number"
              value={pile}
              onChange={(e) => handlePileChange(index, e.target.value)}
              required
            />
          ))}
        </div>
        <div>
          <label>Choose Matrix:</label>
          <select value={selectedMatrix} onChange={(e) => setSelectedMatrix(e.target.value)}>
            {Object.keys(matrices).map((matrix) => (
              <option key={matrix} value={matrix}>
                {matrix}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Calculate</button>
      </form>
      {result !== null && (
        <div>
          <h2>Max Nim Value: {result}</h2>
          <h3>Calculation Steps:</h3>
          <pre>{steps.join('\n')}</pre> {/* Display the steps */}
        </div>
      )}
    </div>
  );
};

export default App;
