import styled from 'styled-components/macro';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  background: none;
  color: #111;
`;
export const Input = styled.input`
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 54px;
  padding-left: 15px;
  font-size: 16px;
  display: flex;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  flex-grow: 1;
`;

export const List = styled.ul`
  margin: 5px 0 0 0;
  list-style: none;
  position: absolute;
  top: 100%;
  padding: 5px 0px 5px 0px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  ${({ empty }) => (empty ? `display :none;` : null)}
  .active {
    background-color: #f1e1f2;
  }
`;
export const Option = styled.li`
  padding: 10px 15px 10px;
  &:hover {
    background-color: #f1e1f2;
  }
`;
