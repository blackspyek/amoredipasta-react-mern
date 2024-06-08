import axios from "axios";
export const getAll = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`/api/foods/search/${searchTerm}`);
  console.log(data);
  return data;
};

export const getTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};
export const getFoodById = async (foodId) => {
  const { data } = await axios.get(`/api/foods/${foodId}`);
  return data;
};

export async function deleteById(foodId) {
  await axios.delete(`/api/foods/${foodId}`);
}

export async function update(food) {
  await axios.put("/api/foods", food);
}

export async function add(food) {
  const { data } = await axios.post("/api/foods", food);
  return data;
}
