import styled from '@emotion/styled';

export const LoadButton = styled.button`
  display: inline-block;
  min-width: 180px;
  margin-top: 30px;
  padding: 8px 16px;
  border: 0;
  border-radius: 2px;
  color: #fff;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  background-color: #3f51b5;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: background-color 250ms easy-in;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;
