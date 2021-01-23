import styled from 'styled-components/macro';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  background: none;
  color: #111;
  width: 100%;
  ${({ secondary }) => (secondary ? `max-width:1000px;` : null)}
`;

export const Box = styled.div`
  width: 30px;
  height: 100%;
`;

export const InputWrapper = styled.div`
  border: 1px solid transparent;
  background-color: ${({ bg }) => bg || `#f5f5f5`};
  font-size: 16px;
  display: flex;
  padding-right: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  flex-grow: 1;
  &:focus-within {
    background-color: ${({ bg }) => bg || `#f5f5f5`};
    border: 1px solid #c0c0c0;
  }
  ${({ secondary }) =>
    secondary
      ? `border-radius: 24px;
&:hover {
  border: 1px solid #c0c0c0;
}
`
      : null};
`;

export const Input = styled.input`
  border: none;
  height: ${({ secondary }) => (secondary ? `40px` : `53px`)};
  padding: 0 0 0 10px;
  width: 100%;
  background-color: transparent;
  font-size: 16px;
  display: flex;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  &:focus {
    background-color: ${({ bg }) => bg || `#f5f5f5`};
    outline: none;
    border: none;
  }
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
