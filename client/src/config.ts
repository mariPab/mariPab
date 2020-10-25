const DEV_SERVER_URL = 'http://localhost:8000';
export const API_URL = process.env.NODE_ENV === 'production' ? '/api' : `${DEV_SERVER_URL}/api`;
export const IMAGES_URL = process.env.NODE_ENV === 'production' ? '/images' : `${DEV_SERVER_URL}/images`;
