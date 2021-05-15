import React from 'react';
import styled, { keyframes } from 'styled-components';

const Svg = styled.svg`
  flex-shrink: 0;
`;

const BunnyIcon = props => {
  return (
    <Svg
      viewBox="0 0 32 32"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512.001 512.001"
      version="1.1"
      viewBox="0 0 512.001 512.001"
      xmlSpace="preserve"
    >
      <path
        fill="#F4BE8E"
        d="M466.475 7.812L214.289 260.005l37.709 37.711L504.176 45.529c5.031-5.047 7.812-11.734 7.812-18.858 0-7.125-2.781-13.812-7.812-18.859A26.51 26.51 0 00485.317 0c-7.109 0-13.811 2.781-18.842 7.812z"
      ></path>
      <path
        fill="#FFCE54"
        d="M153.963 508.863L3.133 358.041a10.668 10.668 0 01-2.984-9.25 10.677 10.677 0 015.757-7.828c58.662-29.327 125.753-81.317 126.425-81.849 4.25-3.296 10.289-2.921 14.086.891l105.582 105.582c3.805 3.797 4.18 9.844.875 14.094-.516.672-52.498 67.763-81.833 126.417a10.674 10.674 0 01-7.827 5.766 10.644 10.644 0 01-9.251-3.001z"
      ></path>
      <g fill="#F6BB42">
        <path d="M20.468 375.384l15.429 15.422c9.961-5.344 42.741-23.328 64.123-39.296 4.711-3.531 5.68-10.219 2.156-14.938-3.531-4.719-10.21-5.672-14.929-2.156-23.562 17.609-63.794 38.858-64.201 39.062a10.485 10.485 0 00-2.578 1.906zM133.635 482.817c12.375-29.593 51.021-80.06 51.404-80.575a10.65 10.65 0 00-1.961-14.952c-4.671-3.578-11.367-2.703-14.952 1.969-1.586 2.062-37.631 49.138-52.42 81.355l15.633 15.625a10.565 10.565 0 002.296-3.422zM86.09 441.006l30.163-30.17c4.164-4.172 4.164-10.922 0-15.078-4.163-4.171-10.913-4.171-15.077 0l-30.171 30.155 15.085 15.093z"></path>
      </g>
      <path
        fill="#E6E9ED"
        d="M232.858 406.773c11.633-16.28 19.812-26.827 20.015-27.093 3.305-4.25 2.93-10.297-.875-14.094L146.417 260.005c-3.797-3.812-9.836-4.187-14.086-.891-.266.219-10.82 8.391-27.1 20.039l127.627 127.62z"
      ></path>
      <g fill="#CCD1D9">
        <path d="M146.417 305.262a10.68 10.68 0 010-15.093l7.546-7.531a10.647 10.647 0 0115.078 0c4.171 4.156 4.171 10.906 0 15.078l-7.539 7.546c-4.164 4.155-10.914 4.155-15.085 0zM176.587 335.416c-4.164-4.156-4.164-10.922 0-15.077l7.539-7.547c4.164-4.155 10.922-4.155 15.085 0a10.68 10.68 0 010 15.093l-7.546 7.531a10.647 10.647 0 01-15.078 0zM206.75 365.587c-4.164-4.172-4.164-10.921 0-15.077l7.539-7.547c4.172-4.172 10.922-4.172 15.085 0 4.164 4.156 4.164 10.922 0 15.078l-7.539 7.546c-4.164 4.172-10.921 4.172-15.085 0z"></path>
      </g>
      <path
        fill="#ED5564"
        d="M267.084 365.587a10.67 10.67 0 003.055-8.718l-7.539-67.872a10.595 10.595 0 00-3.062-6.359l-30.163-30.179a10.605 10.605 0 00-6.367-3.062l-67.865-7.531a10.671 10.671 0 00-8.718 3.047l-23.75 21.515 122.902 122.91 21.507-23.751z"
      ></path>
    </Svg>
  );
};

const bunnyFall = keyframes`
  0% {
    opacity: 1;
    transform: translate(0, -100%) rotateZ(0deg);
  }
  75% {
    opacity: 1;
    transform: translate(100px, 75vh) rotateZ(270deg);
  }
  100% {
    opacity: 0;
    transform: translate(150px, 100vh) rotateZ(360deg);
  }
`;

const Bunny = styled.div`
  display: inline-flex;
  position: fixed;
  top: 0;
  left: ${({ position }) => `${position}vw`};
  transform: translate3d(0, -100%, 0);
  user-select: none;
  pointer-events: none;
  z-index: 99999;
  animation-name: ${bunnyFall};
  animation-duration: ${({ duration }) => `${duration}s`};
  animation-timing-function: linear;
  animation-iteration-count: ${({ iterations }) => (Number.isFinite(iterations) ? String(iterations) : 'infinite')};
  animation-play-state: running;
  &:nth-child(5n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.3}s`};
  }
  &:nth-child(3n + 2) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.5}s`};
  }
  &:nth-child(2n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 1.7}s`};
  }
  &:nth-child(3n + 10) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 2.7}s`};
  }
  &:nth-child(7n + 2) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 3.5}s`};
  }
  &:nth-child(4n + 5) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 5.5}s`};
  }
  &:nth-child(3n + 7) {
    animation-delay: ${({ duration }) => `${(duration / 10) * 8}s`};
  }
`;

const FallingBunnies = ({ count = 30, size = 32, iterations = Infinity, duration = 10 }) => {
  const bunnies = [...Array(count)].map((_, index) => (
    <Bunny key={String(index)} position={Math.random() * 100} iterations={iterations} duration={duration}>
      <BunnyIcon width={size} height={size} />
    </Bunny>
  ));

  return <div>{bunnies}</div>;
};

export default FallingBunnies;
