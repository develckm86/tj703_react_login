import {useQuery} from "@tanstack/react-query";
import {loadAdminUserList} from "../../../util/loadData.js";

export default function AdminUserList(){
    const{error,isLoading,data:users}=useQuery({
        queryFn:loadAdminUserList,
        queryKey:["adminUserList"],
        staleTime:1000*60*5,
        cacheTime:1000*60*10,
        retry:1
    })
    return (<>
        <h1>관리자만 접근 가능한 user list</h1>
        <p>권한이 ADMIN,MANAGER 인 유저만 접근 가능</p>
        {error && <p className="text-danger">{error.message}</p>}
        {isLoading && <p className="text-primary">로딩중</p>}
        {users &&
            <ul>
                {users.map(user=>
                    <li key={user.id}>
                        {user.id} /
                        {user.name} /
                        {user.role}
                    </li>
                )}
            </ul>
        }



    </>);
}