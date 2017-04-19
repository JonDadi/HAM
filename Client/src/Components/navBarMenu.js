import React, { Component } from 'react';
import './App.css';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';

class navBarMenu extends Component {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">HAM</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Skjölin mín" id="basic-nav-dropdown">
                <MenuItem eventKey={1,1} href="/activityTable"> Virknitafla </MenuItem>
                <MenuItem eventKey={1,2} href="/thoughtsTemplate"> Hugsanir sem standa í vegi framkvæmda </MenuItem>
                <MenuItem eventKey={1,3} href="/statistics"> Tölfræði </MenuItem>
                <MenuItem eventKey={1,4} href="/thoughtTable"> Hugsanaskrá </MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2} href="/about">Um síðuna</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }
}
export default navBarMenu;
