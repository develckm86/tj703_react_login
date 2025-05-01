import HeaderNav from "./component/HeaderNav.jsx";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Link, Navigate, Outlet, Route, Routes} from "react-router";
import Home from "./page/Home.jsx";
import BoardList from "./page/board/BoardList.jsx";
import AdminUserList from "./page/admin/user/AdminUserList.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import {useContext, useEffect} from "react";
import {loadCheckLogin} from "./util/loadData.js";
import {useMutation} from "@tanstack/react-query";
import {UseLoinUserContext} from "./provider/LoginUserProvider.jsx";
import OAuthSignup from "./page/OAuthSignup.jsx";

function App() {
    const [,setLoginUser] = useContext(UseLoinUserContext)
    //useMutation => userQuery 캐싱된 user를 가져옴
    const loginCheckMutate=useMutation({
        mutationFn: loadCheckLogin,
        onSuccess:(user)=>{
            setLoginUser(()=>user);
        },
    })

    useEffect(() => {
        loginCheckMutate.mutate();
    }, []); //App.Mount
    return (
        <BrowserRouter>
            <HeaderNav/>
            <Container className="mt-5">
                {/*url 로 호출하는 컴포넌트를 page component라 한다.*/}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/oauth/signup" element={<OAuthSignup/>}/>

                    <Route path="/board" element={<LoginCheckFilter/>}>
                        <Route path="list" element={<BoardList/>}/>
                    </Route>
                    <Route path="/admin" element={<AdminCheckFilter/>}>
                        <Route path="user">
                            <Route path="list" element={<AdminUserList/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

function LoginCheckFilter({children}){
    const [loginUser,]=useContext(UseLoinUserContext);
    if(loginUser){
        if(children){
            return children;
        }else{
            return <Outlet/>;
        }
    }else{
        alert("로그인 하세요!")
        return <Navigate to="/login"/>
    }
}
function AdminCheckFilter({children}){
    const [loginUser,]=useContext(UseLoinUserContext);
    if(loginUser && loginUser.role==="ADMIN"){
        if(children){
            return children;
        }else{
            return <Outlet/>;
        }
    }else{
        alert("해당 페이지에 권한이 없습니다.")
        return <Navigate to="/login"/>
    }
}



export default App
