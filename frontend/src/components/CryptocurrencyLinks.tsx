import * as React from 'react';
import { Box, Button, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChatIcon from '@mui/icons-material/Chat';
import CircleIcon from '@mui/icons-material/Circle';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import ICryptocurrencyCommunityData from '../interfaces/cryptocurrency/ICryptocurrencyCommunityData';
import ICryptocurrencyLinks from '../interfaces/cryptocurrency/ICryptocurrencyLinks';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';

const locale = 'en-GB';

const createSubredditNameFromLink = (redditLink: string): string => {
  if (redditLink.slice(-1) === '/') {
    return redditLink.substring(redditLink.indexOf('r/')).slice(0, -1);
  }
  return redditLink.substring(redditLink.indexOf('r/'));
};

const CryptocurrencyLinks: React.FC<
  ICryptocurrencyLinks & ICryptocurrencyCommunityData & { color: string }
> = (props) => {
  const [openHomepage, setOpenHomepage] = useState(true);
  const [openBlockchainSite, setOpenBlockchainSite] = useState(true);
  const [openOfficialForumUrl, setOpenOfficialForumUrl] = useState(true);
  const [openChatUrl, setOpenChatUrl] = useState(true);
  const [openAnnouncementUrl, setOpenAnnouncementUrl] = useState(true);
  const [openSocialMedia, setOpenSocialMedia] = useState(true);

  return (
    <>
      <Typography variant="h3" sx={{ mt: 8 }}>
        Links and socials
      </Typography>
      <List>
        {props.homepage?.length !== 0 && (
          <>
            <ListItemButton onClick={() => setOpenHomepage(!openHomepage)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={props.homepage?.length === 1 ? 'Homepage' : 'Homepages'}
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openHomepage ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openHomepage} timeout="auto" unmountOnExit>
              <List component="div">
                {props?.homepage?.map((link, index) => {
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
                          fontSize: 18,
                          color: props.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: props.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link }}
                        target="_blank"
                      >
                        {link}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
        {props.official_forum_url?.length !== 0 && (
          <>
            <ListItemButton onClick={() => setOpenOfficialForumUrl(!openOfficialForumUrl)}>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  props.official_forum_url?.length === 1 ? 'Official forum' : 'Official forums'
                }
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openOfficialForumUrl ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openOfficialForumUrl} timeout="auto" unmountOnExit>
              <List component="div">
                {props?.official_forum_url?.map((link, index) => {
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
                          fontSize: 18,
                          color: props.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: props.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link }}
                        target="_blank"
                      >
                        {link}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
        {(props.facebook_username || props.twitter_username || props.subreddit_url) && (
          <>
            <ListItemButton onClick={() => setOpenSocialMedia(!openSocialMedia)}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText
                primary="On social media"
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openSocialMedia ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSocialMedia} timeout="auto" unmountOnExit>
              <List component="div">
                {props.facebook_username && (
                  <ListItem sx={{ pl: 7 }}>
                    <ListItemIcon>
                      <Box
                        component="img"
                        alt="Facebook logo"
                        src="/facebook_logo.svg"
                        sx={{ width: 25, height: 'auto' }}
                      />
                    </ListItemIcon>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        mr: '2',
                        fontSize: 18,
                        color: props.color,
                        ':hover': {
                          color: 'black',
                          backgroundColor: 'white',
                          borderColor: props.color,
                        },
                      }}
                      component={Link}
                      to={{ pathname: 'https://www.facebook.com/' + props.facebook_username }}
                      target="_blank"
                    >
                      {props.facebook_username}
                    </Button>
                  </ListItem>
                )}
                {props.twitter_username && (
                  <ListItem sx={{ pl: 7 }}>
                    <ListItemIcon>
                      <Box
                        component="img"
                        alt="Twitter logo"
                        src="/twitter_logo.svg"
                        sx={{ width: 25, height: 'auto' }}
                      />
                    </ListItemIcon>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        mr: '2',
                        fontSize: 18,
                        color: props.color,
                        ':hover': {
                          color: 'black',
                          backgroundColor: 'white',
                          borderColor: props.color,
                        },
                      }}
                      component={Link}
                      to={{ pathname: 'https://www.twitter.com/' + props.twitter_username }}
                      target="_blank"
                    >
                      {props.twitter_username}
                    </Button>
                    <ListItemText
                      primary={
                        '(Followers: ' +
                        (props.twitter_followers?.toLocaleString(locale) ?? '?') +
                        ')'
                      }
                      primaryTypographyProps={{ fontSize: '16px' }}
                      sx={{ fontSize: '30px' }}
                    />
                  </ListItem>
                )}
                {props.subreddit_url && (
                  <ListItem sx={{ pl: 7 }}>
                    <ListItemIcon>
                      <Box
                        component="img"
                        alt="Reddit logo"
                        src="/reddit_logo.svg"
                        sx={{ width: 25, height: 'auto' }}
                      />
                    </ListItemIcon>
                    <Button
                      variant="text"
                      sx={{
                        textTransform: 'none',
                        mr: '2',
                        fontSize: 18,
                        color: props.color,
                        ':hover': {
                          color: 'black',
                          backgroundColor: 'white',
                          borderColor: props.color,
                        },
                      }}
                      component={Link}
                      to={{ pathname: props.subreddit_url }}
                      target="_blank"
                    >
                      {createSubredditNameFromLink(props.subreddit_url)}
                    </Button>
                    <ListItemText
                      primary={
                        '(Subscribers: ' +
                        (props.reddit_subscribers !== 0
                          ? props.reddit_subscribers?.toLocaleString(locale) ?? '?'
                          : '?') +
                        ')'
                      }
                      primaryTypographyProps={{ fontSize: '16px' }}
                      sx={{ fontSize: '30px' }}
                    />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </>
        )}
        {props.chat_url?.length !== 0 && (
          <>
            <ListItemButton onClick={() => setOpenChatUrl(!openChatUrl)}>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                primary={props.chat_url?.length === 1 ? 'Chat url' : 'Chat urls'}
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openChatUrl ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openChatUrl} timeout="auto" unmountOnExit>
              <List component="div">
                {props?.chat_url?.map((link, index) => {
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
                          fontSize: 18,
                          color: props.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: props.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link }}
                        target="_blank"
                      >
                        {link}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
        {props.announcement_url?.length !== 0 && (
          <>
            <ListItemButton onClick={() => setOpenAnnouncementUrl(!openAnnouncementUrl)}>
              <ListItemIcon>
                <CampaignIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  props.announcement_url?.length === 1 ? 'Announcement url' : 'Announcement urls'
                }
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openAnnouncementUrl ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openAnnouncementUrl} timeout="auto" unmountOnExit>
              <List component="div">
                {props?.announcement_url?.map((link, index) => {
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
                          fontSize: 18,
                          color: props.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: props.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link }}
                        target="_blank"
                      >
                        {link}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
        {props.blockchain_site?.length !== 0 && (
          <>
            <ListItemButton onClick={() => setOpenBlockchainSite(!openBlockchainSite)}>
              <ListItemIcon>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  props.blockchain_site?.length === 1 ? 'Blockchain site' : 'Blockchain sites'
                }
                primaryTypographyProps={{ fontSize: '22px' }}
                sx={{ fontSize: '30px' }}
              />
              {openBlockchainSite ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openBlockchainSite} timeout="auto" unmountOnExit>
              <List component="div">
                {props?.blockchain_site?.map((link, index) => {
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
                          fontSize: 14,
                          color: props.color,
                          ':hover': {
                            color: 'black',
                            backgroundColor: 'white',
                            borderColor: props.color,
                          },
                        }}
                        component={Link}
                        to={{ pathname: link }}
                        target="_blank"
                      >
                        {link}
                      </Button>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </>
        )}
      </List>
    </>
  );
};

export default CryptocurrencyLinks;
