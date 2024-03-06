import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";

const actions = [
  {
    icon: <IconBrandWhatsapp />,
    name: "Whatsapp",
    linkTo: "https://wa.me/919996716787",
  },
  {
    icon: <IconBrandFacebook />,
    name: "Facebook",
    linkTo: "https://www.facebook.com/Propertyease.in/",
  },
  { icon: <IconPhone />, name: "Phone", linkTo: "tel:9996716787" },
  { icon: <IconMail />, name: "Mail", linkTo: "mailto:propertyease.in@gmail.com" },
];

const SpeedDialComp = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      className="speed-dial"
    >
      
        {actions.map((action) => (
            
          <SpeedDialAction
            key={action.name}
            href={action.linkTo}
            icon={action.icon}
            tooltipTitle={action.name}
            target="_blank"
            onClick={handleClose}
          />
         
        ))}
      
    </SpeedDial>
  );
};

export default SpeedDialComp;
