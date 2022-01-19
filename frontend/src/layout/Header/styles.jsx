import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  
  height: 48px;
  & .display-none {
    display: none;
  }
  & .hide {
    display: none;
  }
  & .logo {
    cursor: pointer;
    padding-left: 16px;
  }
  & .logo_img{
    height: 50px;
    transform: translateY( 40% );
  }
  & .menu-button {
    position: fixed;
    left: 20px;
    z-index: 1300;
    margin-left: 0;
    width: 40px;
    height: 30px;
    cursor: pointer;
    margin-top:30px;

    transform: translateY( 10% );

    & div {
      width: 100%;
      height: 3px;
      background: #ffc74b;
      border-radius: 30px;

      /* transition: all 0.4s ease; */
      &:nth-child(1) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(2) {
        /* transition: all 0.4s ease; */
      }
      &:nth-child(3) {
        /* transition: all 0.4s ease; */
      }
    }
    &.on {
      z-index: 99999;
      
      & div {
        background: #ffc74b;
        /* transition: all 0.4s ease; */
        &:nth-child(1) {
          transform: translateY(-13px) translateX(-8px) rotate(-315deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          transform: translateY(-40px) translateX(-8px) rotate(315deg);
        }
      }
    }
  }

  & .appbar {
    width: 100%;
    height: 100px;
    
    transition: all 0.3s ease;
    box-sizing: border-box;

    background-color: #ffffff;
    // box-shadow: none;

    border-bottom: 1px solid grey;

    &.appbar-shift {
      width: 100%;
    }
    & .title {
      flex-grow: 1;
    }
  }
  & .header-button {
    margin-right: 15px;
    font-weight: normal;
    box-shadow: none;
    letter-spacing: 1px;
    text-transform: none;
    opacity: 0.7;
    transition: all 0.2s;

    font-size: 17px;
    transform: translateY( 40% );

    color:#000000;
    background-color: #ffffff;

    &:hover {
      opacity: 1;
      background: none;
      box-shadow: none;
    }
  }
  @media (min-width: 960px) {
    & .display-none {
      display: block;
    }
  }
  @media (max-width: 960px) {
    & .logo {
      position: absolute;
      left: 50%;
      top: 8px;
      transform: translate(-50%);
      padding-left: 0 !important;
    }
  }
`;

export default Wrapper;
