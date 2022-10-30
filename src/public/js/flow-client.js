function FlowClient() {
    this.baseUrl = 'https://wassersensors-backend.fly.dev'
}

FlowClient.prototype.getFlowRecord = async function () {
    try {
        const response = await fetch(
            `${this.baseUrl}/poll`,
            {
                method: 'GET',
                mode: 'cors'
            })
        return response;

    } catch (e) {
        console.log({ e })
    }
}
