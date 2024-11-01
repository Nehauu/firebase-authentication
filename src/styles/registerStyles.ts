import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  background-image: url("/images/cityscape.avif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  height: 100vh;
  width: 100vw;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 30px;
  align-self: center;
  margin-top: 1rem;
  background: none;
`;

export const AlignSignup = styled.div`
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

export const SignupBox = styled.div`
  background-color: white;
  width: 24rem;
  height: 28rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AlignBottom = styled.div`
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 180px;
`;

export const AlignContent = styled.div`
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 170px;
`;

export const SignupInput = styled.input`
  background-color: #fc8fa9;
  width: 88%;
  height: 50px;
  border-radius: 20px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  border: none;
  outline: none;
  text-indent: 1rem;
`;

export const ErrMsg = styled.p`
  background: none;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin-top: -6px;
  height: 24px;
  color: red;
`;

export const Text = styled.p`
  background: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
`;

export const GoogleButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

export const Logos = styled.img`
  background: none;
  width: 28px;
`;

export const ReturnButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: none;
  cursor: pointer;
`;

export const LinkStyled = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #4bbeff;
  text-decoration: none;
  background: none;
`;

export const Buttons = styled.button`
  background-color: pink;
  width: 88%;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 40px;
  border: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  outline: none;
`;

export const TopAlign = styled.div`
  background-color: white;
  width: 24rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const PasswordBox = styled.div`
  background-color: white;
  width: 24rem;
  height: 20rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AlignPw = styled.div`
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 80%;
`;
