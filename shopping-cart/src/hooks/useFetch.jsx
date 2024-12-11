import { useEffect, useState } from "react";

function useFetch(url) {
  const [error, setError] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      async function getData() {
        const controller = new AbortController();

        setIsLoading(() => true);
        try {
          const request = await fetch(`${url}`, {
            signal: controller.signal,
          });
          const response = await request.json();

          setData(() => response);
          return response;
        } catch (e) {
          setError(() => e.message);
        } finally {
          setIsLoading(() => false);
          setError(() => " ");
        }
        return () => controller.abort();
      }
      getData(url);
    },
    [url]
  );

  return { isLoading, error, data };
}

export default useFetch;
