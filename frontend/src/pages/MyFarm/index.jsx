import React, { useContext, useEffect } from 'react';

import Layout from '../../layout/';
import Wrapper from './styles';
import FarmInfo from './FramInfo';
import FarmStatus from './FarmStatus';
import FarmHistory from './FarmHistory';

const MyFarm = () => {
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
