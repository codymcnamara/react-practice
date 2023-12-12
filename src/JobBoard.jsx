import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export default function JobListings() {
    const [jobs, setJobs] = useState([]);
    let jobIds = useRef([]);

    const fetchJobDetails = async (jobId) => {
        try {
            const jobDetail = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
            console.log(jobs);
            // let newJobs = [...jobs, jobDetail.data];
            return jobDetail.data;
        } catch(error) {
            console.log(error)
        }
    }


    useEffect( () =>{
        const fetchJobIds = async () => {
            jobIds.current = await axios.get('https://hacker-news.firebaseio.com/v0/jobstories.json')
            console.log(jobIds.current.data)
            
            let jobDetails = [];
            for (let i = 0; i < jobIds.current.data.length && i < 6; i++){
                // console.log(jobIds.current.data[i]);
                const jobDet = await fetchJobDetails(jobIds.current.data[i]);
                jobDetails.push(jobDet);
            }
            setJobs(jobDetails);
        }
        fetchJobIds();
    }, [])

    

    return(
        <>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map((job) => {
                    return <li key={job.id}>{job.title}</li>
                })}
            </ul>
        </>
    )

}