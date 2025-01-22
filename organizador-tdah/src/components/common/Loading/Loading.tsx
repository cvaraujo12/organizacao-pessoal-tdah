import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-current border-t-transparent',
  {
    variants: {
      variant: {
        default: 'text-primary',
        secondary: 'text-secondary',
        ghost: 'text-gray-400',
      },
      size: {
        sm: 'h-4 w-4 border-2',
        default: 'h-6 w-6 border-2',
        lg: 'h-8 w-8 border-3',
        xl: 'h-12 w-12 border-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  label?: string;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label || 'Carregando...'}
        className="flex items-center justify-center"
        {...props}
      >
        <div
          className={cn(loadingVariants({ variant, size, className }))}
        />
        {label && (
          <span className="ml-2 text-sm text-gray-500">{label}</span>
        )}
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export { Loading, loadingVariants }; 