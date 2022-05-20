const axios = require('axios');

class APIervice {
  getContainerProcess(path) {
    const process_url = `http://process:8082/${path}`;
    return axios.get(process_url);
  }
}

module.exports = new APIervice();