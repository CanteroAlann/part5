import { useState } from 'react'


const Blog = ({ blog, user, handleLike, handleDelete }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'view'}
      </button>
      <button onClick={handleDelete}>delete</button>
      {visible &&
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{`posted by user : ${user.username}`}</p>
        </div>
      }
    </div>
  )
}

export default Blog