import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Pause, Square, Check, Printer, Activity, Clock, Zap, CheckCircle } from "lucide-react"

const mockQueueJobs = [
  { id: 1, customerName: "Alice Brown", status: "Printing", targetPrinter: "HP LaserJet Pro 1", eta: "5 min", progress: 65, jobType: "Color Brochures" },
  { id: 2, customerName: "Bob Chen", status: "Queued", targetPrinter: "Canon ImageClass 2", eta: "12 min", progress: 0, jobType: "B/W Documents" },
  { id: 3, customerName: "Carol White", status: "Printing", targetPrinter: "Epson EcoTank 1", eta: "8 min", progress: 30, jobType: "Photo Prints" },
  { id: 4, customerName: "David Lee", status: "Paused", targetPrinter: "HP LaserJet Pro 1", eta: "On Hold", progress: 45, jobType: "Business Cards" },
  { id: 5, customerName: "Eva Martinez", status: "Ready", targetPrinter: "Canon ImageClass 2", eta: "Completed", progress: 100, jobType: "Flyers" },
  { id: 6, customerName: "Frank Wilson", status: "Printing", targetPrinter: "HP LaserJet Pro 2", eta: "3 min", progress: 80, jobType: "Reports" },
  { id: 7, customerName: "Grace Taylor", status: "Queued", targetPrinter: "Epson EcoTank 2", eta: "15 min", progress: 0, jobType: "Posters" },
  { id: 8, customerName: "Henry Rodriguez", status: "Printing", targetPrinter: "Canon ImageClass 1", eta: "6 min", progress: 25, jobType: "Invoices" },
  { id: 9, customerName: "Isabel Garcia", status: "Ready", targetPrinter: "HP LaserJet Pro 1", eta: "Completed", progress: 100, jobType: "Certificates" },
  { id: 10, customerName: "Jack Thompson", status: "Queued", targetPrinter: "Epson EcoTank 1", eta: "20 min", progress: 0, jobType: "Banners" },
  { id: 11, customerName: "Kate Anderson", status: "Printing", targetPrinter: "Canon ImageClass 2", eta: "4 min", progress: 70, jobType: "Proposals" },
  { id: 12, customerName: "Luis Martinez", status: "Paused", targetPrinter: "HP LaserJet Pro 2", eta: "On Hold", progress: 60, jobType: "Presentations" },
  { id: 13, customerName: "Maya Johnson", status: "Ready", targetPrinter: "Epson EcoTank 2", eta: "Completed", progress: 100, jobType: "Marketing Materials" },
  { id: 14, customerName: "Nathan Davis", status: "Printing", targetPrinter: "Canon ImageClass 1", eta: "7 min", progress: 40, jobType: "Legal Documents" },
  { id: 15, customerName: "Olivia Brown", status: "Queued", targetPrinter: "HP LaserJet Pro 1", eta: "18 min", progress: 0, jobType: "Training Manuals" },
  { id: 16, customerName: "Paul Wilson", status: "Printing", targetPrinter: "Epson EcoTank 1", eta: "2 min", progress: 90, jobType: "Contracts" },
  { id: 17, customerName: "Quinn Lee", status: "Ready", targetPrinter: "Canon ImageClass 2", eta: "Completed", progress: 100, jobType: "Newsletters" },
  { id: 18, customerName: "Rachel Miller", status: "Queued", targetPrinter: "HP LaserJet Pro 2", eta: "25 min", progress: 0, jobType: "Event Programs" },
  { id: 19, customerName: "Samuel Clark", status: "Printing", targetPrinter: "Epson EcoTank 2", eta: "9 min", progress: 15, jobType: "Technical Specs" },
  { id: 20, customerName: "Tina Rodriguez", status: "Paused", targetPrinter: "Canon ImageClass 1", eta: "On Hold", progress: 35, jobType: "Product Catalogs" },
  { id: 21, customerName: "Victor Martinez", status: "Ready", targetPrinter: "HP LaserJet Pro 1", eta: "Completed", progress: 100, jobType: "Safety Manuals" },
  { id: 22, customerName: "Wendy Thompson", status: "Queued", targetPrinter: "Epson EcoTank 1", eta: "30 min", progress: 0, jobType: "Annual Reports" },
  { id: 23, customerName: "Xavier Davis", status: "Printing", targetPrinter: "Canon ImageClass 2", eta: "1 min", progress: 95, jobType: "Quick Reference" },
  { id: 24, customerName: "Yara Johnson", status: "Ready", targetPrinter: "HP LaserJet Pro 2", eta: "Completed", progress: 100, jobType: "User Guides" }
]

export function PrintQueue() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(mockQueueJobs.length / itemsPerPage)
  
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentJobs = mockQueueJobs.slice(startIndex, endIndex)

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
                <div className="text-2xl font-bold">{mockQueueJobs.length}</div>
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
                <div className="text-2xl font-bold text-success">
                  {mockQueueJobs.filter(job => job.status === "Printing").length}
                </div>
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
                <div className="text-2xl font-bold text-accent-foreground">
                  {mockQueueJobs.filter(job => job.status === "Ready").length}
                </div>
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
                <TableHead>Printer</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50">
                  <TableCell className="font-medium">{job.customerName}</TableCell>
                  <TableCell>
                    <Badge className={
                      job.status === "Printing" ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0" :
                      job.status === "Ready" ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0" :
                      job.status === "Paused" ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-0" :
                      "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                    }>
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{job.targetPrinter}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Progress 
                        value={job.progress} 
                        className="w-20 h-2"
                      />
                      <span className="text-xs text-muted-foreground">{job.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.eta}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                      {job.jobType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {job.status === "Printing" && (
                        <Button size="sm" variant="ghost" className="hover:bg-yellow-100 hover:text-yellow-700">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      {job.status !== "Ready" && (
                        <Button size="sm" variant="ghost" className="hover:bg-red-100 hover:text-red-700">
                          <Square className="w-4 h-4" />
                        </Button>
                      )}
                      {job.status === "Ready" && (
                        <Button size="sm" variant="ghost" className="hover:bg-green-100 hover:text-green-700">
                          <Check className="w-4 h-4" />
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