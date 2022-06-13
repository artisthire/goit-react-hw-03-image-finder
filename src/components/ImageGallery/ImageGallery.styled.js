import styled from '@emotion/styled';

export const GalleryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ImgModal = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
