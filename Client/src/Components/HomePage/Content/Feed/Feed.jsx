import Pic from "./Pic";
import "../Content.css";
import Tweet from "./Tweet";
import feed from "./Feed.module.css";

const posts = [
  {
    community: "Hogwarts legacy",
    communityUrl:
      "data:image/jpeg;base64,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",
    user: "@2weny9ine",
    userProfilePic:
      "https://www.residencescogir.com/DATA/NOUVELLE/79~v~comment-creer-un-profil-facebook-.jpg",
    caption: "The next voldemort will be mee ! 😈 #HogwartsLegacy",
    attachement:
      "https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacyDigitalDeluxeEdition_AvalancheSoftware_Editions_S1_2560x1440-65f2cce001ab1893cca57f48aeb25196",
  },
];

const tweet = [
  {
    community: "PUBG DZ",
    communityUrl:
      "https://www.freeiconspng.com/thumbs/pubg/pubg-circle-battlegrounds-photo-23.png",
    user: "@2weny9ine",
    userProfilePic:
      "https://www.residencescogir.com/DATA/NOUVELLE/79~v~comment-creer-un-profil-facebook-.jpg",
    caption: "khawty kifeh ntl3 pubg oo ?",
  },
];

const Feed = () => {
  return (
    <div className={feed.feed}>
      <Pic
        community={posts[0].community}
        communityUrl={posts[0].communityUrl}
        user={posts[0].user}
        userPic={posts[0].userProfilePic}
        caption={posts[0].caption}
        attachement={posts[0].attachement}
      />

      <Tweet
        community={tweet[0].community}
        communityUrl={tweet[0].communityUrl}
        user={tweet[0].user}
        userPic={tweet[0].userProfilePic}
        caption={tweet[0].caption}
      />
    </div>
  );
};

export default Feed;
