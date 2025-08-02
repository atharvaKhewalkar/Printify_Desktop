import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Check, Settings, User, Clock, FileText, TrendingUp, AlertCircle, Package, Printer, CheckCircle } from "lucide-react"
import apiService from "@/services/api"
 // Assuming you save your ApiService here

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
  status: 'pending' | 'processing' | 'printing' | 'ready' | 'completed';
  payment_method: 'online' | 'delivery';
  payment_status: 'success' | 'pending';
  file_info: {
    fileName: string;
    fileUrl: string;
  };
  created_at: string;
}

// --- Helper to Format Date ---
const formatDateTime = (isoString: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// --- Helper to get status styles ---
const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500 text-white"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
    case 'processing':
      return <Badge className="bg-blue-500 text-white"><Package className="mr-1 h-3 w-3" />Processing</Badge>;
    case 'printing':
      return <Badge className="bg-orange-500 text-white"><Printer className="mr-1 h-3 w-3" />Printing</Badge>;
    case 'ready':
      return <Badge className="bg-green-500 text-white"><CheckCircle className="mr-1 h-3 w-3" />Ready</Badge>;
    case 'completed':
      return <Badge variant="secondary"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export function IncomingJobs() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = orders.slice(startIndex, endIndex);

  const fetchOrders = async () => {
    try {
      // Use the new apiService to get jobs
      const fetchedOrders = await apiService.getJobs();
      setOrders(fetchedOrders);
      setError(null);
    } catch (err) {
      setError('Could not connect to the backend. Please ensure it is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Fetch data from the backend ---
  useEffect(() => {
    fetchOrders(); // Initial fetch
    const interval = setInterval(fetchOrders, 10000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // --- Handle Job Actions ---
  const handleAcceptJob = async (orderId: string) => {
    try {
      await apiService.updateJobStatus(orderId, 'processing');
      // Refresh the list immediately to show the change
      fetchOrders(); 
    } catch (err) {
      console.error("Failed to accept job:", err);
      alert("Could not update job status.");
    }
  };

  // --- Calculated Stats ---
  const totalJobs = orders.length;
  const pendingJobs = orders.filter(job => job.status === 'pending').length;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading jobs...</div>;
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
          Incoming Jobs
        </h1>
        <p className="text-muted-foreground">New print requests awaiting review and processing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                <div className="text-2xl font-bold">{totalJobs}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <div className="text-2xl font-bold text-destructive">{pendingJobs}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <div className="text-2xl font-bold text-success">
                  ${orders.reduce((acc, order) => acc + parseFloat(order.total), 0).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table */}
      <Card className="gradient-card border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Job Queue
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Print Options</TableHead>
                <TableHead>File</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      {job.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(job.created_at)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      {job.copies}x, {job.color}, {job.print_side}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <a 
                        href={`http://localhost:3001${job.file_info.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(job.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="hover:bg-green-100 hover:text-green-700"
                        onClick={() => handleAcceptJob(job.order_id)}
                        disabled={job.status !== 'pending'}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-purple-100 hover:text-purple-700">
                        <Settings className="w-4 h-4 mr-1" />
                        Modify
                      </Button>
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
