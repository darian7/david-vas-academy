import { Form, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { auth as AuthActions } from "../../services/Auth/AuthActions";
import { SpinIndicator } from "../SpinIndicator/SpinIndicator";

export const FormLogin = (
) => {

  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)
  const { t } = useTranslation()

  const onFinish = (values) => {
    dispatch(AuthActions.login(values?.username?.toLowerCase()?.trim(), values?.password))
  }

  return (
    <div className="form-login">
      <p>Iniciar Sesión</p>

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
              message: "Por favor ingresa usuario",
            },
          ]}
        >
          <Input placeholder="Usuario" />
        </Form.Item>

        <Form.Item
          className="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor ingresa la contraseña",
            },
          ]}
        >
          <Input type="password" placeholder="Contraseña" />
        </Form.Item>

        <Form.Item className="forgot" valuePropName="checked" noStyle>
          <span>
            ¡Olvidaste la contraseña?{" "}
            <a className="login-form-forgot" href="/">
              Clic aquí
            </a>
          </span>
        </Form.Item>

        <Form.Item className="btn-login">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {loading && <SpinIndicator />}
            {!loading && "Ingresar"}
          </Button>
        </Form.Item>
          
        {error?.login && <div className="ant-form-item-explain big-error"> {t(`error.login.${error?.login}`)} </div>}

        <Form.Item>
          ¿No tienes cuenta? <a href="/">Regístrate aquí</a>
        </Form.Item>
      </Form>

    </div>
  );
};
