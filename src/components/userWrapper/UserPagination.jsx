import { Pagination } from '@mui/material'
import React from 'react'

const UserPagination = ({datalen, pagination, nPages, handleCurreentPage, recordsPerPage}) => {
  return (
   <Pagination
                   count={nPages}
                   color="primary"
                   siblingCount={1}
                   //page={currentPage} 
                   shape="rounded"
                   onChange={(e, value) => handleCurreentPage(value)}
                   className="col-md-6 mx-auto py-2"
                 />
               
  )
}

export default UserPagination
