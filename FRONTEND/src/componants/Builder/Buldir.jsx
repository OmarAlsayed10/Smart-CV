import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Personal from './Edit/Personal';
import Experience from './Edit/Experience';
import Education from './Edit/Education';
import Skills from './Edit/Skills';
import Preview from './Preview';
import SideBar from './sidebar/sideBar';
import Header from './header';
import { usePreview } from '../../context/previewContext';
import { useTranslation } from 'react-i18next';

const Builder = () => {
  const [editMode, setEditMode] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { goToPreview, setGoToPreview } = usePreview();
  const { t } = useTranslation();

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    if (goToPreview) {
      setEditMode(false); 
      setGoToPreview(false); 
    }
  }, [goToPreview]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          minHeight: '100vh',
        }}
      >
        <Box sx={{
          width: isMobile ? '100%' : '25%',
          my: 3,
          minWidth: '220px',
        }}>
          <SideBar />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            p: isMobile ? 2 : 3,
            width: '100%',
          }}
        >
          <Paper
            sx={{
              mb: 3,
              bgcolor: 'background.gray',
              height: 30,
              maxWidth: isMobile ? '95%' : 'none',
            }}
          >
            <Tabs
              value={editMode ? 'edit' : 'preview'}
              onChange={(e, newValue) => setEditMode(newValue === 'edit')}
              variant="fullWidth"
              sx={{
                height: "100%",
                minHeight: "unset",
                '& .MuiTabs-flexContainer': {
                  display: 'flex',
                  justifyContent: 'space-between',
                  height: '100%',
                },
                '& .MuiTab-root': {
                  fontWeight: 600,
                  flex: 1,
                  maxWidth: 'none',
                  textTransform: 'none',
                  height: '100%',
                  minHeight: "unset",
                  padding: 0,
                  margin: 0,
                  '&.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: 'white',
                    borderRadius: 2,
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab
                icon={<EditOutlinedIcon fontSize="small" />}
                iconPosition="start"
                label={t('Edit')}
                value="edit"
              />
              <Tab
                icon={<VisibilityOutlinedIcon fontSize="small" />}
                iconPosition="start"
                label={t('Preview')}
                value="preview"
              />
            </Tabs>
          </Paper>

          {editMode ? (
            <Box>
              <Paper sx={{
                mb: 3,
                bgcolor: "background.gray",
                height: "30px",
                overflow: "hidden",
                width: isMobile ? "70%" : "50%",
                mx: "auto"
              }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  sx={{
                    height: "100%",
                    minHeight: "unset",
                    width: "100%",
                    '& .MuiTabs-flexContainer': {
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                    },
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      textTransform: 'none',
                      height: '100%',
                      minHeight: "unset",
                      padding: 0,
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                      '&.Mui-selected': {
                        color: 'primary.main',
                        bgcolor: 'white',
                        borderRadius: 2,
                      },
                    },
                    '& .MuiTabs-indicator': {
                      display: 'none',
                    },
                  }}
                >
                  <Tab label={t('Personal')} value="personal" />
                  <Tab label={t('Experience')} value="experience" />
                  <Tab label={t('Education')} value="education" />
                  <Tab label={t('Skills')} value="skills" />
                </Tabs>
              </Paper>
              <Divider sx={{ mb: 3 }} />

              <Paper
                sx={{
                  p: isMobile ? 2 : 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {activeTab === 'personal' && <Personal />}
                {activeTab === 'experience' && <Experience />}
                {activeTab === 'education' && <Education />}
                {activeTab === 'skills' && <Skills />}
              </Paper>
            </Box>
          ) : (
            <Preview />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Builder;
