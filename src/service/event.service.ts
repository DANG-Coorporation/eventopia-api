import Event, { EventAttributes } from "../database/models/event";
import EventTickets from "../database/models/eventTicket";
import { getUniqId } from "../helper/function/getUniqId";

export default class EventService {
  async create(input: EventAttributes) {
    try {
      const uniqueId = `${input.name
        .replace(/\s/g, "-")
        .toLowerCase()}-${getUniqId({
        length: 6,
      })}`;
      const event = await Event.create({
        ...input,
        uniqueId,
      });
      return event.toJSON();
    } catch (error: any) {
      throw error;
    }
  }

  async createTicket(eventId: number, input: any) {
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      const eventTicket = await EventTickets.create({
        ...input,
        eventId,
      });
      return eventTicket.toJSON();
    } catch (error: any) {
      throw error;
    }
  }
}
