import api from "./api";

const fetchExpense = async () => {
  const response = await api.get("/expense");
  return response.data;
};
const addExpense = async (newExpense) => {
  await api.post("/expense", newExpense);
};
const deleteExpense = async (expenseId) => {
  await api.delete("/expense/" + expenseId);
};
const editExpense = async (editExpense) => {
  await api.patch("/expense/" + editExpense.id, editExpense);
};

export { fetchExpense, addExpense, deleteExpense, editExpense };
