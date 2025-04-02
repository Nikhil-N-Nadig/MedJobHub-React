import React from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard";
import { useState,useEffect } from "react";
import backendService from "../../Flask_service/flask";
import { useSelector } from "react-redux";
import "../JobsList/JobsList.css"

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  const user = useSelector((state) => state.auth.userData);
  const role = user?.role;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let response;
        if(!user){
          console.log("Please Login")
        } 
  
        if (role === "employer") {
          response = await backendService.getEmployerJobs();
        } else {
          response = await backendService.getAvailableJobs();
        }
  
        console.log("Response is:",response);
        if (response.success) {
          console.log(response.jobs);
          setJobs(response.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
  
    fetchJobs();
  }, [role]);

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  return (
    <>
      <h2 className="jobs-head">{role === "employer" ? "Your Jobs" : "Available Jobs"}</h2>
      <section className="job-container">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              userRole={role}
              userId={user.id}
              onDeleteJob={handleDeleteJob}
            />
          ))
        ) : (
          <p className="no-applications">No jobs available.</p>
        )}
      </section>

      {role === "employer" && (
        <>
          <p className="add-job-info">Click here to add more job opportunities and grow your team!</p>
          <div className="jobcard-btn-field">
            <a href="/add-job">Add a New Job</a>
          </div>
        </>
      )}
    </>
  );
};

export default JobListings;
