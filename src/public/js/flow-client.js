function FlowClient() {
    this.baseUrl = 'http://hermes.squi.cc:42069'
}

FlowClient.prototype.getFlowRecord = async function () {
    try {
        // const result = await fetch(
        //     `${this.baseUrl}/poll`,
        //     {
        //         method: 'GET',
        //         mode: 'no-cors',
        //         headers: { 'content-type': 'application/json' }
        //     })
        // return result;

        return {
            rate: Math.floor(Math.random() * 100),
            timestamp: new Date().getTime()
        }

    } catch (e) {
        console.log({ e })
    }
}
