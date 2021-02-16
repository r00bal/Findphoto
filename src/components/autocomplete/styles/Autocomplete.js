/* eslint-disable no-unneeded-ternary */
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

export const Button = styled.button`
  width: 50px;
  height: 30px;
  padding: 5px;
  display: flex;
  background: none;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;

export const Img = styled.img`
  width: 50px;
  max-height: 60%;
  color: var(--greyDark);
`;

export const InputWrapper = styled.div`
  ${({ secondary }) => (secondary ? `border: 1px solid transparent;` : null)};
  background-color: ${({ bg }) => (bg ? bg : `var(--white)`)};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 30px;
  border-radius: 4px;
  width: 100%;
  flex-grow: 1;
  &:focus-within {
    background-color: ${({ bg }) => (bg ? bg : `var(--white)`)};
    ${({ secondary }) => (secondary ? `border: 1px solid var(--greyDark);` : null)};
  }
  ${({ secondary }) =>
    secondary
      ? `border-radius: 24px;
&:hover {
  border: 1px solid var(--greyDark);
}
`
      : null};
`;

export const Input = styled.input`
  border: 1px solid transparent;
  height: ${({ secondary }) => (secondary ? `40px` : `53px`)};
  padding: 0;
  width: 100%;
  background-color: transparent;
  font-size: 16px;
  display: flex;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  &:focus {
    background-color: ${({ bg }) => (bg ? bg : `var(--white)`)};
    outline: none;
    border: 1px solid transparent;
  }
`;

export const List = styled.ul`
  margin: 5px 0 0 0;
  list-style: none;
  position: absolute;
  top: 100%;
  padding: 5px 0px 5px 0px;
  border-radius: 4px;
  background-color: var(--greyLight);
  display: flex;
  flex-direction: column;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  ${({ empty }) => (empty ? `display :none;` : null)}
  .active {
    background-color: var(--greyMedium);
  }
`;
export const Option = styled.li`
  padding: 10px 15px 10px;
  /* &:hover {
    background-color: var(--greyMedium);
  } */
`;
