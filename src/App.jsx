import HeaderNav from "./component/HeaderNav.jsx";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Link, Route, Routes} from "react-router";
import Home from "./page/Home.jsx";
import BoardList from "./page/board/BoardList.jsx";
import AdminUserList from "./page/admin/user/AdminUserList.jsx";
import Login from "./page/Login.jsx";
import Signup from "./page/Signup.jsx";
import {useContext, useEffect} from "react";
import {loadCheckLogin} from "./util/loadData.js";
import {useMutation} from "@tanstack/react-query";
import {UseLoinUserContext} from "./provider/LoginUserProvider.jsx";

function App() {
    const [,setLoginUser] = useContext(UseLoinUserContext)
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

                    <Route path="/board">
                        <Route path="list" element={<BoardList/>}/>
                    </Route>
                    <Route path="/admin">
                        <Route path="user">
                            <Route path="list" element={<AdminUserList/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
