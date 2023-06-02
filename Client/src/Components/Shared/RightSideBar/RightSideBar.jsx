import right from "./RightSideBar.module.css";
import Friends from "./Friends/friends";
import Notification from "./Notifications/Notifications";
import Parameters from "./Parameters/Parameters";
import { useContext } from "react";
import { AppPageContext } from '../../../App';

const RightSideBar = () => {
  const { cardVisible1, cardVisible2, cardVisible3 } =
    useContext(AppPageContext);

  return (
    <div className={right.RightSideBar}>
      {cardVisible1 && <Notification />}
      {cardVisible2 && <Parameters />}
      {cardVisible3 && <Friends />}
    </div>
  );
};

export default RightSideBar;
