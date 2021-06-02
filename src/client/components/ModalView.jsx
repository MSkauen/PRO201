import React from "react";

export function showModal () {
  const modal = document.getElementById("myModal")
  modal.style.display = "block";
}

export function closeModal () {
  const modal = document.getElementById("myModal")
  modal.style.display = "none";
}
