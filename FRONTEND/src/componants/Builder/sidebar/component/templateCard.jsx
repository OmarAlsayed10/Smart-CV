import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTemplate } from '../../../../context/choosenTempContext';
import { usePreview } from '../../../../context/previewContext';
import { useAuth } from '../../../../context/Auth/AuthContext';

function TemplateCard(props) {

  const { title, img , disc, pro, onCloseDialog} = props;
  const {choosenTemp, setChoosenTemp} = useTemplate();
  const { setGoToPreview } = usePreview();

  const {user} = useAuth();
      const isPro = user.role === 'pro user';

  const handleSelect = (e)=>{
    e.preventDefault();
    setChoosenTemp(title);
    onCloseDialog();
    setGoToPreview(true);  // switch to Preview tab
    }

  return (
    <Card sx={{ maxWidth: 200, border: choosenTemp === title? 'solid #6a11cb 3px' :'' }}>
  <Box sx={{ position: 'relative' }}>
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        color: 'white',
        px: 1,
        py: 0.5,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
      {choosenTemp === title? <CheckCircleOutlineIcon sx={{ mr: 0.5, mt: 0.5, color: 'green' }} />:<div></div>}
      </Typography>
      {pro && (
        <Typography
          variant="caption"
          sx={{
            background: '#6a11cb',
            px: '8px',
            py: '4px',
            mx: 2,
            mt: 0.5,
            borderRadius: '5px',
            fontWeight: 'bold',
          }}
        >
          Pro
        </Typography>
      )}
    </Box>

    {/* Fixed-size Image */}
    <CardMedia
      component="img"
      image={img}
      alt="template image"
      sx={{
        height: 350,
        width:210,
        // width: '100%',
        // objectFit: 'cover',
      }}
    />
  </Box>

       

        {/* Text Below Image */}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {disc}
          </Typography>
        </CardContent>
      

      <CardActions>
        <Button disabled={!isPro && pro} size="small" color="primary" variant='contained' fullWidth
          onClick={handleSelect}>
          Select
        </Button>
      </CardActions>
    </Card>
  )
}

export default TemplateCard
