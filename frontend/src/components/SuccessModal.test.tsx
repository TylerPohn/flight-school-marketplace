import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../test/test-utils';
import { SuccessModal } from './SuccessModal';

describe('SuccessModal', () => {
  const mockOnClose = vi.fn();
  const defaultProps = {
    open: true,
    userName: 'John Doe',
    onClose: mockOnClose,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the modal when open is true', () => {
    render(<SuccessModal {...defaultProps} />);

    expect(screen.getByText(/Thank you, John Doe!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Your inquiry has been submitted successfully/i)
    ).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    render(<SuccessModal {...defaultProps} open={false} />);

    expect(screen.queryByText(/Thank you/i)).not.toBeInTheDocument();
  });

  it('displays the correct user name', () => {
    const userName = 'Jane Smith';
    render(<SuccessModal {...defaultProps} userName={userName} />);

    expect(screen.getByText(`Thank you, ${userName}!`)).toBeInTheDocument();
  });

  it('calls onClose when the Close button is clicked', async () => {
    const user = userEvent.setup();
    render(<SuccessModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('renders the success icon', () => {
    const { container } = render(<SuccessModal {...defaultProps} />);

    // Check for the CheckCircleIcon SVG element
    const successIcon = container.querySelector(
      'svg[data-testid="CheckCircleIcon"]'
    );
    expect(successIcon).toBeInTheDocument();
  });

  it('has correct dialog accessibility attributes', () => {
    render(<SuccessModal {...defaultProps} />);

    // Dialog should have a role
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('displays the complete success message', () => {
    render(<SuccessModal {...defaultProps} />);

    expect(
      screen.getByText(
        /Your inquiry has been submitted successfully. Our team will review your request and get back to you soon./i
      )
    ).toBeInTheDocument();
  });

  it('renders the Close button with correct variant and color', () => {
    render(<SuccessModal {...defaultProps} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass('MuiButton-contained');
    expect(closeButton).toHaveClass('MuiButton-containedPrimary');
  });
});
