import PropTypes from 'prop-types'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          id={'username-id'}
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          id={'password-id'}
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button id={'login-btn-id'} variant={'primary'} type="submit">
        login
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
