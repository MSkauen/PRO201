import React from "react";

export function ModalView({ label, onChangeValue, value, type }) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          pulvinar velit ut est luctus semper. Curabitur luctus bibendum risus
          vitae cursus. Suspendisse consectetur posuere volutpat. Curabitur
          pulvinar fermentum diam, at auctor metus facilisis ac. Aenean
          imperdiet sit amet libero ut cursus. Cras sed metus neque. Suspendisse
          urna nibh, mattis in mattis sagittis, accumsan in urna. Maecenas
          pretium velit nec tellus euismod, vel blandit magna hendrerit. Aenean
          vehicula odio eu imperdiet lacinia. Quisque sodales maximus nulla eget
          ultrices. Etiam volutpat placerat lacus quis sagittis. Duis interdum
          imperdiet ex non porta.
        </p>
      </div>
    </div>
  );
}
