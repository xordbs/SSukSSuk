import React, { useContext, useEffect } from 'react';

import BoardList from '../../components/Board/BoardList/';
import Layout from '../../layout/';

const Community = () => {
  return (
    <Layout>
        <h2> 커뮤니티 페이지 </h2>
        <br/>
        <BoardList/>
    </Layout>);
};

export default Community;
