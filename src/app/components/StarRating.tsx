import React from 'react';


interface Props{
    rating:number
}

const StarRating = ({ rating }:Props) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <span key={i} className={`text-[24px] color-[#ddd] cursor-pointer ${i <= rating ? 'text-[gold]' : ''}`}>
                ★
            </span>
        );
    }

    return (
        <div className="star-rating">
            {stars}
        </div>
    );
};

export default StarRating;
