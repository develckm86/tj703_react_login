import {Button, FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useContext, useState} from "react";
import loadGoogleLogin, {loadLogin} from "../util/loadData.js";
import {UseLoinUserContext} from "../provider/LoginUserProvider.jsx";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

export default function Login() {
    const navigate=useNavigate();
    const [ ,setLoginUser]=useContext(UseLoinUserContext);
    const [user, setUser] = useState({
        id: '',
        pw: ''
    })
    const loginQuery=useQuery({
        queryFn: async ()=>{
            try {
                const loginUser=await loadLogin(user);
                setLoginUser(()=>loginUser);
                navigate("/")
                return loginUser;
            }catch (e) {
                console.log(e)
                //alert("아이디 비밀번호를 확인하세요!");
                throw new Error("아이디와 비밀번호를 확인하세요!");
            }
        },
        queryKey: ["loginUser",user.id],
        retry:1,
        staleTime: 1000*60*5,
        cacheTime: 1000*60*10,
        enabled: false, //Login 컴포넌트가 마운트 되어도 실행되지 마라
    })



    function inputHandler(e) {
        const {name,value} = e.target;
        setUser((prevUser)=>({
            ...prevUser,
            [name] : value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(user,"로그인 시도");
        loginQuery.refetch();
    }

    return (
        <div className="text-center">
            <h1>Spring Security + jwt(LocalStorage) Login</h1>
            <hr/>
            {loginQuery.error &&
                <p>{loginQuery.error.message}</p>
            }
            <form onSubmit={handleSubmit} style={{width: "400px"}} className="mx-auto">
                <FloatingLabel label="아이디를 입력하세요" className="mb-3">
                    <Form.Control  value={user.id} onChange={inputHandler}   name="id" placeholder="아이디" />
                </FloatingLabel>
                <FloatingLabel label="비밀번호를 입력하세요" className="mb-3">
                    <Form.Control value={user.pw} onChange={inputHandler} name="pw" placeholder="패스워드" />
                </FloatingLabel>
                {/*inline :text, button,image inline-block*/}
                <p className="text-end">
                    <Button variant="outline-success" type="submit">로그인</Button>
                </p>
                <p>
                    <GoogleLogin onSuccess={loadGoogleLogin}/>
                </p>
            </form>
        </div>);
}