import React from 'react'
// src/main.jsx
import './index.css';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Nav() {

  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'inherit',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: '#000d',
  }),
}));
  return (
    <div className='w-full h-28 bg-[#000d] text-amber-50 flex justify-around items-center'>
      <div className='w-[70%]  '>
        <p className='p1 text-2xl font-bold'>DATA MONETIZATION</p>
       
      </div>
   <div>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 1, md: 3 }}
      className='satck'
      >
        <Item>Explore</Item>
        <Item>My Data</Item>
        <Item>Sales</Item>
      </Stack>
    </div>
      <AccountCircleIcon sx={{ fontSize: 33 }}/>

     
    
    </div>
  )
}
