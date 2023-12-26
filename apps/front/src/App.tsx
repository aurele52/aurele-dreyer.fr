import "./App.css";
import Navbar from "./main-page/Navbar/Navbar";
import Background from "./main-page/Background/Background";
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
