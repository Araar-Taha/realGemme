import User from "./User";
import feed from "./Feed.module.css"
import like from "../../../../assets/icons/like.svg"
import comment from "../../../../assets/icons/comment.svg"
import share from "../../../../assets/icons/share.svg"
const Tweet = ({ community, communityUrl, user, userPic, caption }) => {
  return (
    <div className={feed.Tweet}>
      <User
        community={community}
        communityUrl={communityUrl}
        user={user}
        userPic={userPic}
      />
      <h3 className={feed.caption}>khawty kifeh ntl3 pubg oo ?</h3>

      <hr />
      <div className={feed.intract}>
        <div className={feed.intract__item}>
          <img src={like} alt="" />
          <h3>Like</h3>
        </div>
        <div className={feed.intract__item}>
        <img src={comment} alt="" />
          <h3>Comment</h3>
        </div>
        <div className={feed.intract__item}>
        <img src={share} alt="" />
          <h3>Share</h3>
        </div>
      </div>
    </div>
    
  );
};

export default Tweet;
