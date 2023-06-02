import link from "../../../../assets/icons/link.svg";
import image from "../../../../assets/icons/image.svg";
import gif from "../../../../assets/icons/gif.svg";
import post from "./post.module.css";
import { useToast } from "@chakra-ui/toast";
import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation ($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      content
      title
    }
  }
`;
const Post = () => {
  const input = useRef(null);
  const clearInput = () => {
    input.current.value = "";
  };

  const [createPost ] = useMutation(CREATE_POST,{onCompleted:()=>{toast({
    title: `Posted`,
    position: "top",
    isClosable: true,
    status: "success",
  })}});

  const [postContent, setPostContent] = useState("");

  const toast = useToast();

  return (
    <div className={post.publish}>
      <div className={post.person}>
        <img
          src="https://www.residencescogir.com/DATA/NOUVELLE/79~v~comment-creer-un-profil-facebook-.jpg"
          alt=""
          className="Myprofilepic"
        />
        <input
          type="text"
          placeholder="What’s on your mind ?"
          maxLength={200}
          onChange={(event) => setPostContent(event.target.value)}
          ref={input}
        />
      </div>
      <div className={post.postAndAttechements}>
        <div className={post.attachements}>
          <img src={gif} alt="" className={post.attachments__item} />
          <img src={image} alt="" className={post.attachments__item} />
          <img src={link} alt="" className={post.attachments__item} />
        </div>
        <div className={post.post}>
          <p>{postContent.length}/200</p>
          <button
            onClick={() => {
              if (input.current.value.length > 0) {
                createPost({
                  variables: {
                    //variables avec S don't forget !
                    title: "This is a custom title for demonstration purposes",
                    content: postContent, //in here we are the input of the user
                  },
                });
                clearInput();
              } else
                toast({
                  title: `The length of the post should be more than 10 characters`,
                  position: "top",
                  isClosable: true,
                  status: "error",
                });
            }}
          >
            Post
          </button>
        </div>
      </div>

  
      
    </div>
  );
};

export default Post;
