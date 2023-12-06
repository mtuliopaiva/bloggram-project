//css
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About the</h2> <span>BlogGram</span>
      <p>This is the Bloggram. Your favorite social network.</p>
      <p>This project was made using ReactJS and Firebase.</p>
      <Link to={"/post/create"} className="btn">
        Post it!
      </Link>
    </div>
  );
};

export default About;
