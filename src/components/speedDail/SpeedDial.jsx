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
  IconPhoneCall,
} from "@tabler/icons-react";

const actions = [
  {
    icon: <IconBrandWhatsapp color="green" />,
    name: "Whatsapp",
    linkTo: "https://wa.me/918950040151",
  },
  {
    icon: <IconBrandFacebook color="blue" />,
    name: "Facebook",
    linkTo: "https://www.facebook.com/Propertyease.in/",
  },
  { icon: <IconPhone color="blue" />, name: "Phone", linkTo: "tel:8950040151" },
  { icon: <IconMail color="red" />, name: "Mail", linkTo: "mailto:propertyease.in@gmail.com" },
];

const SpeedDialComp = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <SpeedDial
      ariaLabel="SpeedDial controlled open example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<IconPhoneCall />}
      //icon={"Contact"}
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
