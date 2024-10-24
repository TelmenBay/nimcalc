const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

// Object to store positions and their respective nim values (This is the dictionary)
let nnnMemoR = {};

// Main function to calculate nim values starting from all piles
function nnnCalc(piles, adj_matrix) {
    nnnMemoR = {};
    let maxNimValue = 0;
    for (let i = 0; i < piles.length; i++) {
        maxNimValue = Math.max(maxNimValue, nnnCalcR(piles, adj_matrix, i));
    }
    return maxNimValue;
}

// Function to calculate nim values for a specific game
function nnnCalcR(piles, adj_matrix, lastPile) {
    // Generate a unique key for the dictionary based on the current pile setup and last pile
    let key = alpha[lastPile] + JSON.stringify(piles);
    
    // Check if the mex value for this specific game and last pile is already in the dictionary
    if (nnnMemoR.hasOwnProperty(key)) {
        return nnnMemoR[key];
    }
    
    // Base case: If all piles connected to the lastPile are empty, the game ends
    let end_game = true;
    for (let neighbor_pile = 0; neighbor_pile < piles.length; neighbor_pile++) {
        // Check if neighbor_pile is connected to lastPile and that it still has stones
        if (adj_matrix[lastPile][neighbor_pile] === 1 && piles[neighbor_pile] > 0) {
            end_game = false;
            break;
        }
    }
    if (end_game) {
        nnnMemoR[key] = 0;  // Store the mex value of 0 in the dictionary
        return 0;
    }
    
    // Set to store the calculated nim values for all possible moves
    let optionsValSet = new Set();
    
    // Explore moves from the lastPile and its connected piles
    for (let neighbor_pile = 0; neighbor_pile < piles.length; neighbor_pile++) {
        // Only consider piles connected to the lastPile and that it still has stones
        if (adj_matrix[lastPile][neighbor_pile] === 1 && piles[neighbor_pile] > 0) {
            // Removing every number of stones possible
            for (let stones_to_remove = 1; stones_to_remove <= piles[neighbor_pile]; stones_to_remove++) {
                // Clone the piles array and remove the specific number of stones from the neighbor pile
                let new_piles = [...piles];
                new_piles[neighbor_pile] -= stones_to_remove;
                
                // Adding the values of the options to a set which is then used to determine the mex value
                optionsValSet.add(nnnCalcR(new_piles, adj_matrix, neighbor_pile));
            }
        }
    }
    
    // Calculate the mex value for the current game state
    let mex_value = calcMex(optionsValSet);
    
    // Place the mex value of this game in the dictionary
    nnnMemoR[key] = mex_value;
    
    return mex_value;
}

// Function to calculate the mex value
function calcMex(optionsValSet) {
    let mex = 0;
    while (optionsValSet.has(mex)) {
        mex++;
    }
    return mex;
}

// TO DO: print sorted dictionary
function printDict(nnnMemoR) {
    const sortedKeys = Object.keys(nnnMemoR).sort();
    sortedKeys.forEach(key => {
        console.log(`${key}: ${nnnMemoR[key]}`);
    });
}