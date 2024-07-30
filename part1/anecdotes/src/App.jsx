import { useState } from "react";


const Button = (props) => {
    return (
        <button onClick={ props.onClick }>
            { props.text }
        </button>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];

    const [ selected, setSelected ] = useState(0);
    const [votes, setVotes] = useState(
        {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        }
    );
    const [ maxVote, setMaxVotes ] = useState(0);

    const checkMaxVotes = () => {
        // console.log(votes)
        let maxVoteCount = 0;
        let maxVoteIndex = 0;
        for (const v in votes){
            if (votes[v] >= maxVoteCount){
                maxVoteCount = votes[v]
                maxVoteIndex = parseInt(v);
            }
        }
        setMaxVotes(maxVoteIndex);
    };

    const newSelected = () => {
        const len = anecdotes.length;
        const idx = Math.floor(Math.random() * len );
        setSelected(idx)
    };

    const updateVotes = () => {
        const copy = { ...votes};
        copy[selected] += 1;
        setVotes(copy);

    };

    const handleVotes = () => {
        updateVotes();
        checkMaxVotes();
    }

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                <p>{ anecdotes[selected] }</p>
                <p>has {votes[selected]} votes</p>
                <Button onClick={ newSelected } text='random'/>
                <Button onClick={ handleVotes } text='vote'/>
            </div>
            <div>
                <h1>Anecdotes with the most votes</h1>
                <p>{ anecdotes[maxVote] }</p>
                <p> has { votes[maxVote] } votes</p>
            </div>
        </div>

    );
};

export default App;