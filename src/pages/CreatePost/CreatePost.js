import { useState } from "react";
import styles from "./CreatePost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue();
  const {insertDocument, response} = useInsertDocument("posts");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    //validate image url
    try {
      // creating new image with js object
      new URL(image);
    } catch (error) {
      setFormError("The image needs to be a valid URL.");
      return; // Adiciona o return aqui para evitar que o código continue executando
    }
    //createarray - tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if(!title || !image || !tags || !body){
      setFormError("Please fill in the fields correctly")
    }
    //check values

    if(formError) return;
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Write and share!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Insert your title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insert the image's url"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Content:</span>
          <textarea
            name="body"
            required
            placeholder="Insert the post's content"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insert your tags separed by comma"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Share</button>}
        {response.loading && <button className="btn" disabled>Loading...</button>}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  );
};

export default CreatePost;
