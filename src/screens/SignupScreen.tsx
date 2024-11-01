import React, { useState } from "react";
import { validator } from "../hooks/passValidation";
import {
  Page,
  AlignSignup,
  AlignContent,
  SignupBox,
  Buttons,
  SignupInput,
  Title,
  ErrMsg,
  Text,
  Logos,
  GoogleButton,
  ReturnButton,
  LinkStyled,
  PasswordBox,
  AlignPw,
  TopAlign,
} from "../styles/registerStyles";
import { useAuth } from "../components/Authentication";

const SignUp = () => {
  const [steps, setSteps] = useState(0);
  const [info, setInfo] = useState({
    username: "",
    email: "",
    confirmPass: "",
  });
  const [infoPass, setInfoPass] = useState("");
  const [error, setError] = useState("");
  const { signUp, googleSignup } = useAuth({ setErrorMes: setError });

  const handleSteps = () => {
    if (steps < 3) {
      setSteps(steps + 1);
    }
  };
  const handleBackSteps = () => {
    if (steps > 0) {
      setSteps(steps - 1);
    }
  };

  const registerUser = (e: React.FormEvent<HTMLButtonElement>) => {
    signUp({ email: info.email, password: infoPass, username: info.username });
  };

  const googleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
    googleSignup();
  };

  const testPass = (password: string) => {
    if (!validator({ password, type: "length" })) {
      setError("password should be more than 4 and not over 10");
      return;
    } else if (!validator({ password, type: "number" })) {
      setError("password should contain a number");
      return;
    } else if (!validator({ password, type: "special" })) {
      setError("password should contain a special character");
      return;
    } else setError("");
  };

  const inputContent = () => {
    if (steps === 0) {
      return (
        <Page>
          <AlignSignup>
            <SignupBox>
              <Title>Sign Up</Title>
              <AlignContent>
                <SignupInput
                  type="text"
                  placeholder="Username"
                  value={info.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();

                    setInfo({ ...info, username: e.target.value });
                  }}
                />
                <SignupInput
                  type="text"
                  placeholder="Email"
                  value={info.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setInfo({ ...info, email: e.target.value });
                  }}
                />
              </AlignContent>
              <AlignContent>
                <ErrMsg>{error}</ErrMsg>
                <Buttons
                  onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    console.log("Username:", info.username);
                    console.log("Email:", info.email);
                    handleSteps();
                  }}
                >
                  Next
                </Buttons>
                <Text>or</Text>
                <GoogleButton onClick={googleRegister}>
                  <Logos src={"/images/google-logo.png"} alt="" />
                </GoogleButton>
                <LinkStyled className="link" to={"/"}>
                  Already have an account?
                </LinkStyled>
              </AlignContent>
            </SignupBox>
          </AlignSignup>
        </Page>
      );
    } else if (steps === 1) {
      return (
        <Page>
          <AlignSignup>
            <PasswordBox>
              <TopAlign>
                <Title className="header">Sign Up</Title>
                <ReturnButton className="return" onClick={handleBackSteps}>
                  <Logos src={"/images/backicon.png"} alt="" />
                </ReturnButton>
              </TopAlign>

              <AlignPw>
                <SignupInput
                  className="signup-input"
                  type="password"
                  placeholder="Password"
                  value={infoPass}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    const data = e.target.value;
                    setInfoPass(data);
                    testPass(data);
                  }}
                />

                <SignupInput
                  className="signup-input"
                  type="password"
                  placeholder="Confirm Password"
                  value={info.confirmPass}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setInfo({ ...info, confirmPass: e.target.value });
                  }}
                />
                <ErrMsg className="err-msg">{error}</ErrMsg>

                <Buttons
                  className="button"
                  onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    if (infoPass !== info.confirmPass) {
                      setError("passwords do not match");
                      return;
                    } else {
                      registerUser(e);
                    }
                  }}
                >
                  Done
                </Buttons>
              </AlignPw>
            </PasswordBox>
          </AlignSignup>
        </Page>
      );
    }
  };

  return (
    <div className="outside">
      <div className="box">
        <div className="inside">{inputContent()}</div>
      </div>
    </div>
  );
};

