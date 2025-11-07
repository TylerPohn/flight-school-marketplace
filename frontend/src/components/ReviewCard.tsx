import { Card, CardContent, Typography, Rating, Box, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface Review {
  id: string;
  reviewerName: string;
  date: string;
  rating: number;
  title: string;
  body: string;
  helpful: number;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="subtitle1" component="div" fontWeight="bold">
              {review.reviewerName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(review.date)}
            </Typography>
          </Box>
          <Rating value={review.rating} readOnly size="small" />
        </Box>

        <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 600 }}>
          {review.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {review.body}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" color="primary">
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {review.helpful} people found this helpful
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
