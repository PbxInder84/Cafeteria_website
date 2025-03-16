import React from 'react'
import { Alert } from 'react-bootstrap'
import styled from 'styled-components'

const StyledAlert = styled(Alert)`
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const Message = ({ variant = 'info', children }) => {
  return <StyledAlert variant={variant}>{children}</StyledAlert>
}

export default Message
