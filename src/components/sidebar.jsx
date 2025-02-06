import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem } from 'react-bootstrap';
import homeIcon from "../assets/home_outline.png"
import heart from "../assets/heart.png";
import search from "../assets/search.png";
import buggerbar from "../assets/buggerbar.png";
import { LikeDrawer } from './likeDrawer';
import { MiniSidebar } from './minisidebar';
import { MainSidebar } from './mainsidebar';
import { SearchDrawer } from './searchDrawer';

function  Sidebar() {

    const [isLikeOpen, setIsLikeOpen] = useState(false);
    const [isMiniOpen, setIsMiniOpen] = useState(false);
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(true);
    console.log(isMainOpen);
    return (
        <>
            {isMainOpen ? (
            <MainSidebar
                isMainOpen={isMainOpen}
                setIsMainOpen={setIsMainOpen}
                isLikeOpen={isLikeOpen}
                setIsLikeOpen={setIsLikeOpen}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                isMiniOpen={isMiniOpen}
                setIsMiniOpen={setIsMiniOpen}
            />
            ) : null}
            
            {isMiniOpen?(
                <MiniSidebar
                    isMainOpen={isMainOpen}
                    setIsMainOpen={setIsMainOpen}
                    isLikeOpen={isLikeOpen}
                    setIsLikeOpen={setIsLikeOpen}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    isMiniOpen={isMiniOpen}
                    setIsMiniOpen={setIsMiniOpen}
                />
            ):null}

            {isLikeOpen?(
                <LikeDrawer></LikeDrawer>
            ) : null}

            {isSearchOpen?(
                <SearchDrawer></SearchDrawer>
            ) : null}

        </>
    );
}


export {Sidebar};