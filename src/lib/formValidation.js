const validations = [
  {
    id: 1,
    name: "firstName",
    type: "text",
    isError: false,
    errorMessage:
      "First Name should be 3-16 characters and shouldn't include any special character!",
  },
  {
    id: 2,
    name: "middleName",
    type: "text",
    isError: false,
    errorMessage:
      "Middle Name should be 3-16 characters and shouldn't include any special character!",
  },
  {
    id: 3,
    name: "lastName",
    type: "text",
    isError: false,
    errorMessage:
      "Last Name should be 3-16 characters and shouldn't include any special character!",
  },
  {
    id: 3,
    name: "workPhone",
    type: "text",
    isError: false,
    errorMessage: "Phone Number should contain numbers only",
  },
  {
    id: 3,
    name: "personalPhone",
    type: "text",
    isError: false,
    errorMessage: "Phone Number should contain numbers only",
  },
];

export const referenceValues = [
  "Search Engine",
  "Google Ads",
  "Facebook Ads",
  "Youtube Ads",
  "Other paid social media advertising",
  "Facebook post/group",
  "Twitter post",
  "Instagram post/story",
  "Other social media",
  "Email",
  "Radio",
  "TV",
  "Newspaper",
  "Word of mouth",
  "Other",
];

export const checkFormValidity = (name, value, type) => {
  const matched = { errName: "", isError: false, errorMessage: "" };

  const setMatchedErrors = (name, error, message) => {
    matched.errName = name;
    matched.isError = error;
    matched.errorMessage = message;
  };

  validations.map((val) => {
    if (val.name === name && val.type === type && value === "") {
      setMatchedErrors(val.name, true, val.errorMessage);
    }
    if (val.name === name && val.type === type && value !== "") {
      setMatchedErrors(val.name, false, val.errorMessage);
    }
  });
  return matched;
};
