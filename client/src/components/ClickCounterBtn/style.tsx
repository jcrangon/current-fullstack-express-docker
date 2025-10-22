import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  background-color: #222;
  border-radius: 12px;
  border: 2px solid #fc9300;
  color: #fff;
  font-family: system-ui, sans-serif;
`;

export const Button = styled.button`
  background: linear-gradient(90deg, #4e9cff, #007bff);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);

  &:hover {
    background: linear-gradient(90deg, #6ab1ff, #339cff);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;