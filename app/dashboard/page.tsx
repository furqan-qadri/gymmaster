import { auth, currentUser } from "@clerk/nextjs/server";
export default async function DashboardPage() {

    const {userId} = auth();
    console.log(`this is the user id :`+ userId)



    if (!userId){
        return <div>You are not logged in</div>
    }

    const user = await currentUser();
    console.log(user?.emailAddresses)
    //show the profile page here
  return (
    <div>This is the Dashboard page</div>
  )
}