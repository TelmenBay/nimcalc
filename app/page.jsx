'use client'
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { nimGameWinner } from './app'; // Adjust the path as needed

export default function NimGame() {
  const [numPiles, setNumPiles] = useState('');
  const [piles, setPiles] = useState([]);
  const [result, setResult] = useState('');
  const [nimSum, setNimSum] = useState(null);
  const [calculationSteps, setCalculationSteps] = useState([]); // New state for calculation steps

  // Update the number of piles and generate empty fields
  const handleNumPilesChange = (event) => {
    const value = event.target.value;
    setNumPiles(value);

    if (value && !isNaN(value) && value >= 0) {
      const num = parseInt(value, 10);
      setPiles(Array.from({ length: num }, () => ''));
    } else {
      setPiles([]);
    }
  };

  // Update the pile values
  const handlePileChange = (index, event) => {
    const newPiles = [...piles];
    newPiles[index] = event.target.value;
    setPiles(newPiles);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const pileNumbers = piles.map((pile) => parseInt(pile, 10)).filter(Boolean); // Ensure valid numbers

    console.log("Pile Numbers:", pileNumbers); // Log the input to check its contents

    // Use nimGameWinner function from app.js
    const resultFromNimGame = nimGameWinner(pileNumbers);
    console.log(resultFromNimGame); // Debugging line
    const { nimSum, resultMessage, steps = [] } = resultFromNimGame; // Default to empty array
    setResult(resultMessage);
    setNimSum(nimSum);
    setCalculationSteps(steps); // Store calculation steps
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Nim Game
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Number of piles"
          type="number"
          value={numPiles}
          onChange={handleNumPilesChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        {piles.map((pile, index) => (
          <TextField
            key={index}
            label={`Pile ${index + 1} stones`}
            type="number"
            value={pile}
            onChange={(event) => handlePileChange(index, event)}
            required
            fullWidth
            sx={{ marginBottom: 1 }}
          />
        ))}

        <Button type="submit" variant="contained" color="primary">
          Find Winner
        </Button>
      </form>

      {result && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Result: {result}
        </Typography>
      )}

      {nimSum !== null && (
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Nim Sum: {nimSum}
        </Typography>
      )}

      {calculationSteps.length > 0 && ( // Display calculation steps
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Calculation Steps: {calculationSteps.join(', ')}
        </Typography>
      )}
    </Box>
  );
}
