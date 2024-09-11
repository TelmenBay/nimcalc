'use client'
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { nimGameWinner } from './app'; // Adjust the path as needed

export default function NimGame() {
  const [numPiles, setNumPiles] = useState('');
  const [piles, setPiles] = useState([]);
  const [result, setResult] = useState('');

  // Update the number of piles and generate empty fields
  const handleNumPilesChange = (event) => {
    const value = event.target.value;
    setNumPiles(value);
    console.log("Number of piles changed to:", value);


    // Generate an array of empty strings based on the number of piles
    if (value >= 0) {
      setPiles(Array.from({ length: parseInt(value, 10) }, () => ''));
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

    // Convert pile strings to integers
    const pileNumbers = piles.map((pile) => parseInt(pile, 10));

    // Use nimGameWinner function from app.js
    const gameResult = nimGameWinner(pileNumbers);
    setResult(gameResult);
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
    </Box>
  );
}
