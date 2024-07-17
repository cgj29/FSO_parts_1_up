import { useState } from 'react'

const Content = () => {
  const exercises = [
    ['Fundamentals of React', 10],
    ['Using props to pass data', 7],
    ['State of a component', 14]
  ];

 return (
  <div>
    <Part values={exercises[0]} />    
    <Part values={exercises[1]} />
    <Part values={exercises[2]} />
  </div>
 );
};

const Part = (props) => {
  return(
    <p>{props.values[0]} {props.values[1]}</p>
  );
};

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
};

const Total = () => {
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <p>Number of exercises: {exercises1 + exercises2 + exercises3}</p>
  );
};

const App1 = () => {
  const course = 'Half Stack application development';

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total />
    </div>
  );
};


const App2 = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <h1> { course }</h1>
      <p>{ part1.name}: {part1.exercises}</p>
      <p>{ part2.name}: {part2.exercises}</p>
      <p>{ part3.name}: {part3.exercises}</p>

      <p>Number of exercises: { part1.exercises + part2.exercises + part3.exercises }</p>
    </div>
  )
} 


const App3 = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  const Header1 = (props) => {
    return (
      <div>
        <h1>{ course }</h1>
      </div>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <p>{ parts[0].name } { parts[0].exercises }</p>
        <p>{ parts[1].name } { parts[1].exercises }</p>
        <p>{ parts[2].name } { parts[2].exercises }</p>
      </div>
    );
  };

  const Total = (props) => {
    return (
      <p>Number of exercises (1.4) { parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
    );
  };

  return (
    <div>
      <Header1 course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const App4 = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header2 = (props) => {
    return (
      <div>
        <h1>{ course.name }</h1>
      </div>
    );
  };

  const Content2 = (props) => {
    const parts = props['course']['parts'];
    return (
      <div>
        <p>{ parts[0].name } { parts[0].exercises }</p>
        <p>{ parts[1].name } { parts[1].exercises }</p>
        <p>{ parts[2].name } { parts[2].exercises }</p>
      </div>
    );
  };

  const Total2 = (props) => {
    const parts = props['course']['parts'];
    return (
      <p>Number of exercises (1.5) { parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
    );
  };

  return (
    <div>
      <Header2 course={course} />
      <Content2 course={course} />
      <Total2 course={course} />
    </div>
  )
}


/**
 * Here onwards are notes that made to for the Unit 1 parts B/ C / D 
 * 
 */

const DemoAppC = () => {
  const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear()- age
    return (
    <div>
      <p>
        Hello { name }, you are { age } years old and you were probably born in { bornYear() }
      </p>
    </div>
    );
  };

  const name = 'Peter';
  const age = 10;

  return (
    <div>
      <h1>Greetings!</h1>
      <Hello name="Maya" age={26+10} />
      <Hello name={name} age={ age } />
    </div>
  );
};

const DemoAppD = () => {
  const [ counter, setCounter] = useState(10);
  /**
   * function call assigns counter to initial value of 0 and returns setCounter function which can be used to 
   * modify the state. The function is not invoked upon be assigned.
   * When the state modifying function is called, React re-renders the component. This reexecutes the function
   */

  setTimeout(
    /**
     * Timeout function recieves the the state modifying function as well as the time delay.
     * each time this function executes, the state of the counter is modified causing the the component to be re-rendered 
     * and the function to be re-executed
     */
    () => setCounter(counter - 1), 
    1000
  );

  console.log('rendering...', counter)

  return (
    <div>{ counter }</div>
  );
};


const DemoAppE = () => {
  const [ counter, setCounter ] = useState(0);
  /**
   * because handleClick invokes a function that changes the state, every time it is pressed
   * the page is re-rendered
   */
  const handleClick = () => {
    setCounter(counter + 1);
    console.log(`clicked ${ counter } times`);
  };

  return (
    /**
     * assigns the handleClick function to the button, which executes every time the button is clicked
     * event handlers must be assigned to functions (or a reference to a function)
     * if the event handler is set to a function call instead, the page will continuously re-render as the function is instantly 
     * executed
     * 
     */
    <div>
      <div>{ counter }</div>
      <button onClick={ handleClick }>
        plus
      </button>
      <button onClick={() => setCounter(0)}>
        zero
      </button>
      <button onClick={() => setCounter(counter - 1)}>
        minus
      </button>
    </div>
  );
};


const DemoAppF = () => {
  const Display = ({ counter }) => <div>{ counter }</div>

  const Button = ( {onClick, text }) => {
    /**
     * makes a reusable button component that takes a function reference and text to return a button
     */
    return (
      <button onClick={ onClick }>
        { text }
      </button>
    );
  };

  const [ counter, setCounter ] = useState(0);
  const increaseByOne = () => {
    console.log('increasing, value before: ', counter);
    setCounter(counter + 1);
  };
  const setToZero = () => {
    console.log('setting to 0, value before: ', counter);
    setCounter(0);
  };
  const decreaseByOne = () => {
    console.log('decreasing, value before: ', counter)
    setCounter(counter - 1);
  };
  console.log('rendering with counter value', counter);

  return (
    <div>
      <Display counter={ counter } />
      <Button onClick={ increaseByOne } text='plus' />
      <Button onClick={ setToZero } text='zero' />
      <Button onClick={ decreaseByOne } text='minus' />
    </div>
  );
};

/**
 * whenever an application is rane, the code is executed.
 * initally the state defined in useState is used.
 * Any time that state is changed, by invoking a function that alters state, the component is re-rendered
 * If a user clicks the plus button to change the counter to 1, the component DemoAppF is re-rendered
 * -- this also causes the 0 and minus buttons to be-rendered, since they are subcomponents of DemoAppF
 */


/**
 * Complex State
 */
const DemoAppG = () => {
  const [clicks, setClicks] = useState({
    left:0, right:0
  })

  /**
   * alternative ways to wriet the same code. 
   */
  const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left +1 })

  const handleRightClick = () => {
    const newClicks = {
      /**
       * spread operator creates a new object that is a copy of the original, except the modified key, in this case right
       */
      ...clicks,
      right: clicks.right +1
    };
    setClicks(newClicks);
  };
  /**
   * note that writing the code as 
   *  const handleleftClick () => {
   *  clicks.left ++
   *  setClicks(clicks)
   * }
   * appears to work, but violates React's principle of never modifying state directly. In react changing state has 
   * to be done through the create of a new object (done via the spread operator) or directly through new object creation
   */

  return (
    <div>
      { clicks.left }
      <button onClick={ handleLeftClick }>
        left
      </button>
      <button onClick={ handleRightClick }>
        right
      </button>
      { clicks.right }
    </div>
  );
};

