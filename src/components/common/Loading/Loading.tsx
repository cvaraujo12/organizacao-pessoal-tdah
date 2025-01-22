import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  testId?: string;
}

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
};

export const Loading = ({
  size = 'medium',
  message = 'Carregando...',
  testId = 'loading'
}: LoadingProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4"
      role="status"
      data-testid={testId}
    >
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}
        data-testid={`${testId}-spinner`}
      />
      {message && (
        <span
          className="mt-2 text-gray-600"
          data-testid={`${testId}-message`}
        >
          {message}
        </span>
      )}
    </div>
  );
}; 