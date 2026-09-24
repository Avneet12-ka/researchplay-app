import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import LayerSwitcher from './LayerSwitcher';
import ComicLayer from './ComicLayer';
import SlidesLayer from './SlidesLayer';
import GlossaryLayer from './GlossaryLayer';
import GovernanceLayer from './GovernanceLayer';

const VALID_LAYERS = ['comic', 'slides', 'paper', 'governance'];

function isEmpty(paper, layer) {
  if (layer === 'comic') return !paper.comic?.panels?.length;
  if (layer === 'slides') return !paper.slides?.length;
  if (layer === 'paper') return !paper.paper?.sections?.some((s) => s.paragraphs?.length);
  return !paper.governance?.cards?.length;
}

export default function PaperLayers({ paper, containerSx }) {
  const [layer, setLayer] = useState('comic');

  return (
    <>
      <Box sx={containerSx}>
        <LayerSwitcher active={layer} onChange={(k) => VALID_LAYERS.includes(k) && setLayer(k)} />
      </Box>
      <Box sx={{ ...containerSx, mt: 4, pb: 8 }}>
        {isEmpty(paper, layer) ? (
          <Paper elevation={0} sx={{ p: 4, border: '1px dashed #D8CFBE', textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: '#607d8b' }}>
              This layer hasn’t been written yet.
            </Typography>
          </Paper>
        ) : (
          <>
            {layer === 'comic' && <ComicLayer comic={paper.comic} />}
            {layer === 'slides' && <SlidesLayer key={paper.slides.length} slides={paper.slides} />}
            {layer === 'paper' && <GlossaryLayer paper={paper.paper} />}
            {layer === 'governance' && <GovernanceLayer governance={paper.governance} />}
          </>
        )}
      </Box>
    </>
  );
}
