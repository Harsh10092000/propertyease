import React from "react";
import { useState, useEffect, useContext } from "react";
import { stateList } from "../addProperty/State";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { IconPlus, IconX } from "@tabler/icons-react";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
//import useUserLogin from "../../customHooks/useUserLogin";
import * as XLSX from "xlsx";
import { TextField } from "@mui/material";



const AdminQuickList = () => {
  //const navigate = useNavigate();
  //const { currentUser } = useContext(AuthContext);
  const [userListingDetails, setUserListingDetails] = useState("");
  // const [listingNotAva, setListingNotAva] = useState(true);
  // const handleListingNotAva = (val) => {
  //   console.log("val : ", val);
  //   setListingNotAva(val);
  // };

  const email_id = "calkkr@gmail.com";
  const phone_no =  '8950040151';
  useEffect(() => {
   // if (currentUser != null) {
      axios
        .get(
          import.meta.env.VITE_BACKEND +
            `/api/auth/fetchListingAccessDetails/${email_id}/${phone_no}`
        )
        .then((res) => {
          setUserListingDetails(res.data);
        });
   // }
  }, []);

  //const [searchState, setSearchState] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [subDistrict, setSubDistrict] = useState();
  const [cityState, setCityState] = useState();
  const [filterDistricts, setFilterDistricts] = useState([]);
  const [filterSubDistricts, setFilterSubDistricts] = useState([]);
  // const [searchCity, setSearchCity] = useState("");
  // const [searchSubDistrict, setSearchSubDistrict] = useState("");
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  // const [tempProType, setTempProType] = useState("");
  const [loader1, setLoader1] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    number: "",
    otp: "",
  });

  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [excelErrors, setExcelErrors] = useState([]);

  //const { state, loader } = useUserLogin(userData, setUserData, currentUser);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/SubDistrictData`)
      .then((res) => {
        setSubDistrict(res.data);
      });
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/StateCityData`)
      .then((res) => {
        setCityState(res.data);
      });
  }, []);

  const [propertyData, setPropertyData] = useState({
    pro_user_type: "Broker",
    pro_ad_type: "Sale",
    pro_type: "",
    pro_city: "",
    pro_locality: "",
    pro_facing: "",
    pro_area_size: "",
    pro_amt: "",
    //pro_user_id: currentUser ? currentUser[0].login_id : "",
    pro_user_id: 13,
    pro_area_size_unit: "Marla",
    pro_amt_unit: "Lakhs",
    pro_state: "",
    pro_sub_district: "",
    pro_user_email: "",
    pro_login_number: "",
    pro_desc: "",
  });

  useEffect(() => {
    if (
      cityState &&
      propertyData.pro_state != "" &&
      propertyData.pro_state != null
    ) {
      const filteredItems = cityState
        .filter((i) => i.state == propertyData.pro_state.name)
        .map((item) => {
          return { state: item.state, district: item.district };
        });

      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );
      setFilterDistricts(combinedArray);
    }
  }, [propertyData.pro_state, cityState]);

  useEffect(() => {
    if (
      subDistrict &&
      propertyData.pro_city != "" &&
      propertyData.pro_city != null
    ) {
      const filteredItems = subDistrict
        .filter((i) => i.district == propertyData.pro_city.district)
        .map((item) => {
          return { sub_district: item.sub_district, district: item.district };
        });

      const combinedArray = filteredItems.reduce(
        (acc, curr) => acc.concat(curr),
        []
      );

      setFilterSubDistricts(combinedArray);
    }
  }, [filterDistricts, propertyData.pro_state, propertyData.pro_city]);

  // const selectedState = React.useMemo(
  //   () => stateList.find((v) => v.name === propertyData.pro_state?.name) || null,
  //   [stateList, propertyData.pro_state]
  // );

  // const selectedCity = React.useMemo(
  //   () =>
  //     filterDistricts.find(
  //       (v) => v.district === propertyData.pro_city?.district
  //     ) || null,
  //   [filterDistricts, propertyData.pro_city]
  // );

  // const selectedSubDistrict = React.useMemo(
  //   () =>
  //     filterSubDistricts.find(
  //       (v) => v.sub_district === propertyData.pro_sub_district?.sub_district
  //     ) || null,
  //   [filterSubDistricts, propertyData.pro_sub_district]
  // );

  const propertyAdType = [{ value: "Sale" }, { value: "Rent" }];
  const propertyUserType = [{ value: "Broker" }, { value: "Owner" }];
  // const [formatError, setFormatError] = useState(false);
  // const [fileSizeExceeded, setFileSizeExceeded] = useState(false);

  const propertyFacing = [
    { value: "North" },
    { value: "North-East" },
    { value: "East" },
    { value: "South-East" },
    { value: "South" },
    { value: "South-West" },
    { value: "West" },
    { value: "North-West" },
  ];

  const changeFormatting = (value) => {
    var val = value.trim();
    var a = val.replace(/\s{2,}/g, " ");
    return a;
  };

  // const proTypes = [
  //   { value: "Residential" },
  //   { value: "Land" },
  //   { value: "Commercial" },
  // ];

  // const proResSubTypes = [
  //   { value: "Apartment,Residential", item: "Apartment" },
  //   { value: "Independent House,Residential", item: "Independent House" },
  //   { value: "Builder Floor,Residential", item: "Builder Floor" },
  //   { value: "Farm House,Residential", item: "Farm House" },
  //   { value: "Raw House,Residential", item: "Raw House" },
  //   { value: "Retirement Community,Residential", item: "Retirement Community" },
  //   { value: "Studio Apartment,Residential", item: "Studio Apartment" },
  //   { value: "RK,Residential", item: "RK" },
  // ];
  // const proLandSubTypes = [
  //   { value: "Residential Land,Land", item: "Residential Land" },
  //   { value: "Commercial Land,Land", item: "Commercial Land" },
  //   { value: "Industrial Land,Land", item: "Industrial Land" },
  //   { value: "Agricultural Land,Land", item: "Agricultural Land" },
  //   { value: "Farm House Land,Land", item: "Farm House Land" },
  //   { value: "Institutional Land,Land", item: "Institutional Land" },
  // ];

  // const proCommercialSubTypes = [
  //   { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
  //   { value: "Commercial Building,Commercial", item: "Commercial Building" },
  //   { value: "Office Complex,Commercial", item: "Office Complex" },
  //   {
  //     value: "Software Technology Park,Commercial",
  //     item: "Software Technology Park",
  //   },
  //   { value: "Warehouse,Commercial", item: "Warehouse" },
  //   { value: "Industrial Estate,Commercial", item: "Industrial Estate" },
  //   {
  //     value: "Institutional Building,Commercial",
  //     item: "Institutional Building",
  //   },
  //   { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
  //   { value: "Cold Store,Commercial", item: "Cold Store" },
  // ];

  const propertyType = [
    { value: "Apartment,Residential", item: "Apartment" },
    { value: "Independent House,Residential", item: "Independent House" },
    { value: "Builder Floor,Residential", item: "Builder Floor" },
    { value: "Farm House,Residential", item: "Farm House" },
    { value: "Raw House,Residential", item: "Raw House" },
    { value: "Retirement Community,Residential", item: "Retirement Community" },
    { value: "Studio Apartment,Residential", item: "Studio Apartment" },
    {
      value: "Residential.ConcurrentModificationExceptionLand,Land",
      item: "Residential Land",
    },
    { value: "Commercial Land,Land", item: "Commercial Land" },
    { value: "Industrial Land,Land", item: "Industrial Land" },
    { value: "Agricultural Land,Land", item: "Agricultural Land" },
    { value: "Farm House Land,Land", item: "Farm House Land" },
    { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
    { value: "Commercial Building,Commercial", item: "Commercial Building" },
    { value: "Office Complex,Commercial", item: "Office Complex" },
    {
      value: "Software Technology Park,Commercial",
      item: "Software Technology Park",
    },
    { value: "Warehouse,Commercial", item: "Warehouse" },
    { value: "Industrial Estate,Commercial", item: "Industrial Estate" },
    { value: "Institutional,Commercial", item: "Institutional" },
    { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
    { value: "Cold Store,Commercial", item: "Cold Store" },
  ];

  const [open1, setOpen1] = useState(true);
  const handleClose1 = () => {
    setOpen1(false);
  };

  const validateExcelData = (rows) => {
    const requiredFields = [
      "Ad Type",
      "User Type",
      "Property Type",
      "State",
      "City",
      "Sub District",
      "Locality",
      "Facing",
      "Area Size",
      "Area Unit",
      "Amount",
    ];
    const validAdTypes = propertyAdType.map((item) => item.value);
    const validUserTypes = propertyUserType.map((item) => item.value);
    const validPropertyTypes = propertyType.map((item) => item.value);
    const validStates = stateList.map((item) => item.name);
    const validFacings = propertyFacing.map((item) => item.value);
    const validAreaUnits = ["Sq. Yards", "Sq. Mts", "Acres", "Marla"];
    const numberRegex = /^\d*(\.\d{0,2})?$/; // Matches integers or decimals with up to two decimal places
    const numberRegex2 = /^\d+$/;
    let errors = [];
  
    rows.forEach((row, index) => {
      requiredFields.forEach((field) => {
        if (!row[field] || row[field].toString().trim() === "") {
          errors.push(`Row ${index + 2}: ${field} is required`);
        }
      });
  
      if (row["Ad Type"] && !validAdTypes.includes(row["Ad Type"])) {
        errors.push(
          `Row ${index + 2}: Invalid Ad Type '${
            row["Ad Type"]
          }'. Must be one of: ${validAdTypes.join(", ")}`
        );
      }
      if (row["User Type"] && !validUserTypes.includes(row["User Type"])) {
        errors.push(
          `Row ${index + 2}: Invalid User Type '${
            row["User Type"]
          }'. Must be one of: ${validUserTypes.join(", ")}`
        );
      }
      if (
        row["Property Type"] &&
        !validPropertyTypes.includes(row["Property Type"])
      ) {
        errors.push(
          `Row ${index + 2}: Invalid Property Type '${
            row["Property Type"]
          }'. Must be one of: ${validPropertyTypes.join(", ")}`
        );
      }
      if (row["State"] && !validStates.includes(row["State"])) {
        errors.push(
          `Row ${index + 2}: Invalid State '${
            row["State"]
          }'. Must be a valid state from the dropdown`
        );
      }
      if (row["Facing"] && !validFacings.includes(row["Facing"])) {
        errors.push(
          `Row ${index + 2}: Invalid Facing '${
            row["Facing"]
          }'. Must be one of: ${validFacings.join(", ")}`
        );
      }
      if (row["Area Unit"] && !validAreaUnits.includes(row["Area Unit"])) {
        errors.push(
          `Row ${index + 2}: Invalid Area Unit '${
            row["Area Unit"]
          }'. Must be one of: ${validAreaUnits.join(", ")}`
        );
      }
      if (
        row["Area Size"] &&
        !numberRegex.test(row["Area Size"].toString().trim())
      ) {
        errors.push(
          `Row ${index + 2}: Area Size must be a valid number (e.g., 123 or 123.45)`
        );
      }
      if (
        row["Amount"] &&
        !numberRegex2.test(row["Amount"].toString().trim())
      ) {
        errors.push(
          `Row ${index + 2}: Amount must be a valid number (e.g., 50000 )`
        );
      }
      if (row["Description"] && row["Description"].length > 2000) {
        errors.push(`Row ${index + 2}: Description exceeds 2000 characters`);
      }

      // Validate City against cityState
    if (row["State"] && row["City"] && cityState) {
        const validCities = cityState
          .filter((item) => item.state === row["State"])
          .map((item) => item.district);
        if (!validCities.includes(row["City"])) {
          errors.push(
            `Row ${index + 2}: Invalid City '${
              row["City"]
            }' for State '${row["State"]}'. Must be one of: ${
              validCities.length > 0 ? validCities.join(", ") : "none available"
            }`
          );
        }
      }
  
      // Validate Sub District against subDistrict
      if (row["City"] && row["Sub District"] && subDistrict) {
        const validSubDistricts = subDistrict
          .filter((item) => item.district === row["City"])
          .map((item) => item.sub_district);
        if (!validSubDistricts.includes(row["Sub District"])) {
          errors.push(
            `Row ${index + 2}: Invalid Sub District '${
              row["Sub District"]
            }' for City '${row["City"]}'. Must be one of: ${
              validSubDistricts.length > 0
                ? validSubDistricts.join(", ")
                : "none available"
            }`
          );
        }
      }
    });
  
    setExcelErrors(errors);
    return errors.length === 0;
  };

  const handleExcelUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0];
      const rows = jsonData.slice(1).map((row) =>
        headers.reduce((obj, header, index) => {
          obj[header] = row[index];
          return obj;
        }, {})
      );

      setExcelData(rows);
      validateExcelData(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmit(true);

    if (excelFile && excelData.length > 0) {
      if (validateExcelData(excelData)) {
        setLoader1(true);
        try {
          for (const row of excelData) {
            const propertyPayload = {
              pro_user_type: row["User Type"],
              pro_ad_type: row["Ad Type"],
              pro_type: row["Property Type"],
              pro_state: row["State"],
              pro_city: row["City"],
              pro_sub_district: row["Sub District"],
              pro_locality: changeFormatting(row["Locality"]),
              pro_facing: row["Facing"],
             // pro_area_size: row["Area Size"],
              pro_area_size_unit: row["Area Unit"],
            //   pro_amt: row["Amount"],
              pro_area_size: String(row["Area Size"]), // Convert to string
            pro_amt: String(row["Amount"]), // Convert to string
              pro_amt_unit: "Lakhs",
              pro_desc: row["Description"] || "",
              pro_user_id: 13,
              pro_user_email: "calkkr@gmail.com",
              pro_login_number: '8950040151',
              pro_date: Date.now(),
              is_lifetime_free: userListingDetails[0]?.is_lifetime_free || 0,
              paid_listings_remaining:
                userListingDetails[0]?.paid_listings_remaining || 0,
              free_listings_remaining:
                userListingDetails[0]?.free_listings_remaining || 0,
            };

            const response = await axios.post(
              import.meta.env.VITE_BACKEND + "/api/pro/quickListing1",
              propertyPayload
            );

            // navigate(
            //   `/${
            //     propertyPayload.pro_area_size.toLowerCase() +
            //     "-" +
            //     propertyPayload.pro_area_size_unit
            //       .toLowerCase()
            //       .replaceAll(" ", "-")
            //       .replaceAll(".", "") +
            //     "-"
            //   }${
            //     propertyPayload.pro_type
            //       ? propertyPayload.pro_type
            //           .split(",")[0]
            //           .toLowerCase()
            //           .replaceAll(" ", "-")
            //       : ""
            //   }-for-${
            //     propertyPayload.pro_ad_type.toLowerCase() === "rent"
            //       ? "rent"
            //       : "sale"
            //   }-in-${propertyPayload.pro_locality
            //     .toLowerCase()
            //     .replaceAll(" ", "-")}-${propertyPayload.pro_city
            //     .toLowerCase()
            //     .replaceAll(" ", "-")}-${response.data}`
            // );
          }
          setLoader1(false);
          setExcelFile(null);
          setExcelData([]);
          alert("Bulk properties listed successfully!");
        } catch (error) {
          setLoader1(false);
          setExcelErrors([`Error submitting properties: ${error.message}`]);
        }
      }
    } else {
        
    }
   

  };

  console.log("excelFile : " , excelFile ,excelData);
  return (
    <div>
      {/* {loader && <Loader />} */}
      {loader1 && <Loader />}
      <div className="container">
        <div className="quick-list-form">
          <div className="section-title">
            <h3 className="aboutus">
              Quick Property Listing{" "}
              <div className="heading-divider mx-auto"></div>
            </h3>
            <p className="pl-4 pr-4">
              Ready to get your property noticed? With our Quick Property Listing
              form, you can easily submit your property details and have it listed
              in no time! Our streamlined process is designed to get your property
              on the market quickly, allowing you to reach potential buyers or
              renters with minimal effort.
              <br />
              <a href="/property_listing_sample.xlsx" download>
                Download Excel Template for Bulk Upload
              </a>
            </p>
          </div>
          {/* <div>
                          <TextField
                            sx={{ m: 1, ml: 0, width: ["100%"] }}
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            label="Email"
                            value={userData.email}
                            onChange={(e) =>
                              setUserData({ ...userData, email: e.target.value })
                            }
                            required
                            FormHelperTextProps={{ sx: { color: "red" } }}
                            helperText={
                              formSubmit === true && state.emailFormatError !== false
                                ? state.emailFormatError
                                : ""
                            }
                          />
                        </div> */}
          <form onSubmit={handleSubmit}>
            <div className="flex-col-sm mainDiv">
              <div className="d-flex pro_flex">
                <div className="w-30 mr-3" style={{ width: "100%" }}>
                  <input
                    type="file"
                    id="excel-file"
                    className="hidden sr-only w-full"
                    accept=".xlsx, .xls"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setExcelFile(file);
                      setExcelData([]);
                      setExcelErrors([]);
                    }}
                  />
                  <label
                    htmlFor="excel-file"
                    className="border py-4 rounded-2 border-secondary quick-list-upload"
                  >
                    <div className="d-flex flex-column align-items-center">
                      <div>Drop Excel File here</div>
                      <div className="py-1">Or</div>
                      <div className="border py-2 px-4">Browse</div>
                    </div>
                  </label>
                  {excelFile && (
                    <div className="pt-2">
                      <div className="file-name-1">{excelFile.name}</div>
                      <button
                        type="button" // Prevents form submission
                        className="btn btn-secondary mt-2"
                        onClick={() => handleExcelUpload(excelFile)}
                        disabled={!excelFile}
                      >
                        Upload Excel
                      </button>
                    </div>
                  )}
                  {excelErrors.length > 0 && (
                    <div className="text-danger mt-2">
                      <h5>Errors in Excel Data:</h5>
                      {excelErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                      ))}
                    </div>
                  )}
                  {excelData.length > 0 && (
                    <div className="mt-3">
                      <h4>Uploaded Properties</h4>
                      <ul>
                        {excelData.map((row, index) => (
                          <li key={index}>
                            {row["Locality"]} - {row["Property Type"]} (
                            {excelErrors.some((e) =>
                              e.includes(`Row ${index + 2}`)
                            )
                              ? "Error"
                              : "Pending"}
                            )
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn continue-btn"
                  disabled={excelErrors.length > 0}
                >
                  {/* {currentUser === null ? (
                    "Continue"
                  ) : excelFile ? (
                    <> */}
                      <IconPlus /> Add Bulk Properties
                    {/* </>
                  ) : (
                    <>
                      <IconPlus /> Add Property
                    </>
                  )} */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminQuickList;