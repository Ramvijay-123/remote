import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaTasks, FaProjectDiagram, FaUser } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { getTaskCounts, getProjectCount, getUserDetails, getTaskOfOneYear } from '../apiService';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './css/AssignTask.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const SparkLineChart = ({ data }) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <Sparklines data={data} margin={5}>
                <SparklinesLine color="blue" />
            </Sparklines>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                {months.map((month, index) => (
                    <div key={index} style={{ width: `${100 / months.length}%`, textAlign: 'center' }}>
                        {month}
                    </div>
                ))}
            </div>
        </div>
    );
};
const Dashboard = ({ token, userId }) => {
    const [taskCounts, setTaskCounts] = useState({ complete: 0, incomplete: 0, pending: 0 });
    const [projectCount, setProjectCount] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [taskCountsByMonth, setTaskCountsByMonth] = useState([]);
    const [ratios, setRatios] = useState(Array(12).fill(0));
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getTaskCounts(token, userId);
                const { complete, incomplete, pending } = tasks;
                setTaskCounts({ complete, incomplete, pending });

                const taskCountsByMonth = await getTaskOfOneYear(token, userId);
                setTaskCountsByMonth(taskCountsByMonth);

                const totalTasks = taskCountsByMonth.map(monthData => monthData.total);
                const completedTasks = taskCountsByMonth.map(monthData => monthData.complete);
                const ratios = totalTasks.map((total, index) => total === 0 ? 0 : (completedTasks[index] / total) * 100);
                setRatios(ratios);
                const projectsResponse = await getProjectCount(token, userId);
                setProjectCount(projectsResponse);
                const userResponse = await getUserDetails(token, userId);
                setUserDetails(userResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, userId]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    const totalTasks = taskCounts.complete + taskCounts.incomplete + taskCounts.pending;
    const pieData = {
        labels: ['Completed Tasks', 'Incomplete Tasks', 'Pending'],
        datasets: [
            {
                label: 'Tasks',
                data: [taskCounts.complete, taskCounts.incomplete, taskCounts.pending],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                borderWidth: 1,
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className="container bg-black vh-100 ml-0 mr-0 pl-0 pr-0">
            <h2 className="text-center mb-4 text-white mt-4">Dashboard</h2>
            <div className="row">
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center mb-4">
                                <FaUser size={30} className="text-info me-3" />
                                <h3 className="card-title mb-0">User Details</h3>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <h1>Welcome, {userDetails.name}!</h1>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <Avatar name={userDetails.name} size="50" round className="me-3" />
                                <div>
                                    <p className="card-text mb-1"><strong>Name:</strong> {userDetails.name}</p>
                                    <p className="card-text"><strong>Email:</strong> {userDetails.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <FaTasks size={40} className="text-primary mb-3" />
                            <h5 className="card-title">Task Overview</h5>
                            {totalTasks === 0 ?
                                <h1 className='text-warning'>No Tasks Assigned</h1>
                                : <div className="pie-chart-container">
                                    <Pie
                                        data={pieData}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: { position: 'top' },
                                                tooltip: {
                                                    callbacks: {
                                                        label: (context) => `${context.label}: ${context.raw}`
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            }
                            <p className="mt-3">Total Tasks: {totalTasks}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body d-flex flex-column align-items-center">
                            <div className="d-flex align-items-center mb-4">
                                <FaProjectDiagram size={20} className="text-success me-3" />
                                <h3 className="card-title mb-0">Project Count</h3>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <h2 className="card-title mb-0">{projectCount}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md-6 d-flex ">
                    <div className="card d-flex w-50  mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Monthly Task Count (Total)</h5>
                            <SparkLineChart data={taskCountsByMonth.map(monthData => monthData.total)} />
                        </div>
                        </div>
                        <div className="card d-flex w-50  mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Monthly Task Count (Completed)%</h5>
                            <SparkLineChart data={taskCountsByMonth.map(monthData => monthData.complete)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
