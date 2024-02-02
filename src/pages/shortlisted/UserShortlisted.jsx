const UserShortlisted = () => {
  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All ShortlistedProperty</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <h5>Shortlisted Property</h5>
                </div>
                <div className="col-md-6 text-right">
                  {/* <div className="search-bar">
                  <Search
                    onSearch={(value) => {
                      var trimValue = value.trim();
                      setSearch(trimValue);
                      setCurrentPage(1);
                    }}
                  />
                </div> */}
                </div>
              </div>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                {/* <table className="table table-hover">
                <TableHeader
                  headers={tableHeaders}
                  onSorting={(field, order) =>
                    setSorting({ field, order })
                  }
                />
                <tbody>
                  {commentsData.map((object, i) => {
                    return (
                      <tr key={i}>
                        <td>{object.NO}</td>
                        <td>{object.propertyId}</td>
                        <td>
                          <button
                            title="View"
                            className="btn btn-primary btn-sm vbtn"
                          >
                            <Link
                              href={
                                "/property-profile/" + object.propertyId
                              }
                              legacyBehavior
                            >
                              <a
                                target="_blank"
                                className="btn btn-primary btn-sm vbtn"
                              >
                                <FontAwesomeIcon
                                  className="admin-faicon"
                                  icon={faEye}
                                />
                              </a>
                            </Link>
                          </button>
                          <button
                            title="Delete"
                            className="btn btn-danger btn-sm vbtn"
                            onClick={() => handleDelete(object._id)}
                          >
                            <FontAwesomeIcon
                              className="admin-faicon"
                              icon={faTrash}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table> */}
              </div>
              {/* <Pagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShortlisted;
