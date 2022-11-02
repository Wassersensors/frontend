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

FlowClient.prototype.setAlias = async function(alias, device_id) {
  try {
    const response = await fetch(
        `${this.baseUrl}/register/${device_id}`,
        {
            method: 'POST',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify({ alias })
        })
    return response;
  } catch (e) {
      console.log({ e })
  }
}
