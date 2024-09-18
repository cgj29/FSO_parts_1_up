import { useState } from 'react'

const Toggleable = (props) => {
  const [visible, setVisibile] = useState(false)

  const hideWhenVisible = { display: visible ? 'none': '' }
  const showWhenVisible = { display: visible ? '': 'none' }
  /**
   * the above code (showWhenVisibile) will check if visible is true, if so
   * it will assign nothing to the visible key. If it is false it assign none
   * to the visible key (line above will do the the opposite)
   */
  const toggleVisibility = () => {
    setVisibile(!visible)
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggleable