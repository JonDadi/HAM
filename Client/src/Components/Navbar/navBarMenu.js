import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router';

class navBarMenu extends Component {
  constructor(props){
    super(props);
  }
  render() {
      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">HAM</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={1} title="Skjölin mín" id="basic-nav-dropdown">
                <MenuItem eventKey={1,1}> <Link to="/activityTable">Virknitafla/Vikuáætlunin mín </Link></MenuItem>
                <MenuItem eventKey={1,2}> <Link to="/thoughtsTemplate">Hugsanir sem standa í vegi framkvæmda </Link> </MenuItem>
                <MenuItem eventKey={1,3}> <Link to="/statistics">Tölfræði</Link></MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={2}><Link to="/logout"> Útskrá notanda:{localStorage.getItem("userName")} < /Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }
}
export default navBarMenu;
