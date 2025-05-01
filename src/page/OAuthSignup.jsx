import {useLocation, useNavigate} from "react-router";
import {Button, FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useContext, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loadOAuthSignup} from "../util/loadData.js";
import {UseLoinUserContext} from "../provider/LoginUserProvider.jsx";

export default function OAuthSignup() {
    const location=useLocation();
    const {error,user}=location.state;
    const [ ,setLoginUser]=useContext(UseLoinUserContext);
    const navigate=useNavigate();
    const [signupUser,setSignupUser]=useState({
        ...(user && user),
        id : user.email
    });
    const signupMutate=useMutation({
        mutationFn :loadOAuthSignup,
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
        signupMutate.mutate(signupUser);
    }
    return (
        <div className="text-center">
            {error && <p>{error}</p>}
            {signupMutate.isError && <p>{signupMutate.error.message}</p>}
            <h1 className="my-5">회원가입</h1>
            <form style={{width:"400px"}} className="mx-auto" onSubmit={signupSubmitHandler}>
                <FloatingLabel label="email" className="mb-3">
                    <Form.Control value={signupUser.id} name="id" readOnly={true}/>
                </FloatingLabel>
                <FloatingLabel label="소셜" className="mb-3">
                    <Form.Control value={signupUser.oauth} name="oauth" readOnly={true}/>
                </FloatingLabel>
                <FloatingLabel label="프로필" className="mb-3">
                    <Form.Control value={signupUser.picture} name="picture" readOnly={true}/>
                </FloatingLabel>
                <FloatingLabel label="name" className="mb-3">
                    <Form.Control value={signupUser.name} name="name" onChange={inputHandler}/>
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