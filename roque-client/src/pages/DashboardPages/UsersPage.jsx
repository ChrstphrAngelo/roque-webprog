import { useState, useMemo, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';

const types = ['admin', 'editor', 'viewer'];
const genders = ['Male', 'Female'];

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  type: 'viewer',
  username: '',
  password: '',
  address: '',
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [apiError, setApiError] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      setApiError('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const isFiltering = search || filterType || filterStatus;

  const clearFilters = () => {
    setSearch('');
    setFilterType('');
    setFilterStatus('');
  };

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((user) => {
      if (
        q &&
        !['firstName', 'lastName', 'email', 'username'].some((key) =>
          (user[key] || '').toLowerCase().includes(q)
        )
      )
        return false;
      if (filterType && user.type !== filterType) return false;
      if (filterStatus === 'active' && !user.isActive) return false;
      if (filterStatus === 'inactive' && user.isActive) return false;
      return true;
    });
  }, [users, search, filterType, filterStatus]);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({ ...blankForm });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    setErrors({});
    setShowPassword(false);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: '' });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const validate = () => {
    const nextErrors = {};
    const email = (newUser.email || '').trim().toLowerCase();
    const username = (newUser.username || '').trim().toLowerCase();

    [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['age', 'Age'],
      ['gender', 'Gender'],
      ['contactNumber', 'Contact number'],
      ['email', 'Email'],
      ['type', 'Type'],
      ['username', 'Username'],
      ['address', 'Address'],
    ].forEach(([key, label]) => {
      if (!String(newUser[key] || '').trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!isEditing && !newUser.password) {
      nextErrors.password = 'Password is required.';
    }

    if (!nextErrors.age && !/^\d+$/.test(String(newUser.age).trim())) {
      nextErrors.age = 'Age must be a number.';
    }

    if (!nextErrors.contactNumber && !/^\d{11}$/.test(String(newUser.contactNumber).trim())) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!nextErrors.email && users.some((u) => u._id !== editUserId && u.email === email)) {
      nextErrors.email = 'Email address already exists.';
    }

    if (!nextErrors.username && /\s/.test(newUser.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    }

    if (!nextErrors.username && users.some((u) => u._id !== editUserId && u.username === username)) {
      nextErrors.username = 'Username already exists.';
    }

    if (!isEditing && newUser.password && newUser.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSaveUser = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      if (isEditing) {
        const updatedUser = { ...newUser };
        if (!updatedUser.password) {
          delete updatedUser.password;
        }
        await updateUser(editUserId, updatedUser);
      } else {
        await createUser(newUser);
      }
      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
      setApiError(error.response?.data?.message || 'Error saving user.');
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: newUser[name] ?? '',
    onChange: (e) => setNewUser({ ...newUser, [name]: e.target.value }),
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    variant: 'standard',
    ...extra,
  });

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      valueGetter: (value, params) =>
        `${params.firstName || ''} ${params.lastName || ''}`,
    },
    { field: 'age', headerName: 'Age', flex: 1, sortable: true },
    { field: 'gender', headerName: 'Gender', flex: 1, sortable: true },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1, sortable: true },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
            color="primary"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        sx={{ marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h2" fontWeight="bold">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

      {/* Search & Filter Bar */}
      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          alignItems={{ sm: 'center' }}
          flexWrap="wrap"
        >
          <TextField
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ flex: 2, minWidth: 220 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            select
            label="Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 130 }}
          >
            <MenuItem value="">All Types</MenuItem>
            <Divider />
            {types.map((t) => (
              <MenuItem key={t} value={t}>{labelize(t)}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 130 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <Divider />
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          {isFiltering && (
            <Button size="small" variant="text" color="inherit" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </Stack>
      </Paper>

      {/* Data Grid */}
      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            pageSizeOptions={[10, 20, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            disableRowSelectionOnClick
          />
        )}
      </Box>

      {/* Modal for Add/Edit User */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('firstName', 'Enter first name')} />
              <TextField {...fieldProps('lastName', 'Enter last name')} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField {...fieldProps('age', 'Enter age')} />
              <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </TextField>
            </Stack>
            <TextField {...fieldProps('contactNumber', 'Enter mobile')} />
            <TextField {...fieldProps('address', 'Enter address')} />
            <TextField {...fieldProps('email', 'Enter email', { type: 'email' })} />
            <TextField {...fieldProps('type', 'Type', { select: true })}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </TextField>
            <TextField {...fieldProps('username', 'Enter username')} />
            <TextField
              {...fieldProps('password', 'Enter password', {
                type: showPassword ? 'text' : 'password',
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.isActive}
                  onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
                  color="primary"
                />
              }
              label={newUser.isActive ? 'Active' : 'Inactive'}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveUser}>
            {isEditing ? 'Save Changes' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersPage;
