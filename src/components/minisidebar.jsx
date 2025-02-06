import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import homeIcon from '../assets/home_outline.png';
import heart from '../assets/heart.png';
import search from '../assets/search.png';
import buggerbar from '../assets/buggerbar.png';

function MiniSidebar(props) {
  const {
    isMainOpen,
    setIsMainOpen,
    isLikeOpen,
    setIsLikeOpen,
    isSearchOpen,
    setIsSearchOpen,
    isMiniOpen,
    setIsMiniOpen,
  } = props;

  console.log('📌 MiniSidebar props:', {
    isMainOpen,
    setIsMainOpen,
    isLikeOpen,
    setIsLikeOpen,
    isSearchOpen,
    setIsSearchOpen,
    isMiniOpen,
    setIsMiniOpen,
  });

  console.log(isMiniOpen);
  const handleHomeClick = () => {
    console.log('🏠 Home 버튼 클릭됨!');
    setIsLikeOpen(false);
    setIsMainOpen(true);
    setIsMiniOpen(false);
    setIsSearchOpen(false);
  };

  const handleLikeClick = () => {
    if (isLikeOpen) {
      setIsLikeOpen(false);
      setIsMainOpen(true);
      setIsMiniOpen(false);
      setIsSearchOpen(false);
    } else {
      setIsLikeOpen(true);
      setIsMainOpen(false);
      setIsMiniOpen(true);
      setIsSearchOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (isSearchOpen) {
      setIsLikeOpen(false);
      setIsMainOpen(true);
      setIsMiniOpen(false);
      setIsSearchOpen(false);
    } else {
      setIsLikeOpen(false);
      setIsMainOpen(false);
      setIsMiniOpen(true);
      setIsSearchOpen(true);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar
        className=''
        bg='white'
        variant='dark'
        expand='lg'
        fixed='top'
        style={{
          width: '70px',
          height: '100vh',
          borderRight: '1px solid lightgray',
        }}>
        <Navbar.Toggle
          aria-controls='sidebar-nav'
          onClick={() => setOpen(!open)}
        />
        <Navbar.Collapse id='sidebar-nav'>
          <Nav className='flex-column'>
            <NavItem>
              <div className='nav-menu-like' onClick={handleHomeClick}>
                <img src={homeIcon} style={{ width: 30, height: 30 }} />
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu-like' onClick={handleSearchClick}>
                <img src={search} style={{ width: 30, height: 30 }} />
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu-like' onClick={handleLikeClick}>
                <img src={heart} style={{ width: 30, height: 30 }} />
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu-like'>
                <img src={buggerbar} style={{ width: 30, height: 30 }} />
              </div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export { MiniSidebar };
