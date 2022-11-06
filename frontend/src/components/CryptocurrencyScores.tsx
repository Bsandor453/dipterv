import { Box } from '@mui/material';
import ICryptocurrencyScores from '../interfaces/cryptocurrency/ICryptocurrencyScores';
import React from 'react';
import Typography from '@mui/material/Typography';

const CryptocurrencyScores: React.FC<ICryptocurrencyScores & { color: string }> = (props) => {
  return (
    <>
      <Box id="upvotes">
        <Typography variant="h3" sx={{ mt: 8 }}>
          Ratings and opinions
        </Typography>
        <Typography variant="h5" sx={{ mr: 2, mt: 5, display: 'inline-block' }}>
          Upvotes from community:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.votes_up_percentage + '%'}
        </Typography>
      </Box>
      <Box id="downvotes">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Downvotes from community:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.votes_down_percentage + '%'}
        </Typography>
      </Box>
      <Box id="coingecko_score">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Coingecko score:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.coingecko_score}
        </Typography>
      </Box>
      <Box id="developer_score">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Developer score:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.developer_score}
        </Typography>
      </Box>
      <Box id="community_score">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Community score:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.community_score}
        </Typography>
      </Box>
      <Box id="liquidity_score">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Liquidity score:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.liquidity_score}
        </Typography>
      </Box>
      <Box id="public_interest_score">
        <Typography variant="h5" sx={{ mr: 2, mt: 3, display: 'inline-block' }}>
          Public interest score:
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            color: props.color,
            display: 'inline-block',
          }}
        >
          {props.public_interest_score}
        </Typography>
      </Box>
    </>
  );
};

export default CryptocurrencyScores;
