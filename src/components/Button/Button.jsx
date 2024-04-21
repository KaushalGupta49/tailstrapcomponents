import React from 'react';
import {cva} from 'class-variance-authority';
import {twMerge} from 'tailwind-merge';
import './button.css';
import '../output.css';

const button = cva(
  'relative overflow-hidden cursor-pointer whitespace-nowrap text-center',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600/90',
        danger: 'bg-red-500 text-white hover:bg-red-600/90',
        success: 'bg-green-600 text-white hover:bg-green-700/90',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-500/80',
        info: 'bg-blue-400 text-white hover:bg-blue-500',
        light: 'bg-white text-black hover:bg-slate-300/80',
        dark: 'bg-slate-500 text-white hover:bg-slate-700/90',
        link: 'text-blue-500 underline-offset-4 hover:underline hover:text-blue-700',
        'outline-primary':
          'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white duration-200',
        'outline-danger':
          'border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-200',
        'outline-success':
          'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-200',
        'outline-warning':
          'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white duration-200',
        'outline-info':
          'border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white duration-200',
        'outline-light':
          'border-2 border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-black duration-200',
        'outline-dark':
          'border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white duration-200',
      },
      size: {
        sm: 'text-sm p-1 px-2 rounded-md',
        md: 'text-lg p-2 px-4 rounded-lg',
        lg: 'text-xl p-3 px-6 rounded-xl',
        xl: 'text-2xl p-4 px-8 rounded-2xl',
        icon: 'p-2 rounded-full',
      },
    },
    // compoundVariants: [{variant: 'primary', size: 'sm'}],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = ({children, className, variant, size, onClick, ...props}) => {
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={twMerge(button({variant, size, className}))}
      onClick={createRipple}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
