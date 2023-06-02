import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";



const  CREATE_POST_MUTATION = gql`

mutation CreatePost($title: String!, $content: String!, $groupId: ID!, $image: String) {
  createPost(title: $title, content: $content, groupId: $groupId, image: $image) {
    _id
  }
}
`

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");

  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleUploadAndPost = async () => {
    try {
     const {data}= await createPost({
        variables: { title: caption,groupId: "642814680df9a4f414ed5612", content: caption, image:"" },
        context: {
          headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWQ3ZDUzZmFhNDgwYjMzM2NiNGU1NCIsImlhdCI6MTY4NDYyNzMyNSwiZXhwIjoxNjg0NjM0NTI1fQ.0Q3FJQ7fqoENGptFuai0d86eX3AXAtq5fMvrhD4BlrI',
          },
      }});
      

      if (data){
      
       uploadImage(selectedFile,data.createPost._id);}
      

      setSelectedFile(null);
      setCaption("");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (file,id) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`http://localhost:8000/upload/post/${id}`, formData);
      return response.data.imageUrl;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  };



  
  return (
    <div>
      <label>
        Select an image:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>

      <textarea
        value={caption}
        onChange={handleCaptionChange}
        placeholder="Write a caption..."
      />

      <button onClick={handleUploadAndPost}>Post</button>
    </div>
  );
};

export default ImageUploadForm;
