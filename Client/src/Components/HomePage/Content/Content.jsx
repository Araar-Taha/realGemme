import Post from "./Post/Post.jsx";
import Feed from "./Feed/Feed.jsx";
import "../../../index.css";
import "./Content.css";

const Content = () => {
  return (
    <div className="content">
      {/* <div className={feed.addspace}></div> */}
      <Post />

      <Feed />
    </div>
  );
};

export default Content;
