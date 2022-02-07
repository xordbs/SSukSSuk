import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../../layout/';
import Comment from '../../../components/Comment';

import Wrapper from './styles';
import Axios from 'axios';

import { CommonContext } from '../../../context/CommonContext';
import { useSelector } from 'react-redux';

import Swal from 'sweetalert2';

import { Grid, Button, InputBase } from '@mui/material';

const CommunityDetail = ({ match }) => {
  const no = match.params.no;
  let history = useHistory();

  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const [Community, setCommunity] = useState();
  const getCommunity = async () => {
    try {
      const res = await Axios.get(serverUrlBase + `/community/detail/` + no);
      setCommunity(res.data.data);
    } catch (e) {
      console.log('getCommunity error!!', e);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  const onClickCommunityUpdateHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      return;
    }
    history.push('/CommunityUpdate/' + no);
  };

  const onClickCommunityDeleteHandler = () => {
    if (!user.status) {
      alert('회원정보 오류! 로그인을 확인해주세요');
      return;
    }
    Swal.fire({
      icon: 'warning',
      title: '정말 삭제하시겠습니까?',
      text: '삭제하시면 다시 복구시킬 수 없습니다.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then(result => {
      if (result.value) {
        Axios.delete(serverUrlBase + '/Community/delete/' + no)
          .then(result => {
            console.log(result);
            history.push('/Community');
          })
          .catch(e => {
            console.log('Community delete error', e);
          });
      }
    });
  };

  const onClickCommunityHandler = () => {
    history.goBack();
  };

  if (!Community) return <>loading중..</>;
  return (
    <Layout>
      <Wrapper>
      <Grid container>
          <h2>{Community.community_code === 'C01' ? '자유 게시판' : '멘토 게시판'}</h2>
        </Grid>
        <Grid container className="root-box" direction="column">
          <Grid item className="body-box">
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className="category-box"
            >
              <Grid item className="body-header" xs={2}>
                제목
              </Grid>
              <Grid item className="body-content" xs={8}>
                {Community.community_title}
              </Grid>
              <Grid item className="body-content" xs={2}>
                {Community.community_date}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className="title-box"
            >
              <Grid item className="body-header" xs={2}>
                작성자
              </Grid>
              <Grid item className="body-content" xs={7}>
                <InputBase value={Community.community_author} />
              </Grid>
              <Grid item className="body-header" xs={2}>
                조회수
              </Grid>
              <Grid item className="body-content" xs={1}>
                {Community.community_hit}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              className="text-box"
            >
              <Grid item className="body-header">
                내용
              </Grid>
              <div className="body-content-text">
                <Grid item className="body-content">
                  <InputBase
                    value={Community.community_content}
                    multiline={true}
                    className="body-content-input"
                  />
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* 댓글 */}
        <Grid container direction="column" alignItems="center">
          <Comment listType={'community'} no={Community.community_no} />
        </Grid>
        <hr></hr>
        {/* 댓글 */}
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Button className="write-button" onClick={onClickCommunityHandler}>
              목록{' '}
            </Button>
          </Grid>
        </Grid>
        {user.user_id != '' && user.user_id === Community.community_user_id && (
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <Button
                className="write-button"
                onClick={onClickCommunityUpdateHandler}
              >
                게시글 수정
              </Button>
              &nbsp;
              <Button
                className="write-button"
                onClick={onClickCommunityDeleteHandler}
              >
                게시글 삭제
              </Button>
            </Grid>
          </Grid>
        )}
      </Wrapper>
    </Layout>
  );
};

export default CommunityDetail;
