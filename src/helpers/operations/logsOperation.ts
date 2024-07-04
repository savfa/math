import { fetchData } from "../utils/fetchData.ts";
import { ServerURL } from "../consts/appRoute.ts";

export const LOGS_PER_PAGE = 20;

export const LogsOperation = {
  createLog: (body: any, callback?: any) => {
    return fetchData({
      url: ServerURL.LOGS,
      method: `POST`,
      body,
    }).then((res) => {
      const { data: log } = res;

      if (callback) {
        callback(log);
      }

      return log;
    });
  },
  filterLogs: ({
    page = 1,
    perPage = LOGS_PER_PAGE,
    filters,
    callback,
  }: {
    page?: number;
    perPage?: number;
    filters?: any;
    callback?: any;
  }) => {
    return fetchData({
      url: ServerURL.FILTER_LOGS,
      query: `?page=${page}&perPage=${perPage}`,
      method: `POST`,
      body: filters,
    }).then((res) => {
      const { data: logs, links } = res;

      if (callback) {
        callback({ logs, links });
      }

      return { logs, links };
    });
  },
};
