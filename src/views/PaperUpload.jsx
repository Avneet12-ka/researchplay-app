
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Paper, Box, Button, LinearProgress } from '@mui/material';
import { addPaper } from '../store/papersSlice';

export default function PaperUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    dispatch(addPaper({
      id: Date.now(),
      title: file.name,
      uploadDate: new Date().toISOString(),
      size: file.size
    }));
    
    setUploading(false);
    setFile(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upload Research Paper
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileSelect}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              Select File
            </Button>
          </label>
          {file && (
            <Typography variant="body1">
              Selected: {file.name}
            </Typography>
          )}
          {uploading && <LinearProgress />}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            Upload Paper
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
