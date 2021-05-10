import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import SubMenu from './SubMenu'
import { Nav, Button } from 'react-bootstrap'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class SideBar extends React.Component {
  render() {
    return (
      <div className={classNames('sidebar', { 'is-open': this.props.isOpen })}>
        <div className="sidebar-header">
          <Button
            variant="link"
            onClick={this.props.toggle}
            style={{ color: '#fff' }}
            className="mt-4"
          >
            <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
          </Button>
          <img
            src="https://play-lh.googleusercontent.com/goORQ9hreUwcJmbJsf8ivT6qknvrjyxTWmk1QZoOVxoRvmCjeSzXxH8omiJ6DXz5YMU=s1200"
            width="100"
            height="125"
            className="center"
          ></img>
        </div>

        <Nav className="flex-column pt-2">
          <h6 className="ml-3">Automated Attendance Taker</h6>

          <Nav.Item className="active">
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Nav.Link>
          </Nav.Item>

          <SubMenu
            title="Pages"
            icon={faCopy}
            items={['Link', 'Link2', 'Active']}
          />

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              About
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faImage} className="mr-2" />
              Portfolio
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faQuestion} className="mr-2" />
              FAQ
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/">
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              Contact
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    )
  }
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default SideBar
