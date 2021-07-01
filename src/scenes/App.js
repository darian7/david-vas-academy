import { useSelector } from "react-redux";
import { Private } from "../scenes/Private/Private";
import { Public } from "../scenes/Public/Public";
import "../sass/app.scss";

export const App = ({ history }) => {
  const { authentication } = useSelector((state) => state.auth);

  return (
    <div>
      {!authentication && <Public />}
      {authentication && <Private history={history} />}
    </div>
  );
};
