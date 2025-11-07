/**
 * Trust Badge Component
 *
 * A reusable badge component that displays the trust tier of a flight school.
 * Uses MUI Chip component with accessible tooltips and responsive sizing.
 *
 * Features:
 * - Four trust tier variants (Premier, Verified FSP, Community-Verified, Unverified)
 * - WCAG AA compliant color contrasts
 * - Interactive tooltips explaining each tier
 * - Multiple size options (small, medium, large)
 * - Keyboard accessible
 * - Optional click handler for detailed signals panel
 */

import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import { TrustTier } from '../types/trustTier';
import { TRUST_TIER_CONFIG } from '../constants/trustTiers';

/**
 * Props interface for TrustBadge component
 */
export interface TrustBadgeProps {
  /** The trust tier level to display */
  tier: TrustTier;
  /** Size of the badge (defaults to medium) */
  size?: 'small' | 'medium' | 'large';
  /** Optional click handler (e.g., to open FSP signals panel) */
  onClick?: () => void;
  /** Whether to show tooltip on hover (defaults to true) */
  showTooltip?: boolean;
  /** Optional CSS class name for custom styling */
  className?: string;
}

/**
 * TrustBadge Component
 *
 * Displays a trust tier badge with appropriate styling, icon, and label.
 * Wrapped with a tooltip that explains what the tier means.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TrustBadge tier={TrustTier.PREMIER} />
 *
 * // With click handler
 * <TrustBadge
 *   tier={TrustTier.VERIFIED_FSP}
 *   onClick={() => setShowSignals(true)}
 * />
 *
 * // Different size
 * <TrustBadge tier={TrustTier.COMMUNITY_VERIFIED} size="small" />
 * ```
 */
export const TrustBadge: React.FC<TrustBadgeProps> = ({
  tier,
  size = 'medium',
  onClick,
  showTooltip = true,
  className,
}) => {
  // Get configuration for the current tier
  const config = TRUST_TIER_CONFIG[tier];

  // Define size-based styling
  const sizeStyles = {
    small: {
      height: 24,
      fontSize: '0.75rem',
      '& .MuiChip-label': {
        padding: '0 8px',
      },
    },
    medium: {
      height: 32,
      fontSize: '0.875rem',
      '& .MuiChip-label': {
        padding: '0 12px',
      },
    },
    large: {
      height: 40,
      fontSize: '1rem',
      '& .MuiChip-label': {
        padding: '0 16px',
      },
    },
  };

  // Get the icon component
  const IconComponent = config.icon;

  // Create the badge element
  const badge = (
    <Chip
      icon={<IconComponent sx={{ fontSize: 'inherit', color: `${config.textColor} !important` }} />}
      label={config.label}
      onClick={onClick}
      className={className}
      sx={{
        backgroundColor: config.color,
        color: config.textColor,
        fontWeight: 600,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        border: 'none',
        ...sizeStyles[size],
        '& .MuiChip-icon': {
          marginLeft: '8px',
          marginRight: '-4px',
        },
        '&:hover': onClick
          ? {
              transform: 'scale(1.05)',
              boxShadow: 2,
            }
          : {},
        '&:focus': {
          outline: `2px solid ${config.color}`,
          outlineOffset: '2px',
        },
        // Ensure sufficient contrast on all backgrounds
        '@media (prefers-contrast: high)': {
          border: `2px solid ${config.textColor}`,
        },
      }}
      // Accessibility attributes
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`Trust tier: ${config.label} - ${config.description}`}
    />
  );

  // Wrap with tooltip if enabled
  if (showTooltip) {
    return (
      <Tooltip
        title={config.description}
        arrow
        enterDelay={300}
        leaveDelay={200}
        placement="top"
        // Ensure tooltip is keyboard accessible
        enterTouchDelay={0}
        leaveTouchDelay={3000}
      >
        {badge}
      </Tooltip>
    );
  }

  return badge;
};

export default TrustBadge;
