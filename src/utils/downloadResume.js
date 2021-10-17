import axios from 'axios';

// eslint-disable-next-line consistent-return
const downloadResume = async url => {
  const getResume = axios.create({
    baseURL: url,
    method: 'GET',
    responseType: 'blob',
  });
  try {
    const response = await getResume.get();
    const { data } = response;
    const file = new Blob([data], { type: 'application/pdf' });
    const fileUrl = URL.createObjectURL(file);
    return fileUrl;
  } catch (e) {
    // window.alert('Please upload new Resume');
    console.log(e);
  }
};

export default downloadResume;