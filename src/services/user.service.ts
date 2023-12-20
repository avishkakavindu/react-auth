import axios from 'axios';
import { IRegisterUserData } from '../interfaces/user.interface';

const API_URL = 'http://localhost:3002/v1';

/**
 * Register user
 * TODO error handling need improvement
 * @param {IRegisterUserData} userData - Registration form data
 * @returns
 */
export const registerUser = async (userData: IRegisterUserData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || 'Something went wrong';
  }
};

/**
 * Get authenticated user data
 * TODO move the endpoint to separate file, implement general function to handle request aspects like header and body
 * @param {string} accessToken - JWT access token
 * @returns
 */
export async function getUserData(accessToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.get('http://localhost:3002/v1/users', config);
    return response.data.node;
  } catch (error) {
    throw error;
  }
}
