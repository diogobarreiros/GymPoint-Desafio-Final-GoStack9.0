import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 15px 120px;

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;

export const Header = styled.div`
  padding: 15px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;

    button {
      background: #ee4d64;
      height: 36px;
      min-width: 112px;
      margin-left: 10px;
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 36px;
      min-width: 112px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }

      a {
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: row;
        font-weight: bold;
        text-align: center;

        div {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }

  tr + tr {
    border-top: 1px solid #eee;
  }

  td,
  th {
    padding: 16px 0;
  }
`;

export const LinkRemove = styled.button`
  background: transparent;
  border: 0;
  font-size: 15px;
  text-align: right;
  color: #de3b3b;
  margin-left: 23px;
`;

export const LinkEdit = styled.button`
  background: transparent;
  border: 0;
  font-size: 15px;
  text-align: right;
  color: #4d85ee;
`;

export const Links = styled.th`
  display: flex;
  justify-content: flex-end;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    background: none;
    border: 0;
    margin: 8px;
    &.pageDisable {
      cursor: not-allowed;
      visibility: hidden;
    }
  }
`;

export const Nav = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;

    a {
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 36px;
      min-width: 112px;
      background: #cccccc;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 8px;
      }
    }

    button {
      background: #ee4d64;
      height: 36px;
      min-width: 112px;
      margin-left: 10px;
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 36px;
      min-width: 112px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const FormInserts = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  strong {
    font-size: 14px;
    font-weight: bold;
  }

  input.readOnly {
    background: #f5f5f5;
  }

  input {
    &:focus {
      border: 1px solid #ee4d64;
    }
  }
`;

export const NumbersDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -16px;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 16px;

    strong {
      margin: 20px 0 8px 0;
      color: #444;
    }

    input {
      height: 45px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 10px;
    }
  }
`;

export const StringDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: -16px 0 0 0;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;

    strong {
      margin: 20px 0 8px 0;
      color: #444;
    }

    input {
      height: 45px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 10px;
    }
  }
`;

export const InputFields = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #444;
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;

    input {
      border: 1px solid #ddd;
      background: #fff;
      font-size: 16px;
      height: 45px;
      border-radius: 4px;
      width: 100%;
      padding: 10px;
      color: #666;
      margin-top: 8px;
      font-weight: normal;
    }

    input.readOnly {
      background: #f5f5f5;
      max-width: 198px;
    }
  }
  div.formline {
    display: flex;
    justify-content: space-between;

    strong {
      margin-bottom: auto;
    }
  }
`;
