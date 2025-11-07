import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  schoolName: string;
}

export function Breadcrumb({ schoolName }: BreadcrumbProps) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      <Link
        component={RouterLink}
        to="/"
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      <Link
        component={RouterLink}
        to="/schools"
        underline="hover"
        color="inherit"
      >
        Schools
      </Link>
      <Typography color="text.primary">{schoolName}</Typography>
    </Breadcrumbs>
  );
}
