import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem'
import { Link, Paper } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';


const drawerWidth = 200;

export default function DashBoard({children}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            My Pharmacy
          </Typography>
        </Toolbar>

      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List>
          {['Start Sell', 'Order Report', "Add Stock", "Stock Report", "Add Medicine", 'Medicine Report','Add Company', 'Company Report',"Add Category", 'Category Report', "Logout"].map((text, index) => (
           <Link  href={`/${text.replace(/ /g,"")}`} underline="none" >
            <ListItem button key={text} >              
              <ListItemText primary={text} sx={{color:"black",fontWeight:900}} />             
            </ListItem> 
            </Link>
          ))}
        
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
    
  );
}
