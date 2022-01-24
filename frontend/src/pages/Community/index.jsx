import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';
import Layout from '../../layout/';

import Wrapper from './styles';

const Community = () => {
  let history = useHistory();

  const onClickCommunityWriteHandler=()=>{
    history.push('/CommunityWrite');
  }
  
  return (
    <Layout>  
      <Wrapper>
        <Grid>
          <Button variant="primary" onClick={onClickCommunityWriteHandler}>글쓰기</Button>
        </Grid>
        <BoardList />
      </Wrapper>
    </Layout>
  );
};

export default Community;
