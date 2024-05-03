import { sample_foods } from "../data";

export const getAll = async () => sample_foods;

export const search = async (searchTerm) =>
  sample_foods.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags
        .flat()
        .some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
export const getTags = async () => {
  const tags = sample_foods
    .map((item) => item.tags)
    .flat()
    .filter((item, index, self) => self.indexOf(item) === index);
  return tags;
};
export const getFoodById = async (foodId) =>
  sample_foods.find((food) => food.id === foodId);
