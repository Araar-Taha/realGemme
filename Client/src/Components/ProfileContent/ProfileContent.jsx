import pr from "./ProfileContent.module.css";
import banner from "../../assets/images/Banner.png";
import profilePic from "../../assets/icons/profilePic.png";
import edit from "../../assets/icons/editProfilePic.svg";
import Feed from "./../HomePage/Content/Feed/Feed";

// these are temporary downloads
import Xbox from "../../assets/icons/Xbox.png";
import Playstation from "../../assets/icons/Playstation.png";
import Steam from "../../assets/icons/Steam.png";
import Origin from "../../assets/icons/Origin.png";

// these are temporary imports for the pic of the friends
import akram from "../../assets/icons/akram.png";
import taha from "../../assets/icons/taha.png";
import wael from "../../assets/icons/wael.png";
import job from "../../assets/icons/job.png";
import s9m from "../../assets/icons/s9m.png";
import matouk from "../../assets/icons/matouk.png";

export default function ProfileContent() {
  const platforms = [
    {
      Tag: "Gamer6969",
      platform: Xbox,
    },
    {
      Tag: "Gamer6969",
      platform: Playstation,
    },
    {
      Tag: "Gamer6969",
      platform: Steam,
    },
    {
      Tag: "Gamer6969",
      platform: Origin,
    },
  ];

  const friends = {
    counter: 12,
    friendsList: [matouk, s9m, taha, wael, job, akram],
  };

  return (
    <div className={pr.Profilecontent}>
      <div className={pr.container}>
        <img src={banner} alt="" className={pr.Banner} />

        <div className={pr.info}>
          <div className={pr.info__container}>
            <div className={pr.user}>
              <img src={profilePic} alt="" className={pr.profilePic} />
              <h2>2weny9ine</h2>
              <img src={edit} alt="" className={pr.editProfilePic} />
            </div>

            <div className={pr.content}>
              <div className={pr.bio}>
                <h2>Bio</h2>
                <p>
                  {`hey there  i’m yacine, currently i play valorant :)`}
                  <br /> {`valorant id : saikodxde #2900`}
                </p>{" "}
                {/*all this is hard coded but later it will be ferched */}
                <h2>Links</h2>
                <div className={pr.Links}>
                  {platforms.map((pl) => (
                    <div className={pr.platform}>
                      <img src={pl.platform} alt="" />
                      <h3>{pl.Tag}</h3>
                    </div>
                  ))}
                </div>
                <div className={pr.friends}>
                  <div className={pr.friends__title}>
                    <h2>Friends</h2>
                    <h4>{friends.counter}</h4>
                  </div>

                  <div className={pr.friends__list}>
                    {friends.friendsList.slice(0, 5).map((friend) => (
                      <img src={friend} />
                    ))}
                    <div className={pr.sixthfriend}>
                      {friends.counter >= 6 ? (
                        <img src={friends.friendsList[5]} />
                      ) : null}

                      <div class={pr.dotsContainer}>
                        <div class={pr.dot}></div>
                        <div class={pr.dot}></div>
                        <div class={pr.dot}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Feed />
              {/* the feed component will be passed with some props containing the JSON that will be fetched from the dataBase*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
