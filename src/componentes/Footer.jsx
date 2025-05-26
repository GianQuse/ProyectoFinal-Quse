import whatsappIcon from '/imagenes/whatsapp.png';
import instagramIcon from '/imagenes/instagram.png';
import facebookIcon from '/imagenes/facebook.png';

export const Footer = () => {
  return (
    <footer>
      <div className="contenedorWhatsapp">
        <h3>Envianos un Whatsapp</h3>
        <p>(Solicita tu pedido o reserva tu mesa)</p>
        <img className="iconosRedes" src={whatsappIcon} alt="Whatsapp" />
      </div>

      <h3>
        Tambien, <br /> buscanos en nuestras redes
      </h3>

      <div className="contenedorRedes">
        <img className="iconosRedes" src={instagramIcon} alt="Instagram" />
        <img className="iconosRedes" src={facebookIcon} alt="Facebook" />
      </div>
    </footer>
  );
};
