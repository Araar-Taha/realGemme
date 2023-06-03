import SideNB from "./../../Components/Shared/SideBar/SideNB";
import RightSideBar from '../../Components/Shared/RightSideBar/RightSideBar';
import UpperNB from './../../Components/Shared/UpperNB/UpperNB';
import ProfileContent from './../../Components/ProfileContent/ProfileContent';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Profile() {

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Token = Cookies.get('Token');
    if (Token) {
      setToken(Token)}
    else{
      navigate("/logIn")
    }
    }, [token]);
  return (
    <>
      <UpperNB />
      <RightSideBar />
      <SideNB />
      <ProfileContent/>
    </>
  );
}
