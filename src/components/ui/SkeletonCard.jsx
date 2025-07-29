import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="skeleton-film">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-title shimmer" />
      <div className="skeleton-meta shimmer" />
    </div>
  );
};

export default SkeletonCard;
