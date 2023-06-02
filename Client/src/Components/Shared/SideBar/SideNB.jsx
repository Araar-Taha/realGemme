/* eslint-disable jsx-a11y/alt-text */
import home from "../../../assets/icons/home.svg";
import store from "../../../assets/icons/store.svg";
import trend from "../../../assets/icons/trend.svg";


import wemme from "../../../assets/icons/PlayWemme.svg";
// import Popularcommunities from "./Popularcommunities.jsx";
import Communities from "./Communities.jsx";
import side from "./sidebar.module.css";

function SideNB() {
  return (
    <div className={side.SideNB}>
      
      <div className={side.line}>Flux</div>
      <div className={side.options}>
        <img src={home} className="icon"></img>
        <div className={side.optionword}>Home</div>
      </div>
      <div className={side.options}>
        <img src={store} className="icon"></img>
        <div className={side.optionword}>Store</div>
      </div>
      <div className={side.options}>
        <img src={wemme} className="icon"></img>
        <div className={side.optionword}>Play wemme</div>
      </div>
      <div className={side.options}>
        <img src={trend} className="icon"></img>
        <div className={side.optionword}>Popular communities</div>
      </div>
      {/* <Popularcommunities />  this is the component which should be displayed but the images are not being loaded*/}
      <div className={side.popular}>
        <Communities />
      </div>


      
      <div className={side.line}>Followed</div>

      <div className={side.followed}>
        <Communities />
      </div>

      <div className={side.sideFooter}>
        <div className={side.contact}>
          <div className={side.contact__item}>FAQ</div>
          <div className={side.contact__item}>Contact us</div>
          <div className={side.contact__item}>About Gemme</div>
        </div>
      </div>
    </div>
  );
}
export default SideNB;
