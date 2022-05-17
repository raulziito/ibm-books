import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
// import { Container } from './styles';

function Rating(rating: any) {
    // const [rating, setRating] = useState(0);
    const rate = rating;

    return (
        <div className="flex">
            {[...Array(5)].map((item, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input
                            key={item}
                            type="radio"
                            className="rating"
                            name="rating"
                        />
                        <AiFillStar
                            size={20}
                            color={
                                ratingValue <= rate.rating
                                    ? "#ffc107"
                                    : "#e4e5e9"
                            }
                        />
                    </label>
                );
            })}
        </div>
    );
}

export default Rating;
