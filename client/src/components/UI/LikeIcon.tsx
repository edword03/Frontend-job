import React from 'react';

interface ILikeProps {
  onToggle: () => void;
  isActive: boolean;
}

export const LikeIcon: React.FC<ILikeProps> = ({ onToggle, isActive }) => {
  return (
    <svg
      onClick={onToggle}
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 1.66446C15.5477 -4.11405 29.418 5.99771 10 19C-9.41803 5.99898 4.45235 -4.11405 10 1.66446Z"
        fill={isActive ? '#DD5E5E' : '#E1E1E1'}
      />
    </svg>
  );
};
