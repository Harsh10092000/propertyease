import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const UserFilterSerach = ({handleCurreentPage, handleSearchValue, handleFilterChangeprop , filterChange}) => {
  return (
     <TextField
                  variant="outlined"
                  className="col-md-5 mt-2"
                  size="small"
                  label="Search for properties..."
                  onChange={(e) => {
                    handleCurreentPage(1);
                    handleSearchValue(e.target.value);
                    handleFilterChangeprop(filterChange + 1);
                  }}
                />
  )
}




const UserFilterDesgin = ({filterOptions, filter, filterChange, handleFilterChange, handleCurreentPage, handleFilterChangeprop}) => {
    return (
        <FormControl
        sx={{ m: 1, width: ["100%"] }}
        size="small"
        className="col-md-3 "
      >
        <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter By"
          onChange={(e) => {
            handleFilterChange(e.target.value), handleCurreentPage(1);
            handleFilterChangeprop(filterChange + 1);
          }}
        >
          {filterOptions.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
  

export default UserFilterSerach;  
export {UserFilterDesgin};