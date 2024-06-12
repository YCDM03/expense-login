import Router from "./shared/Router";
import GlobalStyle from "./Globalstyle";
import { useQuery } from "@tanstack/react-query";
import { fetchExpense } from "./axios/expenseApi";
import Header from "./components/layout/Header";

function App() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchExpense,
  });
  if (isPending) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>데이터 조회중 오류가 발생했습니다!</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
