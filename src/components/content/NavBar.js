import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import CreateCourseModal from '../CreateContent/CreateCourseModal'
import SearchBar from './SearchBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

function NavBar({ mainToggle }) {
  return (
    <Navbar
      bg="light"
      className="navbar shadow p-3 mb-5 bg-white rounded"
      width="100%"
    >
      <img
        width="100"
        height="100"
        src="https://play-lh.googleusercontent.com/goORQ9hreUwcJmbJsf8ivT6qknvrjyxTWmk1QZoOVxoRvmCjeSzXxH8omiJ6DXz5YMU=s1200"
      ></img>
      <SearchBar />
      <Nav className="ml-auto" navbar>
        <Nav.Link href="#">
          <CreateCourseModal
            buttonText={'Course +'}
            width={'125px'}
            height={'35px'}
            mainToggle={mainToggle}
          />
        </Nav.Link>
        <Nav.Link href="#">
          <img
            width="25"
            height="25"
            src="https://static.vecteezy.com/system/resources/previews/001/505/138/original/notification-bell-icon-free-vector.jpg"
          ></img>
        </Nav.Link>
        <div className="dropdown">
          <a href="#" id="imageDropdown" data-toggle="dropdown">
            <img
              style={{ borderRadius: '50%' }}
              src="https://picsum.photos/50"
            />
          </a>
          <ul
            className="dropdown-menu"
            role="menu"
            aria-labelledby="imageDropdown"
            style={{ width: '60px' }}
          >
            <li role="presentation">
              <a role="menuitem" href="#">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </Nav>
    </Navbar>
  )
}

export default NavBar
