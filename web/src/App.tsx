import { authClient } from "@/lib/auth-client"; // import the auth client
import { useState } from "react";
import { SignUp } from "./components/Sign-up";
import { Login } from "./components/login";

export default function Page() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  return (
    <>
      <div>Current user: {session ? session.user.name : "none"}</div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </>
  );
}
