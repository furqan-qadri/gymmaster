import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col gap-10">

        <h1 className="text-4xl font-bold mt-20">
            Welcome to GymMaster. Please sign up!
        </h1>

<SignUp path="/sign-up" />

    </div>
    
    


);
}