import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  function sortBlogs(blog) {
    const sortedBlog = [...blog].sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlog)
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    return blogs
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user === null) {
      return
    }
    blogService.setToken(user.token)
    fetchBlogs().then(fetchedBlogs => {
      sortBlogs(fetchedBlogs)
    })
  }, [user]
  )

  const handleLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    blogService.update(blog.id, updatedBlog)
    setBlogs(blogs => blogs.map(b => b.id === blog.id ? updatedBlog : b))

  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(blog.id)
      setBlogs(blogs => blogs.filter(b => b.id !== blog.id))
    }
  }




  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ?
        <>
          <h2>Log in to application</h2>
          <Notification message={message} />
          <Login
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword} />
        </>
        : <div>
          <p>{user.name} logged in</p>
          <button onClick={logOut}>logout</button>
          <Togglable buttonLabel='new blog'>
            <CreateBlog
              blogs={blogs}
              blogService={blogService}
              sortBlogs={sortBlogs}

            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleDelete={() => handleDelete(blog.id)}
              handleLike={() => handleLike(blog.id)}
            />
          )}
        </div>
      }

    </div>
  )
}

export default App