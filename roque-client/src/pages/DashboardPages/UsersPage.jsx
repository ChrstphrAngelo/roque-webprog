import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Stack, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const initialRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2025-04-28' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '2025-04-30' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', lastActive: '2025-04-15' },
  { id: 4, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com', role: 'Editor', status: 'Active', lastActive: '2025-05-01' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Suspended', lastActive: '2025-03-20' },
];

const statusColors = { Active: 'success', Inactive: 'default', Suspended: 'error' };

const UsersPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: 'Viewer', status: 'Active' });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130, editable: true },
    { field: 'lastName', headerName: 'Last Name', width: 130, editable: true },
    { field: 'email', headerName: 'Email', width: 220, editable: true },
    { field: 'role', headerName: 'Role', width: 120, renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" /> },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => <Chip label={params.value} color={statusColors[params.value]} size="small" /> },
    { field: 'lastActive', headerName: 'Last Active', width: 130 },
    {field: 'actions', headerName: 'Actions', width: 120, sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEdit(params.row)}><EditIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDelete(params.row.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title={params.row.status === 'Active' ? 'Suspend' : 'Activate'}>
            <IconButton size="small" onClick={() => toggleUserStatus(params.row.id)}>
              {params.row.status === 'Active' ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleEdit = (user) => { setEditingUser(user); setFormData(user); setOpenDialog(true); };
  const handleDelete = (id) => { if (window.confirm('Delete user?')) setRows(rows.filter(row => row.id !== id)); };
  const toggleUserStatus = (id) => setRows(rows.map(row => row.id === id ? { ...row, status: row.status === 'Active' ? 'Suspended' : 'Active' } : row));
  const handleOpenAdd = () => { setEditingUser(null); setFormData({ firstName: '', lastName: '', email: '', role: 'Viewer', status: 'Active' }); setOpenDialog(true); };
  const handleCloseDialog = () => { setOpenDialog(false); setEditingUser(null); };
  const handleSaveUser = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return alert('Fill all fields');
    if (editingUser) setRows(rows.map(row => row.id === editingUser.id ? { ...row, ...formData } : row));
    else setRows([...rows, { id: Math.max(...rows.map(r => r.id), 0) + 1, ...formData, lastActive: new Date().toISOString().slice(0,10) }]);
    handleCloseDialog();
  };
  const handleProcessRowUpdate = (newRow, oldRow) => { setRows(rows.map(row => row.id === newRow.id ? newRow : row)); return newRow; };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAdd}>Add User</Button>
      </Stack>
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5,10,25]} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} checkboxSelection disableRowSelectionOnClick processRowUpdate={handleProcessRowUpdate} />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField label="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName:e.target.value})} fullWidth required />
            <TextField label="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName:e.target.value})} fullWidth required />
            <TextField label="Email" value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} fullWidth required />
            <TextField select label="Role" value={formData.role} onChange={e => setFormData({...formData, role:e.target.value})} fullWidth SelectProps={{ native: true }}>
              {['Admin','Editor','Viewer'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </TextField>
            <TextField select label="Status" value={formData.status} onChange={e => setFormData({...formData, status:e.target.value})} fullWidth SelectProps={{ native: true }}>
              {['Active','Inactive','Suspended'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions><Button onClick={handleCloseDialog}>Cancel</Button><Button variant="contained" onClick={handleSaveUser}>Save</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;