import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction : column;
  justify-content: center;
  align-items: center;
  gap : 20px;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a, #111827);
  color: #fff;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(25, 25, 25, 0.9);
  border-radius: 16px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.6);
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Heading = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1f1f1f;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 5px #6366f1;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #4f46e5;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #aaa;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #818cf8;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;