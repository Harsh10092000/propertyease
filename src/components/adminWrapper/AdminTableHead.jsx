import React from "react";




const AdminTableHead = ({ theadArray }) => {
  return (
    <thead className="head">
      <tr>
        {theadArray.map((item, index) => {
          // Handle colspan
          if (item.colspan) {
            return (
              <th
                key={index}
                colSpan={item.colspan}
                className={`table-head ${item.customClass || ''}`}
              >
                {item.value}
              </th>
            );
          }

          // Handle customClass
          return (
            <th
              key={index}
              className={`table-head ${item.customClass || ''}`}
            >
              {item.value}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default AdminTableHead;



