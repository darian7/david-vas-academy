import fb from '../../assets/social/facebook.svg'
import wa from '../../assets/social/whatsapp.svg'
import ig from '../../assets/social/instagram.svg'

export const SocialButtons = () => {
  return (
    <div className="social-buttons">
      <div className="title">
        <h4>Redes Sociales</h4>
      </div>

      <div className="icons">
        <div className="icons_box fb">
          <a href="/"><img src={fb} alt="Facebook" /></a>
        </div>
        <div className="icons_box wa">
        <a href="/"><img src={wa} alt="Whatsapp" /></a>
        </div>
        <div className="icons_box ig">
        <a href="/"><img src={ig} alt="Instagram" /></a>
        </div>
      </div>
    </div>
  );
};
