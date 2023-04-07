import React from "react";
import './Image.scss';

export function Image({ url, click }) {

  return (
    <img className="good-image" src={`http://shop-roles.node.ed.asmer.org.ua/${url}`} onClick={click} />
  )
}