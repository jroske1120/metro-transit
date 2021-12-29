import { useHistory } from "react-router";
import "./Header.css";

const Header: React.FC = () => {
  const history = useHistory();

  const refresh = () => {
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="logo"></div>
      <div className="banner">
        {/* Not great styling or user exp here, 
        mostly for when I test I don't have to edit url */}
        <button title="Click to reset route and direction" onClick={refresh}>
          <p>NexTrip</p>
          <p>Click to reset</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
