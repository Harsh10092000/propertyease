import React from "react";
import { Link } from "react-router-dom";
const AdminMenuBtnLink = () => {
  return <div>AdminMenuBtnLink</div>;
};

const AdminMenuBtnDesgin = ({ className, title, onClickFun, icon, name }) => {
    return (
        <div className="action-btn">
      <div
        title={title}
        className={className}
        onClick={onClickFun} // Direct function reference ya call logic yahan
      >
        {icon} {name}
      </div>
      </div>
    );
  };

const AdminMenuLinkDesgin = ({ className, title, to, icon, name }) => {
  return (
    <div className="action-btn">
      <Link className={className} title={title} to={to}>
        {icon} {name}
      </Link>
    </div>
  );
};

export default AdminMenuBtnLink;
export { AdminMenuBtnDesgin, AdminMenuLinkDesgin };
