import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title', () => {
    const user = {
        username: 'sohvi'
    }
    const blog = {
    title: 'this is the title',
    user: user
    }

    render(<Blog blog={blog} user={user.username}/>)

    const title = screen.getByText('this is the title')
    expect(title).toBeDefined()
})

test('clicking the view button reveals all information', async () => {
    const userUser = {
        username: 'sohvi'
    }
    const blog = {
    title: 'this is the title',
    author: 'this is the author',
    url: 'this is the url',
    likes: 15,
    user: userUser
  }
  
    render(
      <Blog blog={blog} user={userUser.username} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText('this is the title')
    expect(title).toBeDefined()
    const author = screen.getByText('this is the author')
    expect(author).toBeDefined()
    const url = screen.getByText('this is the url')
    expect(url).toBeDefined()
    const likes = screen.getByText('likes 15')
    expect(likes).toBeDefined()
})

test('clicking the like button twice calls setlike two times', async () => {
    const userUser = {
        username: 'sohvi'
    }
    const blog = {
    title: 'this is the title',
    author: 'this is the author',
    url: 'this is the url',
    likes: 15,
    user: userUser
  }
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} setLike={mockHandler} user={userUser.username} />
    )
  
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
