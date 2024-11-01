import React, { useState } from "react";

import {
  Page,
  AlignOutside,
  ContentBox,
  Text,
  AlignContent,
  UserInput,
  LoginButton,
  Title,
  LinkText,
  GoogleLogin,
  Logos,
  AlignBottom,
  ErrorMessage,
} from "../styles/loginStyles";

import { useAuth } from "../components/Authentication";

const Login = () => {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { logIn, googleLogin, checkUser } = useAuth({ setErrorMes: setError });

  const loginUser = (e: React.FormEvent<HTMLButtonElement>) => {
    logIn({ email: info.email, password: info.password });
    checkUser();
  };

  const googleUser = (e: React.FormEvent<HTMLButtonElement>) => {
    googleLogin();
    setError("login with google failed");
  };

  return (
    <Page>
      <AlignOutside>
        <ContentBox>
          <Title>Log In</Title>
          <AlignContent>
            <UserInput
              type="text"
              placeholder="Email"
              value={info.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInfo({ ...info, email: e.target.value });
              }}
            />
            <UserInput
              type="password"
              placeholder="Password"
              value={info.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInfo({ ...info, password: e.target.value });
              }}
            />
          </AlignContent>
          <AlignBottom>
            <ErrorMessage>{error}</ErrorMessage>
            <LoginButton onClick={loginUser}>Login</LoginButton>
            <Text>or</Text>
            <GoogleLogin onClick={googleUser}>
              <Logos src={"/images/google-logo.png"} alt="" />
            </GoogleLogin>
            <LinkText to="/signup">Register Here</LinkText>
          </AlignBottom>
        </ContentBox>
      </AlignOutside>
    </Page>
  );
};

export default Login;
