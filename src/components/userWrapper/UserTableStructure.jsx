import React from 'react'
import UserPagination from './UserPagination'

const UserTableStructure = ({children, datalen, pagination, nPages, handleCurreentPage, recordsPerPage}) => {
  return (
    <div class="wg-box">
    <div className="card-body table-border-style table-text-infor">
      <div className="table-responsive">
        <table className="table table-hover">
        {children}
        </table>
        </div>
            <UserPagination
                datalen={datalen}
                pagination={true}
                nPages={nPages}
                handleCurreentPage={handleCurreentPage}
                recordsPerPage={recordsPerPage}
            />
        </div>
        </div>
  )
}

export default UserTableStructure
