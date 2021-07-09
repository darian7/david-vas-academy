import yt from "../../assets/social/youtube.svg";
import wa from "../../assets/social/whatsapp.svg";
import ig from "../../assets/social/instagram.svg";

export const SocialButtons = () => {
  const whasapp = "+573216257831";

  return (
    <div className="social-buttons">
      <div className="title">
        <h4>Redes Sociales</h4>
      </div>

      <div className="icons">
        <div className="icons_box yt">
          <a
            href="https://www.youtube.com/channel/UCXvuTwfpRPAwlctJn3YKM9w/videos"
            target="_blank"
            rel="noreferrer"
          >
            <img src={yt} alt="YouTube" />
          </a>
        </div>
        <div className="icons_box wa">
          <a
            href={`whatsapp://send?phone=${whasapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={wa} alt="Whatsapp" />
          </a>
        </div>
        <div className="icons_box ig">
          <a
            href="https://www.instagram.com/davidvastrade/?hl=es-la"
            target="_blank"
            rel="noreferrer"
          >
            <img src={ig} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};
