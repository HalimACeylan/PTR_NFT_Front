import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to ParlaTR NFT</h1>
      <Link to="/create">Create NFT</Link>
    </div>
  );
};

export default HomePage;