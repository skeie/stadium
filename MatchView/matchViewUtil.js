// @flow

import type { GoalScorer } from '../components/MatchView';

export const updateGoalscorer = (newHomeTeam: string, goalScorers: Array<GoalScorer>, homeTeam: string) => {
    return goalScorers.map(goalScorer => {
        return {
            ...goalScorer,
            team: goalScorer.team === homeTeam ? newHomeTeam : goalScorer.team,
        };
    });
};