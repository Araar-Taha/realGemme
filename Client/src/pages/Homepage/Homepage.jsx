import UpperNB from "../../Components/Shared/UpperNB/UpperNB.jsx";
import Friends from "../../Components/Shared/RightSideBar/Friends/friends.jsx";
import Settings from "../../Components/Shared/RightSideBar/Parameters/Parameters.jsx";
import SideNB from "../../Components/Shared/SideBar/SideNB.jsx";
import Content from "../../Components/HomePage/Content/Content.jsx";
import Notifications from   "../../Components/Shared/RightSideBar/Notifications/Notifications";
import RightSideBar from "../../Components/Shared/RightSideBar/RightSideBar.jsx";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Homepage = () => {

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

    <div className="">
      <UpperNB />
      <RightSideBar/>
      <SideNB />
      <Content />
    </div>

  );
};

export default Homepage;
