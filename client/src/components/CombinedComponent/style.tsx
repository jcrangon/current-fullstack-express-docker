import styled from "styled-components";

export type InfoTextProps = {
  $color?: string;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
  margin: 40px auto;
  max-width: 450px;
  border-radius: 16px;
  background-color: #1f1f1f;
  color: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: #4e9cff;
  margin: 0;
`;

export const InfoText = styled.p<InfoTextProps>`
  font-size: 1rem;
  margin: 4px 0;
  color: ${({ $color }) => $color ?? "#ddd"};
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(90deg, #6ab1ff, #339cff);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const StyledInput = styled.input`
  margin-left: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #4e9cff;
    outline: none;
    box-shadow: 0 0 5px #4e9cff;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #f5f5f5;
`;
