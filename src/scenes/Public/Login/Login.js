import { FormLogin } from "../../../components/FormLogin/FormLogin";
import { SocialButtons } from "../../../components/SocialButtons/SocialButtons";


import LogoDV from "../../../assets/login/Logo-DV.png";
import LogoTrader from "../../../assets/login/Logo-Trader-Expert.png";

export const Login = () => {
  return (
    <div className="login">
      <div className="login_logo">
        <img src={LogoDV} alt="DavidVas" />
      </div>
      <div className="login_content">
        <div className="logo-trader">
          <img src={LogoTrader} alt="" />
        </div>
        <FormLogin/>
        <SocialButtons/>

      </div>
    </div>
  );
};
