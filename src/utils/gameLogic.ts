// Just some helper functions for logic testing
export const calculateMoodLevel = (score: number) => {
    if (score > 70) return 'happy';
    if (score < 30) return 'sad';
    return 'neutral';
};

export const canAfford = (balance: number, cost: number) => {
    return balance >= cost;
};
