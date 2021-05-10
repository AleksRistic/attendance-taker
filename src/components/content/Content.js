import React from 'react'
import classNames from 'classnames'
import { Container } from 'react-bootstrap'
import NavBar from './NavBar'
import PropTypes from 'prop-types'

class Content extends React.Component {
  render() {
    return (
      <Container
        fluid
        className={classNames('content', { 'is-open': this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
      </Container>
    )
  }
}

Content.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default Content
