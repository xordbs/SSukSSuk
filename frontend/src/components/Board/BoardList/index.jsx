import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Wrapper from './styles';
import listData from '../dump.json';

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
  views,
) {
  return {
    community_no,
    community_hit,
    community_title,
    community_author,
    community_date,
    views,
  };
}

const BoardList = props => {
  let history = useHistory();

  function onRowClick(community_no) {
    console.log(community_no);
    history.push('/CommunityDetail/'+community_no);
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
        0,
      ),
    );
  });

  return (
    <Wrapper>
      <Grid container>
        <TableContainer component={Paper} className="table-wrapper">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>추천수</TableCell>
                <TableCell>제목</TableCell>
                <TableCell align="right">글쓴이</TableCell>
                <TableCell align="right">작성일시</TableCell>
                <TableCell align="right">조회수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.community_no}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => onRowClick(row.community_no)}
                  className="table-row"
                >
                  <TableCell component="th" scope="row">
                    {row.community_no}
                  </TableCell>
                  <TableCell>{row.community_hit}</TableCell>
                  <TableCell>{row.community_title}</TableCell>
                  <TableCell align="right">{row.community_author}</TableCell>
                  <TableCell align="right">{row.community_date}</TableCell>
                  <TableCell align="right">{row.views}</TableCell>
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
