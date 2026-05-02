import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Stack } from '@mui/material';
import { BarChart, LineChart, PieChart, Gauge } from '@mui/x-charts';

const salesData = [
  { month: 'Jan', revenue: 12500, orders: 420 },
  { month: 'Feb', revenue: 15200, orders: 510 },
  { month: 'Mar', revenue: 18400, orders: 620 },
  { month: 'Apr', revenue: 16700, orders: 580 },
  { month: 'May', revenue: 20100, orders: 790 },
  { month: 'Jun', revenue: 22300, orders: 850 },
];

const categoryData = [
  { id: 0, value: 35, label: 'Electronics', color: '#3b82f6' },
  { id: 1, value: 28, label: 'Clothing', color: '#10b981' },
  { id: 2, value: 22, label: 'Home & Living', color: '#f59e0b' },
  { id: 3, value: 15, label: 'Books', color: '#ef4444' },
];

const ReportsPage = () => {
  return (
    <Box width="100%" sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Analytics & Reports
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Total Revenue
              </Typography>
              <Typography variant="h4">$105,200</Typography>
              <Typography variant="body2" color="success.main">
                +23% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">3,770</Typography>
              <Typography variant="body2" color="success.main">
                +18% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4">3.2%</Typography>
              <Typography variant="body2" color="error.main">
                -0.5% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Avg. Order Value
              </Typography>
              <Typography variant="h4">$27.90</Typography>
              <Typography variant="body2" color="success.main">
                +5% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bar & Line Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue & Orders
              </Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <BarChart
                  xAxis={[{ data: salesData.map(d => d.month), scaleType: 'band', label: 'Month' }]}
                  series={[
                    { data: salesData.map(d => d.revenue), label: 'Revenue ($)', color: '#3b82f6' },
                    { data: salesData.map(d => d.orders), label: 'Orders', color: '#10b981' },
                  ]}
                  height={350}
                  slotProps={{ legend: { direction: 'row', position: { vertical: 'top', horizontal: 'right' } } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales Trend (Line Chart)
              </Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <LineChart
                  xAxis={[{ data: salesData.map(d => d.month), scaleType: 'point', label: 'Month' }]}
                  series={[
                    { data: salesData.map(d => d.revenue), label: 'Revenue ($)', color: '#f59e0b', curve: 'natural' },
                  ]}
                  height={350}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Chart & Gauges */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <PieChart
                  series={[{ data: categoryData, highlightScope: { faded: 'global', highlighted: 'item' } }]}
                  height={250}
                  slotProps={{ legend: { direction: 'row', position: { vertical: 'bottom', horizontal: 'middle' } } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Gauges
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="space-around" alignItems="center">
                <Box textAlign="center">
                  <Gauge value={85} valueMin={0} valueMax={100} text="85%" />
                  <Typography variant="body2">Goal Completion</Typography>
                </Box>
                <Box textAlign="center">
                  <Gauge value={62} valueMin={0} valueMax={100} text="62%" />
                  <Typography variant="body2">Customer Satisfaction</Typography>
                </Box>
                <Box textAlign="center">
                  <Gauge value={94} valueMin={0} valueMax={100} text="94%" />
                  <Typography variant="body2">System Uptime</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;