/* eslint-disable jsx-a11y/alt-text */
import home from "../../../assets/icons/home.svg";
import store from "../../../assets/icons/store.svg";
import trend from "../../../assets/icons/trend.svg";
import valo from "../../../assets/icons/popularCommunities/Valorant.png"
import pubg from "../../../assets/icons/popularCommunities/Pubg.png"
import fifa from "../../../assets/icons/popularCommunities/Fifa.png"


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
        <div className={side.community} >
                <img src={valo} alt="" />
                <h3>VALORANT DZ</h3>
            </div>
            <div className={side.community}>
                <img src={fifa} alt="" />
                <h3>FIFA 23 DZ</h3>
            </div>
            <div className={side.community}>
                <img src={pubg} alt="" />
                <h3>PUBG DZ</h3>
            </div>
      </div>


      
      <div className={side.line}>Followed</div>

      
        <Communities />
      

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
