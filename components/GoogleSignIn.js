/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from "react";
import { useRouter } from "next/router";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/clientApp";

const GoogleSignIn = () => {
  const Router = useRouter();

  const loginHandler = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    // additional scopes can be added as per requirement

    try {
      await signInWithPopup(auth, provider);
      Router.push("/");
    } catch (error) {
      console.log("error");
      alert(error);
    }
  }, [Router]);
  return (
    <button className="btn btn-labeled btn-primary" onClick={loginHandler}>
      <img
        className="btn-label"
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
        alt="google"
        width="30px"
        height="30px"
      />
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
