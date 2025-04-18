const serverUrl="http://localhost:7777";
const LOGIN_URL=`${serverUrl}/user/jwt/login.do`;

export async function loadLogin(loginUser){
    const response = await fetch(LOGIN_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(loginUser)
    });
    if(!response.ok){
        console.log(response.statusText)
        throw new Error(response.status+"");
    }
    const {jwt,user} = await response.json();
    console.log(jwt,user)
    if (jwt){
        localStorage.setItem("jwt",jwt); //로그인
    }
    return user;
}