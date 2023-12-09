import "./App.css";
import Navbar from "./modules/Navbar";
import Background from "./modules/Background";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Navbar />
        <Background />
      </div>
    </QueryClientProvider>
  );
}

export default App;
