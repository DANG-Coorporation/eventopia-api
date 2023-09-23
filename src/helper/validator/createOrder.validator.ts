export const postOrderValidator = {
  paymentChannel: {
    type: "string",
    required: true,
    enum: ["bca_va", "bni_va", "bri_va", "permata_va", "other_va"],
  },
  userId: {
    type: "number",
    required: true,
  },
  eventId: {
    type: "number",
    required: true,
  },
  ticketId: {
    type: "number",
    required: true,
  },
  quantity: {
    type: "number",
    required: true,
    min: 1,
    max: 5,
  },
};
