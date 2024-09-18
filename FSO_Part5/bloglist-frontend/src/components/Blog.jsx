import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogLikes, handleBlogDeletion, user }) => {
  const [isBlogVisible, setIsBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogVisibility = () => {
    setIsBlogVisible(!isBlogVisible)
  }

  const showWhenVisible = { display: isBlogVisible ? '': 'none' }
  const showDeleteButton = { display: (blog.user.id === user.id) ? '': 'none' }

  return (
    <div style={blogStyle} className='blog'>
      <span>{blog.title}, author: {blog.author}</span>
      <button onClick={handleBlogVisibility}>{isBlogVisible ? 'hide': 'view'}</button>
      <div style={showWhenVisible} className={isBlogVisible ? 'visible': 'hidden'}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={() => handleBlogLikes(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showDeleteButton}>
          <button onClick={() => handleBlogDeletion(blog)}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogLikes: PropTypes.func.isRequired,
  handleBlogDeletion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const NewBlogForm = ( { createBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()
    createBlog({
      'title': title,
      'author': author,
      'url':url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url
          <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">Submit New Blog</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export { Blog, NewBlogForm }