import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #e91212;
  padding: 8px;
  border-radius: 8px;
  display: block;
  width: 200px;
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
