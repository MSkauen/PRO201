export function check(e) {
    let checkbox = e.target.parentNode
    let checkmark = checkbox.querySelector("span")
    let checkBoxState = parseInt(checkbox.getAttribute("data-value"))

    if (checkBoxState === 0) {
        checkbox.setAttribute("data-value", 1);
        checkmark.className = "miniDot";
    } else if (checkBoxState === 1) {
        checkbox.setAttribute("data-value", 0);
        checkmark.className = " ";
    }
}