import 'react-native';
import React from 'react';
import MatchView from '../MatchView';
import renderer from 'react-test-renderer';
import Top from '../MatchView/Top';
import TeamUI from '../MatchView/TeamUI';
import ScoreView from '../MatchView/ScoreView';

const props = {
    "editable": true,
    "stadium": { "capacity": 121749, "name": "Camp Nou", "__typename": "Stadium" },
    "startTime": "20:45", "homeTeam": "Barcelona", "awayTeam": "Roma", "goalsHomeTeam": 6, "goalsAwayTeam": 1, "goalScorers": [{ "name": "L. Suárez", "minute": ["13"], "team": "Barcelona", "__typename": "GoalScorer" }, { "name": "L. Messi", "minute": ["13"], "team": "Barcelona", "__typename": "GoalScorer" }, { "name": "G. Pique", "minute": ["13"], "team": "Barcelona", "__typename": "GoalScorer" }, { "name": "Adriano", "minute": ["13"], "team": "Barcelona", "__typename": "GoalScorer" }, { "name": "E. Dzeko", "minute": ["13"], "team": "Roma", "__typename": "GoalScorer" }], "__typename": "Match", "uri": "https://files.graph.cool/cjdizt45h14ca016541zn4b91/cjdj0ihen0ris01022fxo8dkg", "date": "2017/11/18",
    onChangeHomeTeam: jest.fn(),
}
describe('Matchview', () => {
    it('MatchView renders correctly', () => {
        const tree = renderer.create(<MatchView {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('MatchView top renders correctly with edit true', () => {
        const tree = renderer.create(<Top {...props.stadium} homeTeam={props.homeTeam} date={props.date} onChangeHomeTeam={jest.fn()} editable />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('MatchView top renders correctly with edit false', () => {
        const tree = renderer.create(<Top {...props.stadium} homeTeam={props.homeTeam} date={props.date} onChangeHomeTeam={jest.fn()} editable />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('MatchView TeamUI renders correctly', () => {
        const tree = renderer.create(<TeamUI goalScorers={props.goalScorers} team={props.homeTeam} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('MatchView ScoreView renders correctly', () => {
        const tree = renderer.create(<ScoreView {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})

