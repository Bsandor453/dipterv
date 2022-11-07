import {
  Box,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import GitHubIcon from '@mui/icons-material/GitHub';
import ICryptocurrencyDeveloperData from '../interfaces/cryptocurrency/ICryptocurrencyDeveloperData';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';

const locale = 'en-GB';

const CryptocurrencyScores: React.FC<
  ICryptocurrencyDeveloperData & { color: string; githubRepos: string[] }
> = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Typography variant="h3" sx={{ mt: 8 }}>
        Developer data
      </Typography>
      {props.githubRepos?.length !== 0 && (
        <List sx={{ mt: 3 }}>
          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText
              primary={props.githubRepos?.length === 1 ? 'Github repo' : 'Github repos'}
              primaryTypographyProps={{ fontSize: '24px' }}
              sx={{ fontSize: '30px' }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              {props?.githubRepos?.map((repo, index) => {
                return (
                  <ListItem key={index} sx={{ pl: 7 }}>
                    <ListItemIcon>
                      <CircleIcon fontSize="small" sx={{ color: props.color }} />
                    </ListItemIcon>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        mr: '2',
                        fontSize: 16,
                        color: props.color,
                        ':hover': {
                          color: 'black',
                          backgroundColor: 'white',
                          borderColor: props.color,
                        },
                      }}
                      component={Link}
                      to={{ pathname: repo }}
                      target="_blank"
                    >
                      {repo}
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </List>
      )}
      <Box id="forks">
        <Typography variant="h5" sx={{ mr: 2, mt: 5, display: 'inline-block' }}>
          Forks:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.forks !== 0 ? props.forks?.toLocaleString(locale) ?? '?' : '?'}
        </Typography>
      </Box>
      <Box id="stars">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Stars:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.stars !== 0 ? props.stars?.toLocaleString(locale) ?? '?' : '?'}
        </Typography>
      </Box>
      <Box id="subscribers">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Subscribers:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.subscribers !== 0 ? props.subscribers?.toLocaleString(locale) ?? '?' : '?'}
        </Typography>
      </Box>
      <Box id="total_issues">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Total issues:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.total_issues !== 0 ? props.total_issues?.toLocaleString(locale) ?? '?' : '?'}
        </Typography>
      </Box>
      <Box id="closed_issues">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Closed issues:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.closed_issues !== 0 ? props.closed_issues?.toLocaleString(locale) ?? '?' : '?'}
        </Typography>
      </Box>
      <Box id="pull_requests_merged">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Pull requests merged:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.pull_requests_merged !== 0
            ? props.pull_requests_merged?.toLocaleString(locale) ?? '?'
            : '?'}
        </Typography>
      </Box>
      <Box id="pull_request_contributors">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Pull request contributors:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.pull_request_contributors !== 0
            ? props.pull_request_contributors?.toLocaleString(locale) ?? '?'
            : '?'}
        </Typography>
      </Box>
    </>
  );
};

export default CryptocurrencyScores;
