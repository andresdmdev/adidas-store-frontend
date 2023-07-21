import React from "react";
import '../product/styles/products.css'
import { AiOutlineLinkedin } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";
import perfilPhoto from "../../../../assets/perfil.svg"

export default function ContactSection(){

  return (
    <>
      <section className="contact">
        <img src={perfilPhoto} alt="" width={144} height={144} />
        <h1>Andres Marquez</h1>
        <h2>Frontend Developer</h2>
        <div className="contact-links">
          <a href="https://github.com/andres-webdev"  target="blank">
            <BsGithub className="github-link" />
          </a>
          <a href="https://www.linkedin.com/in/andresmarquezdev/"  target="blank">
            <AiOutlineLinkedin className="linkedind-link" />
          </a>
        </div>
      </section>
    </>
  )
}