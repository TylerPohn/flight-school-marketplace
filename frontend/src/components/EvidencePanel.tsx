import { Paper, Typography, Box, Chip, LinearProgress, Divider } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface VerificationDetails {
  trustTier: string;
  verificationTimestamp: string;
  dataSources: string[];
  lastUpdated: string;
  fspSignals?: {
    avgHoursToPPL: number;
    scheduleConsistency: number;
    instructorReliability: number;
  };
}

interface EvidencePanelProps {
  verificationDetails: VerificationDetails;
}

export function EvidencePanel({ verificationDetails }: EvidencePanelProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Premier':
        return '#FFD700';
      case 'Verified FSP':
        return '#4CAF50';
      case 'Community-Verified':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Premier':
        return <EmojiEventsIcon />;
      case 'Verified FSP':
        return <VerifiedIcon />;
      case 'Community-Verified':
        return <GroupsIcon />;
      default:
        return <HelpOutlineIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const tierColor = getTierColor(verificationDetails.trustTier);

  return (
    <Paper
      sx={{
        p: 3,
        borderLeft: `4px solid ${tierColor}`,
        backgroundColor: 'background.paper',
        boxShadow: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ color: tierColor, mr: 1, display: 'flex', alignItems: 'center' }}>
          {getTierIcon(verificationDetails.trustTier)}
        </Box>
        <Typography variant="h6" component="div">
          Trust & Verification
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Chip
          label={verificationDetails.trustTier}
          sx={{
            backgroundColor: tierColor,
            color: '#fff',
            fontWeight: 'bold',
            mb: 1
          }}
        />
        <Typography variant="body2" color="text.secondary">
          Verified on {formatDate(verificationDetails.verificationTimestamp)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last updated: {formatDate(verificationDetails.lastUpdated)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight="bold">
          Data Sources
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {verificationDetails.dataSources.map((source, index) => (
            <Chip
              key={index}
              label={source}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>

      {verificationDetails.fspSignals && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              FSP Performance Signals
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Avg Hours to PPL</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {verificationDetails.fspSignals.avgHoursToPPL} hrs
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Industry average: 70-80 hours
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Schedule Consistency</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {verificationDetails.fspSignals.scheduleConsistency}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={verificationDetails.fspSignals.scheduleConsistency}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: 'grey.300',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: verificationDetails.fspSignals.scheduleConsistency >= 80 ? '#4CAF50' : '#FFA726'
                  }
                }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2">Instructor Reliability</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {verificationDetails.fspSignals.instructorReliability}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={verificationDetails.fspSignals.instructorReliability}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: 'grey.300',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: verificationDetails.fspSignals.instructorReliability >= 80 ? '#4CAF50' : '#FFA726'
                  }
                }}
              />
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
}
