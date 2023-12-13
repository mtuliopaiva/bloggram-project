//css
import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//components

const Home = () => {
  const [query,setQuery] = useState("");
  const {documents: posts, loading} = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  console.log(posts);

  return (
    <div className={styles.home}>
      <h1>Check out our latest posts</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder="Search for tags"
        onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="post-list">
      {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <h3>{post.title}</h3>
        ))}
        {posts && posts.length ===0 && (
          <div className={styles.noposts}>
            <p>No posts were found</p>
            <Link to={"/posts/create"}>Create the first post!</Link>
          </div>
        )}
      </div>
    </div>
    
  )

};


export default Home