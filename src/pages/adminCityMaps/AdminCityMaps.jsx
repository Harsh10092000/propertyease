
import { useEffect, useState } from "react";
import axios from "axios";
import { IconEye, IconTrashFilled, IconEdit } from "@tabler/icons-react";
import { Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Loader from "../../components/loader/Loader";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import moment from "moment";

const AdminCityMaps = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [snack, setSnack] = useState(false);
  const [loader, setLoader] = useState(false);
  //const records = data.slice(firstIndex, lastIndex);
  //const nPages = Math.ceil(data.length / recordsPerPage);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + "/api/cityMap/fetchMapData")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

 

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  useEffect(() => {
    data.forEach((item, i) => {
      item.map_modified_id = 7000 + parseInt(item.map_id);
    });
  }, [data]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data
    // .filter((code) => {
    //   if (filter === "all_properties_ad_1") {
    //     return code.ad_type === "all_properties_ad_1";
    //   } else if (filter === "all_properties_ad_2") {
    //     return code.ad_type === "all_properties_ad_2";
    //   } else if (filter === "property_page_ad_1") {
    //     return code.ad_type === "property_page_ad_1";
    //   } else if (filter === "property_page_ad_2") {
    //     return code.ad_type === "property_page_ad_2";
    //   } else if (filter === "All") {
    //     return true;
    //   }
    // })
    .filter(
      (code) =>
        code.map_city.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        code.map_state.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        code.map_category.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        code.map_sub_category.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        //code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.map_modified_id.toString().startsWith(searchValue)
    );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const deleteMap = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/cityMap/deleteMap/${id}`
      );
      setSearchValue("");
      setChange(change + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div>
      {loader ? <Loader /> : ""}
      <Snackbar
        ContentProps={{
          sx: {
            background: "green",
            color: "white",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack}
        autoHideDuration={1000}
        onClose={() => setSnack(false)}
        message={"Deleted Successfully"}
      />
      <div className="card-body table-border-style">
        <h1>All Property Listing Plans</h1>
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <div className="col-md-6 d-flex justify-content-end">
            {/* <FormControl
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
                  setFilter(e.target.value), setCurrentPage(1);
                }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"all_properties_ad_1"}>
                  Property Page Ad 1
                </MenuItem>
                <MenuItem value={"all_properties_ad_2"}>
                  All Properties Ad 2
                </MenuItem>
                <MenuItem value={"property_page_ad_1"}>
                  Property Page Ad 1
                </MenuItem>
                <MenuItem value={"property_page_ad_2"}>
                  Property Page Ad 2
                </MenuItem>
              </Select>
            </FormControl> */}
            <TextField
              variant="outlined"
              className="col-md-5 mt-2"
              size="small"
              label="Search for maps..."
              value={searchValue}
              onChange={(e) => {
                setCurrentPage(1);
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Map Id</th>
                <th>Map State</th>
                <th>Map City</th>
                <th>Map Category</th>
                <th>Map Sub Category</th>
                <th>Map Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.serial_no}</td>
                  <td>{7000 + parseInt(item.map_id)}</td>
                  <td>{item.map_state}</td>
                  <td>{item.map_city}</td>
                  
                  
                  <td>{item.map_category}</td>
                  <td>{item.map_sub_category}</td>
                  <td>{item.map_image}</td>
                  
                  <td className="d-flex gap-3">
                    <Link target="_blank"
                      to={`/citymap/${item.map_city}`}
                    >
                      <button className="view" title="View">
                        <IconEye />
                      </button>
                    </Link>
                    <Link to={"/admin/editcitymap/" + item.map_id}>
                      <button title="Edit Your Map" className="view">
                        {/* <Link to={"/edit/" + item.pro_id}> */}

                        <IconEdit className="" />
                      </button>
                    </Link>
                    
                    <button
                      className="del"
                      title="Delete"
                      onClick={() => deleteMap(item.map_id)}
                    >
                      <IconTrashFilled />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminCityMaps
