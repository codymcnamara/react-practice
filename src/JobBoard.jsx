import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function JobListings() {
    const [jobs, setJobs] = useState([]);
    let jobIds = useRef([]);
    let jobIdIndex = useRef(0);

    let showShowMoreBtn = ()=>{
        return jobIds.current.data && jobIdIndex.current < jobIds.current.data.length - 1
    }

    const fetchJobDetails = async (jobId) => {
        try {
            const jobDetail = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
            return jobDetail.data;
        } catch(error) {
            console.log(error)
        }
    }

    const getNextJobs = async () => {
        let jobDetails = [];

        for (let i = jobIdIndex.current; i < jobIds.current.data.length && i < jobIdIndex.current + 6; i++){
            const jobDet = await fetchJobDetails(jobIds.current.data[i]);
            jobDetails.push(jobDet);
        }
        const newJobs = [...jobs, ...jobDetails];
        jobIdIndex.current = jobIdIndex.current + 6;

        setJobs(newJobs);
    }

    const fetchJobIds = async () => {
        jobIds.current = await axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
        getNextJobs();
    }

    useEffect( () =>{
        fetchJobIds();
    }, [])

    return(
        <>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job) => {
                    const titleEl = job.url ? <a href={job.url} target="_blank"><h3>{job.title}</h3></a> : <h3>{job.title}</h3>;
  
                    return (
                        <ol key={job.id}>
                            {titleEl}
                            <span>By: {job.by}</span> <span>at: {job.time}</span>
                        </ol>
                    )
                })}
            </ul>
            {showShowMoreBtn() && <button onClick={getNextJobs}>Load More</button>}
        </>
    )

}