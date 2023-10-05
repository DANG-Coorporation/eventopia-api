import { Op } from "sequelize";
import Event, { EventAttributes } from "../database/models/event";
import EventTickets from "../database/models/eventTicket";
import { NotFoundException } from "../helper/Error/NotFound/NotFoundException";
import { removeLimitAndPage } from "../helper/function/filteredData";
import { getUniqId } from "../helper/function/getUniqId";
import { IPaginate } from "../helper/interface/paginate/paginate.interface";

interface EventDetail extends EventAttributes {
  isExpired: boolean;
}

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

  async getEventById(id: number) {
    try {
      const event = await Event.findByPk(id);
      if (!event) throw new NotFoundException("Event not Found", {});
      return event;
    } catch (error) {
      throw new Error(`Error While fetching eventId: ${error}`);
    }
  }

  async page(input: IPaginate<EventAttributes>) {
    try {
      const page = input.page ?? 1;
      const limit = input.limit ?? 10;
      const offset = Math.max(page - 1, 0) * limit;
      const conditions = removeLimitAndPage(input.data);

      const whereClause: any = {
        name: {
          [Op.like]: `%${conditions.name}%`,
        },
      };

      if (conditions.provinceId) {
        whereClause.provinceId = conditions.provinceId;
      }

      if (conditions.cityId) {
        whereClause.cityId = conditions.cityId;
      }

      const events = await Event.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]],
      });

      return events;
    } catch (error) {
      console.error("Error mendapatkan pagination", error);
      throw error;
    }
  }

  async getEventDetailByUniqId(uniqId: string) {
    try {
      // Cari acara berdasarkan uniqId
      const event = await Event.findOne({
        where: { uniqueId: uniqId },
      });

      if (!event) {
        throw new Error("Acara tidak ditemukan");
      }

      // Periksa apakah tanggal acara lebih besar dari tanggal saat ini
      const currentDate = new Date();
      const eventDate = new Date(event.eventStartDateTime);

      const isExpired = eventDate <= currentDate;

      return { ...event.toJSON(), isExpired } as EventDetail;
    } catch (error) {
      throw error;
    }
  }
}
