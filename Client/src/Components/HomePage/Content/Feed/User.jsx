import feed from "./Feed.module.css"



const User = ({ community, communityUrl, user, userPic }) => {
  return (
    <div className={feed.user}>
      <div className={feed.communitygroup}>
        <img src={communityUrl} alt="" />
        <h4>{community}</h4>
      </div>
      <div className={feed.userProfile}>
        <img src={userPic} alt="" />
        <h4>{user}</h4>
      </div>
    </div>
  );
};

export default User;
