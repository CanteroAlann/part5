/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<CreateBlog handleCreateBlog={createBlog} />)

    const title = screen.getByPlaceholderText('write a title')
    const author = screen.getByPlaceholderText('write an author')
    const url = screen.getByPlaceholderText('write an url')
    const sendButton = screen.getByText('create')

    await user.type(title, 'a title')
    await user.type(author, 'an author')
    await user.type(url, 'an url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0]).toBe('a title')
    expect(createBlog.mock.calls[0][1]).toBe('an author')
    expect(createBlog.mock.calls[0][2]).toBe('an url')
})