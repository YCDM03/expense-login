import { useParams, Link, useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { StButton } from "../shared/FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../redux/slices/listSlice";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default function Edit() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const targetItem = list.find((e) => {
    return e.id === params.id;
  });

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
              dispatch(deleteList(targetItem));
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
