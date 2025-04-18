import AdminDashNavbar from "../adminDashboardComp/AdminDashNavbar";
import { IconMenuDeep } from "@tabler/icons-react";
export const AdminNav = ({
  data,
  heading,
  children
}) => {
  return (
    <div className="dashboard-upper-sec">
      <div className="dash-upper-text-content ">
        <IconMenuDeep /> Dasboard Navigation
      </div>
      <div className="row justify-content-between align-items-center my-2">
        <div className="d-flex col-md-6 col-sm-12 ">
          <div className="d-flex justify-content-between">
            <div className="dash-header-heading">
              {heading}
              <span class="badge">{data}</span>
            </div>
            <div className="dash-upper-text-content-2">
              <AdminDashNavbar />
            </div>
          </div>
        </div>
         <div className="col-md-6 d-flex justify-content-end header-menu">
        {/*  {filterAva && (
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
          )}

          {selectedActionsAva && (
            <FormControl
              sx={{ m: 1, width: ["100%"] }}
              size="small"
              className="col-md-3 "
              disabled={listingids.length === 0}
              title={
                listingids.length === 0
                  ? "Select item to perform this action"
                  : ""
              }
            >
              <InputLabel id="demo-simple-select-label">
                With selected
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAction}
                label="With selected"
                onChange={(e) => {
                  handleSelectedAction(e.target.value), handleCurreentPage(1);
                }}
              >
                <MenuItem
                  disabled={listingids.length === 0}
                  value={"Listed Properties"}
                  onClick={() => listMultipleProperty(1)}
                >
                  List Again
                </MenuItem>
                <MenuItem
                  disabled={listingids.length === 0}
                  value={"Delisted Properties"}
                  onClick={() => listMultipleProperty(0)}
                >
                  Delist Properties
                </MenuItem>
              </Select>
            </FormControl>
          )}

          {searchAva && (
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
          )}*/}
       
        {children}
        </div> 
      </div>
    </div>
  );
};