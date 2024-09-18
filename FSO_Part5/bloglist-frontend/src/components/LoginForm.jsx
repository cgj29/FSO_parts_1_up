import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h1>log into application </h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" id="Username-input" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" id="Password-input" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm