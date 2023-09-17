export const postEventValidator = {
  name: {
    type: "string",
    max: 255,
    min: 5,
  },
  formatId: {
    type: "number",
  },
  topicId: {
    type: "number",
  },
  coverUrl: {
    type: "url",
    max: 255,
  },
  isPublic: {
    type: "boolean",
    optional: true,
    default: true,
  },
  eventStartDateTime: {
    type: "string",
    pattern: /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2})$/,
  },
  eventEndDateTime: {
    type: "string",
    pattern: /^(?:\d{4}-\d{2}-\d{2} \d{2}:\d{2})$/,
  },
  address: {
    type: "string",
    max: 255,
  },
  city: {
    type: "string",
    max: 255,
  },
  latitude: {
    type: "string",
    max: 255,
  },
  longitude: {
    type: "string",
    max: 255,
  },
  description: {
    type: "string",
  },
  isTermsAndConditions: {
    type: "boolean",
    optional: true,
    default: false,
  },
  termAndCondition: {
    type: "string",
  },
  isFullName: {
    type: "boolean",
    optional: true,
    default: true,
  },
  isEmail: {
    type: "boolean",
    optional: true,
    default: true,
  },
  isPhoneNumber: {
    type: "boolean",
    optional: true,
    default: true,
  },
  isIdentityNumber: {
    type: "boolean",
    optional: true,
    default: false,
  },
  isDob: {
    type: "boolean",
    optional: true,
    default: false,
  },
  isGender: {
    type: "boolean",
    optional: true,
    default: false,
  },
  maxPerbuy: {
    type: "number",
    optional: true,
    default: 5,
  },
  isOneEmailOneTransaction: {
    type: "boolean",
    optional: true,
    default: false,
  },
  isOneTicketOneData: {
    type: "boolean",
    optional: true,
    default: false,
  },
};
