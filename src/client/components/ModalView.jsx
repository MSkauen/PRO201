import React from "react";

export function showModal () {
  const modal = document.getElementById("myModal")
  modal.style.display = "block";
}

export function closeModal () {
  const modal = document.getElementById("myModal")
  modal.style.display = "none";
}

export const MODAL = {
  login: {
    text: "Please enter your Username in the field below.",
    images: {
      badLogins: [
          {
              id: 0,
              name: "Bad request",
              image: require('url:../../shared/img/modal/bad_request.png')
          },
          {
              id: 1,
              name: "Empty request",
              image: require('url:../../shared/img/modal/empty_request.png')
          },
        ],
      goodLogins: [
          {
              id: 0,
              name: "Good request",
              image: require('url:../../shared/img/modal/good_request.png')
          },
          {
              id: 1,
              name: "Good request",
              image: require('url:../../shared/img/modal/good_request2.png')
          },
        ],
        error: {
          image: require('url:../../shared/img/modal/error.png')
        },
        checkmark: {
          image: require('url:../../shared/img/modal/checkmark.png')
        },

    }
  }

}
