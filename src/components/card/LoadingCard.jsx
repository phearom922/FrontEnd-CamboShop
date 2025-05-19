import React from "react";
//ant design
import { Skeleton, Card } from "antd";

const LoadingCard = ({ count }) => {
  const LoopCard = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <Card key={i} className="w-full h-100 lg:h-auto">
          <Skeleton active />
        </Card>,
      );
    }
    return cards;
  };

  return (
    <div className="grid lg:grid-cols-5 gap-4 pb-10">
      {LoopCard()}
    </div>
  );
};

export default LoadingCard;
