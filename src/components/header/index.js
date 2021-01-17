/* eslint-disable react/prop-types */
import { Container, Text, Title } from './styles/Header';

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Header.Title = function TitleHeader({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};
Header.Text = function TextHeader({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};
