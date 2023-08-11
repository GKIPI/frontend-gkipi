export const requestCounter = (requests) => {
    const requestCount = requests.filter(request => !request.approval)
    return requestCount.length;
}

export const getRequestedData = (requests) => {
    const requestCount = requests.filter(request => !request.approval)
    return requestCount;
}