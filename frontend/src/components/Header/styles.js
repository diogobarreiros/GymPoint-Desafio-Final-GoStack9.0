import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    nav {
      display: flex;
      align-items: center;
      padding-right: 30px;
      border-right: 1px solid #eee;
      img {
        width: 135px;
        height: 24px;
      }
    }
  }

  aside {
    display: flex;
  }
`;

export const Pages = styled.div`
  margin-left: 10px;

  a {
    margin: 0 20px;
    font-size: 15px;
    font-weight: bold;
    color: #999999;
  }

  a.active {
    color: #444444;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    flex-direction: column;
    align-items: flex-end;

    strong {
      height: 16px;
      left: 0%;
      right: 0%;
      top: calc(50% - 16px / 2 - 10px);
      display: block;
      font-family: Roboto;
      font-style: normal;
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
      color: #666666;
    }

    button {
      height: 16px;
      left: 9.43%;
      right: 0%;
      top: calc(50% - 16px / 2 + 10px);
      background: none;
      border: none;
      display: block;
      font-family: Roboto;
      font-style: normal;
      font-size: 14px;
      margin-top: 4px;
      text-align: right;
      color: #de3b3b;
    }
  }
`;
