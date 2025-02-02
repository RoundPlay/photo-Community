import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import homeIcon from "../assets/home_outline.png"
import heart from "../assets/heart.png";
import search from "../assets/search.png";
import buggerbar from "../assets/buggerbar.png";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar bg="white" variant="dark" expand="lg" fixed="top" style={{ width: '250px', height: '100vh', borderRight:'1px solid gray'}}>
      <Navbar.Toggle aria-controls="sidebar-nav" onClick={() => setOpen(!open)} />
      <Navbar.Collapse id="sidebar-nav">
        <Nav className="flex-column">
          <NavItem>
            <div className='nav-menu' >
                <img src={homeIcon} style={{ width: 30, height: 30 }} />
                <Button variant="link" className="text-black">홈</Button>
            </div>
          </NavItem>
          <NavItem>
            <div className='nav-menu' >
                <img src={search} style={{ width: 28, height: 28 }} />
                <Button variant="link" className="text-black">검색</Button>
            </div>
          </NavItem>
          <NavItem>
            <div className='nav-menu' >
            <img src={heart} style={{ width: 30, height: 30 }} />
                <Button variant="link" className="text-black">알림</Button>
            </div>
          </NavItem>
          <NavItem>
            <div className='nav-menu' >
            <img src={buggerbar} style={{ width: 30, height: 30 }} />
                <Button variant="link" className="text-black">더 보기</Button>
            </div>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
  );
}

export {Sidebar};