import React from 'react';
import NavigationBar from '../components/navegation_bar';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <NavigationBar /> 
            </nav>
            <main className="main-content">
            <iframe title="TEST" width="1024" height="1060" src="https://app.powerbi.com/view?r=eyJrIjoiYzEwMjU3NTktNmI3Mi00MjBkLWEzZWItNjZmMmU4OGY1ZTg4IiwidCI6ImI0YTQwNTQ1LTc3NzktNGIzOC1hZmY3LTFmMTczOGY4MDg0MCIsImMiOjR9" frameborder="0" allowFullScreen="true"></iframe>
            </main>
        </div>
    );
};

export default Dashboard;
