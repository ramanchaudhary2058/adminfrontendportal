import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { getCourseVideo } from "../../api/course";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const ClassContent = () => {
  const [classData, setClassData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract subject from URL
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get("subject");
console.log(user._doc.batch)
console.log(subject)
  useEffect(() => {
    getCourseVideo()
      .then(response => {
        const userBatchVideos = response.data.filter(
          video => Array.isArray(user._doc?.batch) &&
                   user._doc?.batch.includes(video.batch) &&
                   String(video.subject).toLowerCase() === String(subject).toLowerCase()
        );
        
        
        setClassData(userBatchVideos);
        if (userBatchVideos.length > 0) {
          setSelectedVideo(userBatchVideos[0]);
        }
      })
      .catch(error => {
        console.error("Error fetching class content:", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after data fetch
      });
  }, [user, subject]);
console.log(classData)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold">Watch {subject} Videos</h2>
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
          <RxCross1 size={24} />
        </button>
      </div>

      {isLoading ? (
        <h1 className="text-center text-lg font-semibold mt-6">Loading videos...</h1>
      ) : classData.length === 0 ? (
        <h1 className="text-center text-xl font-bold mt-6">No videos available for {subject}</h1>
      ) : (
        <>
          {selectedVideo && (
            <iframe
              width="560"
              height="315"
              src={selectedVideo.videoUrl}
              title="YouTube Video"
              className="rounded-lg w-full h-96 my-6"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}

          <div className="mt-4 space-y-2">
            {classData.map((video, index) => (
              <button
                key={index}
                onClick={() => setSelectedVideo(video)}
                className="flex items-center space-x-3 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full text-left"
              >
                <FaCirclePlay className="text-blue-500" />
                <span className="capitalize">{video.subject}</span>
                <span className="capitalize">Day: {video.day}</span>
                <span className="capitalize">{video.title}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ClassContent;
