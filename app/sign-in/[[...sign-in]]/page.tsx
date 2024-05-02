import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="flex items-center justify-center flex-col gap-10"
      style={{
        backgroundImage: "url('./gym_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.9",
        // width: "90vw",
      }}
    >
      <div className=" bg-black rounded-xl ">
        <h1 className="text-4xl font-bold mt-20 text-white">
          Login to GymMaster
        </h1>
      </div>

      <SignIn path="/sign-in" />
    </div>
  );
}
