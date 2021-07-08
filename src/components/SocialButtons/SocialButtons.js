import fb from '../../assets/social/facebook.svg'
import wa from '../../assets/social/whatsapp.svg'
import ig from '../../assets/social/instagram.svg'

export const SocialButtons = () => {

  const whasapp = "+573216257831"

  return (
    <div className="social-buttons">
      <div className="title">
        <h4>Redes Sociales</h4>
      </div>

      <div className="icons">
        <div className="icons_box fb">
          <a href="https://www.facebook.com/Davidvasfex"><img src={fb} alt="Facebook" /></a>
        </div>
        <div className="icons_box wa">
          <a href={`whatsapp://send?phone=${whasapp}`}><img src={wa} alt="Whatsapp" /></a>
        </div>
        <div className="icons_box ig">
          <a href="https://www.instagram.com/davidvastrade/?hl=es-la"><img src={ig} alt="Instagram" /></a>
        </div>
      </div>
    </div>
  );
};
