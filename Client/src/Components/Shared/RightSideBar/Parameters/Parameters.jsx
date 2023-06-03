import param from "./Parameters.module.css";
import profileParam from '../../../../assets/icons/profileparam.svg'
import accountOption from '../../../../assets/icons/accountParam.svg'
import Help from '../../../../assets/icons/Help.svg'
import conditionAndPolicy from '../../../../assets/icons/ConditionAndPolicy.svg'
import signOut from '../../../../assets/icons/signOut.svg'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


const Parameters = () => {
  const navigate = useNavigate();
const removee = ()=>{
  Cookies.remove('Token');
  navigate('/LogIn')
}

  return (
    <div className={param.parameters}>
      <div className={param.parameter}>
        <img src={profileParam} className={param.parameter__image}></img>
        <h3>Profile</h3>
      </div>
      <div className={param.parameter}>
        <img src={accountOption} className={param.parameter__image}></img>
        <h3>Account options</h3>
      </div>
      <div className={param.parameter}>
        <img src={Help} className={param.parameter__image}></img>
        <h3>Help</h3>
      </div>
      <div className={param.parameter}>
        <img src={conditionAndPolicy} className={param.parameter__image}></img>
        <h3>Condition and policy</h3>
      </div>
      <div className={param.parameter}  >
        <img src={signOut} className={param.parameter__image}></img>
        <button onClick={removee}>Sign out</button>
      </div>
    </div>
  );
};

export default Parameters;
