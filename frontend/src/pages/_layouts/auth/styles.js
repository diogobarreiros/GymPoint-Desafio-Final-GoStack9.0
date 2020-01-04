import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 360px;
  max-height: 448px;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 50px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      width: 300px;
      height: 45px;
      max-width: 300px;
      max-height: 45px;
      border-radius: 4px;
      border: solid 1px #dddddd;
      background: #ffffff;
      color: #333;
      padding: 0 15px;
      margin: 10px 0;
      margin-bottom: 20px;
      &::placeholder {
        font-family: Roboto;
        font-size: 16px;
        color: #999999;
      }
    }

    h1 {
      align-self: flex-start;
      font-family: Roboto;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      align-self: flex-end;
      font-family: Roboto;
      font-size: 12px;
      margin-top: -15px;
      margin-bottom: 10px;
    }

    button {
      width: 100%;
      height: 100%;
      max-width: 300px;
      max-height: 45px;
      margin: 5px 0 0;
      padding: 13px 86px;
      background: #ee4d64;
      color: #ffffff;
      font-family: Roboto;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      border: 0;
      border-radius: 4px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }
`;
