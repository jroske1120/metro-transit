import { RouteDirection, StopsList } from "../../Interfaces/Interfaces";
import "./Stops.css";
import { useHistory, useRouteMatch, withRouter } from "react-router-dom";

type Props = {
  stops?: StopsList[];
  selectedDirection?: RouteDirection | null;
};

const Stops: React.FC<Props> = ({ stops, selectedDirection }) => {
  console.log('here');
  console.log(stops);
  let match = useRouteMatch();
  console.log(match);

const history = useHistory();
  return (
    <div data-testid="stops-list" className="stops-container">
      {stops ? (
        <div className="stops">
          <h2 className="stops-title">
            Stops Available {selectedDirection?.direction_name}
          </h2>
          <div role="list">
            {stops.map((stop) => (
              <div
                key={stop.place_code}
                data-testid={`stop-${stop.place_code}`}
                className="stop-description"
              >
                <div>{stop.description}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          We are unable to get the desired direction for your select, Kindly try
          changing the option for the route, direction and stop
        </div>
      )}
    </div>
  );
};

export default Stops;
