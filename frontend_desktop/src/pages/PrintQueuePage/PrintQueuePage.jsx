import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PrintQueueTable from './PrintQueueTable';

// --- MOCK DATA FOR THE QUEUE ---
const mockQueue = [
  { id: 'job-004', customerName: 'David Miller', status: 'Printing', targetPrinter: 'HP LaserJet Pro M404n', eta: '5 minutes' },
  { id: 'job-005', customerName: 'Eva Green', status: 'Queued', targetPrinter: 'Canon imageCLASS MF743Cdw', eta: '12 minutes' },
  { id: 'job-006', customerName: 'Frank Wright', status: 'Queued', targetPrinter: 'HP LaserJet Pro M404n', eta: '18 minutes' },
  { id: 'job-002', customerName: 'Bob Williams', status: 'Paused', targetPrinter: 'Canon imageCLASS MF743Cdw', eta: '25 minutes' },
];

const fetchPrintQueue = () => new Promise(resolve => setTimeout(() => resolve(mockQueue), 500));
// --- END MOCK ---

const PrintQueuePage = () => {
  const [queue, setQueue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchPrintQueue()
      .then(data => setQueue(data))
      .finally(() => setIsLoading(false));
  }, []);

  // --- Action Handlers ---
  const handlePause = (jobId) => alert(`Pausing Job ID: ${jobId}`);
  const handleCancel = (jobId) => alert(`Cancelling Job ID: ${jobId}`);
  const handleMarkPickup = (jobId) => alert(`Job ID: ${jobId} is ready for pickup!`);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Print Queue</CardTitle>
        <CardDescription>
          Monitor all jobs currently in production.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center p-4">Loading print queue...</div>
        ) : (
          <PrintQueueTable
            queue={queue}
            onPause={handlePause}
            onCancel={handleCancel}
            onMarkPickup={handleMarkPickup}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PrintQueuePage;