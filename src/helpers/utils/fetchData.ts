export const fetchData = async ({
  url = ``,
  method = `GET`,
  query = ``,
  body,
}: {
  url: string;
  method?: string;
  query?: string;
  body?: any;
}) => {
  const prepareUrl = url + query;

  return fetch(prepareUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && {
      body: JSON.stringify(body),
    }),
  }).then((res) => res.json());
};
