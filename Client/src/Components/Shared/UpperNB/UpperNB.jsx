/* eslint-disable jsx-a11y/alt-text */

import logo from "../../../assets/icons/logo.png";
import ghosts from "../../../assets/icons/ghosts.svg";
import notif from "../../../assets/icons/notification.svg";
import upperChat from "../../../assets/icons/upperChat.svg";
import nb from "./UpperNB.module.css";
import { useContext } from "react";
import { AppPageContext } from "./../../../App";
import { Link } from "react-router-dom";

function UpperNB() {
  const {
    cardVisible1,
    cardVisible2,
    cardVisible3,
    setCardVisible1,
    setCardVisible2,
    setCardVisible3,
  } = useContext(AppPageContext);

  return (
    <div className={nb.UpperNB}>
      <img src={logo} alt="logo" id={nb.logo}></img>
      <input id={nb.search} placeholder="Search"></input>
      <div className={nb.UpperNBIcons}>
        <img
          src={notif}
          className={nb.icon}
          onClick={() => {
            if (cardVisible3 || cardVisible2) {
              setCardVisible3(false);
              setCardVisible2(false);
            }
            setCardVisible1(!cardVisible1);
          }}
        ></img>
        <img
          src={ghosts}
          className={nb.icon}
          onClick={() => {
            if (cardVisible1 || cardVisible3) {
              setCardVisible1(false);
              setCardVisible3(false);
            }
            setCardVisible2(!cardVisible2);
          }}
        ></img>
        <img
          src={upperChat}
          className={nb.icon}
          alt=""
          onClick={() => {
            if (cardVisible1 || cardVisible2) {
              setCardVisible1(false);
              setCardVisible2(false);
            }
            setCardVisible3(!cardVisible3);
          }}
        />
        <Link to="/Profile">
          <img
            src="https://www.residencescogir.com/DATA/NOUVELLE/79~v~comment-creer-un-profil-facebook-.jpg"
            className={nb.Myprofilepic}
          ></img>
        </Link>
      </div>
    </div>
  );
}
export default UpperNB;
