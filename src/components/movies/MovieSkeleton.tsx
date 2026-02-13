import React from "react";

const MovieSkeleton = () => {
  return (
    <div className="animate-pulse movie-card w-[300px]">
      {/* Image Placeholder */}
      <div className="w-full h-[200px] bg-[#3a1e0d]/60 rounded-lg border border-[#8c5a2b]/30"></div>
      
      <div className="p-4 space-y-4">
        {/* Title Placeholder */}
        <div className="h-7 bg-[#c9a15a]/30 rounded w-3/4 mx-auto mb-2"></div>
        
        {/* Description Placeholders */}
        <div className="space-y-2">
           <div className="h-3 bg-[#8c5a2b]/30 rounded w-full"></div>
           <div className="h-3 bg-[#8c5a2b]/30 rounded w-5/6 mx-auto"></div>
           <div className="h-3 bg-[#8c5a2b]/30 rounded w-4/5 mx-auto"></div>
        </div>

        {/* Button Placeholder */}
        <div className="h-9 bg-[#6b3a18] rounded-full w-full mt-4 border border-[#8c5a2b]/50"></div>
      </div>
    </div>
  );
};

export default MovieSkeleton;
