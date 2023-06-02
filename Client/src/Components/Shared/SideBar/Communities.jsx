import valo from "../../../assets/icons/popularCommunities/Valorant.png"
import pubg from "../../../assets/icons/popularCommunities/Pubg.png"
import fifa from "../../../assets/icons/popularCommunities/Fifa.png"
import side from './sidebar.module.css'

const Communities = () => {


    return ( 
        <div className={side.communities} >
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
     );
}
 
export default Communities;