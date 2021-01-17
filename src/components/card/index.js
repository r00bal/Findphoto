/* eslint-disable react/prop-types */
import { Container, Header, HeaderWrapper, Title, Text, Footer, Button } from './styles/Card';

export default function Card({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Card.Title = function TitleCard({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.Header = function HeaderCard({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Card.HeaderWrapper = function HeaderWrapperCard({ children, ...restProps }) {
  return <HeaderWrapper {...restProps}>{children}</HeaderWrapper>;
};

Card.Text = function TextCard({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Card.Button = function ButtonCard({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Card.Footer = function FooterCard({ children, ...restProps }) {
  return <Footer {...restProps}>{children}</Footer>;
};
