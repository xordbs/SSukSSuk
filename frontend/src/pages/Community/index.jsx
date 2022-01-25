// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import { Grid, Button, Pagination } from '@mui/material';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';

import Layout from '../../layout/';

import { useLocalStorageSetState } from '../../common/CommonHooks';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

const Community = () => {
  const { user, setIsSignUp } = useContext(CommonContext);

  let history = useHistory();

  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');
  const [searchCategory, setSearchCategory] = useState(0);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onClickCommunityWriteHandler = () => {
    if(!user.states)
    {
       // 여기도 SignUp 변경하는거 다른 사람들이랑 충돌 안나도록 일단은 이렇게 하고 나중에 다 만들고 나서 바꿀 수 있으면 최적화
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      setIsSignUp('SignIn');
      history.push('/Auth');
    }
    else
    {
      history.push('/CommunityWrite');
    }
  };

  useEffect(() => {
    // 백엔드랑 연결되면 여기서 카테고리와 value, page를 사용해서 리스트 갱신해주는 것 추가
    console.log(searchCategory, searchValue, page);

    if (isSearch) {
      setPage(1);
      setIsSearch(!isSearch); // 이거때문에 한번 더 렌더링 되는거 같은데 어떻게 좀 바꿀 수 없을까 => 최적화
    }
  }, [isSearch, page]);

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
        isSearch,
        setIsSearch,
      }}
    >
      <Layout>
        <Wrapper>
          <Grid container direction="row" className='top-box' justifyContent ="space-between" alignItems="center">
            <Grid item>카테고리</Grid>
            <Grid item >
              <SearchComponent />
            </Grid>
          </Grid>
          <BoardList page={page} />
          <Grid className='bottom-box' container alignItems="flex-end" direction="column">
            <Button className='write-button' onClick={onClickCommunityWriteHandler}>글쓰기</Button>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Pagination count={10} page={page} onChange={handlePageChange} />
          </Grid>
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Community;
