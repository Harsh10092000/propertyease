import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Package2 from '../../pages/premimumPackages/Package2';
import { IconAlertCircle } from '@tabler/icons-react';
import PaymentSucess from '../../pages/paymentSuccess/PaymentSucess';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const CheckListingAva = ({setListingNotAva, listingNotAva }) => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const handleClose = () => {
    setListingNotAva(false);
  };
  const handlePaymnetStatus = (val) => {
    setPaymentSuccessful(val);
  };

  return (
    <Modal
      open={listingNotAva}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="container">
          {paymentSuccessful ? (
        
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <PaymentSucess />
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{ 
                  mt: 3,
                  alignSelf: 'center',
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  textTransform: 'none',
                  px: 4,
                  py: 1
                }}
              >
                Close
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2,
                  color: '#1e1d85',
                  fontWeight: 'bold',
                  bgcolor: '#f8f8f8',
                  p: 2,
                  borderRadius: 1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}
              >
                Upgrade Your Plan
              </Typography>

              <Box sx={{ 
                bgcolor: '#fff8f8', 
                p: 3, 
                borderRadius: 1,
                border: '1px solid #ffd1d1',
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}>
                <IconAlertCircle 
                  size={40} 
                  color="#d32f2f" 
                  stroke={1.5} 
                />
                <Box>
                  <Typography 
                    sx={{ 
                      fontSize: '1.2rem',
                      color: '#d32f2f',
                      fontWeight: 'medium',
                      mb: 1
                    }}
                  >
                    Monthly Limit Exceeded
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#444',
                      fontSize: '1rem',
                      lineHeight: 1.5
                    }}
                  >
                    You've reached your limit of 5 properties for this month. 
                    Upgrade to one of our premium plans below to add more properties immediately, 
                    or wait until {/* {upcomingDate} */} for the limit to reset.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2 
                }}>
                  <Package2 handlePaymnetStatus={(val) => handlePaymnetStatus(val)} />
                </Box>
              </Box>
              {/* <Button
                variant="contained"
                onClick={() => handleListingNotAva(false)}
                sx={{ 
                  mt: 3,
                  alignSelf: 'center',
                  bgcolor: '#1976d2',
                  '&:hover': { bgcolor: '#1565c0' },
                  textTransform: 'none',
                  px: 4,
                  py: 1
                }}
              >
                Close
              </Button> */}
            </Box>

          )}
        </div>
      </Box>
    </Modal>
  );
};

export default CheckListingAva;