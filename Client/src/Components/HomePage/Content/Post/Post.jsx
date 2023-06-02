import { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/toast";

import link from "../../../../assets/icons/link.svg";
import image from "../../../../assets/icons/image.svg";
import gif from "../../../../assets/icons/gif.svg";
import post from "./post.module.css";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($title: String!, $content: String!, $groupId: ID!, $image: String) {
    createPost(title: $title, content: $content, groupId: $groupId, image: $image) {
      _id
    }
  }
`;

const Post = () => {
  const input = useRef(null);
  const toast = useToast();

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    onCompleted: () => {
      toast({
        title: `Posted`,
        position: "top",
        isClosable: true,
        status: "success",
      });
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleUploadAndPost = async () => {
    try {
      const { data } = await createPost({
        variables: { title: caption, groupId: "642814680df9a4f414ed5612", content: caption, image: "" },
        context: {
          headers: {
            authorization: `Bearer ${Cookies.get("Token")}`,
          },
        },
      });
      if (data) {
        uploadImage(selectedFile, data.createPost._id);
      }

      setSelectedFile(null);
      setCaption("");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (file, id) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`http://localhost:8000/upload/post/${id}`, formData);
      return response.data.imageUrl;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };

  const clearInput = () => {
    input.current.value = "";
  };

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
          onChange={handleCaptionChange}
          ref={input}
        />
      </div>
      <div className={post.postAndAttechements}>
        <div className={post.attachements}>
          <img src={gif} alt="" className={post.attachments__gif} />
          <label htmlFor="file-input">
            <img src={image} alt="" className={post.attachments__img} />
          </label>
          <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} />
          <img src={link} alt="" className={post.attachments__link} />
        </div>
        <div className={post.post}>
          <p>{caption.length}/200</p>
          <button
            onClick={() => {
              if (input.current.value.length > 0) {
                handleUploadAndPost();
                clearInput();
              } else {
                toast({
                  title: `The length of the post should be more than 10 characters`,
                  position: "top",
                  isClosable: true,
                  status: "error",
                });
              }
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
