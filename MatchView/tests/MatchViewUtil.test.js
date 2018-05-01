import { updateGoalscorer } from '../matchViewUtil';

describe('MatchViewUtil', () => {
    it('UpdateGoalScorer with home team changes', () => {
        const goalScorers = [
            { name: 'Suso', minute: ['42', '58'], team: 'AC Milan' },
            { name: 'A. Candreva', minute: ['53'], team: 'Internazionale' },
            { name: 'I. Perišić', minute: ['90'], team: 'Internazionale' },
        ];
        const result = updateGoalscorer('Milan', goalScorers, goalScorers["0"].team);
        expect(result[0].team).toBe('Milan')
    });
})