import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from './Blog'
import { expect } from 'vitest'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'test title; component testing is done with react-testing-library',
    author: 'test author 513',
    url: 'https://testingurl.541',
    likes: 8081,
    user: { 'id': -1 }
  }
  const mockLikeHandler = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        handleBlogLikes={mockLikeHandler}
        handleBlogDeletion={vi.fn()}
        user={{
          'id': -1
        }}
      />).container
  })

  test('Blog component renders blogs title and author', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'test title; component testing is done with react-testing-library'
    )
    expect(div).toHaveTextContent(
      'test author 513'
    )
  })

  test('Blog component, by default, does not render url and likes', () => {
    const div = container.querySelector('.hidden')
    expect(div).toHaveTextContent(
      'https://testingurl.541'
    )
    expect(div).toHaveTextContent(
      8081
    )
  })

  test('When button is clicked blog renders url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.visible')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('https://testingurl.541')
    expect(div).toHaveTextContent(8081)
  })

  test('Blog component permits clicking the like button twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
