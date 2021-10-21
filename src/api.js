import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API

  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle.
   * returns { handle, name, description, numEmployees, logoUrl, jobs }
   * where jobs is [{ id, title, salary, equity }, ...]
   */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** get an array of companies with/without searchTerm 
   * returns [{handle, name, description, numEmployees logoUrl},...]
  */

  static async getCompanies(searchTerm) {
    const searchFilters = searchTerm ? { name: searchTerm } : null;
    const res = await this.request("companies", searchFilters);
    return res.companies;
  }

  /** get an array of jobs with/without searchTerm
   * returns [{id, title, salary, equity, companyHandle, companyName},...]
  */
  static async getJobs(searchTerm) {
    // console.log("api.js - getJobs:", searchTerm);

    const searchFilters = searchTerm ? { title: searchTerm } : null;
    // console.log("searchFilters:", { searchFilters });

    const res = await this.request("jobs", searchFilters);
    return res.jobs;
  }

  /** function to log in a user, takes an object loginInfo: {username, password}
   * returns token */
  static async login(loginInfo) {
    const res = await this.request("auth/token", loginInfo, "post");
    this.token = res.token;
    return res.token;
  }

  /** function to register a new user
   * takes an object newUserData: { username, password, firstName, lastName, email }
   * returns token */
  static async register(newUserData) {
    // console.log("Api newUserData:", { newUserData });
    const res = await this.request("auth/register", newUserData, "post");
    this.token = res.token;
    return res.token;
  }

  /** function that updates a user's information,
   * takes an username, and an object userData, can include { firstName, lastName, password, email}
   * returns user: { username, firstName, lastName, email, isAdmin }
   */
  static async updateUser(username, userData) {
    const res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }


  /**function that gets the information for one user
   * takes username,  
   * returns { username, firstName, lastName, isAdmin, jobs }
   * where jobs is { id, title, companyHandle, companyName, state }
   * */

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**function that applies a job for a user,
   * takes username and jobId,
   * returns jobId
   */

  static async applyForJob(username, jobId) {
    const res = await this.request(`users/${username}/jobs/${jobId}`);
    return res.applied;
  }
  // obviously, you'll add a lot here ...
}

export default JoblyApi;
