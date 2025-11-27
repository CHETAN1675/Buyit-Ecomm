import { useEffect } from "react";
import { signupRequest } from "../api/authOperations";

export default function Home() {
  useEffect(() => {
    signupRequest("test123@example.com", "12345678").then((res) => {
      console.log("Signup response:", res);
    });
  }, []);

  return <h2>Home Page</h2>;
}
