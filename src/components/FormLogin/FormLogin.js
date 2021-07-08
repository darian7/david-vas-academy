import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { auth as AuthActions } from "../../services/Auth/AuthActions";
import { SpinIndicator } from "../SpinIndicator/SpinIndicator";

export const FormLogin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const onFinish = (values) => {
    dispatch(
      AuthActions.login(
        values?.username?.toLowerCase()?.trim(),
        values?.password
      )
    );
  };

  return (
    <div className="form-login">
      <p>{t(`header.item.login`)}</p>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          className="username"
          name="username"
          rules={[
            {
              required: true,
              message: t(`error.login.NO_USERNAME`),
            },
          ]}
        >
          <Input placeholder={t(`button.user`)} />
        </Form.Item>

        <Form.Item
          className="password"
          name="password"
          rules={[
            {
              required: true,
              message: t(`error.login.NO_PASSWORD`),
            },
          ]}
        >
          <Input type="password" placeholder={t(`button.password`)} />
        </Form.Item>

        <Form.Item className="btn-login">
          <span className="span">
            {/* {t(`button.forgotPassword`)}{" "} */}
            {/* <a className="login-form-forgot" href="/">
              {t(`button.clickHere`)}
            </a> */}
          </span>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {loading && <SpinIndicator />}
            {!loading && t(`button.entry`)}
          </Button>
          {error?.login && (
            <div className="ant-form-item-explain big-error">
              {t(`error.login.${error?.login}`)}
            </div>
          )}
          {/* <span>
            {t(`button.notAccount`)} <a href="/">{t(`button.signHere`)}</a>
          </span> */}
        </Form.Item>
      </Form>
    </div>
  );
};
