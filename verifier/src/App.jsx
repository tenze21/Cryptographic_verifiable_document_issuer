import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Outlet } from "react-router-dom";
import { config } from "./wagmi_config";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
