/* eslint-disable jsx-a11y/alt-text */
import Friends from "./friendslist.jsx";
import chat from "../../../../assets/icons/chat.svg";
import  f from "./friends.module.css";
function friendsg() {
  return (
    <div id={f.friendscontainer}>
      {/* <div id={f.friendstitle}>Friends</div> */}
      <div id={f.friendslist}>
        {Friends.map((friend) => {
          return (
            <div className={f.friend}>
              <img src={friend.image} className={f.profilePic}></img>
              <div className={f.friendname}>{friend.name}</div>
              <img src={chat} className={f.icon}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default friendsg;
