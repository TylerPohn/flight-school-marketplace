import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Email,
  Phone,
  Language,
  CheckCircle,
} from '@mui/icons-material';
import { Breadcrumb } from '../components/Breadcrumb';
import { ReviewCard } from '../components/ReviewCard';
import { EvidencePanel } from '../components/EvidencePanel';
import { getSchoolById } from '../services/schoolsApi';
import type { DetailedSchool } from '../mock/detailedSchools';

export function SchoolProfilePage() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [school, setSchool] = useState<DetailedSchool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getSchoolById(schoolId)
      .then(data => {
        setSchool(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching school:', error);
        setSchool(null);
        setLoading(false);
      });
  }, [schoolId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!school) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            School Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The school you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/schools')}
          >
            Back to Schools
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: 400,
          backgroundImage: `url(${school.heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 4 }}>
          <Typography variant="h2" component="h1" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            {school.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <LocationOn sx={{ mr: 0.5 }} />
              <Typography variant="h6">
                {school.location.city}, {school.location.state}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={school.avgRating} readOnly precision={0.1} sx={{ color: '#FFD700' }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                {school.avgRating.toFixed(1)} ({school.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4, pb: { xs: 12, sm: 14, md: 16 } }}>
        {/* Breadcrumb */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/schools')}
          sx={{ mb: 2 }}
        >
          Back to Search
        </Button>
        <Breadcrumb schoolName={school.name} />

        {/* Overview Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {school.description}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">{school.yearsInOperation}</Typography>
                <Typography variant="body2" color="text.secondary">Years in Operation</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">{school.instructorCount}</Typography>
                <Typography variant="body2" color="text.secondary">Instructors</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">{school.trainingType}</Typography>
                <Typography variant="body2" color="text.secondary">Training Type</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">{school.fleetDetails.length}</Typography>
                <Typography variant="body2" color="text.secondary">Aircraft Types</Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>Facilities</Typography>
          <Grid container spacing={1}>
            {school.facilities.map((facility, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                  <Typography variant="body2">{facility}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Programs & Pricing Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Programs & Pricing
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {school.programDetails.map((program) => (
              <Grid size={{ xs: 12, md: 6 }} key={program.certification}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {program.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {program.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Duration</Typography>
                        <Typography variant="body1" fontWeight="bold">{program.durationHours} hours</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Cost Range</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${program.costMin.toLocaleString()} - ${program.costMax.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Fleet Information */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Fleet Information
          </Typography>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Aircraft Type</strong></TableCell>
                  <TableCell align="center"><strong>Count</strong></TableCell>
                  <TableCell align="center"><strong>Max Altitude</strong></TableCell>
                  <TableCell align="center"><strong>Cruise Speed</strong></TableCell>
                  <TableCell><strong>Equipment</strong></TableCell>
                  <TableCell align="center"><strong>Availability</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {school.fleetDetails.map((aircraft, index) => (
                  <TableRow key={index}>
                    <TableCell>{aircraft.aircraftType}</TableCell>
                    <TableCell align="center">{aircraft.count}</TableCell>
                    <TableCell align="center">{aircraft.maxAltitude.toLocaleString()} ft</TableCell>
                    <TableCell align="center">{aircraft.cruiseSpeed} kts</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {aircraft.equipment.map((eq, idx) => (
                          <Chip key={idx} label={eq} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={aircraft.availability}
                        size="small"
                        color={aircraft.availability === 'High' ? 'success' : aircraft.availability === 'Medium' ? 'warning' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Instructors Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Instructors
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {school.instructorCount} Certified Instructors
          </Typography>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {school.instructors.map((instructor) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={instructor.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        src={instructor.photoUrl}
                        sx={{ width: 100, height: 100, mb: 2 }}
                      />
                      <Typography variant="h6" textAlign="center">{instructor.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {instructor.yearsExperience} years experience
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                      {instructor.certificates.map((cert, idx) => (
                        <Chip key={idx} label={cert} size="small" color="primary" />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      {instructor.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Reviews Section */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Student Reviews
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="h3" color="primary">{school.avgRating.toFixed(1)}</Typography>
            <Box>
              <Rating value={school.avgRating} readOnly precision={0.1} size="large" />
              <Typography variant="body2" color="text.secondary">
                Based on {school.reviewCount} reviews
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />
          {school.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Paper>

        {/* Evidence Panel */}
        <Box sx={{ mb: 4 }}>
          <EvidencePanel verificationDetails={school.verificationDetails} />
        </Box>

        {/* Contact CTA Section */}
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Contact {school.name} today to learn more about their programs and schedule a discovery flight.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Email color="primary" />
                <Typography variant="body2">{school.contactInfo.email}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Phone color="primary" />
                <Typography variant="body2">{school.contactInfo.phone}</Typography>
              </Box>
            </Grid>
            {school.contactInfo.website && (
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Language color="primary" />
                  <Typography variant="body2">{school.contactInfo.website}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" color="primary">
              Request Information
            </Button>
            <Button variant="outlined" size="large" color="primary">
              Schedule Discovery Flight
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
