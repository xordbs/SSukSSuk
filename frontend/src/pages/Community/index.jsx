// import { Grid, Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';

import {
  Grid,
  Button,
  Pagination,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';

import BoardList from '../../components/Board/BoardList/';
import { useHistory } from 'react-router-dom';
import SearchComponent from '../../components/Search/SearchComponent';

import Layout from '../../layout/';

import { useLocalStorageSetState } from '../../common/CommonHooks';
import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';
import Wrapper from './styles';

// import listData from './dump.json';
// import noticeData from './notice.json';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';
const theme = createTheme({
  palette: {
    primary: {
      main: '#3e7925',
    },
    secondary: {
      main: '#000000',
    },
  },
});

const Community = () => {
  const { user, setIsSignUp, serverUrlBase } = useContext(CommonContext);

  let history = useHistory();

  const [listData, setListData] = useState({});
  const [freeLen, setFreeLen] = useState(0);
  const [mentoLen, setMentoLen] = useState(0);
  const [category, setCategory] = React.useState(0);
  const [searchValue, setSearchValue] = useLocalStorageSetState('', 'search');
  const [searchCategory, setSearchCategory] = useState(0);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setCategory(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onClickCommunityWriteHandler = () => {
    if (!user.status) {
      // 여기도 SignUp 변경하는거 다른 사람들이랑 충돌 안나도록 일단은 이렇게 하고 나중에 다 만들고 나서 바꿀 수 있으면 최적화
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      setIsSignUp('SignIn');
      history.push('/Auth');
    } else {
      history.push('/CommunityWrite');
    }
  };

  const pageLen = [];
  const setPageLen = () => {
    pageLen.splice(0, pageLen.length);
    pageLen.push(parseInt((freeLen + mentoLen) / 10) + 1);
    pageLen.push(parseInt(freeLen / 10) + 1);
    pageLen.push(parseInt(mentoLen / 10) + 1);
  };

  const getCommunityListCnt = () => {
    Axios.get(serverUrlBase + `/community/listcount`, {
      params: {
        keyword: searchValue,
      },
    })
      .then(data => {
        const cnt_data = data.data.data;
        cnt_data.map(cur => {
          if (cur.community_code === 'C01') setFreeLen(cur.list_cnt);
          else if (cur.community_code === 'C02') setMentoLen(cur.list_cnt);
        });
      })
      .catch(function(error) {
        console.log('community list count error: ' + error);
      });

    setPageLen();
  };

  const readCommunityList = () => {
    const keyword = searchValue ? searchValue : null;
    let communityCode;
    if (category === 0) communityCode = null;
    else if (category === 1) communityCode = 'c01';
    else if (category === 2) communityCode = 'c02';

    Axios.get(serverUrlBase + `/community/list`, {
      params: {
        community_code: communityCode,
        keyword: keyword,
        page_no: page,
      },
    })
      .then(data => {
        setListData(data.data);
        console.log(data);
      })
      .catch(function(error) {
        console.log('community list error: ' + error);
      });
  };

  useEffect(() => {
    getCommunityListCnt();
    setPageLen();

    if (page === 1) {
      readCommunityList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [searchValue]);

  useEffect(() => {
    if (page === 1) {
      readCommunityList();
      window.scrollTo(0, 0);
    } else {
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    readCommunityList();
    window.scrollTo(0, 0); // 스크롤 맨 위로 이동
  }, [page]);

  setPageLen();

  return (
    <ViewContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchCategory,
        setSearchCategory,
      }}
    >
      <Layout>
        <Wrapper>
          <Grid
            container
            direction="row"
            className="top-box"
            justifyContent="space-between"
            alignItems="end"
          >
            <ThemeProvider theme={theme}>
              <Grid item>
                <Tabs
                  value={category}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    className="tab-style"
                    label={'전체 게시판 (' + (freeLen + mentoLen) + ')'}
                  />
                  <Tab
                    className="tab-style"
                    label={'자유 게시판 (' + freeLen + ')'}
                  />
                  <Tab
                    className="tab-style"
                    label={'멘토 게시판 (' + mentoLen + ')'}
                  />
                </Tabs>
              </Grid>
            </ThemeProvider>
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickCommunityWriteHandler}
              >
                글쓰기
              </Button>
            </Grid>
          </Grid>

          <BoardList listData={listData} noticeData={null} />

          <Grid
            className="bottom-box"
            container
            alignItems="flex-end"
            direction="column"
          ></Grid>
          <Grid container alignItems="center" direction="column">
            <Pagination
              count={pageLen[category]}
              page={page}
              onChange={handlePageChange}
            />
          </Grid>
          <SearchComponent />
        </Wrapper>
      </Layout>
    </ViewContext.Provider>
  );
};

export default Community;
