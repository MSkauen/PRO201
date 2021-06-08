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
  },
  home: {
      text: "Please choose LEARN to get started with your certification.",
      text2: "REPORT will unlock on completion of course.",
      images: [
           {
              id: 0,
              name: "Learn image",
              image: require('url:../../shared/img/modal/home_process_uncertified.png')
          },
          {
              id: 1,
              name: "Report image",
              image: require('url:../../shared/img/modal/home_process_certified.png')
          }
      ]
  }

}
