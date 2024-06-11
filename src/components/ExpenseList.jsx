import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchExpense } from "../axios/expenseApi";

const StUl = styled.ul`
  max-width: 1200px;
  min-width: 500px;
  min-height: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;

const StLi = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f6f6f6;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.233);
`;

const StContentDiv = styled.div`
  width: 100%;
  font-weight: 700;
  margin-top: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  color: #5b5bf5;
`;

const linkStyle = {
  textDecoration: "none",
  color: "none",
};

const StH3 = styled.h3`
  color: #fd009c;
`;

const StSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export default function ExpenseList({ selectedMonth }) {
  const {
    data: expense,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchExpense,
  });
  if (isPending) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>데이터 조회중 오류가 발생했습니다!</div>;
  }

  const monthList = expense.filter((el) => {
    return el.date.slice(5, 7) === selectedMonth;
  });
  return (
    <StUl>
      {monthList.map((el) => {
        const { id, date, type, price, detail } = el;
        return (
          <StLi key={id}>
            <Link style={linkStyle} to={"/edit/" + id}>
              <StH3>{date}</StH3>
              <StContentDiv>
                <StSpan>
                  {type}-{detail}
                </StSpan>
                <span>{price}원</span>
              </StContentDiv>
            </Link>
          </StLi>
        );
      })}
    </StUl>
  );
}
