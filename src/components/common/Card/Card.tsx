'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', className, ...props }, ref) => {
    const variants = {
      default: 'bg-white shadow-sm',
      elevated: 'bg-white shadow-md hover:shadow-lg transition-shadow duration-200',
      bordered: 'bg-white border border-gray-200'
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'rounded-lg p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card; 