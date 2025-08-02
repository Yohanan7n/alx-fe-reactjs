import axios from 'axios';

// The base URL for the GitHub Search API for users
const GITHUB_SEARCH_API_URL = 'https://api.github.com/search/users?q';

/**
 * Searches for GitHub users based on advanced criteria.
 * @param {object} params - The search parameters.
 * @param {string} [params.username] - The username to search for.
 * @param {string} [params.location] - The location to filter by.
 * @param {string} [params.minRepos] - The minimum number of public repositories.
 * @param {string} [params.url] - The full URL for the next page of results (for pagination).
 * @returns {Promise<{items: object[], nextPageLink: string|null}>} - Search results and a link to the next page, or null if no next page exists.
 */
export const searchUsers = async ({ username, location, minRepos, url = null }) => {
  try {
    let requestUrl = url;

    // If no URL is provided, construct the initial search query
    if (!requestUrl) {
      let query = '';

      if (username) {
        query += username;
      }
      if (location) {
        query += `+location:${location}`;
      }
      if (minRepos) {
        query += `+repos:>=${minRepos}`;
      }

      if (!query) {
        throw new Error('Please enter at least one search criterion.');
      }

      requestUrl = `${GITHUB_SEARCH_API_URL}=${query}&per_page=30`;
    }

    const response = await axios.get(requestUrl);

    // Extract next page link from the response headers
    let nextPageLink = null;
    const linkHeader = response.headers.link;
    if (linkHeader) {
      const nextLinkMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
      if (nextLinkMatch) {
        nextPageLink = nextLinkMatch[1];
      }
    }

    return {
      items: response.data.items,
      nextPageLink,
    };
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        console.error('API Rate Limit Exceeded:', error.response.data.message);
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.response.status === 422) {
        console.error('Validation Failed:', error.response.data.message);
        throw new Error('Invalid search criteria. Please check your input.');
      }
    }
    throw error;
  }
};

/**
 * Fetches a single GitHub user's profile data.
 * @param {string} username - The GitHub username to fetch.
 * @returns {Promise<object>} - The user's profile data.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw error;
  }
};
