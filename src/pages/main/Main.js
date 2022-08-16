import React from 'react';
import MainHeader from './MainHeader';
import MainList from './MainList';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncGetMovieList } from '../../redux/modules/movieList';

const Main = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList.movieList);

  console.log(movieList);
  useEffect(() => {
    dispatch(asyncGetMovieList());
  }, []);

  // useEffect(() => {
  //   axios.get('http://54.180.89.34:8080/api/movie/upcomming').then((res) => {
  //     setList(res.data.data.slice(0,12));
  //   });
  // }, []);
  return (
    <MainWrap>
      <button
        onClick={() => {
          dispatch(movieThunk());
        }}
      >
        테스트
      </button>
      <MainHeader />

      <MainNav>
        <p>환영합니다. 배성열</p>
        <button>로그아웃</button>
      </MainNav>

      <MainListContainer onclick={() => {}}>
        {movieList.map((item, index) => {
          return (
            <MainList key={`${index}_${index.movieTitle}`} movieList={item} />
          );
        })}
      </MainListContainer>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border: 2px solid white;
  height: 100vh;

  background-image: url('https://firebasestorage.googleapis.com/v0/b/mymagazinepjt.appspot.com/o/animeImg%2F1655318752651?alt=media&token=fd310dd0-8c16-43e2-ac33-60733fa82791');
`;
const MainNav = styled.div`
  justify-content: end;
  display: flex;
`;

const MainListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default Main;
