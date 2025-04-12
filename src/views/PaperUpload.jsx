
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Paper, Box, Button, LinearProgress, Alert } from '@mui/material';
import { addPaper } from '../store/papersSlice';

export default function PaperUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ success: false, message: '' });
  const dispatch = useDispatch();

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus({ success: false, message: '' });
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    try {
      // Create a paper object
      const paper = {
        id: Date.now(),
        title: file.name,
        uploadDate: new Date().toISOString(),
        size: file.size
      };

      // Store in Supabase
      const { data, error } = await supabase
        .from('papers')
        .insert([paper])
        .select();

      if (error) throw error;

      // Update Redux state with the inserted paper
      dispatch(addPaper(data[0]));
      
      setUploadStatus({ 
        success: true, 
        message: 'Paper uploaded successfully!' 
      });
      setFile(null);
    } catch (error) {
      setUploadStatus({ 
        success: false, 
        message: 'Failed to upload paper. Please try again.' 
      });
    } finally {
      setUploading(false);
    }
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
          {uploadStatus.message && (
            <Alert severity={uploadStatus.success ? "success" : "error"}>
              {uploadStatus.message}
            </Alert>
          )}
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
