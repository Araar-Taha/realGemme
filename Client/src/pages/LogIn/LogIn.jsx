import lg from "./LogIn.module.css";
import gmail from "../../assets/icons/Gmail.png";
import apple from "../../assets/icons/apple.png";
import facebook from "../../assets/icons/facebook.png";
import { useContext, useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import Cookies from 'js-cookie';
import { useToast } from "@chakra-ui/toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppPageContext } from "../../App"

const LOGIN = gql`
  mutation Mutation($email: String, $password: String!) {
    login(password: $password, email: $email) {
      token
    }
  }
`;

export default function LogIn() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const User = useRef(null);
  const Pass = useRef(null);
  const [login, { error, data, loading }] = useMutation(LOGIN);
  if (data) {
    console.log(data);
  }
  const navigate = useNavigate();
  const { fetchCookie } =
    useContext(AppPageContext);

  useEffect(() => {
    if (data) {
      const token = data.login.token;
      const expirationDate = rememberMe
        ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10)
        : undefined;
      Cookies.set('Token', token, { expires: expirationDate });
      fetchCookie();
      navigate("/");
      // Perform any other actions after successful login
    }
  }, [data, rememberMe]);

  const [email, setEmail] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (error) {
      console.log(error);
      toast({
        title: error.message,
        position: "top",
        isClosable: true,
        status: "error",
      });
    }
  }, [error]);

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleRememberMeToggle = () => {
    setRememberMe((prevState) => !prevState);
  };

  return (
    <div className={lg.LogIn}>
      {loading ? (
        <PacmanLoader color="#DA322E" size={50} />
      ) : (
        <div className={lg.LogInContainer}>
          <h1>Sign In</h1>
          <input
            type="text"
            placeholder="Email"
            className={lg.input1}
            onChange={(event) => setEmail(event.target.value)}
            ref={User}
          />
          <div className={lg.passwordwrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className={lg.input2}
              onChange={(event) => setPassword(event.target.value)}
              ref={Pass}
            />
            {showPassword ? (
              <FaEyeSlash className={lg.eye} onClick={handlePasswordToggle} />
            ) : (
              <FaEye className={lg.eye} onClick={handlePasswordToggle} />
            )}
          </div>
          <div className={lg.rememberForgot}>
            <div className={lg.remember}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeToggle}
              />
              <p>remember me</p>
            </div>
            <a href="#">forgot password ?</a>
          </div>

          <button
            className={lg.logIn__button}
            onClick={() => {
              login({
                variables: {
                  password,
                  email,
                },
              });
            }}
          >
            Log In
          </button>
          <p className={lg.or}>or</p>
          <div className={lg.gmail}>
            <img src={gmail} alt="Gmail" />
          </div>
          <div className={lg.facebook}>
            <img src={facebook} alt="Facebook" />
          </div>
          <div className={lg.apple}>
            <img src={apple} alt="Apple" />
          </div>
          <p>Don’t have an account?</p>
          <Link to="/SignIn">create one</Link>
        </div>
      )}
    </div>
  );
}
