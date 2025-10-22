import styled from "styled-components";

export const Container = styled.div`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #0f172a; /* slate-900 */
`;

export const Card = styled.section`
  width: 100%;
  max-width: 480px;
  background: #0b1226; /* dark panel */
  border: 1px solid #1e293b; /* slate-800 */
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
`;

export const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #e2e8f0; /* slate-200 */
`;

export const Form = styled.form`
  display: grid;
  gap: 16px;
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.95rem;
  color: #cbd5e1; /* slate-300 */
`;

export const Input = styled.input`
  height: 44px;
  border-radius: 12px;
  border: 1px solid #334155; /* slate-700 */
  background: #0a1226;
  color: #e5e7eb; /* gray-200 */
  padding: 0 14px;
  outline: none;

  &:focus {
    border-color: #60a5fa; /* blue-400 */
    box-shadow: 0 0 0 3px rgba(96,165,250,0.25);
  }

  &::placeholder {
    color: #64748b; /* slate-500 */
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #93c5fd; /* blue-300 */
    text-decoration: none;
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: #93c5fd;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  a:hover::after {
    transform: scaleX(1);
  }
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  user-select: none;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #3b82f6; /* blue-500 */
  cursor: pointer;
`;

export const ErrorText = styled.p`
  margin: 4px 0 0 0;
  color: #fecaca; /* red-200 */
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.35);
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 0.95rem;
`;

export const SubmitButton = styled.button`
  height: 46px;
  border-radius: 12px;
  border: 1px solid #1e3a8a; /* blue-900 */
  background: linear-gradient(90deg, #1d4ed8, #2563eb);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-size 0.4s ease, transform 0.06s ease;
  background-size: 100% 100%;

  &:hover {
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  margin-top: 16px;
  color: #cbd5e1;

  a {
    color: #93c5fd; /* blue-300 */
    text-decoration: none;
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    background: #93c5fd;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  a:hover::after {
    transform: scaleX(1);
  }
`;
