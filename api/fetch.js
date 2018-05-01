function makeid() {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const uploadPhoto = localUri => {
  const formData = new FormData();
  const data = {
    uri: localUri,
    name: `${makeid()}.jpg`,
    type: 'image/jpeg',
  };

  formData.append('data', data);

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(`https://api.graph.cool/file/v1/cjff02wnw47ya0132gejp3jbz`, options)
    .then(response => {
      return response.json();
    })
    .then(image => {
      return image;
    })
    .catch(error => console.error(`Error uploading image`));
};
