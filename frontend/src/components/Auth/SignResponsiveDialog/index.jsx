import React, { useContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import store from 'store';
import crypto from 'crypto';
import { ViewContext } from '../../../context/ViewContext';
import { CommonContext } from '../../../context/CommonContext';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Grid,
  IconButton,
  Typography,
  Divider,
  TextField,
  MenuItem,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

// Input 안에 icon 넣을 거라면
import InputAdornment from '@material-ui/core/InputAdornment';

import Wrapper from './styles';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import userData from './dump.json';

// 아이디 체크 (영소문자+숫자, 4자이상)
const regId = /^[a-z0-9]{4,}$/;

// 비번/비번확인 체크 (영문소문자+숫자+특수문자 최소 1개 이상, 8~15자리)
const regPwd = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;
const regPwdCf = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/;

// 이름/닉네임 체크 (한글만)
const regNm = /^[ㄱ-ㅎ|가-힣]+$/;
const regNnm = /^[ㄱ-ㅎ|가-힣]+$/;

// 이메일 체크 (대소문자 구분 X, 문자/숫자연속가능)
const regEma = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const successSign = withReactContent(Swal);

const DialogTitleComponent = () => {
  return (
    <Wrapper>
      <h1 className="dialog-title-component">
        <img className="logo_img" src="images/ssug_green.png" alt="logo" />
      </h1>
    </Wrapper>
  );
};

const SignInSection01 = () => {
  let history = useHistory();

  const [disabled, setDisabled] = useState(true);
  const { signInUserData, setSignInUserData, setIsSignUp } = useContext(
    ViewContext,
  );

  const {
    user,
    setUser,
    setSignDialogOpen,
    serverUrlBase,
    setIsShowKeyborad,
  } = useContext(CommonContext);

  const OnChangeHandler = name => e => {
    setSignInUserData({ ...signInUserData, [name]: e.target.value });
  };

  const onClickHandler = () => {
    setIsSignUp('ForgotPw');
  };

  const [idError, setIdError] = useState(false);
  const [idErrorMessage, setIdErrorMessage] = useState();

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();

  const onSignInHandler = async e => {
    var { id, password } = signInUserData;

    // console.log('TCL: onSignInHandler -> id, password', id, password); # 아이디 비번 둘다 확인 잘 됩니다!
    // console.log(regId.test(id));         # 잘 뜹니다! (true/false)
    // console.log(regPwd.test(password));  # 잘 뜹니다! (true/false)

    // 이게 유효성 검사? (DB랑 비교를 하는 그런?)
    if (!password || !id) {
      alert('You need both email and password.');
      return;
    }

    if (!regId.test(signInUserData.id)) {
      Swal.fire({
        icon: 'error',
        title: '아이디 형식 오류',
        text: '영소문자+숫자, 4자이상',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      setIdError(true);
      setIdErrorMessage('여깁니다..');
      return;
    } else {
      setIdError(false);
      setIdErrorMessage();
    }

    if (!regPwd.test(signInUserData.password)) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 형식 오류',
        text: '영문소문자+숫자+특수문자 최소 1개 이상, 8~15자리',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      setPasswordError(true);
      setPasswordErrorMessage('여깁니다...');
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage();
    }

    let respone = [];
    let hashPassword = '';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      return;
    }

    Axios.post(serverUrlBase + `/user/login/`, {
      user_id: id,
      user_pw: hashPassword,
    })
      .then(data => {
        const login_user = data.data;
        if (login_user.status === 'login') {
          // 로그인 성공
          setUser({ ...login_user });
          store.set('user', { ...login_user });
          // header에 token 저장
          Axios.defaults.headers.common['x-access-token'] = login_user.token;

          setSignDialogOpen(false);
          setIsSignUp('SignIn');
          successSign.fire({
            icon: 'success',
            title: <strong>어서오십쇼~</strong>,
            html: <i>다양하게 즐겨보십쇼...</i>,
          });
          console.log('login');
          console.log(store.get('user'));
          history.goBack();
        } else {
          // 로그인 실패
          alert(login_user.msg);
        }
      })
      .catch(function(error) {
        console.log('로그인 오류 발생 : ' + error);
      });
  };

  useEffect(() => {
    // 여기가 콘솔로 확인하는 것! [존..매우 중요]
    // console.log({ signInUserData });
    if (signInUserData.id !== '' && signInUserData.password !== '') {
      setDisabled(false);
    }

    if (signInUserData.id === '' || signInUserData.password === '') {
      setDisabled(true);
    }
  }, [signInUserData.id, signInUserData.password, user]);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          <TextField
            required
            error={idError}
            helperText={idErrorMessage}
            id="outlined-required"
            label="아이디"
            className="text-field"
            defaultValue={signInUserData.id}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('id')}
            onFocus={event => {
              setIsShowKeyborad(true);
              // 아이콘 양식
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <PersonIcon />
              //     </InputAdornment>
              //   ),
              // }}
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={passwordError}
            helperText={passwordErrorMessage}
            id="outlined-password-input"
            label="비밀번호"
            className="text-field"
            type="password"
            autoComplete="current-password"
            defaultValue={signInUserData.password}
            variant="outlined"
            fullWidth={true}
            onChange={OnChangeHandler('password')}
            onFocus={event => {
              setIsShowKeyborad(true);
            }}
          />
        </Grid>
        <Grid item xs={12} className="grid-item">
          <Button
            variant="contained"
            disabled={disabled}
            // disabled={false}
            fullWidth={true}
            // color="primary"
            onClick={onSignInHandler}
            className="grid-item-button"
            type="submit"
          >
            로그인
          </Button>
        </Grid>
        {/* <Grid item xs={12} className="grid-item">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={5}>
              <Divider />
            </Grid>

            <Grid item xs={2}>
              <Typography align="center" className="grid-item-typography1">
                or
              </Typography>
            </Grid>

            <Grid item xs={5}>
              <Divider />
            </Grid>
          </Grid>
        </Grid> */}

        <Grid item xs={12}>
          <Grid container direction="row" justify="center" alignItems="center">
            <IconButton
              className="sign-in-butoon grid-item-icon-button"
              onClick={onClickHandler}
            >
              <Typography className="grid-item-typography3">
                {'비밀번호 찾기'}
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInSection02 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignUp');
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="grid"
      >
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="grid2-item-button"
          >
            {`회원가입`}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignInGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignInSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignInSection02 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////////

const SignUpSection01 = () => {
  return (
    <Wrapper>
      <Typography align="center" className="sign-up1">
        쑥쑥에 가입해서 ... 해보세요
      </Typography>
    </Wrapper>
  );
};

const SignUpSection02 = () => {
  const [disabled, setDisabled] = useState(true);
  const { signUpUserData, setSignUpUserData, setIsSignUp } = useContext(
    ViewContext,
  );
  const { serverUrlBase } = useContext(CommonContext);

  const OnChangeHandler = name => e => {
    setSignUpUserData({ ...signUpUserData, [name]: e.target.value });
    if (name === 'id' && e.target.value.length > 3) {
      Axios.get(serverUrlBase + `/user/checkid/` + e.target.value).then(
        data => {
          // console.log(data.data.idchk);
          if (data.data.idchk === false) {
            Swal.fire({
              icon: 'error',
              title: '아이디 있다',
              text: '다른 아이디 해라',
              footer: '<a href="">Why do I have this issue?</a>',
              target: document.querySelector('.MuiDialog-root'),
              // error 테두리로 해줘
            });
          }
        },
      );
    }
  };
  console.log(signUpUserData);
  const onSignUpHandler = async () => {
    var {
      id,
      password,
      passwordConfirmation,
      name,
      nickname,
      email,
      grade,
    } = signUpUserData;

    if (
      id === '' ||
      password === '' ||
      passwordConfirmation === '' ||
      name === '' ||
      nickname === '' ||
      email === '' ||
      grade === ''
    ) {
      alert('You need 문구는 수정해야 ! both email and password and username.');
      return;
    }

    if (!regId.test(signUpUserData.id)) {
      Swal.fire({
        icon: 'error',
        title: '아이디 형식 오류',
        text: '영소문자+숫자, 4자이상',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    if (!regPwd.test(signUpUserData.password)) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호 형식 오류',
        text: '영문소문자+숫자+특수문자 최소 1개 이상, 8~15자리',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    if (!regPwdCf.test(signUpUserData.passwordConfirmation)) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호확인 형식 오류',
        text: '영문소문자+숫자+특수문자 최소 1개 이상, 8~15자리',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    if (!regNm.test(signUpUserData.name)) {
      Swal.fire({
        icon: 'error',
        title: '이름 형식 오류',
        text: '한글만',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    if (!regNnm.test(signUpUserData.nickname)) {
      Swal.fire({
        icon: 'error',
        title: '별명 형식 오류',
        text: '한글만',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    if (!regEma.test(signUpUserData.email)) {
      Swal.fire({
        icon: 'error',
        title: '이메일 형식 오류',
        text: '대소문자 구분 X, 문자/숫자연속가능',
        footer: '<a href="">Why do I have this issue?</a>',
        target: document.querySelector('.MuiDialog-root'),
      });
      return;
    }

    let respone = [];
    let hashPassword = 'test2';
    try {
      hashPassword = crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
    } catch (error) {
      console.log('PPAP: signInHandler -> error', error);
    }

    // 여기 잠시만...??
    var body = {
      id: id,
      name: name,
      pwd: hashPassword,
    };
    console.log('PPAP: signUpHandler -> body', body);

    setIsSignUp('SignIn');
    setSignUpUserData({
      id: '',
      password: '',
      passwordConfirmation: '',
      name: '',
      nickname: '',
      email: '',
      grade: '',
    });

    await successSign.fire({
      title: <strong>환영합니다~</strong>,
      html: <i>회원가입 성공!</i>,
      icon: 'success',
      target: document.querySelector('.MuiDialog-root'),
    });
  };

  const grades = [
    {
      value: '멘토',
      label: '멘토',
    },
    {
      value: '일반',
      label: '일반',
    },
  ];

  useEffect(() => {
    if (
      signUpUserData.id !== '' &&
      signUpUserData.password !== '' &&
      signUpUserData.passwordConfirmation !== '' &&
      signUpUserData.nickname !== '' &&
      signUpUserData.email !== '' &&
      signUpUserData.grade !== ''
    ) {
      setDisabled(false);
    }

    if (
      signUpUserData.id === '' ||
      signUpUserData.password === '' ||
      signUpUserData.passwordConfirmation === '' ||
      signUpUserData.nickname === '' ||
      signUpUserData.email === '' ||
      signUpUserData.grade === ''
    ) {
      setDisabled(true);
    }
  }, [
    signUpUserData.id,
    signUpUserData.password,
    signUpUserData.passwordConfirmation,
    signUpUserData.nickname,
    signUpUserData.email,
    signUpUserData.grade,
  ]);

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        // style={{ marginLeft: 4 }}
        className="grid"
      >
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            required
            // error={signUpUserData.id === '' ? true : false}
            id="outlined-required"
            label="아이디"
            defaultValue={signUpUserData.id}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('id')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            // error={signUpUserData.password === '' ? true : false}
            id="outlined-password-input"
            label="비밀번호"
            className="text-Field"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.password}
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('password')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item2">
          <TextField
            required
            // error={signUpUserData.passwordConfirmation === '' ? true : false}
            id="outlined-password-input"
            label="비밀번호확인"
            className="text-Field"
            type="password"
            autoComplete="current-password"
            defaultValue={signUpUserData.passwordConfirmation}
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('passwordConfirmation')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            // error={signUpUserData.name === '' ? true : false}
            id="outlined-required"
            label="이름"
            defaultValue={signUpUserData.name}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('name')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item1">
          <TextField
            required
            // error={signUpUserData.nickname === '' ? true : false}
            id="outlined-required"
            label="별명"
            defaultValue={signUpUserData.nickname}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('nickname')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            required
            // error={signUpUserData.email === '' ? true : false}
            id="outlined-required"
            label="이메일"
            defaultValue={signUpUserData.email}
            className="text-field"
            variant="outlined"
            placeholder=""
            fullWidth={true}
            onChange={OnChangeHandler('email')}
          />
        </Grid>
        <Grid item xs={12} className="sign-up-grid">
          <TextField
            id="outlined-select-grade"
            select
            required
            label="등급"
            defaultValue="일반"
            onChange={OnChangeHandler('grade')}
            // helperText="등급 선택 꼭 해주세요! (넣지마?)"
            variant="outlined"
            fullWidth={true}
          >
            {grades.map(option => (
              <MenuItem key={option.index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item3">
          <Button
            variant="contained"
            disabled={disabled}
            fullWidth={true}
            // color="primary"
            onClick={onSignUpHandler}
            className="grid-item-button"
            style={{
              fontSize: 14,
              fontFamily: 'Noto Sans KR',
              fontWeight: 500,
            }}
          >
            회원가입
          </Button>
        </Grid>
        <Grid item xs={12} className="sign-up-grid-item4">
          <Typography align="center" className="sign-up-grid-item4-typography">
            쑥쑥 시스템에 가입함으로써
            <br /> 귀하는 저희의 약관과 <b>데이터 및 쿠키 정책</b>에 동의하시게
            됩니다.
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection03 = () => {
  return (
    <Wrapper>
      <Grid item xs={12} className="sign-up3-grid">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          className="sign-up3-grid-item"
        >
          {/* <Grid item xs={5}>
            <Divider />
          </Grid> */}

          {/* <Grid item xs={2}>
            <Typography
              align="center"
              className="sign-up3-grid-item-typography"
            >
              or
            </Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpSection04 = () => {
  const { setIsSignUp } = useContext(ViewContext);

  const onClickHandler = e => {
    setIsSignUp('SignIn');
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className="sign-up4-grid"
      >
        <Grid item xs={1} />
        <Grid item xs={6}>
          <Typography align="center" className="sign-up4-grid-item-typography">
            {'이미 계정이 있습니까?'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth={true}
            onClick={onClickHandler}
            className="sign-up4-grid-item-button"
          >
            {'로그인하기'}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

const SignUpGroupComponent = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={12}>
        <SignUpSection01 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection02 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection03 />
      </Grid>
      <Grid item xs={12}>
        <SignUpSection04 />
      </Grid>
      <Grid item xs={12}>
        <div>&nbsp;</div>
      </Grid>
    </Grid>
  );
};

////////////////////////////////////////////////////////////////////////////////

// ForgotPw
const ForgotPwGroupComponent = () => {
  const { serverUrl } = useContext(CommonContext);
  const { recoverPwUserData, setRecoverPwUserData } = useContext(ViewContext);
  const { setIsSignUp } = useContext(ViewContext);

  const inputRef = useRef('');

  const onClickHandler = whichGroup => {
    setIsSignUp(whichGroup);
  };
  const sendSearchWordHandler = async searchWord => {
    // if (!regEma.test(searchWord)) {
    //   alert('The email format is invalid.');
    //   return;
    // } else {
    //   alert('Not implemented yet.');
    //   // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
    //   // alert('Authentication code has been sent to you by email');
    //   // setIsSignUp('RecoverPw');
    // }
  };
  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="forgot-pw"
      >
        <h2>비밀번호를 잊어버리셨나요?</h2>
        <h3>아이디를 입력하시면 등록된 이메일로 인증번호가 발송됩니다.</h3>
        <input type="text" placeholder="아이디" ref={inputRef} />
        <button
          type="button"
          className="btn-link"
          onClick={() => {
            sendSearchWordHandler(inputRef.current.value);
          }}
        >
          인증번호 발송
        </button>
        <Grid item xs={12}>
          <h3>계정이 없다면 바로 가입하세요!</h3>
        </Grid>
        {/* <h5
          className="btn-to-sign-up"
          onClick={() => {
            onClickHandler(`SignUp`);
          }}
        >
          회원가입
        </h5> */}
        <Grid item xs={12}>
          <IconButton
            className="sign-in-butoon grid-item-icon-button"
            onClick={() => {
              onClickHandler(`SignUp`);
            }}
          >
            <Typography className="grid-item-typography3">
              {'회원가입'}
            </Typography>
          </IconButton>
        </Grid>
        {/* <button
          type="button"
          className="btn-login"
          onClick={() => {
            onClickHandler(`SignIn`);
          }}
        >
          로그인하기
        </button> */}
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            onClick={() => {
              onClickHandler(`SignIn`);
            }}
            className="grid2-item-button"
          >
            {`로그인`}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div>&nbsp;</div>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

////////////////////////////////////////////////////////////////////////////////

// RecoverPw
const RecoverPwGroupComponent = () => {
  const { serverUrl } = useContext(CommonContext);
  const { recoverPwUserData, setRecoverPwUserData, setIsSignUp } = useContext(
    ViewContext,
  );
  const emailRef = useRef('');
  const verificationCodeRef = useRef('');
  const newPasswordRef = useRef('');

  const sendRecoverPw = async () => {
    const user_id = emailRef.current.value;
    const code = verificationCodeRef.current.value;
    const pwd = newPasswordRef.current.value;

    if (code === '') {
      alert('Please enter the verification code');
      return;
    } else if (pwd === '') {
      alert('Please enter a new password');
      return;
    } else {
      let hashedPassword = '';
      try {
        hashedPassword = crypto
          .createHash('sha512')
          .update(pwd)
          .digest('hex');
      } catch (error) {
        console.log('PPAP: signInHandler -> error', error);
      }

      alert('Not implemented yet.');
      // setIsSignUp('SignIn');
    }
  };

  const sendSearchWordHandler = async searchWord => {
    console.log({ searchWord });

    if (searchWord === '') {
      alert('Please enter your e-mail');
      return;
    } else {
      alert('Not implemented yet.');
      // setRecoverPwUserData({ ...recoverPwUserData, email: searchWord });
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className="recover-box-wrap"
      >
        <Grid item xs={12} className="recover-box">
          <h2>Reset your password</h2>
          <h3>
            Enter the code you received from Amazon and set a new password.
          </h3>
          <Grid className="input-box">
            <h2>E-mail</h2>
            <input
              type="text"
              value={recoverPwUserData.email}
              ref={emailRef}
              readOnly
            />
          </Grid>
          <Grid className="input-box">
            <h2>Verification Code</h2>
            <input
              type="text"
              placeholder="enter code"
              ref={verificationCodeRef}
            />
          </Grid>
          <Grid className="input-box">
            <h2>New Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              ref={newPasswordRef}
            />
          </Grid>
          <Grid className="btn_box">
            <Grid
              className="Text"
              onClick={() => {
                sendSearchWordHandler(emailRef.current.value);
              }}
            >
              Resend Code
            </Grid>
            <Grid className="btn">
              <button type="button" onClick={sendRecoverPw}>
                VERIFY
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

////////////////////////////////////////////////////////////////////////////////

const ResponsiveDialogSign = () => {
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('xs'));
  let history = useHistory();

  const {
    signDialogOpen,
    setSignDialogOpen,
    serverImgUrl,
    isSignUp,
    setIsSignUp,
  } = useContext(CommonContext);

  const handleClose = () => {
    setSignDialogOpen(false);

    history.goBack();
  };

  // const [isSignUp, setIsSignUp] = useState('SignIn');
  const [signInUserData, setSignInUserData] = useState({
    id: '',
    password: '',
  });
  const [signUpUserData, setSignUpUserData] = useState({
    id: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    nickname: '',
    email: '',
    grade: '일반',
  });
  const [recoverPwUserData, setRecoverPwUserData] = useState({
    email: '',
    code: '',
    pwd: '',
  });

  return (
    <ViewContext.Provider
      value={{
        signUpUserData,
        setSignUpUserData,
        signInUserData,
        setSignInUserData,
        isSignUp,
        setIsSignUp,
        recoverPwUserData,
        setRecoverPwUserData,
      }}
    >
      <Dialog
        fullScreen={fullScreen}
        maxWidth={'xs'}
        open={signDialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: '#ffffff',
            boxShadow: 'none',
          },
        }}
        // BackdropProps={{
        //   style: {
        //     boxShadow: 'none',
        //     backgroundImage: `url(${serverImgUrl}thumb-1920-731946.jpg)`,
        //     backgroundSize: 'cover',
        //     filter: 'brightness(0.4)',
        //   },
        // }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <DialogTitle id="responsive-dialog-title">
              <DialogTitleComponent />
            </DialogTitle>
            <DialogContent>
              {isSignUp === 'SignUp' && <SignUpGroupComponent />}
              {isSignUp === 'SignIn' && <SignInGroupComponent />}
              {isSignUp === 'ForgotPw' && <ForgotPwGroupComponent />}
              {isSignUp === 'RecoverPw' && <RecoverPwGroupComponent />}
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </ViewContext.Provider>
  );
};
export default ResponsiveDialogSign;
