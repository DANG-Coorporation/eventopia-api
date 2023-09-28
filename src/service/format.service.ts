import { FormatAttributes } from "../database/models/format";
import Formats from "../database/models/format";

export default class FormatsService {
  async createFormat(formatData: FormatAttributes): Promise<FormatAttributes> {
    try {
      const format = await Formats.create(formatData);
      return format;
    } catch (error) {
      throw new Error("gagal membuat Format baru");
    }
  }

  async getAllFormat() {
    try {
      const formats = await Formats.findAll();
      return formats;
    } catch (error) {
      throw new Error("Gagal mendapatkan data topik");
    }
  }
}
