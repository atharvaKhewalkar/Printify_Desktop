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
import { History } from 'lucide-react';

const HistoryTable = ({ completedJobs }) => {
    if (!completedJobs || completedJobs.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
            <History size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No Completed Jobs</h3>
            <p className="text-muted-foreground mt-1">Your job history will appear here.</p>
          </div>
        );
    }

    return (
        <Table>
          <TableCaption>A record of all completed jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Date Completed</TableHead>
              <TableHead className="text-right">Earning</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.customerName}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{new Date(job.dateCompleted).toLocaleDateString()}</TableCell>
                <TableCell className="text-right font-semibold text-green-600">
                  ₹{job.earning.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
};

export default HistoryTable;