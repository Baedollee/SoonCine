import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import useInput from '../../hook/hook';
import axios from 'axios';
import checkEmailThunk from '../../redux/modules/user';
import { useNavigate } from 'react-router-dom';

//styled import
import {
  MainBody,
  MainForm,
  IdInput,
  IdButton,
  IdArea,
  PwArea,
  PwCheckArea,
  ButtonArea,
  PwInput,
  NicknameArea,
  TitleTextArea,
} from './SignUpStyled';
import { TotalButton } from '../../component/totalButton/TotalButtonStyled';

const SignUp = () => {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [checkPw, setCheckPw] = useInput('');
  const [nickName, setNickName] = useInput('');
  const [E_Check, setE_check] = useState(false);
  const [N_Check, setN_Check] = useState(false);
  const [P_Check, setP_check] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkEmail = { email: email };
  const checkNickname = { nickname: nickName };
  const signUpData = {
    nickname: nickName,
    email: email,
    password: password,
    passwordConfirm: password,
  };
  console.log(E_Check, N_Check);

  // password === checkPw ? setP_check(true) : setP_check(false)
  // console.log(P_Check)

  const signUpCheck = (event) => {
    event.preventDefault();
    if (N_Check && E_Check) {
      axios
        .post('http://54.180.89.34:8080/api/member/signup', signUpData)
        .then(() => navigate('/'));
    }
    if (E_Check === false) {
      axios
        .post('http://54.180.89.34:8080/api/members/emailcheck', checkEmail)
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            alert('사용 가능한 이메일 입니다.');
            setE_check(res.data.data);
          } else {
            alert('이미 가입한 이메일 입니다.');
            setE_check(res.data.data);
          }
        });
    } else if (N_Check === false) {
      axios
        .post(
          'http://54.180.89.34:8080/api/members/nicknamecheck',
          checkNickname
        )
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data) {
            alert('사용 가능한 닉네임 입니다.');
            setN_Check(res.data.data);
          } else {
            alert('이미 사용중인 닉네임 입니다.');
            setE_check(res.data.data);
          }
        });
    }
  };


  return (
    <MainBody>
      <MainForm onSubmit={(event) => signUpCheck(event)}>
        <TitleTextArea>순씨네</TitleTextArea>

        <IdArea>
          <IdInput
            width={200}
            value={email}
            onChange={setEmail}
            placeholder="이메일"
            required
          />
          <IdButton>중복확인</IdButton>
        </IdArea>

        <PwArea>
          <PwInput
            width={320}
            placeholder="비밀번호"
            value={password}
            onChange={setPassword}
            type="password"
            // required
          />
        </PwArea>

        <PwCheckArea>
          <PwInput
            width={320}
            placeholder="비밀번호 확인"
            value={checkPw}
            onChange={setCheckPw}
            type="password"
            // required
          />
        </PwCheckArea>

        <NicknameArea>
          <IdInput
            width={200}
            placeholder="닉네임"
            value={nickName}
            onChange={setNickName}
            maxLength={8}
            // required
          />
          <IdButton>중복확인</IdButton>
        </NicknameArea>

        <ButtonArea>
          <TotalButton>등록</TotalButton>
        </ButtonArea>
      </MainForm>
    </MainBody>
  );
};

export default SignUp;
