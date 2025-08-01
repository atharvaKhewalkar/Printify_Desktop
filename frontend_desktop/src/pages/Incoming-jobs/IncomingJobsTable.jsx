import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

const IncomingJobsTable = ({ jobs, onModifyClick, onAcceptClick }) => {
  const handleViewFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
        <FileText size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Incoming Jobs</h3>
        <p className="text-muted-foreground mt-1">New orders will appear here once they are placed.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your new incoming print jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Customer Name</TableHead>
          <TableHead>Time Received</TableHead>
          <TableHead>Print Options</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.customerName}</TableCell>
            <TableCell>{new Date(job.timeReceived).toLocaleString()}</TableCell>
            <TableCell>{job.printOptions}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleViewFile(job.fileUrl)}>
                  View File
                </Button>
                <Button variant="default" size="sm" onClick={() => onModifyClick(job)}>
                  Modify
                </Button>
                <Button variant="secondary" size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onAcceptClick(job.id)}>
                  Accept & Print
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IncomingJobsTable;