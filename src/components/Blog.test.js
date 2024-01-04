/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author',
        url: 'www.testurl.com',
        likes: 0,
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
        'Test Author'
    )
    expect(div).not.toHaveTextContent(
        'www.testurl.com'
    )
    expect(div).not.toHaveTextContent(
        '0'
    )
})

test('clicking the button view renders url and likes', async () => {
    const blog = {
        url: 'www.testurl.com',
        likes: 0,
    }
    const blogUser = {
        username: 'testuser',
        name: 'Test User',
    }
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog} user={blogUser} />)
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
        'www.testurl.com'
    )
    expect(div).toHaveTextContent(
        '0'
    )
})

test('clicking the button like twice calls event handler twice', async () => {
    const blog = {
        url: 'www.testurl.com',
        likes: 0,
    }
    const blogUser = {
        username: 'testuser',
        name: 'Test User',
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog} user={blogUser} handleLike={mockHandler} />)
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    const div = container.querySelector('.blog')
    expect(mockHandler.mock.calls).toHaveLength(2)
}
)


