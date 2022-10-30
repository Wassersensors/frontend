function FlowClient() {
    this.baseUrl = 'http://hermes.squi.cc:42069'
    this.testUrl = 'http://localhost:42069'
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
