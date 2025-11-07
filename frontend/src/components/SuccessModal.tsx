import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuccessModalProps {
  open: boolean;
  userName: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, userName, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CheckCircleIcon
            sx={{
              fontSize: 60,
              color: 'success.main',
              mb: 2,
            }}
          />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thank you, {userName}!
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Your inquiry has been submitted successfully. Our team will review your request and
          get back to you soon.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
