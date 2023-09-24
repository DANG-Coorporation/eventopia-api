// CronJob.ts

import { DateTime } from "luxon";
import cron from "node-cron";
import { Op } from "sequelize";
import Orders from "../database/models/order";
import { paymentStatus } from "../config/payment";

export class CronJob {
  constructor() {
    // Define your cron job here
    cron.schedule("0 * * * *", () => {
      this.exampleCronJob();
    });

    cron.schedule("* * * * *", () => {
      this.checkOrderStatus();
    });
  }

  private exampleCronJob() {
    console.log("Example cron job executed");
    // Add your custom cron job logic here
  }

  private async checkOrderStatus() {
    try {
      const pendingOrders = await Orders.findAll({
        where: {
          paymentStatus: paymentStatus.PENDING,
          createdAt: {
            [Op.lte]: DateTime.now().minus({ minutes: 61 }).toJSDate(),
          },
        },
      });

      const affectedCount = await Orders.update(
        {
          paymentStatus: paymentStatus.EXPIRED,
        },
        {
          where: {
            paymentStatus: paymentStatus.PENDING,
            createdAt: {
              [Op.lte]: DateTime.now().minus({ minutes: 61 }).toJSDate(),
            },
          },
        }
      );
      const invoiceList = pendingOrders.map((order) => order.invoiceNo);
      if (affectedCount[0] > 0) {
        console.log("Affected rows: ", affectedCount);
        console.log("Expired orders: ", invoiceList);
      }
    } catch (error) {
      console.log("Error checking order status: ", error);
    }
  }
}
