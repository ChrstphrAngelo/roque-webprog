import axios from 'axios';
import constants from '../constants';

// API Access to Front-end JSON data transformation or decoder
const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Fetch all articles
export const fetchArticles = () => API.get('/');

// Fetch a single article by its slug (name)
export const fetchArticleByName = (name) => API.get(`/${name}`);

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article
export const deleteArticle = (id) => API.delete(`/${id}`);
