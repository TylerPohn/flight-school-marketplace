import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
} from '@mui/material';
import { InquiryForm } from '../components/InquiryForm';
import { SuccessModal } from '../components/SuccessModal';
import type { InquiryFormData } from '../schemas/inquirySchema';

export const InquiryPage: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleFormSuccess = (data: InquiryFormData) => {
    setSubmittedName(data.name);
    setShowSuccessModal(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contact Flight School
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Fill out the form below to get in touch with our team. We'll respond to your inquiry as soon as possible.
        </Typography>

        <InquiryForm onSubmitSuccess={handleFormSuccess} />
      </Paper>

      <SuccessModal
        open={showSuccessModal}
        userName={submittedName}
        onClose={() => setShowSuccessModal(false)}
      />
    </Container>
  );
};
