// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import {Grid,Button,Pagination} from '@mui/material';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';
import Layout from '../../layout/';

import { useLocalStorageSetState } from '../../common/CommonHooks';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

const Community = () => {
  const {
    user
  } = useContext(CommonContext);

  let history = useHistory();

  const [isSearch, setIsSearch]=useState(false);
  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');
  const [searchCategory,setSearchCategory]=useState(0);
  const [page, setPage] = React.useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onClickCommunityWriteHandler = () => {
    history.push('/CommunityWrite');
  };

  useEffect(()=>{
    // 백엔드랑 연결되면 여기서 카테고리와 value, page를 사용해서 리스트 갱신해주는 것 추가
    console.log(searchCategory,searchValue,page);
    
    if(isSearch)
    {
      setPage(1);
      setIsSearch(!isSearch);
    }
  },[isSearch,page]);

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
        isSearch,
        setIsSearch
      }}
    >
      <Layout>
        <Wrapper>
          <Grid>
          {user.status && <Button variant="primary" onClick={onClickCommunityWriteHandler}>
              글쓰기
            </Button>}
            <SearchComponent />
          </Grid>
            <BoardList page={page} />
          <Grid>
            <Pagination count={10} page={page} onChange={handlePageChange} />
          </Grid>
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Community;
