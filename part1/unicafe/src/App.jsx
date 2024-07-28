import { useState } from 'react'

const StatisticsLine = ( { text, value} ) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0){
    return (
      <div>
        <p>No Feedback Given</p>
      </div>
    )
  } else {
    return (
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                    <StatisticsLine text="good" value={good} />
                    <StatisticsLine text="neutral" value={neutral} />
                    <StatisticsLine text="bad" value={bad} />
                    <StatisticsLine text="all" value={all} />
                    <StatisticsLine text="average" value={(good - bad) / all} />
                    <StatisticsLine text="positive" value={(good * 100) / all} />
                </tbody>
            </table>  
        </div>
    )
  }
};

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    );
};


const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
        <h1>Give Feedback</h1>
        <Button onClick={() => setGood(good+1)} text="good"/>
        <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
        <Button onClick={() => setBad(bad+1)} text="bad"/>
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
};

export default App;
