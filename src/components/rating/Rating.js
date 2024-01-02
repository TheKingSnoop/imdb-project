import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Waste of Time',
  1: 'Terrible',
  1.5: " Don't Watch",
  2: 'Poor',
  2.5: 'Bad',
  3: 'OK',
  3.5: 'Alright',
  4: 'Good',
  4.5: 'Very Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({userInput, setUserInput}) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={userInput.rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setUserInput({
            ...userInput,
            rating: event.target.value
          });
          console.log('rating', userInput.rating)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {userInput.rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : userInput.rating]}</Box>
      )}
    </Box>
  );
}