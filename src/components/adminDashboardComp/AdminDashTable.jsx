import React from 'react'
import AdminDashTbody from './AdminDashTbody'
import AdminDashThead from './AdminDashThead'
import { DashTbodySub } from './AdminDashTbody'
import { Pagination } from '@mui/material'



const AdminDashTable = ({theadArray, tbodyArray, compData, handleAllTypes, allSelected, FormatDate, handleCheckboxChange, listingids, handleClickOpen, listProperty, context,dataLoaded, handleCurreentPage, nPages, pagination, updateSaleStatus }) => {
  
  
    const RenderTbody = context === 'dashboard' ? AdminDashTbody : DashTbodySub;

    return (
    <div class="wg-box">
    <div className="card-body table-border-style table-text-infor">
      <div className="table-responsive">
        <table className="table table-hover">
          <AdminDashThead
            theadArray={theadArray}
            handleAllTypes={handleAllTypes}
            allSelected={allSelected}
          />
          
          <RenderTbody
            tbodyArray={tbodyArray}
            compData={compData}
            FormatDate={FormatDate}
            handleCheckboxChange={handleCheckboxChange}
            listingids={listingids}
            handleClickOpen={handleClickOpen}
            listProperty={listProperty}
            updateSaleStatus={updateSaleStatus}
          />

            
         
        </table>
        {/* {dataLoaded === true && compData.length === 0 && (
          <div className="d-flex align-items-center justify-content-center">
            <div className="no-record-msg pt-2 pb-2">No Records Found</div>
          </div>
        )} */}
      </div>

     
      {/* {compData.length > 0 && (
        <Pagination
          count={nPages}
          color="primary"
          onChange={(e, value) => handleCurreentPage(value)}
        />
      )} */}
{compData.length > 0 && pagination && (
<Pagination
                count={nPages}
                color="primary"
                siblingCount={1}
                //page={currentPage} 
                shape="rounded"
                onChange={(e, value) => handleCurreentPage(value)}
                className="col-md-6 mx-auto py-2"
              />
            )}
    </div>
  </div>
  )
}

export default AdminDashTable
