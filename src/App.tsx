import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Routers from "./routes/Router";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  )
}

export default App;
