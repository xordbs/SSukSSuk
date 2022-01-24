import React, { useContext } from 'react';

import { Grid, TextField, Button } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@mui/material';

import SearchIcon from '@material-ui/icons/Search';
import Wrapper from './styles';

import { ViewContext } from '../../../context/ViewContext';

const SearchComponent = () => {
  const {
    searchValue,
    setSearchValue,
    searchCategory,
    setSearchCategory,
    setIsSearch
  } = useContext(ViewContext);

  const handleChange = event => {
    setSearchCategory(event.target.value);
  };

  const TopSearchCloseHandler = e => {
    if (e.target.type !== 'text') {
      return;
    }
  };

  const SearchHandler=()=>{
    setIsSearch(true);
  }

  const onChangeSearchValueHandler = e => {
    setSearchValue(e.target.value);
  };

  return (
    <Wrapper>
      <Grid
        container
        alignItems="flex-end"
        // justify="center"
        direction="column"
        className="search-component-grid"
        onClick={TopSearchCloseHandler}
      >
        <Grid item>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={3}>
              <FormControl>
                <Select
                  value={searchCategory}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={0}>제목</MenuItem>
                  <MenuItem value={1}>작성자</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={7}>
              <TextField
                value={searchValue}
                placeholder="Search..."
                autoFocus={true}
                onChange={onChangeSearchValueHandler}
                className="input2"
              />
            </Grid>
            <Grid item xs={2}>
            <Button onClick={SearchHandler}>
              찾기
            </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default SearchComponent;
