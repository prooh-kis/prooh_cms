import React from 'react';
import { Footer, Header, MainContentContainer } from '../../components';

interface IProps {
  children?: React.ReactNode;
}

export const HomePageLayout: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
};
