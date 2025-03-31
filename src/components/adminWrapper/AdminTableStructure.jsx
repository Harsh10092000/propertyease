import React from 'react'
import AdminPagination from './AdminPagination'

const AdminTableStructure = ( {children, datalen, pagination, nPages, handleCurreentPage, recordsPerPage} ) => {
  return (
    <div class="wg-box">
    <div className="card-body table-border-style table-text-infor">
      <div className="table-responsive">
        <table className="table table-hover">
            {children}
        </table>
      </div>
      <AdminPagination
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

export default AdminTableStructure
