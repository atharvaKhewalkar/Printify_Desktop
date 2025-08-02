import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, DollarSign, FileText, BarChart3, Calendar, Target, Award, AlertCircle } from "lucide-react"
import apiService from "@/services/api"
 // Assuming your ApiService is here

// --- Type Definition for an Order ---
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
  created_at: string;
}

// --- Type for Earnings Data ---
interface Earnings {
  today: string;
  weekly: string;
}

// --- Helper to Format Date ---
const formatDate = (isoString: string) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export function HistoryEarnings() {
  const [completedJobs, setCompletedJobs] = useState<Order[]>([]);
  const [earnings, setEarnings] = useState<Earnings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs and earnings data in parallel
        const [jobsData, earningsData] = await Promise.all([
          apiService.getJobs(),
          apiService.getEarnings()
        ]);
        
        // Filter for completed jobs for the history table
        setCompletedJobs(jobsData.filter((job: Order) => job.status === 'completed'));
        setEarnings(earningsData);
        setError(null);
      } catch (err) {
        setError("Could not fetch historical data. Please ensure the backend is running.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading history & earnings...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 p-4 text-center">
        <AlertCircle className="mr-2" /> {error}
      </div>
    );
  }

  const totalEarnings = completedJobs.reduce((sum, job) => sum + parseFloat(job.total), 0);
  const avgJobValue = completedJobs.length > 0 ? totalEarnings / completedJobs.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          History & Earnings
        </h1>
        <p className="text-muted-foreground">Track your print business performance and financial insights</p>
      </div>

      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                <div className="text-2xl font-bold text-success">${earnings?.today || '0.00'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Weekly Total</p>
                <div className="text-2xl font-bold text-primary">${earnings?.weekly || '0.00'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jobs Completed</p>
                <div className="text-2xl font-bold text-accent-foreground">{completedJobs.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Job Value</p>
                <div className="text-2xl font-bold text-warning">
                  ${avgJobValue.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NOTE: The data for these cards is static for now. 
          To make them dynamic, you would need to add a 'job_type' column to your database. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="gradient-card border-indigo-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Top Services
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="font-medium">Business Cards</span><Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">35%</Badge></div>
              <div className="flex justify-between items-center"><span className="font-medium">Flyers</span><Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">28%</Badge></div>
              <div className="flex justify-between items-center"><span className="font-medium">Photo Prints</span><Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">22%</Badge></div>
              <div className="flex justify-between items-center"><span className="font-medium">Brochures</span><Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">15%</Badge></div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-emerald-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Revenue Breakdown
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="font-medium">Business Cards</span><span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$90.00</span></div>
              <div className="flex justify-between items-center"><span className="font-medium">Posters</span><span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">$85.00</span></div>
              <div className="flex justify-between items-center"><span className="font-medium">Brochures</span><span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$62.00</span></div>
              <div className="flex justify-between items-center"><span className="font-medium">Photo Prints</span><span className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">$37.75</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Table */}
      <Card className="gradient-card border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Job History
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Print Options</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                  <TableCell className="text-muted-foreground">{formatDate(job.created_at)}</TableCell>
                  <TableCell className="font-medium">{job.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                      {job.copies}x, {job.paper_size}, {job.color}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${parseFloat(job.total).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
