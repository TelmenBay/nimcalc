export function nimGameWinner(pileNumbers) {
    // Initialize variables
    let nimSum = 0;
    const steps = []; // Ensure steps is initialized

    // Check if pileNumbers is empty
    if (pileNumbers.length === 0) {
        return {
            nimSum,
            resultMessage: "No piles provided.",
            steps: [],
        };
    }

    // Calculate nimSum and steps
    for (const pile of pileNumbers) {
        nimSum ^= pile; // Calculate nimSum
        steps.push(`Current pile: ${pile}`); // Example step
    }

    // Determine result message
    const resultMessage = nimSum !== 0 ? "Player 1 can win!" : "Player 2 can win!";

    // Return the expected structure
    return {
        nimSum,
        resultMessage,
        steps, // Ensure steps is included
    };
}
