import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CommonContext } from '../../context/CommonContext';
import { ViewContext } from '../../context/ViewContext';

import { Dialog, useMediaQuery } from '@material-ui/core';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

import RegiIot from '../../components/RegiIoT';


import Swal from 'sweetalert2';

const MyFarm = () => {
  // const user = useSelector(state => state.Auth.user);
  const { setRegiIotDialogOpen } = useContext(CommonContext);

  const farm = useSelector(state => state.Farm.farm);
  // let history = useHistory();

  useEffect(() => {
    if (!farm) {
      // Swal.fire({
      //   icon: 'warning',
      //   title: '농장 데이터가 없습니다',
      //   text: '내 농장 서비스를 이용하시려면 IoT 기기를 신청해주세요',
      // });
      // history.push('./')
      setRegiIotDialogOpen(true);
    }
  });

  if (!farm)
    return (
      <Layout>
        <RegiIot/>
      </Layout>
    );
  return (
    <Layout>
      <Wrapper>
        <h2> 내 농장 페이지 </h2>
        <FarmInfo />
        <FarmStatus />
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
