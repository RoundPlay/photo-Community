import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import homeIcon from '../assets/home_outline.png';
import heart from '../assets/heart.png';
import search from '../assets/search.png';
import buggerbar from '../assets/buggerbar.png';

function MainSidebar(props) {
  const isMainOpen = props.isMainOpen;
  const setIsMainOpen = props.setIsMainOpen;
  const isLikeOpen = props.isLikeOpen;
  const setIsLikeOpen = props.setIsLikeOpen;
  const isSearchOpen = props.isSearchOpen;
  const setIsSearchOpen = props.setIsSearchOpen;
  const setIsMiniOpen = props.setIsMiniOpen;

  const handleSearchClick = () => {
    // 검색 클릭 시 다른 드로어는 닫고, MiniSidebar와 SearchDrawer 열기
    setIsLikeOpen(false);
    setIsMainOpen(false);
    setIsMiniOpen(true);
    setIsSearchOpen(true);
  };
  const handleLikeClick = () => {
    setIsLikeOpen(true);
    setIsMainOpen(false);
    setIsMiniOpen(true);
    setIsSearchOpen(false);
  };

  const handleHomeClick = () => {
    setIsLikeOpen(false);
    setIsMainOpen(true);
    setIsMiniOpen(false);
    setIsSearchOpen(false);
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
          width: '250px',
          height: '100vh',
          borderRight: '1px solid lightgray',
        }}>
        <Navbar.Collapse id='sidebar-nav'>
          <Nav className='flex-column'>
            <NavItem>
              <div className='nav-menu'>
                <img src={homeIcon} style={{ width: 30, height: 30 }} />
                <Button
                  variant='link'
                  className='text-black'
                  onClick={handleHomeClick}>
                  홈
                </Button>
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu'>
                <img src={search} style={{ width: 28, height: 28 }} />
                <Button
                  variant='link'
                  className='text-black'
                  onClick={handleSearchClick}>
                  검색
                </Button>
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu'>
                <img src={heart} style={{ width: 30, height: 30 }} />
                <Button
                  variant='link'
                  className='text-black'
                  onClick={handleLikeClick}>
                  알림
                </Button>
              </div>
            </NavItem>
            <NavItem>
              <div className='nav-menu'>
                <img src={buggerbar} style={{ width: 30, height: 30 }} />
                <Button variant='link' className='text-black'>
                  더 보기
                </Button>
              </div>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export { MainSidebar };
