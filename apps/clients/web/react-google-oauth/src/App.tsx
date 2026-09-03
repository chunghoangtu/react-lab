import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  return (
    <div
      className='text-shadow-fuchsia-600 bg-emerald-700 w-full min-h-screen p-30 flex flex-col
        items-center gap-9'
    >
      <h2>Demo Google Login</h2>
      {username ? (
        <>
          <h2>Welcome, {username}</h2>
          <button
            onClick={() => {
              googleLogout();
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <GoogleLogin
          auto_select={true}
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            console.log(jwtDecode(credentialResponse?.credential as string));
            setUsername(jwtDecode<{ name: string }>(credentialResponse?.credential as string).name);
          }}
          onError={() => console.error("Login error!")}
        />
      )}
    </div>
  );
}
