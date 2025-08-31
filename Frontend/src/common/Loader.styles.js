import styled, { keyframes } from "styled-components";

// spin animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index : 1000;
   background: rgba(0, 0, 0, 0.6);
`;

export const Spinner = styled.div`
  border: ${(props) => props.size / 8}px solid #e5e7eb; /* light gray */
  border-top: ${(props) => props.size / 8}px solid ${(props) => props.color};
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  animation: ${spin} 1s linear infinite;
`;
