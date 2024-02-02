import React from "react";

const UserDashboard = () => {
  return (
    <div className="container-fluid admin-dashboard admin-icon">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">All Property</h1>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">
                  <h5>Property List</h5>
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
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {commentsData.map((object, i) => {
                      return (
                        <tr key={i}>
                          <td>{object.NO}</td>
                          <td>{object.sale}</td>
                          <td>{object.personType}</td>
                          <td> {object.slug} </td>

                          <td>{object.address}</td>
                          <td>{object.locality}</td>

                          <td>{object.currentTime}</td>
                          <td>
                            {object.approve === "yes" ? (
                              <button
                                title="approved"
                                className="btn btn-success btn-sm vbtn"
                              >
                                {" "}
                                Approved{" "}
                              </button>
                            ) : (
                              <button
                                title="not approved"
                                className="btn btn-danger btn-sm vbtn"
                              >
                                Not Approved{" "}
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              title="Edit Your Property"
                              className="btn btn-primary btn-sm vbtn"
                            >
                              <Link
                                href={"/property-edit/" + object._id}
                                legacyBehavior
                              >
                                <a
                                  target="_blank"
                                  className="btn btn-primary btn-sm "
                                >
                                  <FontAwesomeIcon
                                    className="admin-faicon"
                                    icon={faEdit}
                                  />
                                </a>
                              </Link>{" "}
                            </button>
                            {object.slug != undefined ? (
                              <button
                                title="View Your Property"
                                className="btn btn-primary btn-sm vbtn"
                              >
                                <Link
                                  href={"/property-profile/" + object.slug}
                                  legacyBehavior
                                >
                                  <a
                                    target="_blank"
                                    className="btn btn-primary btn-sm "
                                  >
                                    <FontAwesomeIcon
                                      className="admin-faicon"
                                      icon={faEye}
                                    />
                                  </a>
                                </Link>{" "}
                              </button>
                            ) : (
                              <button
                                title="Complete Your Property Details First"
                                className="btn btn-primary btn-sm vbtn"
                              >
                                <FontAwesomeIcon
                                  className="admin-faicon"
                                  icon={faEyeSlash}
                                />
                              </button>
                            )}
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

export default UserDashboard;
