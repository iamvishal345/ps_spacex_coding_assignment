export const getLaunchData = (filterStr) => {
  let url = `https://api.spaceXdata.com/v3/launches?limit=100${filterStr}`;

  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
