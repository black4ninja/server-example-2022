import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function LoginButton () {
  const { loginWithRedirect } = useAuth0();
  return (
      <button type="button" id="qsLoginBtn" color="primary" className="btn-light" onClick={() => loginWithRedirect({ prompt: 'login' })}>Log in</button>
  );
};

function LogoutButton () {
  const { logout } = useAuth0();
  return (
    <button type="button" id="qsLoginBtn" color="primary" className="btn-light" onClick={() => logout({ returnTo: "/" })}>Log out</button>
  );
};

export default function AuthenticationExists() {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
}