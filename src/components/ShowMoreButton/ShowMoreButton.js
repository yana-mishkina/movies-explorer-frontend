import React from "react";

function ShowMoreButton(props) {
  return( 
      <button className="button show-more-button" type="button" onClick={props.onClick}>Еще</button>
  );
}

export default ShowMoreButton;
