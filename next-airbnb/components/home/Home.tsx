import styled from "styled-components";
import palette from "../../styles/palette";
import React from "react";
import SearchRoomBar from "../searchRoomBar/SearchRoomBar";

const Container = styled.div`
  width: 100%;
  padding: 0 80px;
  .home-search-bar-label {
    margin: 32px 0 16px;
    font-weight: 600;
    font-size: 14px;
  }
  h2 {
    width: 557px;
    margin: 80px 0 60px;
    font-size: 50px;
    color: ${palette.cardinal};
  }
  .home-category-card-list {
    display: flex;
    width: 100%;
    list-style: none;
    padding-bottom: 60px;
    li {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
      background-color: white;
      margin-right: 19px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      .home-category-card-image-wrapper {
        width: 100%;
        position: relative;
        padding-bottom: 66.66%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .home-category-card-texts {
        padding: 12px 16px;
        min-height: 90px;
        .home-category-card-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .home-category-card-description {
          font-size: 14px;
          color: ${palette.gray_85};
        }
      }
    }
  }
`;

const Home: React.FC = () => {
    return (
        <Container>
            <p className="home-search-bar-label">숙소</p>
            <SearchRoomBar/>
            <h2>가까운 여행지, 에어비앤비와 탐험해보세요.</h2>
        </Container>
    );
};

export default Home;