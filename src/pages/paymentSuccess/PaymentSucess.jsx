import React from "react";
import { IconChecks, IconHome, IconPlus } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const PaymentSucess = (props) => {
  return (
    <Box sx={{ 
      py: 4, 
      px: 3, 
      
      mx: 'auto',
      bgcolor: '#fff',
      borderRadius: 2,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          mb: 2,
          bgcolor: '#1e1d85',
          width: 60,
          height: 60,
          borderRadius: '50%',
          mx: 'auto'
        }}>
          <IconChecks 
            size={32} 
            color="#fff" 
            stroke={1.5} 
          />
        </Box>
        
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#1e1d85',
            fontWeight: 'bold',
            mb: 2,
            fontFamily: 'sans-serif'
          }}
        >
          Payment Successful!
        </Typography>

        <Typography 
          sx={{ 
            color: '#444',
            fontSize: '1.1rem',
            mb: 2,
            fontFamily: 'sans-serif'
          }}
        >
          Thank You! Your payment of Rs. {props.paymentAmt || 'N/A'} has been received
        </Typography>

        <Box sx={{ 
          bgcolor: '#f8f8f8',
          p: 2,
          borderRadius: 1,
          mb: 3,
          border: '1px solid #e5e7eb'
        }}>
          <Typography sx={{ 
            color: '#444', 
            fontSize: '0.95rem',
            fontFamily: 'sans-serif'
          }}>
            Order ID: {props.orderId || 'N/A'} 
            <Box component="span" sx={{ mx: 1, color: '#94a3b8' }}>|</Box> 
            Payment ID: {props.paymentId || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Link to="/allproperties">
            <Button
              variant="outlined"
              startIcon={<IconHome />}
              sx={{
                textTransform: 'none',
                color: '#1e1d85',
                borderColor: '#1e1d85',
                fontFamily: 'sans-serif',
                px: 3,
                py: 1,
                '&:hover': {
                  bgcolor: '#e5e7eb',
                  borderColor: '#1e1d85'
                }
              }}
            >
              Go To Home
            </Button>
          </Link>

          <Button
            variant="contained"
            startIcon={<IconPlus />}
            //onClick={props.handleListingNotAva(false)}
            sx={{
              textTransform: 'none',
              bgcolor: '#00c4cc',
              fontFamily: 'sans-serif',
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: '#00b3b8'
              }
            }}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentSucess;