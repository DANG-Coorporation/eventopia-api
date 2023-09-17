import Event, { EventAttributes } from "../database/models/event";
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
}
