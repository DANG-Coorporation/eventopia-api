export const createByGoogleValidator = {
  name: {
    type: "string",
    min: 3,
    max: 255,
  },
  email: {
    type: "email",
    max: 255,
  },
  googleUid: {
    type: "string",
    max: 255,
  },
};
