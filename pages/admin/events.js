import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import useSWR from 'swr';

import Layout from '@/components/layouts/AdminLayout';
import Sidebar from '@/components/admin/Sidebar';
import DialogWindow from '@/components/DialogWindow';
import New from '@/components/admin/events/New';
import List from '@/components/admin/events/List';

export default function Events() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { data, error, isLoading, mutate } = useSWR('/api/events?page=' + page);

  const handleClose = () => {
    setOpen(false);
    mutate();
  };

  return (
    <Layout>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
        <Box>
          <Sidebar />
        </Box>
        <Box p={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Events</Typography>
            <Button variant="contained" onClick={() => setOpen(true)}>
              New
            </Button>
          </Box>
          <Paper sx={{ mt: 2 }}>
            <List
              data={data?.data.events}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
              mutate={mutate}
              rowCount={data?.data.total || 0}
            />
          </Paper>

          <DialogWindow open={open} onClose={handleClose} title="New Event">
            <New onClose={handleClose} />
          </DialogWindow>
        </Box>
      </Box>
    </Layout>
  );
}
