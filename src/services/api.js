import axios from "axios";

export const api = axios.create({
    baseURL: 'https://www.camara.gov.br/SitCamaraWS'
});