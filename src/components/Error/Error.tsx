import ContentUnavailable from "./ContentUnavailable/ContentUnavailable";

interface ErrorSubComponents {
  ContentUnavailable: React.FC;
}

const Error: React.FC & ErrorSubComponents = () => {
  return <>Unknown Error Occured</>;
};

Error.ContentUnavailable = ContentUnavailable;

export default Error;
