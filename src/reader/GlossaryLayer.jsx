import { Box, Paper, Tooltip, Typography } from '@mui/material';

function GlossaryTerm({ term, children, definition }) {
  return (
    <Tooltip
      arrow
      placement="top"
      enterDelay={120}
      title={
        <Box sx={{ p: 0.5, maxWidth: 280 }}>
          <Typography variant="caption" sx={{ color: '#fff', fontWeight: 700, letterSpacing: '0.08em' }}>
            {term.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff', mt: 0.5, lineHeight: 1.5 }}>
            {definition}
          </Typography>
        </Box>
      }
    >
      <Box
        component="span"
        sx={{
          borderBottom: '2px dotted #1a237e',
          cursor: 'help',
          color: '#1a237e',
          fontWeight: 500
        }}
      >
        {children}
      </Box>
    </Tooltip>
  );
}

function renderInline(parts, glossary) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>;
    const def = glossary[p.term];
    if (!def) return <span key={i}>{p.text}</span>;
    return (
      <GlossaryTerm key={i} term={p.term} definition={def}>
        {p.text}
      </GlossaryTerm>
    );
  });
}

export default function GlossaryLayer({ paper }) {
  return (
    <Box>
      <Typography variant="body2" sx={{ color: '#607d8b', mb: 3, maxWidth: 720 }}>
        Hover any <Box component="span" sx={{ borderBottom: '2px dotted #1a237e', color: '#1a237e', fontWeight: 500 }}>dotted term</Box> for a plain-language definition. Margin notes flag what a
        sentence is actually claiming. Only the abstract and first two results sections are fully annotated; the pattern is
        the point.
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 260px' },
          gap: { xs: 3, md: 5 },
          alignItems: 'start'
        }}
      >
        <Box>
          {paper.sections.map((section, si) => (
            <Box key={si} sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontFamily: 'Roboto Slab, serif', color: '#1a237e', mb: 2 }}>
                {section.heading}
              </Typography>
              {section.paragraphs.map((para) => (
                <Typography
                  key={para.id}
                  component="p"
                  variant="body1"
                  id={para.id}
                  sx={{ color: '#263238', lineHeight: 1.8, mb: 2, fontSize: '1.02rem' }}
                >
                  {renderInline(para.text, paper.glossary)}
                  {para.marginNote && (
                    <Box
                      component="span"
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        mt: 1.5, p: 1.5, borderLeft: '3px solid #1a237e',
                        backgroundColor: '#f3f4f9', borderRadius: '0 4px 4px 0'
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#1a237e', fontWeight: 700 }}>
                        MARGIN NOTE
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#37474f', mt: 0.5 }}>
                        {paper.marginNotes[para.marginNote]}
                      </Typography>
                    </Box>
                  )}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: 80 }}>
          {Object.entries(paper.marginNotes).map(([id, note]) => (
            <Paper
              key={id}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: '#f3f4f9',
                borderLeft: '3px solid #1a237e',
                borderRadius: '0 4px 4px 0'
              }}
            >
              <Typography variant="caption" sx={{ color: '#1a237e', fontWeight: 700, letterSpacing: '0.08em' }}>
                MARGIN NOTE
              </Typography>
              <Typography variant="body2" sx={{ color: '#37474f', mt: 0.5, lineHeight: 1.6 }}>
                {note}
              </Typography>
              <Box
                component="a"
                href={`#${id}`}
                sx={{
                  display: 'inline-block',
                  mt: 1, fontSize: 12, color: '#1a237e',
                  textDecoration: 'none', borderBottom: '1px dotted #1a237e'
                }}
              >
                jump to sentence ↓
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
