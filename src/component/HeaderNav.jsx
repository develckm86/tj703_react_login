import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router";

export default function HeaderNav() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">HOME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/*Nav.Link 베이스가 a태그다*/}
                            <Nav.Link as={Link} to="/board/list">게시글</Nav.Link>
                            <NavDropdown title="관리자" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/admin/user/list">유저 리스트</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                            <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}