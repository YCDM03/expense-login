import { jsonApi } from "./api";

const fetchExpense = async () => {
  const response = await jsonApi.get("/expense");
  return response.data;
};
const addExpense = async (newExpense) => {
  await jsonApi.post("/expense", newExpense);
};
const deleteExpense = async (expenseId) => {
  await jsonApi.delete("/expense/" + expenseId);
};
const editExpense = async (editExpense) => {
  await jsonApi.patch("/expense/" + editExpense.id, editExpense);
};

export { fetchExpense, addExpense, deleteExpense, editExpense };