/**
 * handling arrays
 */

const DemoAppH = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    /**
     * okay to use concat in this case, since this method does not mutate 
     * the existing arrya but returns a new copy of the array with the item added
     * using push, instead, would violate the tenet of React.
     */
    setAll(allClicks.concat('L'));
    setLeft(left+1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right+1);
  };

  return (
    <div>
      { left }
      <button onClick={ handleLeftClick }>Left</button>
      <button onClick={ handleRightClick }>Right</button>
      { right }
      <p>{ allClicks.join(' ') }</p>
    </div>
  );
};

/**
 * update of the state is asynchronous
 */

const DemoAppI = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    console.log('left before', left);
    const updatedLeft = left +1;
    console.log('left after', left);
    /**
     * even though a new value was set for left after calling setLeft()
     * the old value of left persist -- despite the update
     * This leads to the total value being too small
     * This is caused b/c React State update happen asynchronously
     */
    /**
     * this can be correct with the following line:
     */
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  return (
    <div>
      { left }
      <button onClick={ handleLeftClick }>Left</button>
      <button onClick={ handleRightClick }>Right</button>
      { right }
      <p>{ allClicks.join(' ') }</p>
      <p>total: { total }</p>
    </div>
  );
}

/**
 * condition rendering
 */

const DemoAppJHistory = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    );
  } else {
    return (
      <div>
        button press history: { allClicks.join(' ') }
      </div>
    );
  }
};

const DemoAppJButton = ({ handleClick, text}) => (
  <button onClick={ handleClick }>
    { text }
  </button>
)

const DemoAppJ = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left+1);
  };
  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right+1);
  };

  return (
    <div>
      { left }
      <DemoAppJButton handleClick={handleLeftClick} text='Left' />
      <DemoAppJButton handleClick={handleRightClick} text='Right' />
      { right }
      <DemoAppJHistory allClicks={ allClicks } />
    </div>
  )
}


/**
 * useState function (as well as useEffect function) must not be called from inside a loop, a conditional expression or any
 * place that is not a function defining a component
 * This ensures that the hooks are always called in the same order
 */

const DemoAppK = () => {
  // these are ok
  const [age, setAge] = useSate(0);
  const [name, setName] = useState('Juha Taurianien');

  if (age > 10 ){
    //this does not work
    const [foobar, setFoobar] = useState(null);
  };
  for (let i=0; i< age; i++ ){
    //this is also bad
    const [rightway, setRightWay] = useState(false);
  };
  const notGood = () => {
    // this is also wrong, because this function doesn't define a component
    const [x, setX] = useState(-1000)
  };

}

/**
 * revisiting event handling
 */

const DemoAppL = () => {
  const [value, setValue] = useState(10);

  const handleClick = () => {
    console.log('clicked the button');
    setValue(0);
  };

  return (
    <div>
      { value }
      <button onClick={ handleClick }>reset to zero</button>
    </div>
  );
};

/**
 * function that returns a function
 */

const DemoAppM = () => {
  const [value, setValue] = useState(10);

  const hello = (who) => () => {
    console.log('hello', who);
  };

  const setToValue = (newValue) => () => {
    console.log('value now', newValue);
    setValue(newValue);
  };

  return (
    <div>
      { value }
      <button onClick={ setToValue(1000) }>thousand</button>
      <button onClick={ setToValue(0) }>reset</button>
      <button onClick={ setToValue(value+1) }>increment</button>
      <div>
        <button onClick={ hello('world') }>button</button>
        <button onClick={ hello('from') }>button</button>
        <button onClick={ hello('react function') }>button</button>
      </div>
    </div>
  );
  /**
   * in this case we have set to event handler to a function call, that returns the handler function.
   * this is ok, because the return value of hello is another function, and we need to call hello to 
   * return the function called handler
   * essentially, this transforms
   * <button onClick={ hello() }>button</button>
   * into
   * <button onClick={ () => console.log('hello world) }>button</button>
   * since both the arrow and the output of hello() are references to another function
   */
  /**
   * this can be throught of a factory pattern that produces custom event handler for greeting users.
   */
};

/**passing event handlers to child components  */


export default App4;

