import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ImSpinner9 } from 'react-icons/im';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
`;

export const LoadingIcon = styled(ImSpinner9)`
  width: 90px;
  height: 90px;
  color: #697adb;

  animation: ${rotate} 1s linear infinite;
`;
