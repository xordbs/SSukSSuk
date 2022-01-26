import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import crypto from 'crypto';
import { CommonContext } from '../../../context/CommonContext';
import { ViewContext } from '../../../context/ViewContext';
import {
  TextField,
  Grid,
  Typography,
  IconButton,
  Fab,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Wrapper from './styles';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const successSign = withReactContent(Swal);

const InputComponent = props => {
  let { name } = props;
  const { inputValue, setInputValue } = useContext(ViewContext);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const OnChangeHandler = name => e => {
    setInputValue({ ...inputValue, [name]: e.target.value });
    console.log('OnChangeHandler -> inputValue', inputValue);
  };

  // useEffect(() => {
  //   if (
  //     !!inputValue['현재 비밀번호'] &&
  //     !!inputValue['새 비밀번호'] &&
  //   ) {
  //     props.setDisabled(false);
  //   } else {
  //     props.setDisabled(true);
  //   }
  // }, [
  //   inputValue['현재 비밀번호'],
  //   inputValue['새 비밀번호'],
  // ]);

  const onClickHandler = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <Wrapper>
      <ContentDefaultComponent
        LeftComponent={
          <Typography variant="body1" className="title">
            {name}
          </Typography>
        }
        RightComponet={
          <>
            <TextField
              required
              id={`outlined-password-input-${name}`}
              label={name}
              defaultValue={inputValue[name]}
              variant="outlined"
              autoComplete="current-password"
              onChange={OnChangeHandler(name)}
              type={
                `${name}` === 'PASSWORD'
                  ? isShowPassword
                    ? ''
                    : 'password'
                  : ''
              }
              //type={isShowPassword ? '' : 'password'}
              className="input-component-text-field"
            />
            {name === 'PASSWORD' && (
              <IconButton
                onClick={onClickHandler}
                className="input-component-icon-button"
              >
                <VisibilityIcon />
              </IconButton>
            )}
          </>
        }
      />
    </Wrapper>
  );
};

// 글 왼쪽/오른쪽 나눈거 (왼쪽 = 라벨 / 오른쪽 = 인풋)
const ContentDefaultComponent = props => {
  const { LeftComponent, RightComponet } = props;
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={3}>
          {LeftComponent}
        </Grid>
        <Grid item xs={9}>
          {RightComponet}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

// 우하단 버튼들 관련
const MyInfoButtonGroupComponent = props => {
  let history = useHistory();
  const { setUserDetailDialogOpen, user, serverUrlBase, setUser } = useContext(
    CommonContext,
  );
  const { inputValue } = useContext(ViewContext);

  const handleClose = () => {
    setUserDetailDialogOpen(false);
    history.goBack();
  };

  const onMyInfoSaveHandelr = async props => {
    var before_pwd = inputValue['Before Password'];
    var password = inputValue['New Password'];
    var changePassword = inputValue['New Password Confirm'];
    if (password !== changePassword) {
      alert('Passwords that do not match between passwords.');
      return;
    }
    if (!password || password.lengh < 5) {
      alert('Wrong password.');
      return;
    }

    let respone = [];
    let hashPassword = 'test2';
    let hashBeforePwd = 'test2';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
      hashBeforePwd = crypto
        .createHash('sha512')
        .update(before_pwd)
        .digest('hex');
    } catch (error) {
      console.log('signInHandler -> error', error);
    }

    var body = {
      new_pwd: hashPassword,
      before_pwd: hashBeforePwd,
      user_id: user.user_id,
    };

    alert('Not implemented yet.');

    // if (respone['status'] === 200) {
    //   alert('Has changed.');
    // } else {
    //   alert('Change failed.');
    // }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        className="my-info-button-group-component-grid"
      >
        <Fab
          variant="extended"
          aria-label="like"
          onClick={handleClose}
          className="cancel-fab my-info-button-group-component-grid-fab1"
        >
          취소
        </Fab>

        <Fab
          variant="extended"
          disabled={props.disabled}
          aria-label="like"
          color="inherit"
          onClick={onMyInfoSaveHandelr}
          className="upload-fab my-info-button-group-component-grid-fab2"
        >
          탈퇴
        </Fab>
      </Grid>
    </Wrapper>
  );
};

// 전체 구조
const DeleteUserComponent = params => {
  const [disabled, setDisabled] = useState(true);
  return (
    <Wrapper>
      <form noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <h2 className="section-title">회원탈퇴</h2>
          <Grid
            item
            xs={12}
            className="change-password-component-grid-item"
          ></Grid>
          <Grid item xs={12}>
            <InputComponent name={'아이디'} setDisabled={setDisabled} />
          </Grid>
          <Grid item xs={12}>
            <InputComponent name={'비밀번호'} setDisabled={setDisabled} />
          </Grid>

          <Grid item xs={12}>
            <MyInfoButtonGroupComponent disabled={disabled} />
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  );
};

const DeleteUser = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ViewContext.Provider value={{ inputValue, setInputValue }}>
      <DeleteUserComponent />
    </ViewContext.Provider>
  );
};

export default DeleteUser;
