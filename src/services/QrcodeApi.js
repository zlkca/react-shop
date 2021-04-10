import Api from './Api';

const API_URL = process.env.REACT_APP_API_URL;

const QrcodeApi = {

  async get(query) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/qrcodes.json' : Api.buildUrl(API_URL, 'qrcodes', query);

    return await Api.get(url);

  },

  async create(entity) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/qrcodes.json' : Api.buildUrl(API_URL, 'qrcodes');

    return await Api.post(url, entity);
  },

  async update(data) {
    const url = process.env.REACT_APP_MODE === 'local' ? '/qrcodes.json' : Api.buildUrl(API_URL, 'qrcodes');

    return await Api.put(url, data);
  },
};

export default QrcodeApi;
