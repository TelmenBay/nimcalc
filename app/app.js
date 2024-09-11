export function nimGameWinner(piles) {
    let nimSum = 0;
    for (let pile of piles) {
        nimSum ^= pile; // XOR operation
    }

    let resultMessage = nimSum === 0
        ? "Second player wins if both play optimally."
        : "First player wins if both play optimally.";

    return { nimSum, resultMessage };
}
