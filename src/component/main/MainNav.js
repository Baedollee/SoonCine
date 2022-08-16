import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {
  const nickName = localStorage.getItem('Nickname');
  // console.log(object);
  const navigate = useNavigate();

  const logOut = () => {
    // console.log(nickName);
    localStorage.clear();
    navigate('/');
  };

  return (
    <MainNavBar>
      <p>환영합니다. {nickName}</p>
      <button onClick={logOut}>로그아웃</button>
    </MainNavBar>
  );
};

const MainNavBar = styled.div`
  justify-content: end;
  display: flex;
`;

export default MainNav;
