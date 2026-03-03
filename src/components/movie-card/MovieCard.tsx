import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MovieCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  description,
  imageUrl,
  href,
}) => {
  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <Image src={imageUrl} alt={title} width={300} height={450} />
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-description">{description}</p>
        <Link href={href} className="movie-card-button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
