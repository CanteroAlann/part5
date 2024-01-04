import React, { useState } from 'react'
import Notification from './Notification'


export default function CreateBlog({ sortBlogs, blogs, blogService }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [message, setMessage] = useState(null)

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
        }
        try {
            const blog = await blogService.create(blogObject)
            sortBlogs(blogs.concat(blog))
            setMessage(`a new blog ${blog.title} by ${blog.author} added`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            setMessage('Wrong credentials')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }



    return (
        <div>
            <h2>Create new</h2>
            <Notification message={message} />
            <form onSubmit={handleCreateBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <br />
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <br />
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <br />
                    <button type="submit">create</button>

                </div>
            </form>

        </div>
    )
}
