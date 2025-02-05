import React, { useState } from 'react';
import { Button, Collapse, Navbar, Nav, NavItem , Form} from 'react-bootstrap';


function SearchDrawer() {
    const [searchTerm, setSearchTerm] = useState('');

    // 검색어 입력값이 변경될 때마다 상태 업데이트
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    // 검색 버튼 클릭 시 처리
    const handleSearchClick = () => {
      console.log("Searching for:", searchTerm);
      // 여기서 실제 검색 처리 로직을 추가할 수 있습니다.
    };
  
    // 엔터 키로 검색 처리
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSearchClick(); // 엔터 키가 눌리면 검색 버튼 클릭 동작
      }
    };
  
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <Navbar className="sidebar-drawer" bg="white" variant="dark" expand="lg" fixed="top" style={{ width: '380px', height: '100vh', borderRight: '1px solid lightgray' }}>
          <h3 style={{ position: "absolute", top: "25px", left: "18px" }}>검색</h3>
  
          {/* 검색 박스 */}
          <Form style={{ position: "absolute", top: "80px", left: "18px", width: "90%" }}>
            <Form.Control 
              type="text" 
              placeholder="검색어를 입력하세요" 
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown} // 엔터 키 입력 감지
              style={{ marginBottom: '10px' }} 
            />
            <Button 
              variant="primary" 
              onClick={handleSearchClick}
              style={{ width: '100%' }}
            >
              검색
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
  
  export { SearchDrawer };