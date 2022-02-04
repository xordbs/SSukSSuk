import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wrapper from './styles';
import { CommonContext } from '../../context/CommonContext';

import {
  Grid,
  Button,
  FormControl,
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
} from '@mui/material';

const Comment = props => {
  let history = useHistory();
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState([]);
  const handleTextChange = e => {
    setContent(e.target.value);
  };

  const onClickCommentWriteHandler = e => {
    Axios.post(serverUrlBase + '/' + props.listType + '/comment/write', {
      comment_user_nickName: user.user_nickName,
      article_no: props.no,
      comment_text: content,
      comment_user_id: user.user_id,
    })
      .then(data => {
        if (data.status === 200) {
          // getCommentList();
          setContent('');
        }
      })
      .catch(e => {
        console.log('notice comment write error', e);
      });
  };

  const getCommentList = async () => {
    try {
      const res = await Axios.get(
        serverUrlBase + '/' + props.listType + '/comment/list',
        { params: { article_no: props.no } },
      );
      setCommentList(res.data.data);
    } catch (e) {
      console.log('getCommentList error', e);
    }
  };

  useEffect(() => {
    getCommentList();
  }, [commentList]);
  return (
    <Wrapper alignItems="center">
      <FormControl fullWidth>
        <TextField
          id="filled-textarea"
          placeholder="댓글을 입력하세요"
          multiline
          variant="outlined"
          value={content}
          onChange={handleTextChange}
        />
      </FormControl>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item>
          <Button className="write-button" onClick={onClickCommentWriteHandler}>
            댓글등록
          </Button>
        </Grid>
      </Grid>
      <hr></hr>
      {commentList.length && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {commentList.map(comment => (
            <>
              <ListItem key={comment.comment_no} alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="div"
                        variant="subtitle2"
                        color="text.primary"
                      >
                        {comment.comment_user_nickName}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="caption"
                      >
                        {' '}
                        — {comment.comment_date}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <Typography variant="body1" gutterBottom>
                      {comment.comment_text}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Comment;
