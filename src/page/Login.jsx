import {Button, FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {loadLogin} from "./util/loadData.js";

export default function Login() {
    const [user, setUser] = useState({
        id: '',
        pw: ''
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
        (async ()=>{
            const loginUser=await loadLogin(user)
        })();
    }

    return (
        <div className="text-center">
            <h1>Spring Security + jwt(LocalStorage) Login</h1>
            <hr/>
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
            </form>
        </div>);
}