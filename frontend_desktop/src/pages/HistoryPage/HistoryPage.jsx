import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import HistoryTable from './HistoryTable';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- MOCK DATA FOR HISTORY ---
const mockHistory = [
  { id: 'job-001', customerName: 'Alice Johnson', jobType: 'B/W Document', dateCompleted: '2025-07-28', earning: 150.00 },
  { id: 'job-003', customerName: 'Charlie Brown', jobType: 'Color Brochure', dateCompleted: '2025-07-29', earning: 750.50 },
  { id: 'job-007', customerName: 'Grace Lee', jobType: 'B/W Document', dateCompleted: '2025-07-30', earning: 200.00 },
  { id: 'job-008', customerName: 'Henry Scott', jobType: 'Photo Prints', dateCompleted: '2025-08-01', earning: 1200.75 },
];
// --- END MOCK ---

const HistoryPage = () => {
    // In a real app, you'd fetch this data
    const completedJobs = mockHistory;
    
    const totalRevenue = completedJobs.reduce((acc, job) => acc + job.earning, 0);
    const totalJobs = completedJobs.length;

    // Prepare data for the chart
    const chartData = completedJobs.map(job => ({
        name: new Date(job.dateCompleted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        Earning: job.earning,
    }));

    return (
        <div className="flex flex-col gap-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-muted-foreground">₹</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
                        <span className="text-muted-foreground">#</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalJobs}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Earnings Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                                <YAxis stroke="#888888" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Earning']} />
                                <Bar dataKey="Earning" fill="currentColor" className="fill-primary" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Completed Jobs</CardTitle>
                        <CardDescription>A detailed list of all past jobs.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <HistoryTable completedJobs={completedJobs} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HistoryPage;