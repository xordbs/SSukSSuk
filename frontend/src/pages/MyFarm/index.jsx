import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FarmInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

const MyFarm = () => {
  // const user = useSelector(state => state.Auth.user);

  return (
    <Layout>
      <Wrapper>
        <h2> 내 농장 페이지 </h2>
        <FarmInfo />
        <FarmStatus/>
        <FarmHistory />
      </Wrapper>
    </Layout>
  );
};

export default MyFarm;
