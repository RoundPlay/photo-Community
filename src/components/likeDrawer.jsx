import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import homeIcon from "../assets/home_outline.png"
import heart from "../assets/heart.png";
import search from "../assets/search.png";
import buggerbar from "../assets/buggerbar.png";

function LikeDrawer() {
  const [open, setOpen] = useState(false);
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar className="sidebar-drawer" bg="white" variant="dark" expand="lg" fixed="top" style={{ width: '380px', height: '100vh', borderRight:'1px solid lightgray'}}>
        <h3 style={{ position: "absolute", top: "25px", left: "18px" }}>알림</h3>

    </Navbar>
  </div>
  );
}


export {LikeDrawer};