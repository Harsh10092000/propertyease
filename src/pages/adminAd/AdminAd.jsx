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
const AdminAd = () => {
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
      .get(import.meta.env.VITE_BACKEND + "/api/ad/fetchAllData")
      .then((res) => {
        setData(res.data);
      });
  }, [change]);

  data.forEach((item, i) => {
    item.serial_no = i + 1;
  });
  useEffect(() => {
    data.forEach((item, i) => {
      item.ad_modified_id = 7000 + parseInt(item.ad_id);
    });
  }, [data]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("All");
  const filteredData = data
    .filter((code) => {
      if (filter === "all_properties_ad_1") {
        return code.ad_type === "all_properties_ad_1";
      } else if (filter === "all_properties_ad_2") {
        return code.ad_type === "all_properties_ad_2";
      } else if (filter === "property_page_ad_1") {
        return code.ad_type === "property_page_ad_1";
      } else if (filter === "property_page_ad_2") {
        return code.ad_type === "property_page_ad_2";
      } else if (filter === "All") {
        return true;
      }
    })
    .filter(
      (code) =>
        code.ad_link.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        code.ad_type.toLowerCase().includes(searchValue.toLowerCase()) ||
        code.ad_modified_id.toString().startsWith(searchValue)
    );

  const records = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);

  const deleteAd = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND + `/api/ad/deleteAd/${id}`
      );
      setSearchValue("");
      setChange(change + 1);
      setSnack(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [adListingStatus, setAdListingStatus] = useState({
    ad_listed: "",
    ad_id: "",
  });

  const hideAd = async (id) => {
    //setOpen(false);
    setLoader(true);
    adListingStatus.ad_listed = 0;
    adListingStatus.ad_id = id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/ad/updateAdListingStatus",
      adListingStatus
    );
    setChange(change + 1);
    setLoader(false);
    //setSnackQ(true);
  };

  const showAd = async (id) => {
    //setOpen(false);
    setLoader(true);
    adListingStatus.ad_listed = 1;
    adListingStatus.ad_id = id;
    await axios.put(
      import.meta.env.VITE_BACKEND + "/api/ad/updateAdListingStatus",
      adListingStatus
    );
    setChange(change + 1);
    setLoader(false);
    //setSnackQ(true);
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
        <h1>All Ads</h1>
        <div className="row justify-content-between align-items-center my-2">
          <Pagination
            count={nPages}
            color="primary"
            onChange={(e, value) => setCurrentPage(value)}
            className="col-md-6"
          />
          <div className="col-md-6 d-flex justify-content-end">
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
                  setFilter(e.target.value), setCurrentPage(1);
                }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"all_properties_ad_1"}>
                All Properties Ad 1 (Top of the page) 
                </MenuItem>
                <MenuItem value={"all_properties_ad_2"}>
                All Properties Ad 2 (Middle of the page)
                </MenuItem>
                <MenuItem value={"property_page_ad_1"}>
                Property Page Ad 1 (Top of the page)
                </MenuItem>
                <MenuItem value={"property_page_ad_2"}>
                Property Page Ad 2 (Middle of the page at right side)
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              className="col-md-5 mt-2"
              size="small"
              label="Search for properties..."
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
                <th>Ad Id</th>
                <th>Ad Type</th>
                <th>Ad Link</th>
                <th>Ad Image</th>
                {/* <th>Ad Status</th> */}
                <th>Created At</th>
                <th>Delisted At</th>
                <th>Ad Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{item.serial_no}</td>
                  <td>{7000 + parseInt(item.ad_id)}</td>
                  <td>{item.ad_type}</td>
                  <td>{item.ad_link}</td>
                  <td>{item.ad_image}</td>
                  {/* <td>{item.ad_listed === 1 ? "Listed" : "Delisted"}</td> */}
                  <td>{moment(item.ad_created_at).format("DD MMM, YY")}</td>
                  <td>{moment(item.ad_created_at).add(parseInt(item.ad_days), "days").format("DD MMM, YY")}</td>
                  <td>Ad Disabled {moment(moment(item.ad_created_at).add(parseInt(item.ad_days) + 1, "days").format("DD MMM, YY")).fromNow()}</td>             
                  {/* <td>{moment(item.ad_created_at).subtract(item.ad_days, 'days').fromNow()}</td>  */}
                  {/* <td>{moment(item.ad_created_at).fromNow()}</td> */}
                  <td className="d-flex gap-3">
                  {item.ad_type === "all_properties_ad_2" ? 
                    <Link target="_blank"
                      to={`/allproperties`}
                    >
                      <button className="view" title="View">
                        <IconEye />
                      </button>
                    </Link>
:
<Link target="_blank"
                      to={`/3-marla-residential-land-for-sale-in-sector-4-kurukshetra-250`}
                    >
                      <button className="view" title="View">
                        <IconEye />
                      </button>
                    </Link> }
                    <Link to={"/admin/edit/" + item.ad_id}>
                      <button title="Edit Your Property" className="view">
                        {/* <Link to={"/edit/" + item.pro_id}> */}

                        <IconEdit className="" />
                      </button>
                    </Link>
                    {/* <Link
                      to={`/${
                        item.pro_area_size.toLowerCase() +
                        "-" +
                        item.pro_area_size_unit
                          .toLowerCase()
                          .replaceAll(" ", "-")
                          .replaceAll(".", "") +
                        "-"
                      }${
                        item.pro_type
                          ? item.pro_type
                              .split(",")[0]
                              .toLowerCase()
                              .replaceAll(" ", "-")
                          : ""
                      }-for-${
                        item.pro_ad_type === "rent" ? "rent" : "sale"
                      }-in-${item.pro_locality
                        .toLowerCase()
                        .replaceAll(" ", "-")}-${item.pro_city
                        .toLowerCase()
                        .replaceAll(" ", "-")}-${item.pro_id}`}
                    >
                      <button className="view" title="View">
                        <IconEye />
                      </button>
                    </Link> */}
                    <button
                      className="del"
                      title="Delete"
                      onClick={() => deleteAd(item.ad_id)}
                    >
                      <IconTrashFilled />
                    </button>



                    {item.ad_listed === 1 ? (
                      <button
                        title="Click to Promote Ad"
                        className="btn btn-danger btn-sm vbtn mb-0"
                        // onClick={() => delistProperty(item)}
                        onClick={() => hideAd(item.ad_id)}
                        disabled={item.status === "0" ? true : false}
                      >
                        Hide
                      </button>
                    ) : (
                      <button
                        title="Click to Hide Ad"
                        className="btn btn-success btn-sm vbtn mb-0 ml-0"
                        onClick={() => showAd(item.ad_id)}
                        disabled={item.status === "0" ? true : false}
                      >
                        Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAd;
