import axios, { Axios } from "axios";

import { Cafe } from "../../store/cafes/types";
import { CafeType } from "../../utils/types";

export class Cafes {
  _url: string;
  _network: Axios;

  constructor() {
    this._url = "http://localhost:4000/api/cafe";
    this._network = axios;
  }

  addCafe = (cafe: CafeType) => {
    return this._network.post(`${this._url}`, cafe);
  };

  getCafes = (location?: string) => {
    const url = location ? `${this._url}?location=${location}` : this._url;
    return this._network.get(url);
  };

  deleteCafe = (cafeId: string) => {
    return this._network.delete(`${this._url}/${cafeId}`);
  };

  updateCafe = (cafe: Cafe) => {
    return this._network.put(`${this._url}/${cafe.cafeId}`, cafe);
  };
}
