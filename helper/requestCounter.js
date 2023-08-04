export const countJobseeker = (jobseekerList) => {
    const requestCount = jobseekerList.filter(jobseeker => !jobseeker.isApproved)
    return requestCount.length;
}