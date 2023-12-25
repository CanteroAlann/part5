export default function CreateBlog({ handleCreateBlog, title, author, url, setTitle, setAuthor, setUrl }) {
    return (
        <div>
            <h2>Create new</h2>
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
