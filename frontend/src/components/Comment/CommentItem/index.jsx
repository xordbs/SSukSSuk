import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { CommonContext } from '../../../context/CommonContext';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import {
  TextField,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';

const CommentItem = props => {
  const { serverUrlBase } = useContext(CommonContext);
  const user = useSelector(state => state.Auth.user);
  const boardUrl = props.boardUrl;
  const [editComment, setEditComment] = useState();
  const [isEdit, setIsEdit] = useState(true);
  const [isVisible, setIsVisible] = useState('visible');
  const [isDoneVisible, setIsDoneVisible] = useState('hidden');
  const [comment, setComment] = useState(props.comment);
  const handleEditTextChange = e => {
    setEditComment(e.target.value);
  };

  const onClickCommentDeleteHandler = no => {
    Axios.delete(serverUrlBase + boardUrl + '/comment/delete/' + no)
      .then(data => {
        if (data.status === 200) {
          alert('삭제성공');
        } else {
          console.log('삭제실패');
        }
      })
      .catch(e => {
        console.log('comment delete error', e);
      });
  };

  const onClickCommentEditHandler = () => {
    setIsEdit(false);
    setIsVisible('hidden');
    setIsDoneVisible('visible');
  };

  const onClickCommentEditDoneHandler = () => {
    Axios.defaults.headers.common['authorization'] = user.token;
    Axios.patch(serverUrlBase + boardUrl + '/comment/update', {
      comment_no: comment.comment_no,
      comment_text: editComment,
    }).then(data => {
      if (data.status === 200) {
        setIsEdit(true);
        setIsVisible('visible');
        setIsDoneVisible('hidden');
        alert('변경 완료');
      }
    });
  };

  useEffect(() => {
    setEditComment(comment.comment_text);
  }, []);

  return (
    <>
      <ListItem key={comment.comment_no} alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
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
                | {comment.comment_date}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <>
              <TextField
                fullWidth
                InputProps={{ disableUnderline: true }}
                multiline
                variant="standard"
                value={editComment}
                onChange={handleEditTextChange}
                disabled={isEdit}
              />
            </>
          }
        />
        {user.user_id === comment.comment_user_id && (
          <React.Fragment>
            <IconButton
              aria-label="edit"
              sx={{ visibility: isVisible }}
              onClick={onClickCommentEditHandler}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{ visibility: isVisible }}
              onClick={e => {
                onClickCommentDeleteHandler(comment.comment_no);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="done"
              sx={{ visibility: isDoneVisible }}
              onClick={onClickCommentEditDoneHandler}
            >
              <DoneOutlineIcon />
            </IconButton>
          </React.Fragment>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommentItem;
