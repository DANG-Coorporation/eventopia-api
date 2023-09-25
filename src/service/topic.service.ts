import { TopicAttributes } from "../database/models/topic";
import Topics from "../database/models/topic";

export default class TopicsService {
  async createTopic(topicData: TopicAttributes): Promise<TopicAttributes> {
    try {
      const topic = await Topics.create(topicData);
      return topic;
    } catch (error) {
      throw new Error("Gagal membuat Topik baru");
    }
  }

  async getAllTopics() {
    try {
      const topics = await Topics.findAll();
      return topics;
    } catch (error) {
      throw new Error("Gagal mengambil data topik.");
    }
  }

  async getTopicById(id: number): Promise<TopicAttributes | null> {
    try {
      const topic = await Topics.findByPk(id);
      return topic;
    } catch (error) {
      throw new Error("Gagal mengambil data topik.");
    }
  }

  async updateTopic(
    id: number,
    topicData: TopicAttributes
  ): Promise<[number, TopicAttributes[]]> {
    try {
      const [updatedRows, updatedTopics] = await Topics.update(topicData, {
        where: { id },
        returning: true,
      });
      return [updatedRows, updatedTopics];
    } catch (error) {
      throw new Error("Gagal mengupdate topik.");
    }
  }

  async deleteTopic(id: number): Promise<number> {
    try {
      const deletedRows = await Topics.destroy({
        where: { id },
      });
      return deletedRows;
    } catch (error) {
      throw new Error("Gagal menghapus topik.");
    }
  }
}
