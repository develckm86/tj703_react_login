const serverUrl="http://localhost:7777";
const LOGIN_URL=`${serverUrl}/user/jwt/login.do`;
const CHECK_LOGIN_URL=`${serverUrl}/user/jwt/check.do`;
//CHECK_LOGIN_URL : 로그인되었는지 확인 => 만약 로그인되어 있다면 jwt 새로발급(만료시간을 업데이트)

export async function loadCheckLogin(){
    const jwtToken=localStorage.getItem("jwt");
    if(!jwtToken){
        //throw new Error("jwtToken is null");
        return null;
    }

    const response=await fetch(CHECK_LOGIN_URL,{
        headers : {
            "Authorization":"Bearer "+jwtToken
        }
    });
    if(!response.ok){
        //jwt가 만료됨
        localStorage.removeItem("jwt");
        throw new Error(response.status+"");
    }
    const {jwt,user} = await response.json();
    console.log(jwt,user);
    localStorage.setItem("jwt",jwt);
    return user;
}


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