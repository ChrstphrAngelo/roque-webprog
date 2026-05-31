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
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/ArticleService';

const blankForm = {
  title: '',
  name: '',
  image: '',
  content: '',
  isActive: true,
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setApiError('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((article) => {
      if (
        q &&
        !['name', 'title'].some((key) => (article[key] || '').toLowerCase().includes(q))
      )
        return false;
      if (filterStatus === 'active' && !article.isActive) return false;
      if (filterStatus === 'inactive' && article.isActive) return false;
      return true;
    });
  }, [articles, search, filterStatus]);

  const handleOpen = () => {
    setIsEditing(false);
    setForm({ ...blankForm });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditId(null);
    setErrors({});
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setForm({
        title: articleToEdit.title || '',
        name: articleToEdit.name || '',
        image: articleToEdit.image || '',
        content: (articleToEdit.content || []).join('\n'),
        isActive: articleToEdit.isActive,
      });
      setEditId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.content.trim()) nextErrors.content = 'At least one paragraph is required.';
    return nextErrors;
  };

  const handleSave = async () => {
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      name: form.name.trim() || form.title.trim(),
      image: form.image.trim(),
      content: form.content, // backend splits by newline into paragraphs
      isActive: form.isActive,
    };

    try {
      if (isEditing) {
        await updateArticle(editId, payload);
      } else {
        await createArticle(payload);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
      setApiError(error.response?.data?.message || 'Error saving article.');
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateArticle(id, { isActive: !isActive });
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article? This cannot be undone.')) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      setApiError(error.response?.data?.message || 'Error deleting article.');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Slug', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1.5 },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      flex: 0.7,
      valueGetter: (value, row) => (row.content ? row.content.length : 0),
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 2,
      valueGetter: (value, row) => (row.content && row.content[0]) || '',
      renderCell: ({ value }) => (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
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
      flex: 1.3,
      sortable: false,
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button variant="contained" size="small" onClick={() => handleEdit(row._id)}>
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
          <Switch
            checked={row.isActive}
            onChange={() => handleToggleActive(row._id, row.isActive)}
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
          onClick={handleOpen}
        >
          Add Article
        </Button>
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError('')}>
          {apiError}
        </Alert>
      )}

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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredArticles}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            pageSizeOptions={[10, 20, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
            disableRowSelectionOnClick
          />
        )}
      </Box>

      {/* Modal for Add/Edit Article */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{isEditing ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              variant="standard"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              error={Boolean(errors.title)}
              helperText={errors.title}
            />
            <TextField
              label="Slug (optional — auto-generated from title)"
              fullWidth
              variant="standard"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Image URL (optional)"
              fullWidth
              variant="standard"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <TextField
              label="Content (one paragraph per line)"
              fullWidth
              multiline
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              error={Boolean(errors.content)}
              helperText={errors.content || 'Each line becomes a separate paragraph.'}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Switch
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                color="primary"
              />
              <Typography>{form.isActive ? 'Active' : 'Inactive'}</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            {isEditing ? 'Save Changes' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashArticleListPage;
