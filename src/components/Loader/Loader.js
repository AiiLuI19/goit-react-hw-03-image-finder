import { BallTriangle } from 'react-loader-spinner';

function Loader() {
  return (
    <div role="alert">
      <BallTriangle color="#000000" height={60} width={60} />
      Loading...
    </div>
  );
}
export default Loader;
