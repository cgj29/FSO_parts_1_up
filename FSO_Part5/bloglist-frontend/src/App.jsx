import { useState, useEffect } from 'react'
import { Blog , NewBlogForm } from './components/Blog'
import LoginForm from './components/LoginForm'
import { Notification } from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({
        'message': 'Wrong Credentials',
        'status': 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log('Wrong Credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      await blogService.create({
        'title': blogObject.title,
        'author': blogObject.author,
        'url': blogObject.url,
      })
      setNotification({
        'message': `a new blog ${blogObject.title} by ${blogObject.author}`,
        'status': 'alert'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (error) {
      setNotification({
        'message': 'Failed To Post Blog',
        'status': 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      console.log('error in posting', error)
    }
  }

  const handleBlogLikes = async (likedId) => {
    const returnedData = await blogService.getSingle(likedId)
    await blogService.update(likedId, { ...returnedData, 'likes': returnedData.likes+1 })
    await blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const handleBlogDeletion = async (blogObject) => {
    //TODO implement validation
    console.log(blogObject.id)
    if (window.confirm(`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}?`)){
      await blogService.deleteSingle(blogObject.id)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }

  if (user === null){
    return (
      <div>
        <Notification notificationObject={notification}/>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notificationObject={notification}/>

      <div>
        <form onSubmit={handleLogout}>
          <span>{user.username} is logged in</span>
          <button type="submit">logout</button>
        </form>
      </div>
      <Toggleable buttonLabel='Create new blog'>
        <NewBlogForm createBlog={createBlog}/>
      </Toggleable>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleBlogLikes={handleBlogLikes}
            handleBlogDeletion={handleBlogDeletion}
            user={user}
          />
        )
      }
    </div>
  )
}

export default App