import React from 'react'
import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Button, Box, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';


function Navbar() {
   
    const [anchorProFile, setAnchorProFile] = useState< null | HTMLElement>(null)
    const openProFile = Boolean(anchorProFile)
    const handleClinkProFile = (event: React.MouseEvent<HTMLButtonElement>) =>{
      setAnchorProFile(event.currentTarget)
    }
    const handleCloseProFile = () =>{
      setAnchorProFile(null)
    }

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)



  return (
    <AppBar 
            position = 'static' 
            color="secondary" 
    >

      <Toolbar >

        <IconButton 
          size='large'
          edge='start'
          color='inherit'
          
          onClick = {() => setIsDrawerOpen(true)}
        >
          <MenuIcon />

        </IconButton>

        <Typography 
          variant='h6'
          component='div' 
          sx={{flexGrow: 1}}
        >
          ระบบทุนการศึกษา

        </Typography>

        <Drawer 
            anchor='left'
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}                        
        >
            <Box 
                width='230px'  
                textAlign={'center'} 
                role='presentation'

            >
                <Typography 
                    variant='h6'
                    component='div'
                    sx={{boxShadow: 1, p:2}}
                >
                    เลือกหัวข้อ
                    
                </Typography>
    
                <Button fullWidth variant="text" color="secondary" component = {RouterLink} to="/" > หน้าแรก </Button>
                <Button fullWidth variant="text" color="secondary" component = {RouterLink} to="/Student" > ลงทะเบียนข้อมูล </Button>
                <Button fullWidth variant="text" color="secondary" component = {RouterLink} to="/ScholarHistory" > ประวัติการขอทุนการศึกษา </Button>
                <Button fullWidth variant="text" color="secondary" component = {RouterLink} to="/ScholarCreate" > ขอทุนการศึกษา </Button>

            </Box>
           
        </Drawer>

        <IconButton 
          size='large' 
          edge='start' 
          color='inherit' 
          id='resources-button-profile' 
          onClick={handleClinkProFile} 
          aria-controls={openProFile ? 'resources-profile': undefined}
          aria-haspopup='true'
          aria-expanded={openProFile ? 'true' : undefined}
        >
          <AccountCircle sx={{ fontSize: 40 }} />

        </IconButton>

        <Menu 
          id='resources-profile' 
          anchorEl={anchorProFile} 
          open={openProFile} 
          MenuListProps={{
            'aria-labelledby' : 'resources-button-profile',
          }}
          onClose={handleCloseProFile}
        >
          <MenuItem onClick={handleCloseProFile} component = {RouterLink} to="/ProFile">ประวัติ</MenuItem>
          <MenuItem onClick={handleCloseProFile} component = {RouterLink} to="/">ออกจากระบบ</MenuItem>

        </Menu>

      </Toolbar>

    </AppBar>
  )
}

export default Navbar