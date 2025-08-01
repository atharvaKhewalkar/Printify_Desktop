import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IncomingJobsPage from './pages/Incoming-jobs/IncomingJobsPage';
import PrintQueuePage from './pages/PrintQueuePage/PrintQueuePage';
import HistoryPage from './pages/HistoryPage/HistoryPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="incoming-jobs" element={<IncomingJobsPage />} />
   <Route path="/history" element={<HistoryPage />} />
        <Route path="queue" element={<PrintQueuePage />} />
      </Route>
    </Routes>
  );
}

export default App;