import { useCV } from '../../../context/CVcontext';
import { Box, Typography, TextField, Button, IconButton, Divider, Stack, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { t } from 'i18next';

const Experience = () => {
  const { formData, updateArraySection, addArrayItem, removeArrayItem } = useCV();
  const experiences = formData.experience || [];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (index, field, value) => {
    updateArraySection('experience', index, { [field]: value });
  };

  const addExperience = () => {
    addArrayItem('experience', {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    });
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: isMobile ? '90%' : '800px',
      margin: '0 auto',
      padding: '12px'
    }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333', fontSize: '1.1rem', textAlign: 'start' }}>
          {t('Work Experience')}
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addExperience}
          sx={{
            bgcolor: '#4e54c8',
            color: 'white',
            '&:hover': {
              bgcolor: '#3f46a5'
            },
            fontSize: '0.85rem',
            padding: '6px 12px'
          }}
        >
          {t('Add Experience')}
        </Button>
      </Stack>

      <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', p: 2 }}>
        {
          experiences.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'start' }}>
                  {t('Experience')} {index + 1}
                </Typography>

                <IconButton
                  onClick={() => removeArrayItem('experience', index)}
                  sx={{ color: '#ff4444' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', gap: '12px', mb: 2 }}>
                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                    {t('Job Title')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="jobTitle"
                    value={exp.jobTitle || ''}
                    onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                    placeholder={t('Marketing Manager')}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      '& .MuiInput-input': {
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                    {t('Company')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="company"
                    value={exp.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    placeholder={t('Company Name')}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      '& .MuiInput-input': {
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: '12px', mb: 2 }}>
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                    {t('Location')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="location"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder={t('New York, NY')}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      '& .MuiInput-input': {
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                    {t('Start Date')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="startDate"
                    value={exp.startDate || ''}
                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                    placeholder={t('Jan 2020')}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      '& .MuiInput-input': {
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>

                <Box sx={{ width: '50%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                    {t('End Date')}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    name="endDate"
                    value={exp.endDate || ''}
                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                    placeholder={t('Present')}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                      '& .MuiInput-input': {
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        padding: '4px 8px'
                      }
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '0.85rem', textAlign: 'start' }}>
                  {t('Description')}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  name="description"
                  value={exp.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder={t('Describe your responsibilities and achievements...')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      padding: '6px'
                    }
                  }}
                />
              </Box>

              {index < experiences.length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))
        }

        {experiences.length === 0 && (
          <Typography sx={{ color: '#666', fontStyle: 'italic', textAlign: 'start' }}>
            {t('No experiences added yet')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Experience;
