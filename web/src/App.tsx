import { authClient } from "./lib/auth-client"; //import the auth client
import { useState } from "react";
import { SignUp } from "./components/Sign-up";
import { Login } from "./components/login";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const {
    data: session,
    isPending, //loading state
    error, //error object
  } = authClient.useSession();

  const signUpf = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: undefined,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          console.log(ctx.data);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );

    console.log(data, error);
  };

  async function signIn() {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          //redirect to dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  }

  async function handleouth() {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "http://localhost:5173",
      },
      {}
    );
  }

  return (
    <>
      <div>{session ? session.user.name : "none"}</div>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </>
  );
}
