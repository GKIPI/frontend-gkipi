export const requestCounter = (jobseekerList) => {
    const requestCount = jobseekerList.filter(jobseeker => !jobseeker.approval)
    return requestCount.length;
}

export const getRequestedData = (jobseekerList) => {
    const requestCount = jobseekerList.filter(jobseeker => !jobseeker.approval)
    return requestCount;
}