import api from "../axios";
import * as url from "../utils/urls";

export default {
  getTodoService: () => {
    return api.get(url.getTodoUrl);
  },
  addTodoService: text => {
    return api.post(url.addTodoUrl, { body: text });
  },
  deleteTodoService: id => {
    return api.delete(url.deleteTodoUrl(id));
  },
};
