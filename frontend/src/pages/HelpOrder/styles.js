import styled from 'styled-components';
import { darken } from 'polished';
import { Input, Form } from '@rocketseat/unform';

export const Container = styled.div`
  margin: 34px 300px;
  min-width: 700px;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  .popup-content {
    display: flex;
    max-width: 450px;
    max-height: 425px;
    border-radius: 4px;
    flex-direction: column;
  }

  .nohelp {
    display: flex;
    width: 100%;
    justify-content: center;
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const Cover = styled.div`
  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;

    thead {
      td:first-of-type {
        text-align: left;
        padding-left: 0px;
      }

      td {
        font-size: 16px;
        line-height: 20px;
        color: #444;
        font-weight: bold;
        padding: 10px 25px;
        text-align: center;
      }

      td:last-of-type {
        text-align: end;
        padding-right: 0;
      }
    }

    tbody {
      tr:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }

      td:first-of-type {
        text-align: left;
        padding: 10px 150px 10px 0;
      }

      td {
        max-width: 500px;
        overflow: hidden;
        font-size: 16px;
        text-align: center;
        color: #666;
        padding: 10px 25px;
      }

      td:last-of-type {
        min-width: 120px;
        font-size: 15px;
        padding: 10px 0;
        text-align: right;
      }

      > span {
        font-size: 16px;
        color: #666;
        line-height: 20px;
      }

      a {
        padding-right: 23px;
        font-size: 15px;
        color: #4d85ee;
      }

      button.orderResponse {
        padding-right: 23px;
        font-size: 15px;
        color: #4d85ee;
      }

      button {
        background: none;
        border: 0;
        font-size: 15px;
        color: #de3b3b;
      }
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto 20px;
  width: 100%;

  div {
    display: flex;

    a.back {
      background: #ccc;
      padding: 10px 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      height: 36px;
      transition: background 0.2s;
      justify-content: space-around;
      margin-right: 16px;

      &:hover {
        background: ${darken(0.1, '#ccc')};
      }

      > span {
        font-size: 14px;
        color: #fff;
        margin-left: 8px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  form {
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #444;
    font-size: 14px;
    margin-bottom: 8px;

    span {
      font-size: 14px;
      color: #555;
      font-weight: normal;
    }
  }

  div {
    height: 110px;
    overflow: auto;

    span {
      font-size: 16px;
      color: #666;
    }
  }
`;

export const ModalForm = styled(Form)`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;

    strong {
      color: #444;
      font-size: 14px;

      span {
        font-size: 14px;
        color: #555;
        overflow: hidden;
        font-weight: normal;
      }
    }

    > span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }

  button {
    margin: 15px 0 0;
    height: 45px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#ee4d64')};
    }
  }
`;

export const ModalInput = styled(Input)`
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: ${props => (props.readOnly ? 0 : '1px solid #ddd')};
  border-radius: 4px;
  font-family: Roboto;
  font-size: 16px;
  color: #666;
  font-weight: normal;

  &:focus {
    border: 1px solid #ee4d64;
  }

  &::-webkit-resizer {
    visibility: hidden;
  }

  &::-webkit-scrollbar {
    width: 4px;
    background: #fff;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #ee4e62;
  }
`;

export const AnswerSize = styled.label`
  text-align: right;
  margin: 0 10px;
  font-size: 12px;
  color: ${props => (props.limit ? '#ee4e62' : '#666666')};
`;
