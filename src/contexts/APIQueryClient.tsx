import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const APIQueryClient: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default APIQueryClient;
