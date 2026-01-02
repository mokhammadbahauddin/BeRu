import { calculateMoodLevel, canAfford } from '../gameLogic';

describe('Game Logic Helpers', () => {
    test('calculateMoodLevel returns correct mood', () => {
        expect(calculateMoodLevel(80)).toBe('happy');
        expect(calculateMoodLevel(50)).toBe('neutral');
        expect(calculateMoodLevel(20)).toBe('sad');
    });

    test('canAfford checks balance correctly', () => {
        expect(canAfford(100, 50)).toBe(true);
        expect(canAfford(40, 50)).toBe(false);
        expect(canAfford(50, 50)).toBe(true);
    });
});
