import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../test/test-utils';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders the breadcrumb with correct school name', () => {
    const schoolName = 'Test Flight Academy';
    render(<Breadcrumb schoolName={schoolName} />);

    // Check that all breadcrumb items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Schools')).toBeInTheDocument();
    expect(screen.getByText(schoolName)).toBeInTheDocument();
  });

  it('renders links with correct navigation paths', () => {
    render(<Breadcrumb schoolName="Test School" />);

    // Check that Home link points to root
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/');

    // Check that Schools link points to schools page
    const schoolsLink = screen.getByRole('link', { name: /schools/i });
    expect(schoolsLink).toHaveAttribute('href', '/schools');
  });

  it('renders the home icon', () => {
    const { container } = render(<Breadcrumb schoolName="Test School" />);

    // Check for the presence of the HomeIcon SVG element
    const homeIcon = container.querySelector('svg[data-testid="HomeIcon"]');
    expect(homeIcon).toBeInTheDocument();
  });

  it('renders the school name as non-clickable text', () => {
    const schoolName = 'Aviation Academy';
    render(<Breadcrumb schoolName={schoolName} />);

    // The school name should be text, not a link
    const schoolNameElement = screen.getByText(schoolName);
    expect(schoolNameElement.tagName).toBe('P'); // Typography renders as <p> by default
    expect(schoolNameElement).not.toHaveAttribute('href');
  });

  it('has proper accessibility attributes', () => {
    render(<Breadcrumb schoolName="Test School" />);

    // Check for aria-label on breadcrumbs navigation
    const breadcrumbNav = screen.getByLabelText('breadcrumb');
    expect(breadcrumbNav).toBeInTheDocument();
  });
});
