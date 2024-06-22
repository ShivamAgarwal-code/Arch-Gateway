import React from "react";
import tw from "tailwind-styled-components";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Container = tw.div`
  
`;

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Container>
        <Header />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default DefaultLayout;
