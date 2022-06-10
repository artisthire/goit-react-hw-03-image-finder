import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const Container = styled.div`
  position: relative;
  width: calc(100vw - 48px);
  height: calc(100vh - 24px);
  background-color: white;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 2;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;
