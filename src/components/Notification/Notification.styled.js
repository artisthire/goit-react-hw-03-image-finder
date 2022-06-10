import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 30px 10px;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  text-align: center;

  &:not(:last-child) {
    margin-botttom: 20px;
  }
`;
