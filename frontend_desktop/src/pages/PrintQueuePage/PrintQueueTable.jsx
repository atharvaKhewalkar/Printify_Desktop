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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrinterIcon, PauseCircle, XCircle, CheckCircle } from 'lucide-react';

// Helper to get badge color based on status
const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'printing':
      return 'default'; // Blue
    case 'queued':
      return 'secondary'; // Gray
    case 'paused':
      return 'destructive'; // Red
    case 'completed':
        return 'outline'; // Green (using outline for distinction)
    default:
      return 'secondary';
  }
};


const PrintQueueTable = ({ queue, onPause, onCancel, onMarkPickup }) => {
    if (!queue || queue.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed rounded-lg">
            <PrinterIcon size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground">The Print Queue is Empty</h3>
            <p className="text-muted-foreground mt-1">Jobs will appear here after they are accepted.</p>
          </div>
        );
    }

    return (
        <Table>
          <TableCaption>A real-time list of all jobs in production.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target Printer</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queue.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.customerName}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
                </TableCell>
                <TableCell>{job.targetPrinter}</TableCell>
                <TableCell>{job.eta}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onPause(job.id)} title="Pause Job">
                        <PauseCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => onCancel(job.id)} title="Cancel Job">
                        <XCircle className="h-4 w-4" />
                    </Button>
                     <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white" size="icon" onClick={() => onMarkPickup(job.id)} title="Mark as Ready for Pickup">
                        <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
};

export default PrintQueueTable;