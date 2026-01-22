import { FIREBASE_API_KEY, FIREBASE_AUTH_BASE_URL } from "../api/firebaseConfig";

export async function signupRequest(email, password) {
  const response = await fetch(
    `${FIREBASE_AUTH_BASE_URL}/accounts:signUp?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  return response.json();
}

export async function loginRequest(email, password) {
  const response = await fetch(
    `${FIREBASE_AUTH_BASE_URL}/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  return response.json();
}

export async function resetPasswordRequest(email) {
  const response = await fetch(
    `${FIREBASE_AUTH_BASE_URL}/accounts:sendOobCode?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
      }),
    }
  );

  return response.json();
}