export default SignUp;

// const SignUp = () => {
//   const [steps, setSteps] = useState(0);
//   const [info, setInfo] = useState({
//     username: "",
//     email: "",
//     confirmPass: "",
//   });
//   const [infoPass, setInfoPass] = useState("");
//   const [error, setError] = useState("");
//   const { signUp, googleSignup } = useAuth({ setErrorMes: setError });

//   const handleSteps = () => {
//     if (steps < 3) {
//       setSteps(steps + 1);
//     }
//   };

//   const handleBackSteps = () => {
//     if (steps > 0) {
//       setSteps(steps - 1);
//     }
//   };

//   const registerUser = (e: React.FormEvent<HTMLButtonElement>) => {
//     signUp({ email: info.email, password: infoPass, username: info.username });
//   };

//   const googleRegister = (e: React.FormEvent<HTMLButtonElement>) => {
//     googleSignup();
//   };

//   const testPass = (password: string) => {
//     if (!validator({ password, type: "length" })) {
//       setError("password should be more than 4 and not over 10");
//       return;
//     } else if (!validator({ password, type: "number" })) {
//       setError("password should contain a number");
//       return;
//     } else if (!validator({ password, type: "special" })) {
//       setError("password should contain a special character");
//       return;
//     } else setError("");
//   };

//   const inputContent = () => {
//     if (steps === 0) {
//       return (
//         <Page>
//           <AlignSignup>
//             <SignupBox>
//               <Title>Sign Up</Title>
//               <AlignContent>
//                 <SignupInput
//                   type="text"
//                   placeholder="Username"
//                   value={info.username}
//                   onChange={(e) => {
//                     setInfo({ ...info, username: e.target.value });
//                   }}
//                 />
//                 <SignupInput
//                   type="text"
//                   placeholder="Email"
//                   value={info.email}
//                   onChange={(e) => {
//                     setInfo({ ...info, email: e.target.value });
//                   }}
//                 />
//               </AlignContent>
//               <AlignContent>
//                 <ErrMsg>{error}</ErrMsg>
//                 <Buttons
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleSteps();
//                   }}
//                 >
//                   Next
//                 </Buttons>
//                 <Text>or</Text>
//                 <GoogleButton onClick={googleRegister}>
//                   {/* Google login button content */}
//                 </GoogleButton>
//                 <LinkStyled to={"/"}>Already have an account?</LinkStyled>
//               </AlignContent>
//             </SignupBox>
//           </AlignSignup>
//         </Page>
//       );
//     } else if (steps === 1) {
//       return (
//         <Page>
//           <AlignSignup>
//             <SignupBox>
//               <ReturnButton onClick={handleBackSteps}>
//                 {/* Back button content */}
//               </ReturnButton>
//               <Title>Sign Up</Title>
//               <AlignContent>
//                 <SignupInput
//                   type="password"
//                   placeholder="Password"
//                   value={infoPass}
//                   onChange={(e) => {
//                     const data = e.target.value;
//                     setInfoPass(data);
//                     testPass(data);
//                   }}
//                 />
//                 <SignupInput
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={info.confirmPass}
//                   onChange={(e) => {
//                     setInfo({ ...info, confirmPass: e.target.value });
//                   }}
//                 />
//                 <ErrMsg>{error}</ErrMsg>
//                 <Buttons
//                   onClick={(e) => {
//                     if (infoPass !== info.confirmPass) {
//                       setError("passwords do not match");
//                       return;
//                     } else {
//                       registerUser(e);
//                     }
//                   }}
//                 >
//                   Done
//                 </Buttons>
//               </AlignContent>
//             </SignupBox>
//           </AlignSignup>
//         </Page>
//       );
//     }
//   };

//   return (
//     <div className="outside">
//       <div className="box">
//         <div className="inside">{inputContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
