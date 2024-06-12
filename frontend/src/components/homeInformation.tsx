import { useState, useEffect, useRef } from "react";
import { GetJobs } from "../functions";
import { Jobs } from "../interfaces";

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

export const HomeInformation = () => {
    const [homeJobs, setHomeJobs] = useState<Jobs[]>([]);
    const jobsInitialized = useRef(false);

    useEffect(() => {
        const fetchJobs = async () => {
            const jobs = await GetJobs();
            console.log(jobs);
            setHomeJobs(jobs);
        };
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
        <>
            <div className="h-full flex flex-col items-center justify-center">
                <p className="text-zinc-300 text-[40px] mb-5 uppercase">Furkan İBİŞ</p>
                <p className="text-zinc-300 text-[30px]">
                    I AM A
                    <span className="italic font-thin text-zinc-600"> &lt;code&gt;</span>
                    <span id="job" className="text-amber-400 uppercase"></span>|
                    <span className="italic font-thin text-zinc-600">&lt;/code&gt;</span>
                    .
                </p>
            </div>
        </>
    );
}
