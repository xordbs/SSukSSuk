// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

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

  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');
  const [page, setPage] = React.useState(1);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onClickCommunityWriteHandler = () => {
    history.push('/CommunityWrite');
  };

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
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
