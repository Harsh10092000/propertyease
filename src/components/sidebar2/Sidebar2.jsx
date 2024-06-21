import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Sidebar2 = (props) => {
  const [subData, setSubData] = useState([]);
  const [rentData, setRentData] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/fetchPropertySubCatNo`)
      .then((res) => {
        setSubData(res.data);
      })
      .catch((error) => console.error('Error fetching property subcategories:', error));

    axios
      .get(import.meta.env.VITE_BACKEND + `/api/pro/rentalPropertyTotal`)
      .then((res) => {
        setRentData(res.data);
      })
      .catch((error) => console.error('Error fetching rental property totals:', error));
  }, []);

  return (
    <div>
      <div className="p-1 shadow">
        <div className="p-3 font-weight-bold text-black">For Sale</div>
        {subData.map((sub, index) => (
        //   <Link
        //     key={index}
        //     to={`/${sub.pro_type
        //       .split(',')[1]
        //       .toLowerCase()}/${sub.pro_type
        //       .split(',')[0]
        //       .replaceAll(' ', '-')
        //       .toLowerCase()}`}
        //     className="d-flex justify-content-between px-3 py-2"
        //     onClick={() => setSearchValue('')}
        //   >
        //     <div>{sub.pro_type.split(',')[0]}</div>
        //     <div>({sub.pro_sub_cat_number})</div>
        //   </Link>
          <div
          key={index}

          onClick={() => props.handleForSale(`${sub.pro_type
                  .split(',')[1]
                  .toLowerCase()}/${sub.pro_type
                  .split(',')[0]
                  .replaceAll(' ', '-')
                  .toLowerCase()}`)}
        
          
          className="d-flex justify-content-between px-3 py-2 text-primary pointer"
        >
           <div>{sub.pro_type.split(',')[0]}</div>
              <div>({sub.pro_sub_cat_number})</div>
        </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="p-1 shadow">
          <div className="p-3 font-weight-bold text-black">Rent</div>
          {rentData.map((rent, index) => (
            // <Link
            //   key={index}
            //   to={`/rental/${rent.pro_type
            //     .split(',')[0]
            //     .replaceAll(' ', '-')
            //     .toLowerCase()}`}
            //   className="d-flex justify-content-between px-3 py-2"
            // >
            //   <div>{rent.pro_type.split(',')[0]}</div>
            //   <div>({rent.pro_sub_cat_number})</div>
            // </Link>
            <div
            key={index}
            onClick={() => props.handleForRent(`${rent.pro_type
                .split(',')[0]
                .replaceAll(' ', '-')
                .toLowerCase()}`)}
            
            className="d-flex justify-content-between px-3 py-2 text-primary pointer"
          >
            <div>{rent.pro_type.split(',')[0]}</div>
            <div>({rent.pro_sub_cat_number})</div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
