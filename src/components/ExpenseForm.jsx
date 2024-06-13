import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
  StForm,
  StDiv,
  StInput,
  StValidDiv,
  StBtnDiv,
} from "../shared/FormComponent";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpense, editExpense } from "../axios/expenseApi";
import { useSelector } from "react-redux";

const expenseKoNameArr = ["날짜", "지출 항목", "지출 금액", "지출 내용"];
const expenseEnNameArr = ["date", "type", "price", "detail"];

export default function ExpenseForm({
  forEdit,
  targetItem = null,
  expenseId,
  children,
  selectedMonth,
}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [valid, setValid] = useState({
    date: true,
    type: true,
    price: true,
    detail: true,
  });
  const queryClient = useQueryClient();

  const { mutate: AddMutate } = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
    },
  });
  const { mutate: EditMutate } = useMutation({
    mutationFn: editExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
    },
  });

  const addExpenseItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    //form vaildation
    if (isNaN(formData.get("price"))) {
      setValid((prev) => {
        const obj = { ...prev };
        obj.price = false;
        return obj;
      });
      return alert("금액은 숫자로 입력해주세요");
    } else {
      setValid((prev) => {
        const obj = { ...prev };
        obj.price = true;
        return obj;
      });
    }

    const inputArr = expenseEnNameArr.map((el) => {
      return formData.get(el);
    });

    for (let i = 0; i < inputArr.length; i++) {
      if (!inputArr[i]) {
        setValid((prev) => {
          const obj = { ...prev };
          obj[expenseEnNameArr[i]] = false;
          return obj;
        });
      } else {
        setValid((prev) => {
          const obj = { ...prev };
          obj[expenseEnNameArr[i]] = true;
          return obj;
        });
      }
    }

    const [date, type, price, detail] = inputArr;
    if (!date || !type || !price || !detail) {
      return;
    }
    //
    forEdit
      ? EditMutate({
          id: expenseId,
          date,
          type,
          price: +price,
          detail,
          userName: user.nickname,
          userId: user.userId,
        })
      : AddMutate({
          id: uuidv4(),
          date,
          type,
          price: +price,
          detail,
          userName: user.nickname,
          userId: user.userId,
        });

    forEdit ? navigate("/") : e.target.reset();
  };

  return (
    <StForm onSubmit={addExpenseItem} $targetItem={targetItem ? true : false}>
      {expenseKoNameArr.map((item, i) => {
        if (item === "날짜") {
          return (
            <StDiv key={"div" + item} $targetItem={targetItem ? true : false}>
              <h4>{item.slice(-2)}</h4>
              <StInput
                key={item + selectedMonth}
                type="date"
                name={expenseEnNameArr[i]}
                placeholder={item}
                min="2024-01-01"
                max="2024-12-31"
                $valid={valid[expenseEnNameArr[i]]}
                defaultValue={
                  forEdit
                    ? targetItem[expenseEnNameArr[i]]
                    : "2024-" + selectedMonth + "-01"
                }
              />
              <StValidDiv
                key={valid[expenseEnNameArr[i]]}
                $valid={valid[expenseEnNameArr[i]]}
              >
                올바른 날짜를 입력해주세요
              </StValidDiv>
            </StDiv>
          );
        } else {
          return (
            <StDiv key={"div" + item} $targetItem={targetItem ? true : false}>
              <h4>{item.slice(-2)}</h4>
              <StInput
                key={item}
                type="text"
                name={expenseEnNameArr[i]}
                placeholder={item}
                $valid={valid[expenseEnNameArr[i]]}
                defaultValue={
                  targetItem ? targetItem[expenseEnNameArr[i]] : null
                }
              />
              <StValidDiv key={valid[i]} $valid={valid[expenseEnNameArr[i]]}>
                올바른 {item.slice(-2)}을 입력해주세요
              </StValidDiv>
            </StDiv>
          );
        }
      })}
      <StBtnDiv $targetItem={targetItem ? true : false}>
        {children ? children : null}
      </StBtnDiv>
    </StForm>
  );
}
