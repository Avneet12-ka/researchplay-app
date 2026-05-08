import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  LinearProgress,
  Alert,
} from '@mui/material';
import { addPaper } from '../store/papersSlice';
import { supabase, supabaseConfigured } from '../supabaseClient';

const MAX_SIZE_BYTES = 20 * 1024 * 1024;

function stripExtension(name) {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(0, dot) : name;
}

function sanitizeForPath(name) {
  return name.replace(/[^\w.\-]+/g, '_');
}

export default function PaperUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ severity: null, message: '' });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);

  const handleFileSelect = (e) => {
    const selected = e.target.files[0] || null;
    setFile(selected);
    setUploadStatus({ severity: null, message: '' });
  };

  const handleUpload = async () => {
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setUploadStatus({ severity: 'error', message: 'Only PDF files are supported.' });
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setUploadStatus({
        severity: 'error',
        message: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 20 MB.`,
      });
      return;
    }

    setUploading(true);
    setUploadStatus({ severity: null, message: '' });

    const ownerId = user?.id || 'anon';
    const path = `${ownerId}/${Date.now()}-${sanitizeForPath(file.name)}`;

    try {
      const { error: storageError } = await supabase.storage
        .from('papers')
        .upload(path, file, {
          cacheControl: '3600',
          contentType: 'application/pdf',
          upsert: false,
        });

      if (storageError) {
        console.error('Storage upload failed:', storageError);
        setUploadStatus({
          severity: 'error',
          message: `Could not upload PDF to storage: ${storageError.message}`,
        });
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('papers').getPublicUrl(path);
      const fileUrl = publicUrlData?.publicUrl;

      const row = {
        title: stripExtension(file.name),
        file_name: file.name,
        file_url: fileUrl,
        file_size: file.size,
        uploaded_at: new Date().toISOString(),
        user_id: user?.id || null,
      };

      const { data, error: insertError } = await supabase
        .from('papers')
        .insert([row])
        .select();

      if (insertError) {
        console.error('Insert into papers failed:', insertError);
        setUploadStatus({
          severity: 'error',
          message: `PDF uploaded, but saving metadata failed: ${insertError.message}`,
        });
        return;
      }

      dispatch(addPaper(data[0]));
      setUploadStatus({ severity: 'success', message: 'Paper uploaded successfully!' });
      setFile(null);
    } catch (err) {
      console.error('Unexpected upload error:', err);
      setUploadStatus({
        severity: 'error',
        message: 'Unexpected error during upload. See console for details.',
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

      {!supabaseConfigured && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Upload requires Supabase configuration. Contact the admin to enable uploads.
          The reader still works without it.
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileSelect}
            disabled={!supabaseConfigured}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span" disabled={!supabaseConfigured}>
              Select PDF
            </Button>
          </label>
          {file && <Typography variant="body1">Selected: {file.name}</Typography>}
          {uploading && <LinearProgress />}
          {uploadStatus.message && (
            <Alert severity={uploadStatus.severity || 'info'}>{uploadStatus.message}</Alert>
          )}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!file || uploading || !supabaseConfigured}
          >
            Upload Paper
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
