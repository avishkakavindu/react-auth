import axios from 'axios';
import { ILoginData } from '../interfaces/auth.inteface';

/**
 * Login user
 * !TODO move endpoint to separate file
 * @param {ILoginData} data
 * @returns
 */
export async function loginUser(data: ILoginData) {
  try {
    const response = await axios.post('http://localhost:3002/v1/auth', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
