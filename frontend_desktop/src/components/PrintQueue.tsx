import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Pause, Square, Check, Printer, Activity, Clock, Zap, CheckCircle, AlertCircle, Play } from "lucide-react"
import apiService from "@/services/api"

// --- Type Definition for an Order from the Database ---
interface Order {
  id: number;
  order_id: string;
  name: string;
  copies: number;
  paper_size: string;
  print_side: string;
  color: string;
  total: string;
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'completed' | 'paused'; // Added paused
  created_at: string;
}

// --- Helper to get status styles ---
const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case "processing":
      return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Queued</Badge>;
    case "printing":
      return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">Printing</Badge>;
    case "ready":
      return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Ready</Badge>;
    case "paused":
      return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Paused</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};


export function PrintQueue() {
  const [queueJobs, setQueueJobs] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;

  const fetchQueueJobs = async () => {
    try {
      const allJobs = await apiService.getJobs();
      // Filter for jobs that are in the production queue
      const inQueue = allJobs.filter((job: Order) => 
        job.status === 'processing' || 
        job.status === 'printing' || 
        job.status === 'paused' || 
        job.status === 'ready'
      );
      setQueueJobs(inQueue);
      setError(null);
    } catch (err) {
      setError('Could not connect to the backend. Please ensure it is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueJobs(); // Initial fetch
    const interval = setInterval(fetchQueueJobs, 5000); // Poll for updates every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await apiService.updateJobStatus(orderId, status);
      fetchQueueJobs(); // Refresh the list to show the change
    } catch (err) {
      console.error(`Failed to update job ${orderId} to ${status}:`, err);
      alert("Could not update job status.");
    }
  };

  const totalPages = Math.ceil(queueJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = queueJobs.slice(startIndex, endIndex);

  // --- Calculated Stats ---
  const printingCount = queueJobs.filter(job => job.status === "printing").length;
  const readyCount = queueJobs.filter(job => job.status === "ready").length;


  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading print queue...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 p-4 text-center">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Print Queue
        </h1>
        <p className="text-muted-foreground">Real-time view of jobs in production and awaiting printing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total in Queue</p>
                <div className="text-2xl font-bold">{queueJobs.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Currently Printing</p>
                <div className="text-2xl font-bold text-success">{printingCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ready for Pickup</p>
                <div className="text-2xl font-bold text-accent-foreground">{readyCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Queue Time</p>
                <div className="text-2xl font-bold text-warning">15 min</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue Table */}
      <Card className="gradient-card border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Printer className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Production Queue
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50">
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>{getStatusBadge(job.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress 
                        value={job.status === 'ready' || job.status === 'completed' ? 100 : (job.status === 'processing' ? 5 : 50)} 
                        className="w-20 h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {job.status === "printing" && (
                        <Button size="sm" variant="ghost" className="hover:bg-yellow-100 hover:text-yellow-700" onClick={() => handleUpdateStatus(job.order_id, 'paused')}>
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {job.status === "paused" && (
                        <Button size="sm" variant="ghost" className="hover:bg-blue-100 hover:text-blue-700" onClick={() => handleUpdateStatus(job.order_id, 'printing')}>
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      {job.status === "processing" && (
                         <Button size="sm" variant="ghost" className="hover:bg-blue-100 hover:text-blue-700" onClick={() => handleUpdateStatus(job.order_id, 'printing')}>
                          <Play className="w-4 h-4 mr-1" /> Start
                        </Button>
                      )}
                      {job.status === "printing" && (
                         <Button size="sm" variant="ghost" className="hover:bg-green-100 hover:text-green-700" onClick={() => handleUpdateStatus(job.order_id, 'ready')}>
                          <Check className="w-4 h-4 mr-1" /> Finish
                        </Button>
                      )}
                       {job.status === "ready" && (
                         <Button size="sm" variant="ghost" className="hover:bg-green-100 hover:text-green-700" onClick={() => handleUpdateStatus(job.order_id, 'completed')}>
                          <CheckCircle className="w-4 h-4 mr-1" /> Complete
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
