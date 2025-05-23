import {useLocation, useNavigate} from "react-router";
import {Button, FloatingLabel, InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useContext, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loadOAuthSignup, loadSignup} from "../util/loadData.js";
import {UseLoinUserContext} from "../provider/LoginUserProvider.jsx";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function Signup() {
    const [ ,setLoginUser]=useContext(UseLoinUserContext);
    const navigate=useNavigate();
    const [signupUser,setSignupUser]=useState({
        id : "",
        name : "",
        pw : "",
        pwRe : "",
    });
    const signupMutate=useMutation({
        mutationFn :loadSignup,
        onSuccess : (user)=>{
            setLoginUser(()=>user);
            alert("회원가입 성공")
            navigate("/");
        }
    });

    function inputHandler(e){
        const {name,value} = e.target;
        setSignupUser((prevUser)=>({
            ...prevUser,
            [name] : value
        }))
    }

    function signupSubmitHandler(e){
        e.preventDefault();
        const signupForm=e.target;
        signupMutate.mutate(signupForm);
    }

    return (
        <div className="text-center">
            {signupMutate.isError && <p>{signupMutate.error.message}</p>}
            <h1 className="my-5">회원가입</h1>
            <form style={{width:"400px"}} className="mx-auto" onSubmit={signupSubmitHandler}>
                <FloatingLabel label="email" className="mb-3">
                    <Form.Control value={signupUser.id} name="id" onChange={inputHandler}/>
                </FloatingLabel>
                <InputGroup className="mb-3">
                    <InputGroupText>프로필 이미지</InputGroupText>
                    <Form.Control  type="file" name="pictureFile" multiple={true} />
                </InputGroup>
                <FloatingLabel label="name" className="mb-3">
                    <Form.Control value={signupUser.name} name="name" onChange={inputHandler}/>
                </FloatingLabel>
                <FloatingLabel label="비밀번호" className="mb-3">
                    <Form.Control value={signupUser.pw} name="pw" onChange={inputHandler}/>
                </FloatingLabel>
                <FloatingLabel label="비밀번호 확인" className="mb-3">
                    <Form.Control value={signupUser.pwRe} name="pwRe"onChange={inputHandler}/>
                </FloatingLabel>
                <p className="text-end">
                    <Button className="me-2" type="reset" variant="outline-warning">초기화</Button>
                    <Button type="submit">회원가입</Button>
                </p>
                <br/><br/><br/><br/><br/>
            </form>
        </div>
    )
}