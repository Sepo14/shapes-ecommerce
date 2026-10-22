
import CreateUserForm from "@/components/create-user-form";
import UserList from "@/components/user-list";
import prisma from "@/lib/prisma";

export default async function AdminPage() {

    const usersData = await prisma.user.findMany({include:{orders:{include:{products:true}}}})

    return(
        <div className="p-5 flex flex-col h-full">
        <CreateUserForm/>
        <UserList users={usersData}/>
        </div>
    )
}