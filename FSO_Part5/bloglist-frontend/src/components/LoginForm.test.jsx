import { render, screen, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<LoginForm />', () => {
  let container

  const handleLoginMock = vi.fn(e => e.preventDefault())
  const setUsername = vi.fn()
  const setPassword = vi.fn()

  beforeEach(() => {
    container = render(
      <LoginForm
        handleLogin={handleLoginMock}
        setUsername={setUsername}
        username='testuser'
        setPassword={setPassword}
        password='testpassword'

      />
    ).container
  })

  test('renders the login form and works properly', async() => {
    const user = userEvent.setup()
    const submitButton = screen.getByText('login')

    await user.click(submitButton)

    expect(handleLoginMock).toHaveBeenCalledTimes(1)

    const call = handleLoginMock.mock.calls[0][0]
    expect(call).toHaveProperty('type', 'submit')
    const formInEvent = call.target
    expect(formInEvent.elements.Username.value).toBe('testuser')
    expect(formInEvent.elements.Password.value).toBe('testpassword')

  })
})
