import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-lg shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-gray-800',
        outline: 'border border-gray-200 dark:border-gray-700',
        ghost: 'shadow-none',
      },
      size: {
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
      priority: {
        none: '',
        low: 'border-l-4 border-l-blue-400',
        medium: 'border-l-4 border-l-yellow-400',
        high: 'border-l-4 border-l-red-400',
      },
      status: {
        none: '',
        pending: 'bg-yellow-50 dark:bg-yellow-900/20',
        inProgress: 'bg-blue-50 dark:bg-blue-900/20',
        completed: 'bg-green-50 dark:bg-green-900/20',
        delayed: 'bg-red-50 dark:bg-red-900/20',
      },
      isInteractive: {
        true: 'hover:shadow-md cursor-pointer hover:-translate-y-0.5',
        false: '',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      priority: 'none',
      status: 'none',
      isInteractive: false,
      isDisabled: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className,
    variant,
    size,
    priority,
    status,
    isInteractive,
    isDisabled,
    children,
    ...props
  }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({ 
            variant, 
            size, 
            priority, 
            status, 
            isInteractive, 
            isDisabled,
            className 
          })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants }; 