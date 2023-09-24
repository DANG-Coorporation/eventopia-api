import { DateTime } from "luxon";
import InvoiceNo from "../database/models/invoiceNo";
import DokuService from "./doku.service";
import { paymentChannelLabel } from "../config/payment";
import { UnprocessableEntityException } from "../helper/Error/UnprocessableEntity/UnprocessableEntityException";
import Users from "../database/models/user";
import Event from "../database/models/event";
import EventTickets from "../database/models/eventTicket";
import Orders from "../database/models/order";
import { getUniqId } from "../helper/function/getUniqId";

export interface ICreateOrder {
  paymentChannel: string;
  userId: number;
  eventId: number;
  ticketId: number;
  quantity: number;
}

export default class OrderService {
  dokuService: DokuService;

  constructor() {
    this.dokuService = new DokuService();
  }

  async createOrder(input: ICreateOrder) {
    try {
      const invoiceNo = await InvoiceNo.create({});
      const dateNow = DateTime.now().toFormat("yyyyMMdd");
      const invoiceNumber = `INV-${dateNow}${getUniqId()}-${invoiceNo.id
        .toString()
        .padStart(6, "0")}`;

      let result;
      const user = await Users.findOne({ where: { id: input.userId } });
      if (!user) {
        throw new UnprocessableEntityException("User not found", {});
      }

      const event = await Event.findOne({ where: { id: input.eventId } });
      if (!event) {
        throw new UnprocessableEntityException("Event not found", {});
      }

      const ticket = await EventTickets.findOne({
        where: { id: input.ticketId },
      });
      if (!ticket) {
        throw new UnprocessableEntityException("Ticket not found", {});
      }

      if (ticket.eventId !== event.id) {
        throw new UnprocessableEntityException("Ticket not found", {});
      }

      switch (input.paymentChannel) {
        case paymentChannelLabel.BCA_VA.code:
          result = await this.dokuService.paymentBcaVa({
            invoiceNumber,
            amount: getTotalPrice(),
            email: "scriptgalih@gmail.com",
            name: "Galih Setyo Nugroho",
          });
          break;

        default:
          throw new UnprocessableEntityException(
            "Payment channel not found",
            {}
          );
      }
      function getTotalPrice() {
        return ticket!.price * input.quantity;
      }
      const order = await Orders.create({
        invoiceNo: invoiceNumber,
        eventId: input.eventId,
        userId: input.userId,
        quantity: input.quantity,
        eventTicketId: ticket.id,
        paymentMethod: input.paymentChannel,
        paymentStatus: "PENDING",
      });
      return {
        order,
        payment: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
