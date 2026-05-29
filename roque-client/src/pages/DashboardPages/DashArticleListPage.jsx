import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import articles from '../../data/article-content';

const initialRows = articles.map((article, index) => ({
  _id: String(index + 1),
  slug: article.name,
  title: article.title,
  paragraphs: article.content.length,
  preview: article.content[0] || '',
  isActive: true,
}));

const DashArticleListPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      if (q && !['slug', 'title'].some((key) => row[key].toLowerCase().includes(q))) return false;
      if (filterStatus === 'active' && !row.isActive) return false;
      if (filterStatus === 'inactive' && row.isActive) return false;
      return true;
    });
  }, [rows, search, filterStatus]);

  const handleToggle = (id) => {
    setRows((prev) =>
      prev.map((row) => (row._id === id ? { ...row, isActive: !row.isActive } : row))
    );
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1.5 },
    { field: 'paragraphs', headerName: 'Paragraphs', flex: 0.7 },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 2,
      renderCell: ({ row }) => (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.preview}
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.7,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.isActive ? 'Active' : 'Inactive'}
          color={row.isActive ? 'success' : 'default'}
          variant={row.isActive ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button variant="contained" size="small">
            Edit
          </Button>
          <Switch
            checked={row.isActive}
            onChange={() => handleToggle(row._id)}
            color="primary"
            size="small"
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h2" fontWeight="bold">
          Articles
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          sx={{ position: 'fixed', right: '20px', top: '100px', zIndex: 1000 }}
        >
          Add Article
        </Button>
      </Stack>

      <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
          <TextField
            placeholder="Search articles…"
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
            label="Status Filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSizeOptions={[10, 20, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default DashArticleListPage;
