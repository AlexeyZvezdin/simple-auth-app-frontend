import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RottenBox = styled.div`
  padding-top: 10px;
  background-color: #e78bb9;
  min-width: 400px;
  min-height: 200px;
  color: white;
`;
const GreenBox = styled.div`
  padding-top: 10px;
  background-color: lightgreen;
  min-width: 400px;
  min-height: 200px;
  color: darkslategrey;
`;

const BackBox = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  min-height: 980px;
  position: absolute;
  z-index: 2000;
  background-color: lightgray;
  opacity: 0.95;
`;

const CloseButton = styled.div`
  display: block;
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  position: relative;
  left: 170px;
  top: 20px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
  :before,
  :after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 23px;
    top: 5px;
    width: 2px;
    background-color: #333;
  }
  :before {
    transform: rotate(45deg);
  }
  :after {
    transform: rotate(-45deg);
  }
`;

const GalleryPicture = styled(LazyLoadImage)`
  display: block;
  object-fit: cover;
  background-image: url(${props => props.dataSrc});
`;

const PrevSlide = styled.span`
  font-size: 64px;
  border: 2px solid lightgray;
  border-radius: 50%;
  color: lightgray;
  position: absolute;
  top: calc(350px / 2);
  left: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const NextSlide = styled.span`
  font-size: 64px;
  border: 2px solid lightgray;
  border-radius: 50%;
  color: lightgray;
  position: absolute;
  top: calc(350px / 2);
  right: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const GalleryPicBox = styled.div`
  display: block;
  position: relative;
`;

const Author = styled.div`
  display: block;
  margin: 0px auto;
  width: 80px;
  color: white;
  padding-top: 45px;
`;

export {
  BackBox,
  CloseButton,
  GalleryPicBox,
  NextSlide,
  PrevSlide,
  GalleryPicture,
  RottenBox,
  GreenBox,
  Author
};
