import noti from "./Notifications.module.css";
import Pubg from "../../../../assets/icons/popularCommunities/Pubg.png"
import Fifa from "../../../../assets/icons/popularCommunities/Fifa.png"
import Valorant from "../../../../assets/icons/popularCommunities/Valorant.png"
import Forza from "../../../../assets/icons/popularCommunities/Forza.svg"

const Notification = () => {
  return (
    <div className={noti.notifications}>
      <div className={noti.notification}>
        <img src={Valorant} alt="" className={noti.icon} />
        <div className={noti.community}>
          <h2>Valorant</h2>
          <p>
            new post by <span>@Gamer6969</span>
          </p>
        </div>
      </div>
      <div className={noti.notification}>
        <img src={Pubg} alt="" className={noti.icon}  />
        <div className={noti.community}>
          <h2>Pubg</h2>
          <p>
            new post by <span>@Gamer6969</span>
          </p>
        </div>
      </div>
      <div className={noti.notification}>
        <img src={Forza} alt="" className={noti.icon}  />
        <div className={noti.community}>
          <h2>ForzaHorizon</h2>
          <p>
            new post by <span>@Gamer6969</span>
          </p>
        </div>
      </div>
      <div className={noti.notification}>
        <img src={Pubg} alt="" className={noti.icon}  />
        <div className={noti.community}>
          <h2>Pubg</h2>
          <p>
            new post by <span>@Gamer6969</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
