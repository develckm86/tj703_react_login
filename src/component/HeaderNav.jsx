import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from "react-router";
import {useContext} from "react";
import {UseLoinUserContext} from "../provider/LoginUserProvider.jsx";

export default function HeaderNav() {
    const  [loginUser, setLoginUser ]= useContext(UseLoinUserContext);
    const navigate=useNavigate();
    function logoutHandler(){
        localStorage.removeItem("jwt");
        setLoginUser(()=>null);
        alert("다시 찾아주세요~");
        navigate("/");
    }
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
                            {
                                loginUser ?
                                <>
                                    <Nav.Link as={Link} to="/user/detail">
                                        {loginUser.name}({loginUser.id})
                                    </Nav.Link>
                                    <Nav.Link  onClick={logoutHandler}>로그아웃</Nav.Link>
                                </> :
                                <>
                                    <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                                    <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}