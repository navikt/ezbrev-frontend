import React from 'react';
import AdminControl from './partials/AdminControl';
import AdminTable from './partials/AdminTable';
import AdminMaskPages from './partials/AdminMaskPages';

export default function AdminPage() {
    return (
        <main className="pageSize">
            <h4>Admin</h4>
            <AdminControl />
            <AdminTable />
            <AdminMaskPages />
        </main>
    );
}
