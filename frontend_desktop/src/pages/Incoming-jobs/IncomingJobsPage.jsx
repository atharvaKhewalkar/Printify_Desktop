import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import IncomingJobsTable from './IncomingJobsTable';
import ModifyJobModal from './Jobs/ModifyJobModal';




// Mock data...
const mockJobs = [
  { id: 'job-001', customerName: 'Alice Johnson', timeReceived: '2025-08-01T23:15:00Z', printOptions: 'B/W, single side, 2 copies', fileUrl: '#' },
  { id: 'job-002', customerName: 'Bob Williams', timeReceived: '2025-08-01T22:45:10Z', printOptions: 'Color, both sides, 5 copies', fileUrl: '#' },
];

const fetchIncomingJobs = () => new Promise(resolve => setTimeout(() => resolve(mockJobs), 1000));

const IncomingJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchIncomingJobs()
      .then(data => {
        setJobs(data);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch jobs:", err);
        setError("Could not load incoming jobs.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // All the handler functions...
  const handleModifyClick = (job) => { setSelectedJob(job); setIsModalOpen(true); };
  const handleAcceptClick = (jobId) => { alert(`Job ${jobId} accepted!`); setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId)); };
  const handleCloseModal = () => { setIsModalOpen(false); setSelectedJob(null); };
  const handleSaveModifiedJob = () => { alert(`Saved changes for Job ${selectedJob.id}`); handleCloseModal(); setJobs(currentJobs => currentJobs.filter(job => job.id !== selectedJob.id)); };
  
  // 👈 ADD THIS CONSOLE.LOG
  console.log({ isLoading, error, jobs });

  return (
    <>
      {/* 👈 ADD THIS H1 FOR TESTING */}
      <h1 className="text-red-500 text-2xl">-- IncomingJobsPage Component IS RENDERING --</h1>
      
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl">Incoming Jobs</CardTitle>
          <CardDescription>
            Review new orders and send them to the print queue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading jobs...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && (
            <IncomingJobsTable
              jobs={jobs}
              onModifyClick={handleModifyClick}
              onAcceptClick={handleAcceptClick}
            />
          )}
        </CardContent>
      </Card>

      {selectedJob && (
        <ModifyJobModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveModifiedJob}
          job={selectedJob}
        />
      )}
    </>
  );
};

export default IncomingJobsPage;