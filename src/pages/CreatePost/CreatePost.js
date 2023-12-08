import { useState } from "react";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
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
          <input
            type="textarea"
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
        <button className="btn">Share</button>
        {/* {!loading && <button className="btn">Share</button>}
        {loading && <button className="btn" disabled>Waiting...</button>}
        {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default CreatePost;
