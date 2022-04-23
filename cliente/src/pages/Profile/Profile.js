import React from 'react';

import "bootstrap/dist/css/bootstrap.css";

import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div className="mt-4 p-5 bg-primary text-white rounded">
      <img src={user.picture} alt={user.name}></img>
      <h1>{user.name} {user.lastName}</h1>
      <p>{user.email}</p>
    </div>
    
  );
}