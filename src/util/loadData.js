import {jwtDecode} from "jwt-decode";

const serverUrl="http://localhost:7777";
const LOGIN_URL=`${serverUrl}/user/jwt/login.do`;
const OAUTH_URL=`${serverUrl}/user/oauth/login.do`;
const CHECK_LOGIN_URL=`${serverUrl}/user/jwt/check.do`;
const ADMIN_USERS_URL=`${serverUrl}/admin/user/list.do`;
export default async function loadGoogleLogin(credentialResponse){
    //credentialResponse 서명된 로그인 유저 (jwt)
    const googleUser=jwtDecode(credentialResponse.credential);
    googleUser["oauth"]="GOOGLE";
    const response=await fetch(OAUTH_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(googleUser)
    })
    console.log(response.status)
    const {jwt,user}=await response.json();
    console.log(jwt,user);
    return response;
}




//CHECK_LOGIN_URL : 로그인되었는지 확인 => 만약 로그인되어 있다면 jwt 새로발급(만료시간을 업데이트)
export async function fetchAuth(url,option={}){
//모든 요청에 로그인 정보인 jwt를 해더에 포함하는 커스텀 fetch
    const jwt=localStorage.getItem("jwt");
    const response=await fetch(url,{
        ...option,
        headers : {
            "Authorization":"Bearer "+jwt,
            ...(option.headers && option.headers)
        },
    });
    if(!response.ok){throw new Error(response.status+"");}
    return response;
}


export async function loadAdminUserList(){
    const jwtToken=localStorage.getItem("jwt");

    if(jwtToken==null){throw new Error(403+"");}

    const resp=await fetchAuth(ADMIN_USERS_URL);
    return await resp.json(); //{[user],[user]...}
}



export async function loadCheckLogin(){
    const jwtToken=localStorage.getItem("jwt");
    if(!jwtToken){
        //throw new Error("jwtToken is null");
        return null;
    }
    const response=await fetchAuth(CHECK_LOGIN_URL);

    if(!response.ok){//jwt가 만료됨
        localStorage.removeItem("jwt");
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