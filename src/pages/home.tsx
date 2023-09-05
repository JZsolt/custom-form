import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>home</div>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/form-creator'>Creator</Link>
    </>
  );
};

export default Home;
