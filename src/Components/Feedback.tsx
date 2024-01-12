import { useState } from 'react';
import Star from './Star';
import '../css/youreAStar.css'

// https://www.algochurn.com/frontend/feedback-stars

const Feedback = ({ numberOfStars }: {numberOfStars: number}) => {
  const [persistedRating, setPersistedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (starNum: number) => {
    setHoverRating(starNum);
  }
  const handleMouseLeave = () => {
    setHoverRating(0);
  }

  const handleClick = (starNum: number) => {
    setPersistedRating(starNum);
  }

  const stars: React.ReactElement[] = [];
  for (let i = 1; i < numberOfStars + 1; i++) {
    stars.push(<Star 
      starNum={i} 
      key={i} 
      hoverRating={hoverRating}
      persistedRating={persistedRating}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      onStarClick={handleClick}
    />)
  }
  
  return (<div>
    {stars}
  </div>);
};

export default Feedback;
