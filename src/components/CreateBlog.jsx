import React, { useState } from 'react'


export default function CreateBlog({ handleCreateBlog }) {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreateBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        id="title"
                        placeholder='write a title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <br />
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        id="author"
                        placeholder='write an author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <br />
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        id="url"
                        placeholder='write an url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                    <br />
                    <button type="submit" id="create-button">create</button>

                </div>
            </form>

        </div>
    )
}
