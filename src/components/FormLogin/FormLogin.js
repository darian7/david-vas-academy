import { Form, Input, Button } from "antd";

export const FormLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

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

        <Form.Item className="forgot" name="forgot" valuePropName="checked" noStyle>
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
          >Ingresar
          </Button>
        </Form.Item>

        <Form.Item>
          ¿No tienes cuenta? <a href="/">Regístrate aquí</a>
        </Form.Item>
      </Form>
    </div>
  );
};
