export function nimGameWinner(piles) {
    let nimSum = 0;
    for (let pile of piles) {
        nimSum ^= pile; // XOR operation
    }

    if (nimSum === 0) {
        return "Second player wins if both play optimally.";
    } else {
        return "First player wins if both play optimally.";
    }
}
