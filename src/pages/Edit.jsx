import { useParams, Link, useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { StButton } from "../shared/FormComponent";
import { deleteExpense, fetchExpense } from "../axios/expenseApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: targetItem,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: fetchExpense,
    select: (targetItem) => {
      return targetItem.find((e) => {
        return e.id === params.id;
      });
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
    },
  });

  if (isPending) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>데이터 조회중 오류가 발생했습니다!</div>;
  }
  return (
    <ExpenseForm forEdit={true} targetItem={targetItem} id={params.id}>
      <Link to={"/"} style={linkStyle}>
        <StButton type="button">메인으로</StButton>
      </Link>
      <StButton>수정</StButton>
      <Link to={"/"} style={linkStyle}>
        <StButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const deletion = confirm("정말로 삭제하시겠습니까?");
            if (deletion) {
              alert("삭제되었습니다.");
              deleteItem(targetItem.id);
              navigate("/");
            }
          }}
        >
          삭제
        </StButton>
      </Link>
    </ExpenseForm>
  );
}
