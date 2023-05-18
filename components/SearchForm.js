import { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Field } from '@opentf/react-form';

export default function SearchForm({ isLoading, initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues || { searchText: '' });

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <Box mb={2}>
      <Box
        component={Form}
        initialValues={values}
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        onSubmit={onSubmit}
      >
        <Box
          name="searchText"
          type='search'
          component={Field}
          sx={{
            width: '40%',
            padding: '15px',
            borderRadius: '20px',
            border: '1px groove lightgrey',
          }}
          placeholder="Search: Try road accidents in chennai"
        />
        <IconButton type="submit">
          {isLoading ? <CircularProgress size={25} /> : <SearchIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
