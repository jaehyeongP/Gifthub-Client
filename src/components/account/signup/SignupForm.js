import React, {useEffect, useState} from "react";
import SignupInputWrapper from "./SignupInputWrapper";
import OutlineButton from "../../ui/button/OutlineButton";
import SelectorButton from "../../ui/button/SelectorButton";
import {useNavigate} from "react-router-dom";
import MessageWrapper from "./MesseageWrapper";

import axios from "axios";

export default function SignupForm() {
    let navigate = useNavigate();

    const [inputs, setInputs] = useState({});
    const {email} = inputs;
    const [validateMessage, setValidateMessage] = useState('');
    const [field, setField] = useState('');
    const [style, setStyle] = useState('');

    const onBlur = (e) => {
        const {name, value} = e.target;
        setInputs({
            ...inputs,

            [name]: value
        })

        errorCheck(e);
    }

    const errorCheck = (e) => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/local/signup/validate/email`,
                {email})
            .then(response => {
                let result = response.data
                setValidateMessage(result.message)
                setField(result.field);
                setStyle("green");


            })
            .catch(error => {
                let result = error.response.data
                setValidateMessage(result.message);
                setField(result.field);
                setStyle("red");
            });
    };

    const onChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })

    }

    const signUp = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/local/signup/submit`,
                inputs)
            .then(response => {
                alert("회원가입을 축하드립니다")
                console.log(response.data);
                navigate("/login");
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <form className="l-f-o__form">
            <div>

                <div className="gl-inline u-s-m-b-25">
                    <SignupInputWrapper target="email" labelText="이메일" type="text"
                                        placeholder="이메일을 입력해주세요" _onChange={onChange}
                                        _onBlur={onBlur}></SignupInputWrapper>

                </div>
                <div>
                    <MessageWrapper color={style} innerText={validateMessage} target={field}></MessageWrapper>
                </div>


                <div className="gl-inline u-s-m-b-25">

                    <SignupInputWrapper target="password" labelText="비밀번호" type="password"
                                        placeholder="비밀번호를 입력해주세요" _onChange={onChange}></SignupInputWrapper>
                    <SignupInputWrapper target="confirmPassword" labelText="비밀번호확인" type="password"
                                        placeholder="비밀번호를 입력해주세요" _onChange={onChange}></SignupInputWrapper>

                </div>


                <div className="gl-inline u-s-m-b-15">

                    <SignupInputWrapper target="nickname" labelText="닉네임" type="text"
                                        placeholder="닉네임을 입력해주세요" _onChange={onChange}></SignupInputWrapper>
                    <SignupInputWrapper target="name" labelText="이름" type="text"
                                        placeholder="이름을 입력해주세요" _onChange={onChange}></SignupInputWrapper>

                </div>

                <div className="gl-inline u-s-m-b-25">

                    <SignupInputWrapper target="tel" labelText="전화번호" type="text"
                                        placeholder="01012345678" _onChange={onChange}></SignupInputWrapper>

                </div>

                <div className="gl-inline u-s-m-b-25">

                    <SignupInputWrapper target="birthDate" labelText="생년월일" type="text"
                                        placeholder="생년월일 8자리를 입력해주세요" _onChange={onChange}></SignupInputWrapper>

                    <SelectorButton target="gender" labelText="성별" options={['m', 'f']} placeholder="성별"
                                    innerText={['남성', '여성']}
                                    _onChange={onChange}></SelectorButton>

                </div>

                <div className="u-s-m-b-25" style={{display: 'flex', justifyContent: 'center'}}>
                    <OutlineButton target="signUp" innerText="회원가입" _onClick={signUp}></OutlineButton>
                </div>
            </div>
        </form>
    )

}