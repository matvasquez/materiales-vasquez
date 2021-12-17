import React from "react";
import Link from "next/link";

// Components
import { Instagram } from "../IconsSVG/Instagram";
import { Whatsapp } from "../IconsSVG/Whatsapp";
import { Facebook } from "../IconsSVG/Facebook";

// CSS
import styles from "@/styles/components/Footer.module.css";

const Footer = () => {
  const {
    footer,
    linksSyled,
    linkGroups,
    groupTitle,
    groupLi,
    groupLink,
    listIcons,
    linkIcon,
    paymentMethods,
    paymentMethodsImageContainer,
    allRightsReserved,
  } = styles;

  return (
    <footer className={footer}>
      <section className={linksSyled}>
        <div className={linkGroups}>
          <h5 className={groupTitle}>Servicio al cliente</h5>
          <ul>
            <li className={groupLi}>
              <Link href="/sucursales" passHref>
                <a className={groupLink}>Sucursales y horarios</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Second Group */}
        <div className={linkGroups}>
          <h5 className={groupTitle}>Más información</h5>
          <ul>
            <li className={groupLi}>
              <Link href="/aviso-de-privacidad" passHref>
                <a className={groupLink}>Aviso de privacidad</a>
              </Link>
            </li>
            <li>
              <Link href="/cancelaciones-devoluciones" passHref>
                <a className={groupLink}>
                  Política de cancelaciones y devoluciones
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Third Group */}
        <div className={linkGroups}>
          <h5 className={groupTitle}>Acerca de nosotros</h5>
          <ul>
            <li className={groupLi}>
              <Link href="/quienes-somos" passHref>
                <a className={groupLink}>¿Quiénes somos?</a>
              </Link>
            </li>
            <li>
              <Link href="/unete-a-nuestro-equipo" passHref>
                <a className={groupLink}>Únete a nuestro equipo</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Fourth Group */}
        <div className={linkGroups}>
          <h5 className={groupTitle}>Redes sociales</h5>
          <ul className={listIcons}>
            <li>
              <a
                className={linkIcon}
                href="https://www.instagram.com/materialesvasquezhermanos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Instagram"
              >
                <Instagram width="90%" />
              </a>
            </li>
            <li>
              <a
                className={linkIcon}
                href="https://api.whatsapp.com/send?phone=522288366283"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Twitter"
              >
                <Whatsapp width="90%" />
              </a>
            </li>
            <li>
              <a
                className={linkIcon}
                href="https://www.facebook.com/materialesvasquezhnos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Facebook"
              >
                <Facebook width="90%" />
              </a>
            </li>
          </ul>
        </div>
      </section>
      <section className={paymentMethods}>
        <h5 className={groupTitle}>Métodos de pago</h5>
        <div className={paymentMethodsImageContainer}>
          <img
            // src="https://www.jucri.com.mx/wp-content/uploads/2020/12/fda.png"
            src="https://www2.ipg-online.com/connect/images/brands/VISA.png;jsessionid=E36E0FC31FBB44B5A914.dc?version=c410470&t=green&r=dc&k=MTcyLjI1LjMuNTo5MTQz"
            width={249}
            height={57}
            alt="Imagen de Métodos de pago"
          />
          <img
            src="https://www2.ipg-online.com/connect/images/brands/MASTERCARD.png;jsessionid=E36E0FC31FBB44B5A914.dc?version=c410470&t=green&r=dc&k=MTcyLjI1LjMuNTo5MTQz"
            width={249}
            height={57}
            alt="Imagen de Métodos de pago"
          />
          <img
            src="https://www2.ipg-online.com/connect/images/brands/CARNET.png;jsessionid=E36E0FC31FBB44B5A914.dc?version=c410470&t=green&r=dc&k=MTcyLjI1LjMuNTo5MTQz"
            width={249}
            height={57}
            alt="Imagen de Métodos de pago"
          />
          <img
            src="https://www2.ipg-online.com/connect/images/brands/MEXICOLOCAL.png;jsessionid=E36E0FC31FBB44B5A914.dc?version=c410470&t=green&r=dc&k=MTcyLjI1LjMuNTo5MTQz"
            width={249}
            height={57}
            alt="Imagen de Métodos de pago"
          />
        </div>
      </section>
      <p className={allRightsReserved}>
        Materiales Vasquez Hermanos S.A. de C.V. © 2020. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};

export default Footer;
