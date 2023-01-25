import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// 컴포넌트 함수 바깥 범위에 만들 수 있다. 컴포넌트 함수 내의 그 어떤 것과도 상호작용할 필요가 없기 때문이다. 
// Reducer에 사용되는 모든 데이터는 이 함수로 전달될 것이다. 리액트가 이 함수를 실행할 때 자동으로.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("EFFECT RUN");
  //   }, 500);

  //   return () => {
  //     console.log("EFFECT CLEAN UP");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredPassword]);

  // 오른쪽 객체 내부에 존재하는 isValid 프로퍼티만 꺼내서 emailIsValid라는 alias를 붙여주겠다.
  // 디펜던시를 좀 더 상세하게 정하고 싶어서 사용한다. 값이 변할 때마다 useEffect를 실행시키는 것이 아니라,
  // 유효성 검증이 완료되었다면 useEffect를 그만 실행해도 된다.  
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // clearTimeout()에 전달하기 위해 변수에 함수 할당. 
    const identifier = setTimeout(() => {
      console.log("Start Checking form validity");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);  // 500ms 후에 실행된다. 

    // 작성한 form이 유효한지 유효하지 않은지 검사.
    // 다른 모든 컴포넌트가 실행된 후에 + setFormIsValid, enteredEmail 또는 enteredPassword가 
    // 마지막 컴포넌트 렌더링 주기에서 변경된 경우에만 useEffect() 실행한다. 셋 중이 하나만 변경되어도 실행된다.
    // setFormIsValid(
    //   enteredEmail.includes('@') && enteredPassword.trim().length > 6
    // );
    // setFormIsValid는 생략할 수 있다. state 업데이트 함수는 기본적으로 절대 불변이기 때문이다. 

    // cleanUp Function
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value }); // payload
    // setEnteredEmail(event.target.value);

    // 두 개의 서로 다른 state에 의존하고 있다. enteredEmil, enteredPassword.
    // 하지만 여기서 두 state는 최신의 것이 아닐 수 있다. React의 state 스케쥴링 방식 때문이다. 
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;