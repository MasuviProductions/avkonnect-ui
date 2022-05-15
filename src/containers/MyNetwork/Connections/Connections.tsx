import ExistingConnections from "./ExistingConnections";
import PendingConnections from "./PendingConnections";
import SentConnections from "./SentConnections";

interface IConnectionsProps {
  type: "pending" | "sent" | "connected";
}

const Connections: React.FC<IConnectionsProps> = ({ type }) => {
  switch (type) {
    case "connected":
      return <ExistingConnections />;
    case "pending":
      return <PendingConnections />;
    case "sent":
      return <SentConnections />;
  }
};

export default Connections;
