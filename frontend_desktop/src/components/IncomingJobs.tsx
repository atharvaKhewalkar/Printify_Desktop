import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Eye, Check, Settings, User, Clock, FileText, TrendingUp } from "lucide-react"

const mockIncomingJobs = [
  { id: 1, customerName: "John Smith", timeReceived: "10:30 AM", printOptions: "Color, Double-sided, 5 copies", priority: "Standard", fileSize: "2.4 MB" },
  { id: 2, customerName: "Sarah Johnson", timeReceived: "11:15 AM", printOptions: "B/W, Single-sided, 10 copies", priority: "Urgent", fileSize: "1.8 MB" },
  { id: 3, customerName: "Mike Wilson", timeReceived: "11:45 AM", printOptions: "Color, Single-sided, 3 copies", priority: "Standard", fileSize: "5.2 MB" },
  { id: 4, customerName: "Emma Davis", timeReceived: "12:20 PM", printOptions: "B/W, Double-sided, 8 copies", priority: "High", fileSize: "3.1 MB" },
  { id: 5, customerName: "James Anderson", timeReceived: "1:10 PM", printOptions: "Color, Single-sided, 15 copies", priority: "Urgent", fileSize: "4.7 MB" },
  { id: 6, customerName: "Lisa Garcia", timeReceived: "1:45 PM", printOptions: "B/W, Double-sided, 20 copies", priority: "Standard", fileSize: "2.9 MB" },
  { id: 7, customerName: "Robert Taylor", timeReceived: "2:15 PM", printOptions: "Color, Double-sided, 7 copies", priority: "High", fileSize: "6.1 MB" },
  { id: 8, customerName: "Jennifer Lee", timeReceived: "2:30 PM", printOptions: "B/W, Single-sided, 12 copies", priority: "Standard", fileSize: "1.5 MB" },
  { id: 9, customerName: "David Brown", timeReceived: "3:00 PM", printOptions: "Color, Single-sided, 25 copies", priority: "Urgent", fileSize: "8.2 MB" },
  { id: 10, customerName: "Maria Rodriguez", timeReceived: "3:20 PM", printOptions: "B/W, Double-sided, 6 copies", priority: "High", fileSize: "3.4 MB" },
  { id: 11, customerName: "Michael Kim", timeReceived: "3:45 PM", printOptions: "Color, Single-sided, 9 copies", priority: "Standard", fileSize: "4.8 MB" },
  { id: 12, customerName: "Ashley White", timeReceived: "4:10 PM", printOptions: "B/W, Single-sided, 18 copies", priority: "High", fileSize: "2.1 MB" },
  { id: 13, customerName: "Daniel Martinez", timeReceived: "4:30 PM", printOptions: "Color, Double-sided, 4 copies", priority: "Urgent", fileSize: "5.6 MB" },
  { id: 14, customerName: "Jessica Thompson", timeReceived: "4:50 PM", printOptions: "B/W, Double-sided, 14 copies", priority: "Standard", fileSize: "3.7 MB" },
  { id: 15, customerName: "Christopher Miller", timeReceived: "5:15 PM", printOptions: "Color, Single-sided, 11 copies", priority: "High", fileSize: "7.3 MB" },
  { id: 16, customerName: "Amanda Wilson", timeReceived: "5:30 PM", printOptions: "B/W, Single-sided, 22 copies", priority: "Standard", fileSize: "2.8 MB" },
  { id: 17, customerName: "Matthew Davis", timeReceived: "5:45 PM", printOptions: "Color, Double-sided, 8 copies", priority: "Urgent", fileSize: "6.9 MB" },
  { id: 18, customerName: "Lauren Moore", timeReceived: "6:00 PM", printOptions: "B/W, Double-sided, 16 copies", priority: "High", fileSize: "4.2 MB" },
  { id: 19, customerName: "Kevin Johnson", timeReceived: "6:20 PM", printOptions: "Color, Single-sided, 13 copies", priority: "Standard", fileSize: "5.1 MB" },
  { id: 20, customerName: "Nicole Clark", timeReceived: "6:35 PM", printOptions: "B/W, Single-sided, 19 copies", priority: "Urgent", fileSize: "3.6 MB" },
  { id: 21, customerName: "Andrew Lewis", timeReceived: "6:50 PM", printOptions: "Color, Double-sided, 6 copies", priority: "High", fileSize: "4.5 MB" },
  { id: 22, customerName: "Stephanie Hall", timeReceived: "7:10 PM", printOptions: "B/W, Double-sided, 24 copies", priority: "Standard", fileSize: "2.3 MB" }
]

export function IncomingJobs() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockIncomingJobs.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentJobs = mockIncomingJobs.slice(startIndex, endIndex)

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
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Jobs Today</p>
                <div className="text-2xl font-bold">12</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent Priority</p>
                <div className="text-2xl font-bold text-destructive">3</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                <div className="text-2xl font-bold text-success">8 min</div>
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
                <TableHead>File Size</TableHead>
                <TableHead>Priority</TableHead>
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
                      {job.customerName}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.timeReceived}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      {job.printOptions}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{job.fileSize}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={job.priority === "Urgent" ? "destructive" : job.priority === "High" ? "secondary" : "outline"}
                      className={
                        job.priority === "Urgent" ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-0" :
                        job.priority === "High" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0" :
                        "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                      }
                    >
                      {job.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-blue-100 hover:text-blue-700">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="ghost" className="hover:bg-green-100 hover:text-green-700">
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