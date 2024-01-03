import { useEffect, useState } from "react";
import styles from "./EditPost.module.css";
import { useAuthValue } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  //fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
      }
  },[post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument("posts");
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
    if (!title || !image || !tags || !body) {
      setFormError("Please fill in the fields correctly");
    }
    //check values

    if (formError) return;
    const data = {
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit Post</h2>
          <p>Do you want to edit content? Edit and share!</p>
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
            <p className={styles.preview_title}>Image preview:</p>
            <img className={styles.images_preview} src={post.image} alt={post.title} />

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
            {response.loading && (
              <button className="btn" disabled>
                Loading...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
