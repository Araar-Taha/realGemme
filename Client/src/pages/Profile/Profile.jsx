import SideNB from "./../../Components/Shared/SideBar/SideNB";
import RightSideBar from '../../Components/Shared/RightSideBar/RightSideBar';
import UpperNB from './../../Components/Shared/UpperNB/UpperNB';
import ProfileContent from './../../Components/ProfileContent/ProfileContent';
export default function Profile() {
  return (
    <>
      <UpperNB />
      <RightSideBar />
      <SideNB />
      <ProfileContent/>
    </>
  );
}
