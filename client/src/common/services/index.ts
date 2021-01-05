import { HttpService } from './HttpService';
import { AuthService } from './AuthService';
import { TodosService } from './TodosService';

const httpService = new HttpService();

export const authService = new AuthService(httpService);
export const todosService = new TodosService(httpService);
