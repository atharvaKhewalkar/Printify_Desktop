import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { LoadingScreen } from "./components/LoadingScreen";
import { IncomingJobs } from "./components/IncomingJobs";
import { PrintQueue } from "./components/PrintQueue";
import { HistoryEarnings } from "./components/HistoryEarnings";
import { PrintingSettings } from "./components/PrintingSettings";
import { AppSettings } from "./components/AppSettings";
import { Profile } from "./components/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingScreen 
        onLoadingComplete={handleLoadingComplete}
        duration={3000}
        // logoSrc="/path/to/your/logo.png" // Uncomment and set path to use custom logo
        companyName="PrintFlow"
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<IncomingJobs />} />
              <Route path="/queue" element={<PrintQueue />} />
              <Route path="/history" element={<HistoryEarnings />} />
              <Route path="/printing-settings" element={<PrintingSettings />} />
              <Route path="/app-settings" element={<AppSettings />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
