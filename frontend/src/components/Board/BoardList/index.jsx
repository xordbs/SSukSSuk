import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Wrapper from './styles';

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function createData(
  community_no,
  community_hit,
  community_title,
  community_author,
  community_date,
) {
  return {
    community_no,
    community_hit,
    community_title,
    community_author,
    community_date,
  };
}

const BoardList = props => {
  let history = useHistory();
  // const noticeData=props.noticeData;
  const listData = props.listData;

  function onRowClick(community_no) {
    history.push('/CommunityDetail/' + community_no);
  }

  const rows = [];

  listData.items.map(row => {
    rows.push(
      createData(
        row.community_no,
        row.community_hit,
        row.community_title,
        row.community_author,
        row.community_date,
      ),
    );
  });

  // 이건 나중에 받아오는걸로
  const total_list_len = rows.length;

  return (
    <Wrapper>
      <Grid container>
        <div className="result">검색 결과 {total_list_len}개</div>
        <TableContainer component={Paper} className="table-wrapper">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head"></TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.community_no}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => onRowClick(row.community_no)}
                  className="table-row"
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    className="cell-front"
                  >
                    {row.community_no}
                  </TableCell>
                  <TableCell className="cell-body">
                    <Grid
                      container
                      // direction="column"
                      spacing={1}
                      direction="column"
                      justifyContent="space-around"
                      className="cell-body-main"
                    >
                      <Grid item className="cell-body-top">
                        {row.community_title}
                      </Grid>
                      <Grid item className="cell-body-buttom">
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Grid item className="cell-body-buttom-front">
                            {row.community_author + ' | ' + row.community_date}
                          </Grid>
                          <Grid item>
                            <div className="cell-body-buttom-back">
                              <div className='item'>
                              <VisibilityOutlinedIcon />
                              &nbsp;&nbsp;{row.community_hit}
                              </div>
                              <div className='item'>
                              <VisibilityOutlinedIcon />
                              &nbsp;&nbsp;{row.community_hit}
                              </div>
                              <div className='item'>
                              <VisibilityOutlinedIcon />
                              &nbsp;&nbsp;{row.community_hit}
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Wrapper>
  );
};

export default BoardList;
