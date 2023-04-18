const form = document.querySelector("form");
const emailField = form.querySelector('[name="email"]');
const messageField = form.querySelector('[name="message"]');
const localStorageKey = "feedback-form-state";
var throttle = require("lodash.throttle");

function buildFormState() {
  return {
    email: emailField.value,
    message: messageField.value
  };
}

function saveFormState(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState() {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

function haveSavedState() {
  try {
    const state = getSavedState();
    if (typeof state == "object" && typeof state.email == "string") {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

function restoreSavedState() {
  if (haveSavedState()) {
    restoreState(getSavedState());
  }
}

function restoreState(state) {
  emailField.value = state.email;
  messageField.value = state.message;
}

function onFormInput(e) {
  saveFormState(buildFormState());
  //console.log(getSavedState());
}

function onSubmit(e) {
  e.preventDefault();
  console.log(buildFormState());
  emailField.value = "";
  messageField.value = "";
  localStorage.removeItem(localStorageKey);
}

restoreSavedState();

form.addEventListener("input", throttle(onFormInput, 500));

form.addEventListener("submit", onSubmit);
