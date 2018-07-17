import React from 'react';
import AdminControl from'./partials/AdminControl';
import AdminTable from'./partials/AdminTable';

class AdminPage extends React.Component {
    render() {
        return (
            <main className="container-fluid">
                <h4>Admin</h4>
                <AdminControl/>
                <AdminTable/>
            </main>
        );
    }
}

export default AdminPage;
