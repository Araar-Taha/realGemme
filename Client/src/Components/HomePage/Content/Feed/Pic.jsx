import User from "./User.jsx";
import feed from "./Feed.module.css";
import like from "../../../../assets/icons/like.svg"
import comment from "../../../../assets/icons/comment.svg"
import share from "../../../../assets/icons/share.svg"

const Pic = ({
  community,
  communityUrl,
  user,
  userPic,
  caption,
  attachement,
}) => {
  return (
    <div className={feed.pic}>
      <User
        community={community}
        communityUrl={communityUrl}
        user={user}
        userPic={userPic}
      />
      <h4 className={feed.caption}>{caption}</h4>
      <img src={attachement} alt="" className={feed.attachement} />

     
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

export default Pic;
