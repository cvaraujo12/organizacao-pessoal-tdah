'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, fullWidth = false, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            `px-3 py-2 border rounded-md shadow-sm
             focus:outline-none focus:ring-2 focus:ring-primary-500
             disabled:bg-gray-100 disabled:cursor-not-allowed
             ${error ? 'border-red-500' : 'border-gray-300'}
             ${fullWidth ? 'w-full' : ''}`,
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 