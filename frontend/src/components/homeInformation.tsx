import React, { useState, useEffect, useRef } from "react";
import { GetJobs } from "../functions";
import { Jobs } from "../interfaces";
import { LoadingCircle } from "./loading";

function writeJobs(jobsArray: string[]) {
    let currentJobIndex = 0;
    let i = 0;
    let deleteJob = false;

    function typeWriter() {
        const job_name: string = jobsArray[currentJobIndex];
        const domJob = document.querySelector("#job");

        if (!deleteJob) {
            if (i < job_name.length) {
                domJob && (domJob.innerHTML += job_name.charAt(i));
                i++;
                setTimeout(typeWriter, 100);
            } else {
                deleteJob = true;
                setTimeout(typeWriter, 1000);
            }
        } else {
            if (i > 0) {
                domJob && (domJob.innerHTML = job_name.substring(0, i - 1));
                i--;
                setTimeout(typeWriter, 50);
            } else {
                deleteJob = false;
                currentJobIndex = (currentJobIndex + 1) % jobsArray.length;
                setTimeout(typeWriter, 500);
            }
        }
    }

    typeWriter();
}

export const HomeInformation: React.FC = () => {
    const [homeJobs, setHomeJobs] = useState<Jobs[]>([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [jobsError, setJobsError] = useState(false);
    const jobsInitialized = useRef(false);

    const fetchJobs = async () => {
        try {
            const jobs = await GetJobs();
            if (jobs.length > 0) {
                setHomeJobs(jobs);
                setLoadingJobs(false);
            } else {
                setTimeout(fetchJobs, 2000);  // 2 saniye sonra tekrar dene
            }
        } catch (error) {
            setJobsError(true);
            setTimeout(fetchJobs, 2000);  // 2 saniye sonra tekrar dene
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        if (homeJobs.length > 0 && !jobsInitialized.current) {
            const jobElements: string[] = homeJobs.map(item => item.job_name);
            writeJobs(jobElements);
            jobsInitialized.current = true;
        }
    }, [homeJobs]);

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <p className="text-zinc-300 text-[40px] mb-5 uppercase">Furkan İBİŞ</p>
            <p className="text-zinc-300 text-[30px]">
                I AM A
                <span className="italic font-thin text-zinc-600"> &lt;code&gt;</span>
                <span id="job" className="text-amber-400 uppercase">{loadingJobs && <LoadingCircle />}</span>|
                <span className="italic font-thin text-zinc-600">&lt;/code&gt;</span>
                .
            </p>
            <a href="/documents/cv.pdf" target="_blank" className="mt-5 italic font-thin text-zinc-300 hover:underline hover:text-amber-400">Check my resume</a>
            
            {jobsError && !loadingJobs && <p className="text-red-500">Error loading jobs</p>}
        </div>
    );
};
