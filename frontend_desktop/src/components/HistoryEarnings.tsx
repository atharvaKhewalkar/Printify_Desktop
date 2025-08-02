import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, DollarSign, FileText, BarChart3, Calendar, Target, Award } from "lucide-react"

const mockHistoryData = [
  {
    id: 1,
    date: "2024-02-08",
    customerName: "John Smith",
    jobType: "Business Cards",
    quantity: "500 cards",
    earnings: 45.00,
    status: "Completed"
  },
  {
    id: 2,
    date: "2024-02-08",
    customerName: "Sarah Johnson",
    jobType: "Flyers",
    quantity: "100 copies",
    earnings: 28.50,
    status: "Completed"
  },
  {
    id: 3,
    date: "2024-02-07",
    customerName: "Mike Wilson",
    jobType: "Photo Prints",
    quantity: "25 photos",
    earnings: 37.75,
    status: "Completed"
  },
  {
    id: 4,
    date: "2024-02-07",
    customerName: "Emma Davis",
    jobType: "Brochures",
    quantity: "50 brochures",
    earnings: 62.00,
    status: "Completed"
  },
  {
    id: 5,
    date: "2024-02-06",
    customerName: "Alex Thompson",
    jobType: "Posters",
    quantity: "10 posters",
    earnings: 85.00,
    status: "Completed"
  }
]

const totalEarnings = mockHistoryData.reduce((sum, job) => sum + job.earnings, 0)
const todayEarnings = mockHistoryData
  .filter(job => job.date === "2024-02-08")
  .reduce((sum, job) => sum + job.earnings, 0)

export function HistoryEarnings() {
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
                <div className="text-2xl font-bold text-success">${todayEarnings.toFixed(2)}</div>
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
                <div className="text-2xl font-bold text-primary">${totalEarnings.toFixed(2)}</div>
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
                <div className="text-2xl font-bold text-accent-foreground">{mockHistoryData.length}</div>
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
                  ${(totalEarnings / mockHistoryData.length).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics with Gradients */}
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
              <div className="flex justify-between items-center">
                <span className="font-medium">Business Cards</span>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">35%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Flyers</span>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">28%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Photo Prints</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">22%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Brochures</span>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">15%</Badge>
              </div>
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
              <div className="flex justify-between items-center">
                <span className="font-medium">Business Cards</span>
                <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$90.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Posters</span>
                <span className="font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">$85.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Brochures</span>
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$62.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Photo Prints</span>
                <span className="font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">$37.75</span>
              </div>
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
                <TableHead>Job Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistoryData.map((job) => (
                <TableRow key={job.id} className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50">
                  <TableCell className="text-muted-foreground">{job.date}</TableCell>
                  <TableCell className="font-medium">{job.customerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                      {job.jobType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.quantity}</TableCell>
                  <TableCell className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${job.earnings.toFixed(2)}
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