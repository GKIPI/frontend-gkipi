export const requestCounter = (jobseekerList) => {
    const requestCount = jobseekerList.filter(jobseeker => !jobseeker.approval)
    return requestCount.length;
}

export const requestCounterData = (jobseekerList) => {
    const requestCount = jobseekerList.filter(jobseeker => !jobseeker.approval)
    return requestCount;
}