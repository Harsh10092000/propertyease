import { useState, useRef, useEffect } from "react";

const AdminDropdownDesgin = ( {children} ) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div ref={dropdownRef} className="action-dropdown-wrapper">
      <>
        <span onClick={toggleDropdown} className="action-dropdown arrow-down">
          Actions
        </span>

        {open && (
          <div className="action-menu">
            {children}
          </div>
        )}
      </>
     
    </div>
  );
};

export default AdminDropdownDesgin;