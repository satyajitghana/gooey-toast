import React from 'react';
import type { IconProps } from './SuccessIcon';

export const WarningIcon: React.FC<IconProps> = ({ className, size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 17H19L10 1L1 17ZM11 14H9V12H11V14ZM11 10H9V6H11V10Z"
        fill="currentColor"
      />
    </svg>
  );
};
