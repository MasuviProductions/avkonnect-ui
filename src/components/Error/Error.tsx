import ContentBanned from "./ContentBanned/ContentBanned";
import ContentDeleted from "./ContentDeleted/ContentDeleted";
import ContentUnavailable from "./ContentUnavailable/ContentUnavailable";

interface ErrorSubComponents {
  ContentUnavailable: React.FC;
  ContentBanned: React.FC;
  ContentDeleted: React.FC;
}

const Error: React.FC & ErrorSubComponents = () => {
  return <>Unknown Error Occured</>;
};

Error.ContentUnavailable = ContentUnavailable;
Error.ContentBanned = ContentBanned;
Error.ContentDeleted = ContentDeleted;

export default Error;
